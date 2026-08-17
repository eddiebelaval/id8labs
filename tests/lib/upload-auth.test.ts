import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { keyIsValid } from '@/lib/upload/auth'

const REAL = 'k'.repeat(32)

describe('upload access key', () => {
  const prev = process.env.UPLOAD_ACCESS_KEY
  beforeEach(() => { process.env.UPLOAD_ACCESS_KEY = REAL })
  afterEach(() => { process.env.UPLOAD_ACCESS_KEY = prev })

  it('accepts the configured key', () => {
    expect(keyIsValid(REAL)).toBe(true)
  })

  it('rejects a wrong key of the same length', () => {
    expect(keyIsValid('x'.repeat(32))).toBe(false)
  })

  it('rejects empty, missing and short keys', () => {
    expect(keyIsValid('')).toBe(false)
    expect(keyIsValid(undefined)).toBe(false)
    expect(keyIsValid(null)).toBe(false)
  })

  // The one that matters: an unconfigured deploy must not become an open door.
  it('FAILS CLOSED when no key is configured', () => {
    delete process.env.UPLOAD_ACCESS_KEY
    expect(keyIsValid(REAL)).toBe(false)
    expect(keyIsValid('anything')).toBe(false)
  })

  it('FAILS CLOSED when the configured key is too short to be a secret', () => {
    process.env.UPLOAD_ACCESS_KEY = 'short'
    expect(keyIsValid('short')).toBe(false)
  })
})
