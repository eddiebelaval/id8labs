import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const db = vi.hoisted(() => {
  const single = vi.fn()
  const insert = vi.fn()
  const save = vi.fn()
  const select = vi.fn()
  const update = vi.fn()
  const eq = vi.fn()
  const from = vi.fn()
  return { single, insert, save, select, update, eq, from }
})

vi.mock('@/lib/supabase/server', () => ({ createAdminClient: () => ({ from: db.from }) }))
vi.mock('@/lib/notifications/new-subscriber', () => ({ notifyNewSubscriber: vi.fn().mockResolvedValue(undefined) }))
vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: () => ({ allowed: true }), getRateLimitKey: () => 'test',
  rateLimitHeaders: () => ({}), RATE_LIMITS: { publicForm: {} },
}))

import { POST } from '@/app/api/newsletter/subscribe/route'
import { subscriptionListsForSource } from '@/lib/newsletter/subscriptions'
import { notifyNewSubscriber } from '@/lib/notifications/new-subscriber'

const signup = (source: unknown, extra = {}) => POST(new NextRequest('http://localhost/api/newsletter/subscribe', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'Reader@Example.com', source, ...extra }),
}))

beforeEach(() => {
  vi.resetAllMocks()
  vi.mocked(notifyNewSubscriber).mockResolvedValue(undefined)
  const query = { select: db.select, eq: db.eq, single: db.single, insert: db.insert, update: db.update }
  db.from.mockReturnValue(query)
  db.select.mockReturnValue(query)
  db.eq.mockReturnValue(query)
  db.update.mockReturnValue({ eq: db.save })
  db.single.mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
  db.insert.mockResolvedValue({ error: null })
  db.save.mockResolvedValue({ error: null })
})

describe('Publication choices', () => {
  // Real PostgREST text when a column was never migrated (prod lacked name/cadences).
  const PGRST204 = { code: 'PGRST204', message: "Could not find the 'cadences' column of 'newsletter_subscribers' in the schema cache" }

  it('saves a magazine signup when the optional columns are missing (retries without them)', async () => {
    db.insert.mockResolvedValueOnce({ error: PGRST204 }).mockResolvedValue({ error: null })
    const response = await signup('shipped-magazine-issue-11', { name: 'Ada', cadences: ['weekly'] })
    expect(response.status).toBe(200)
    expect(db.insert).toHaveBeenLastCalledWith(expect.objectContaining({ email: 'reader@example.com', lists: ['shipped'] }))
    expect(db.insert.mock.lastCall?.[0]).not.toHaveProperty('cadences')
  })

  it('updates a returning subscriber when the optional columns are missing', async () => {
    db.single.mockResolvedValueOnce({ data: { id: 'u1', status: 'active' }, error: null })
      .mockResolvedValueOnce({ data: { lists: ['newsletter'] }, error: null })
    db.save.mockResolvedValueOnce({ error: PGRST204 }).mockResolvedValue({ error: null })
    const response = await signup('shipped-magazine-issue-11', { cadences: ['nightly'] })
    expect(response.status).toBe(200)
    expect(db.update).toHaveBeenLastCalledWith(expect.objectContaining({ lists: ['newsletter', 'shipped'] }))
    expect(db.update.mock.lastCall?.[0]).not.toHaveProperty('cadences')
  })

  it.each(['shipped-hub', 'shipped-magazine-issue-10', 'shipped-daily'])('opts %s into only Shipped', async (source) => {
    expect((await signup(source)).status).toBe(200)
    expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({ email: 'reader@example.com', lists: ['shipped'] }))
  })

  it.each(['newsletter-writing', 'newsletter-popup', 'newsletter-issue-3', 'shipped-writing', 'shipped-popup', 'shipped-issue-3'])('opts %s into only Signal to Noise', async (source) => {
    const response = await signup(source)
    expect(response.status).toBe(200)
    expect((await response.json()).message).toContain('Signal to Noise')
    expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({ lists: ['newsletter'] }))
  })

  it.each([
    { existing: ['newsletter'], source: 'shipped-hub', expected: ['newsletter', 'shipped'] },
    { existing: ['shipped'], source: 'newsletter-writing', expected: ['shipped', 'newsletter'] },
  ])('adds the other publication without removing the first: $source', async ({ existing, source, expected }) => {
    db.single.mockResolvedValueOnce({ data: { id: 'subscriber', status: 'active' }, error: null })
      .mockResolvedValueOnce({ data: { lists: existing }, error: null })
    expect((await signup(source)).status).toBe(200)
    expect(db.update).toHaveBeenCalledWith(expect.objectContaining({ lists: expected, status: 'active' }))
    expect(db.insert).not.toHaveBeenCalled()
  })

  it('leaves an existing matching membership unchanged', async () => {
    db.single.mockResolvedValueOnce({ data: { id: 'subscriber', status: 'active' }, error: null })
      .mockResolvedValueOnce({ data: { lists: ['shipped'] }, error: null })
    expect((await (await signup('shipped-hub')).json()).message).toBe('Already subscribed')
    expect(db.update).not.toHaveBeenCalled()
  })

  it('reactivates and preserves prior choices', async () => {
    db.single.mockResolvedValueOnce({ data: { id: 'subscriber', status: 'unsubscribed' }, error: null })
      .mockResolvedValueOnce({ data: { lists: ['newsletter'] }, error: null })
    expect((await signup('shipped-hub')).status).toBe(200)
    expect(db.update).toHaveBeenCalledWith(expect.objectContaining({ lists: ['newsletter', 'shipped'], unsubscribed_at: null }))
  })

  it('preserves magazine cadence choices', async () => {
    expect((await signup('shipped-hub', { name: ' Reader ', cadences: ['weekly', 'invalid'] })).status).toBe(200)
    expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({ lists: ['shipped'], name: 'Reader', cadences: ['weekly'] }))
  })

  it('does not report success when existing choices cannot be read', async () => {
    db.single.mockResolvedValueOnce({ data: { id: 'subscriber', status: 'active' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: 'Read failed' } })
    expect((await signup('shipped-hub')).status).toBe(503)
    expect(db.update).not.toHaveBeenCalled()
  })

  it('does not treat a database outage as a new subscriber', async () => {
    db.single.mockResolvedValueOnce({ data: null, error: { code: 'DATABASE_ERROR' } })
    expect((await signup('shipped-hub')).status).toBe(503)
    expect(db.insert).not.toHaveBeenCalled()
  })

  it('never retries without the publication choice', async () => {
    db.insert.mockResolvedValue({ error: { message: 'column lists does not exist' } })
    expect((await signup('shipped-hub')).status).toBe(500)
    for (const [payload] of db.insert.mock.calls) expect(payload.lists).toEqual(['shipped'])
  })

  it('reports a failed membership update', async () => {
    db.single.mockResolvedValueOnce({ data: { id: 'subscriber', status: 'active' }, error: null })
      .mockResolvedValueOnce({ data: { lists: ['newsletter'] }, error: null })
    db.save.mockResolvedValue({ error: { message: 'Save failed' } })
    expect((await signup('shipped-hub')).status).toBe(500)
  })

  it('safely classifies missing or malformed source values', () => {
    expect(subscriptionListsForSource(undefined)).toEqual(['newsletter'])
    expect(subscriptionListsForSource(7)).toEqual(['newsletter'])
    expect(subscriptionListsForSource('SHIPPED-HUB')).toEqual(['shipped'])
  })
})
