import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { middleware } from '@/middleware'

vi.mock('@supabase/ssr', () => ({ createServerClient: vi.fn() }))

const req = (path: string) => {
  const url = new URL(path, 'http://localhost:3000')
  return {
    nextUrl: Object.assign(url, { clone: () => new URL(url.href) }),
    url: url.href,
    cookies: { getAll: vi.fn(() => []), set: vi.fn() },
    headers: new Headers(),
  } as unknown as NextRequest
}
const signedIn = (user: unknown) => vi.mocked(createServerClient).mockReturnValue(
  { auth: { getUser: vi.fn(async () => ({ data: { user }, error: null })) } } as never)

// The bug needs ADMIN_EMAIL ABSENT: undefined !== undefined is false, so an
// email-less signed-in account (e.g. phone auth) used to pass the admin gate.
const saved = process.env.ADMIN_EMAIL
beforeEach(() => {
  delete process.env.ADMIN_EMAIL
  process.env.NEXT_PUBLIC_SUPABASE_URL ||= 'https://example.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||= 'anon'
})
afterEach(() => { if (saved === undefined) delete process.env.ADMIN_EMAIL; else process.env.ADMIN_EMAIL = saved })

describe('admin gate fails closed', () => {
  it('blocks a signed-in account with no email when ADMIN_EMAIL is unset (401 on /api/admin)', async () => {
    signedIn({ id: 'u1', phone: '+15550000000' })
    const res = await middleware(req('/api/admin/newsletter/subscribers'))
    expect(res.status).toBe(401)
  })
  it('redirects the same account away from /admin pages', async () => {
    signedIn({ id: 'u1', phone: '+15550000000' })
    const res = await middleware(req('/admin/newsletter'))
    expect([302, 307, 308]).toContain(res.status)
  })
  it('lets the configured admin through', async () => {
    process.env.ADMIN_EMAIL = 'admin@example.com'
    signedIn({ id: 'u2', email: 'Admin@Example.com' })
    const res = await middleware(req('/api/admin/newsletter/subscribers'))
    expect(res.status).not.toBe(401)
  })
})
