import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const send = vi.hoisted(() => vi.fn().mockResolvedValue({}))
vi.mock('resend', () => ({ Resend: class { emails = { send } } }))

import { notifyNewSubscriber } from '@/lib/notifications/new-subscriber'

const fetchMock = vi.fn().mockResolvedValue({ ok: true })
beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
  vi.stubEnv('SLACK_SHIPPED_WEBHOOK_URL', 'https://hooks.example/x')
  vi.stubEnv('RESEND_API_KEY', 're_test')
  vi.stubEnv('ADMIN_EMAIL', 'admin@example.com')
  fetchMock.mockClear(); send.mockClear()
})
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })

describe('notifyNewSubscriber', () => {
  it('alerts Slack and email for a magazine signup, naming Shipped.', async () => {
    await notifyNewSubscriber({ email: 'reader@example.com', source: 'shipped-magazine-issue-11' })
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body as string)
    expect(body.text).toContain('New Shipped. subscriber')
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ subject: expect.stringContaining('New Shipped. subscriber') }))
  })

  it('sends no alert for a newsletter signup', async () => {
    await notifyNewSubscriber({ email: 'reader@example.com', source: 'newsletter-writing' })
    expect(fetchMock).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })

  it('never throws when a channel fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('slack down'))
    await expect(notifyNewSubscriber({ email: 'r@example.com', source: 'shipped-magazine-issue-11' })).resolves.toBeUndefined()
  })
})
