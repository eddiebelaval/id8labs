import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

// No session: Supabase returns no user. Nothing else should matter.
vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }),
}))
vi.mock('@/lib/supabase/server', () => ({ createAdminClient: () => null }))

// The bug needs the variables truly ABSENT: undefined === undefined is true, but
// undefined === '' is not, so stubbing '' would never reproduce it.
const saved = { ADMIN_EMAIL: process.env.ADMIN_EMAIL, ADMIN_SECRET: process.env.ADMIN_SECRET, CRON_SECRET: process.env.CRON_SECRET }
beforeEach(() => {
  delete process.env.ADMIN_EMAIL
  delete process.env.ADMIN_SECRET
  delete process.env.CRON_SECRET
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co')
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon')
})
afterEach(() => {
  vi.unstubAllEnvs()
  for (const [k, v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v }
})

const post = (url: string) => new NextRequest(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })

describe('newsletter bulk-send routes with ADMIN_EMAIL unset', () => {
  it('send refuses an anonymous caller (401)', async () => {
    const { POST } = await import('@/app/api/newsletter/send/route')
    expect((await POST(post('http://localhost/api/newsletter/send'))).status).toBe(401)
  })
  it('send-shipped refuses an anonymous caller (401)', async () => {
    const { POST } = await import('@/app/api/newsletter/send-shipped/route')
    expect((await POST(post('http://localhost/api/newsletter/send-shipped'))).status).toBe(401)
  })
})
