import { describe, it, expect } from 'vitest'
import nextConfig from '../../next.config.mjs'

// The brand moved id8labs.app -> id8labs.si (2026-10-10). Pages on the old host must 308 to
// the same path on .si; /api/* must NOT, because Stripe and other webhook senders do not
// follow redirects. Paths are matched against the compiled source regex, the way Next does.
type Redirect = { source: string; destination: string; permanent: boolean; has?: { type: string; value: string }[] }

async function hostRedirects(): Promise<Redirect[]> {
  const rules: Redirect[] = await nextConfig.redirects()
  return rules.filter((r) => r.has?.some((h) => h.type === 'host'))
}

function matches(source: string, path: string) {
  const pattern = source.replace('/:path(', '/(').replace(/^/, '^') + '$'
  return new RegExp(pattern).test(path)
}

describe('id8labs.app -> id8labs.si redirect', () => {
  it('covers the apex and www of the old host, permanently, to the same path', async () => {
    const rules = await hostRedirects()
    expect(rules.map((r) => r.has![0].value).sort()).toEqual(['id8labs.app', 'www.id8labs.app'])
    for (const r of rules) {
      expect(r.permanent).toBe(true)
      expect(r.destination).toBe('https://id8labs.si/:path')
    }
  })

  it('redirects pages and leaves /api alone', async () => {
    const [rule] = await hostRedirects()
    for (const path of ['/', '/writing/the-mycology-principle', '/sitemap.xml', '/apiary']) {
      expect(matches(rule.source, path), path).toBe(true)
    }
    for (const path of ['/api/stripe/webhook', '/api/newsletter/subscribe']) {
      expect(matches(rule.source, path), path).toBe(false)
    }
  })

  it('stays on even when marketplace redirects are disabled', async () => {
    process.env.DISABLE_MARKETPLACE_REDIRECTS = 'true'
    try {
      expect((await hostRedirects()).length).toBe(2)
    } finally {
      delete process.env.DISABLE_MARKETPLACE_REDIRECTS
    }
  })
})
