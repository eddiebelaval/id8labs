import { beforeEach, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({ from: vi.fn(), select: vi.fn(), eq: vi.fn(), or: vi.fn(), send: vi.fn() }))
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({ from: mocks.from }) }))
vi.mock('resend', () => ({ Resend: class { emails = { send: mocks.send } } }))
import { POST } from '@/app/api/newsletter/send/route'
import { generateEssayHtml, generateNewsletterHtml, NEWSLETTER_ESSAY_3, NEWSLETTER_ISSUE_1 } from '@/lib/email/templates/newsletter-template'

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('ADMIN_SECRET', 'test-admin')
  const query = { select: mocks.select, eq: mocks.eq, or: mocks.or, data: [], error: null }
  mocks.from.mockReturnValue(query)
  mocks.select.mockReturnValue(query)
  mocks.eq.mockReturnValue(query)
  mocks.or.mockReturnValue(query)
})

it.each(['all', 'academy', 'free'])('limits the %s newsletter audience to its own publication', async (audienceFilter) => {
  const response = await POST(new NextRequest('http://localhost/api/newsletter/send', {
    method: 'POST', headers: { Authorization: 'Bearer test-admin', 'Content-Type': 'application/json' },
    body: JSON.stringify({ issueNumber: 1, audienceFilter }),
  }))
  expect(response.status).toBe(200)
  expect(mocks.or).toHaveBeenCalledWith('lists.cs.{newsletter},lists.is.null')
  expect(mocks.eq).toHaveBeenCalledWith('status', 'active')
  expect(mocks.send).not.toHaveBeenCalled()
})

it('uses Signal to Noise branding in both newsletter email formats', () => {
  for (const html of [generateEssayHtml(NEWSLETTER_ESSAY_3), generateNewsletterHtml(NEWSLETTER_ISSUE_1, false)]) {
    expect(html).toContain('Signal to Noise')
    expect(html).toContain('/brand/signal-to-noise-wordmark.png')
    expect(html).not.toContain('>Shipped.</span>')
  }
})
