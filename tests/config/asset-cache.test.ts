import { describe, it, expect } from 'vitest'
import nextConfig from '../../next.config.mjs'

// Next applies a path header whatever the status code, and Cloudflare honours it.
// A one-year `immutable` on public images kept a pre-deploy 404 for the Signal to
// Noise email header (2026-10-10). Public assets must be able to heal.
describe('public asset cache headers', () => {
  it('never pins un-hashed public images or fonts as immutable for a year', async () => {
    const rules = await (nextConfig as { headers: () => Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>> }).headers()
    const assets = rules.find((r) => r.source.includes('png'))
    const cc = assets?.headers.find((h) => h.key === 'Cache-Control')?.value ?? ''
    expect(cc).not.toMatch(/immutable/)
    expect(Number(cc.match(/max-age=(\d+)/)?.[1])).toBeLessThanOrEqual(86400)
  })

  it('keeps the year-long immutable cache for hashed build output', async () => {
    const rules = await (nextConfig as { headers: () => Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>> }).headers()
    const hashed = rules.find((r) => r.source === '/_next/static/:path*')
    expect(hashed?.headers.find((h) => h.key === 'Cache-Control')?.value).toMatch(/max-age=31536000, immutable/)
  })
})
