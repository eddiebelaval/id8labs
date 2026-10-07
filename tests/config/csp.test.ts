import { describe, it, expect } from 'vitest'
import nextConfig from '../../next.config.mjs'

// The CSP silently blocked every analytics script from 2026-01-08 to 2026-10-07. Hosts are
// hard-coded here, not read from the config, so the test cannot agree with a wrong config.
async function directives(source: string) {
  const rules = await nextConfig.headers()
  const rule = rules.find((r: { source: string }) => r.source === source)
  const csp = rule.headers.find((h: { key: string }) => h.key === 'Content-Security-Policy').value as string
  return Object.fromEntries(
    csp.split(';').map((d) => d.trim().split(/\s+/)).map(([name, ...values]) => [name, values]),
  ) as Record<string, string[]>
}

const SCRIPT_HOSTS = [
  'https://www.googletagmanager.com',
  'https://static.cloudflareinsights.com',
  'https://umami-analytics-eddies-projects-b49c74d7.vercel.app',
]
const CONNECT_HOSTS = [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://cloudflareinsights.com',
  'https://umami-analytics-eddies-projects-b49c74d7.vercel.app',
]

describe.each(['/((?!periodic-table\\.html).*)', '/periodic-table.html'])('CSP for %s', (source) => {
  it('lets the analytics scripts load', async () => {
    const d = await directives(source)
    for (const host of SCRIPT_HOSTS) expect(d['script-src']).toContain(host)
  })

  it('lets the analytics scripts report', async () => {
    const d = await directives(source)
    for (const host of CONNECT_HOSTS) expect(d['connect-src']).toContain(host)
  })

  it('keeps the lockdown directives', async () => {
    const d = await directives(source)
    expect(d['object-src']).toEqual(["'none'"])
    expect(d['default-src']).toEqual(["'self'"])
  })
})
