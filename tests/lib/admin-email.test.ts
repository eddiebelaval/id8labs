import { afterEach, describe, expect, it, vi } from 'vitest'
import { isAdminEmail } from '@/lib/auth/admin-email'

afterEach(() => vi.unstubAllEnvs())

describe('isAdminEmail (fails closed)', () => {
  it('denies everyone when ADMIN_EMAIL is absent, including an anonymous caller', () => {
    const was = process.env.ADMIN_EMAIL
    delete process.env.ADMIN_EMAIL
    expect(isAdminEmail(undefined)).toBe(false)
    if (was !== undefined) process.env.ADMIN_EMAIL = was
  })
  it('denies everyone when ADMIN_EMAIL is empty', () => {
    vi.stubEnv('ADMIN_EMAIL', '')
    expect(isAdminEmail(undefined)).toBe(false)
    expect(isAdminEmail(null)).toBe(false)
    expect(isAdminEmail('anyone@example.com')).toBe(false)
  })
  it('denies an anonymous caller even when ADMIN_EMAIL is set', () => {
    vi.stubEnv('ADMIN_EMAIL', 'admin@example.com')
    expect(isAdminEmail(undefined)).toBe(false)
  })
  it('allows only the configured admin (case-insensitive)', () => {
    vi.stubEnv('ADMIN_EMAIL', 'Admin@Example.com')
    expect(isAdminEmail('admin@example.com')).toBe(true)
    expect(isAdminEmail('other@example.com')).toBe(false)
  })
})
