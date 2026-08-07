/**
 * Article link audit.
 *
 * Why this exists
 * ---------------
 * 'The Gaps Are the Product' 404'd from the homepage for weeks. The homepage
 * rail and the /writing index read the same data but built links differently,
 * so the homepage rendered a link to a route that never existed. Nothing caught
 * it because nothing ever asked the obvious question: does the URL we just
 * rendered actually resolve?
 *
 * This script asks it, for every article link on the site.
 *
 * Where links are gathered from
 * -----------------------------
 * Three sources, unioned — each covers a hole the others cannot see:
 *
 * 1. DATA. Every WritingItem resolved through writingHref(). Catches a piece
 *    that is real but not currently rendered on any page.
 * 2. SOURCE. Every article-shaped URL literal hardcoded in app/ and
 *    components/. Essays are cross-linked by hand from product pages, course
 *    pages and the thesis series; those links rot when a slug changes and no
 *    list component knows about them.
 * 3. RENDERED. The index surfaces below, loaded in a real browser. A browser
 *    and not a fetch, because /writing builds its list client-side via
 *    useSearchParams — the server HTML contains zero article links, so a plain
 *    fetch would audit nothing and report success.
 *
 * Coverage is asserted, not assumed: any page component that reads the writing
 * data layer must appear in SURFACES, or this script fails and tells you to add
 * it. That is what stops the audit from quietly going blind as the site grows.
 *
 * Usage
 * -----
 *   LINK_CHECK_BASE_URL=http://localhost:3000 npx tsx scripts/check-article-links.ts
 *
 * Exits 0 when every article link resolves, 1 otherwise.
 */

import { readdirSync, readFileSync, statSync } from 'fs'
import path from 'path'
import { chromium, type Page } from '@playwright/test'
import { getAllWriting } from '../lib/writing'
import { writingHref } from '../lib/writing-href'

const BASE_URL = (process.env.LINK_CHECK_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
const ORIGIN = new URL(BASE_URL).origin
const REPO_ROOT = path.join(__dirname, '..')

/**
 * Every page that renders a computed list of article links.
 *
 * Add a surface here when you add a page that lists writing. The coverage check
 * below fails the build if you forget.
 */
const SURFACES = [
  '/',
  '/writing',
  // The category chips on /writing are buttons, not links, so the filtered
  // views are unreachable by crawling. Request them directly — magazine and
  // newsletter items only ever render under their own filter.
  '/writing?filter=newsletter',
  '/writing?filter=magazine',
  '/writing?filter=essay',
  '/writing?filter=research',
  '/writing?filter=release',
  '/lab',
  '/shipped',
  '/newsletter',
  '/thesis/series',
]

/** Page components allowed to read writing data without being a SURFACE. */
const COVERAGE_EXEMPT = [
  // Renders counts only, not links.
  'app/sitemap.ts',
  'app/robots.ts',
]

const RENDER_CONCURRENCY = 3
const CHECK_CONCURRENCY = 8

/**
 * Is this path an article link — the thing this audit is responsible for?
 * Deliberately narrow: a general broken-link checker would drag in every
 * external and auth-gated URL on the site and rot into noise.
 */
function isArticleLink(pathname: string): boolean {
  if (pathname.startsWith('/writing/')) return true
  if (pathname.startsWith('/newsletter/')) return true
  if (pathname.startsWith('/shipped/')) return true
  // Standalone hosted pieces live as HTML under /public.
  if (/^\/[^/]+\.html$/.test(pathname)) return true
  return false
}

/** Same-origin path for an href (query and hash dropped), or null if off-site. */
function toInternalPath(href: string): string | null {
  if (!href) return null
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null
  let parsed: URL
  try {
    parsed = new URL(href, BASE_URL)
  } catch {
    return null
  }
  if (parsed.origin !== ORIGIN) return null
  return parsed.pathname
}

type Links = Map<string, Set<string>>

function record(links: Links, pathname: string, origin: string): void {
  const existing = links.get(pathname)
  if (existing) existing.add(origin)
  else links.set(pathname, new Set([origin]))
}

// ---------------------------------------------------------------------------
// Source 1: the data layer
// ---------------------------------------------------------------------------

function collectFromData(links: Links): number {
  const found = new Set<string>()
  for (const item of getAllWriting()) {
    const pathname = toInternalPath(writingHref(item))
    if (pathname) {
      record(links, pathname, 'lib/writing.ts')
      found.add(pathname)
    }
  }
  return found.size
}

// ---------------------------------------------------------------------------
// Source 2: hardcoded links in source
// ---------------------------------------------------------------------------

function walkSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) walkSourceFiles(full, out)
    else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(full)
  }
  return out
}

/** Article URL literals, e.g. href="/writing/foo" or '/shipped/03'. */
const LITERAL_RE = /['"`](\/(?:writing|newsletter|shipped)\/[a-z0-9][a-z0-9/-]*|\/[a-z0-9-]+\.html)['"`]/gi

function collectFromSource(links: Links, files: string[]): number {
  const found = new Set<string>()
  for (const file of files) {
    const rel = path.relative(REPO_ROOT, file)
    const src = readFileSync(file, 'utf8')
    for (const match of src.matchAll(LITERAL_RE)) {
      const pathname = match[1]
      // Template literals with an interpolated slug are not real URLs.
      if (pathname.includes('${')) continue
      if (isArticleLink(pathname)) {
        record(links, pathname, rel)
        found.add(pathname)
      }
    }
  }
  return found.size
}

// ---------------------------------------------------------------------------
// Coverage: no page may render writing data without being audited
// ---------------------------------------------------------------------------

const WRITING_DATA_RE = /\b(getAllWriting|getAllEssays|getWritingByCategory|getEssaysByCategory)\b/

/**
 * Map an app-router page file to the route it serves, so it can be compared
 * against SURFACES. Returns null for non-page files.
 */
function pageFileToRoute(rel: string): string | null {
  if (!rel.startsWith('app/')) return null
  const m = rel.match(/^app\/(.*)page\.tsx$/)
  if (!m) return null
  const segments = m[1]
    .split('/')
    .filter(Boolean)
    // Route groups (marketing) do not appear in the URL.
    .filter((s) => !(s.startsWith('(') && s.endsWith(')')))
  return '/' + segments.join('/')
}

function checkSurfaceCoverage(files: string[]): string[] {
  const surfaceRoutes = new Set(SURFACES.map((s) => s.split('?')[0]))
  const missing: string[] = []

  for (const file of files) {
    const rel = path.relative(REPO_ROOT, file)
    if (COVERAGE_EXEMPT.includes(rel)) continue
    const route = pageFileToRoute(rel)
    if (!route) continue
    // Dynamic routes render one article, they do not list them.
    if (route.includes('[')) continue
    if (!WRITING_DATA_RE.test(readFileSync(file, 'utf8'))) continue
    if (!surfaceRoutes.has(route)) missing.push(`${route}  (${rel})`)
  }
  return missing
}

// ---------------------------------------------------------------------------
// Source 3: what a browser actually renders
// ---------------------------------------------------------------------------

async function collectFromRendered(
  links: Links
): Promise<{ unrendered: string[]; found: number }> {
  // Sandboxes and prebuilt containers often ship a Chromium whose build number
  // does not match the pinned @playwright/test. Point at it rather than
  // re-downloading a browser.
  const browser = await chromium.launch(
    process.env.LINK_CHECK_CHROMIUM_PATH
      ? { executablePath: process.env.LINK_CHECK_CHROMIUM_PATH }
      : {}
  )
  const unrendered: string[] = []
  const found = new Set<string>()

  try {
    const queue = [...SURFACES]
    const pages = await Promise.all(
      Array.from({ length: RENDER_CONCURRENCY }, () => browser.newPage())
    )

    await Promise.all(
      pages.map(async (page: Page) => {
        for (;;) {
          const surface = queue.shift()
          if (!surface) return
          try {
            await page.goto(BASE_URL + surface, { waitUntil: 'domcontentloaded', timeout: 45_000 })
            // The lists that matter render client-side, so let the network
            // settle. Some pages never go fully idle; scrape them anyway.
            await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
            const hrefs = await page.$$eval('a[href]', (as) =>
              as.map((a) => (a as HTMLAnchorElement).getAttribute('href') || '')
            )
            for (const href of hrefs) {
              const pathname = toInternalPath(href)
              if (pathname && isArticleLink(pathname)) {
                record(links, pathname, surface)
                found.add(pathname)
              }
            }
          } catch (err) {
            const reason = (err as Error).message.split('\n')[0]
            console.error(`  ! could not render ${surface}: ${reason}`)
            // A surface that will not render means we did not check what we
            // claim to check. That is a failure, not a warning.
            unrendered.push(surface)
          }
        }
      })
    )
  } finally {
    await browser.close()
  }

  return { unrendered, found: found.size }
}

// ---------------------------------------------------------------------------
// Checking
// ---------------------------------------------------------------------------

type CheckResult = { status: number; viaDirectoryIndex: boolean }

/**
 * Resolve a URL the way the hosting platform does.
 *
 * Pages that ship as `public/{path}/index.html` (every Shipped. magazine issue)
 * are served by Vercel at the bare `/{path}` — its static handler falls back to
 * the directory index. `next start`, which is what CI runs, does NOT do that
 * fallback and returns 404. So a bare-path 404 is retried at
 * `{path}/index.html`; if the file is really there and really serves, the link
 * is sound and the difference is the local server's, not the site's. If the
 * directory index is missing too, it fails like anything else.
 */
async function checkUrl(pathname: string): Promise<CheckResult> {
  const res = await fetch(BASE_URL + pathname, { redirect: 'follow' })
  if (res.status === 200) return { status: 200, viaDirectoryIndex: false }
  if (res.status !== 404 || pathname.endsWith('.html')) {
    return { status: res.status, viaDirectoryIndex: false }
  }

  const indexPath = `${pathname.replace(/\/$/, '')}/index.html`
  const indexRes = await fetch(BASE_URL + indexPath, { redirect: 'follow' })
  return { status: indexRes.status, viaDirectoryIndex: indexRes.status === 200 }
}

async function main() {
  console.log(`Article link audit against ${BASE_URL}\n`)

  const sourceFiles = [
    ...walkSourceFiles(path.join(REPO_ROOT, 'app')),
    ...walkSourceFiles(path.join(REPO_ROOT, 'components')),
  ]

  const links: Links = new Map()

  // Each source reports what IT found, not just what it added. A source that
  // silently stops finding anything — a renamed helper, a changed markup, a
  // selector that no longer matches — would otherwise read as "+0 new" and look
  // exactly like a healthy run. Zero from any source fails the audit.
  const fromData = collectFromData(links)
  const fromSource = collectFromSource(links, sourceFiles)
  const uncovered = checkSurfaceCoverage(sourceFiles)
  const { unrendered, found: fromRendered } = await collectFromRendered(links)

  console.log(`  ${fromData} links from the writing data layer`)
  console.log(`  ${fromSource} links hardcoded in app/ and components/`)
  console.log(`  ${fromRendered} links rendered across ${SURFACES.length} surfaces`)
  console.log(`  ${links.size} unique after union\n`)

  const deadSources = [
    fromData === 0 ? 'data layer (lib/writing.ts)' : null,
    fromSource === 0 ? 'source scan of app/ and components/' : null,
    fromRendered === 0 ? 'rendered surfaces' : null,
  ].filter((s): s is string => s !== null)

  const targets = [...links.entries()]
    .map(([url, foundOn]) => ({ url, foundOn: [...foundOn].sort() }))
    .sort((a, b) => a.url.localeCompare(b.url))

  console.log(`Checking ${targets.length} unique article URLs...\n`)

  const failures: Array<{ url: string; status: number; foundOn: string[] }> = []
  const viaDirectoryIndex: string[] = []
  const queue = [...targets]

  await Promise.all(
    Array.from({ length: CHECK_CONCURRENCY }, async () => {
      for (;;) {
        const target = queue.shift()
        if (!target) return
        let result: CheckResult
        try {
          result = await checkUrl(target.url)
        } catch (err) {
          result = { status: 0, viaDirectoryIndex: false }
          console.error(`  ! request failed for ${target.url}: ${(err as Error).message}`)
        }
        if (result.status !== 200) {
          failures.push({ url: target.url, status: result.status, foundOn: target.foundOn })
        } else if (result.viaDirectoryIndex) {
          viaDirectoryIndex.push(target.url)
        }
      }
    })
  )

  if (viaDirectoryIndex.length > 0) {
    console.log(
      `  note: ${viaDirectoryIndex.length} link(s) resolved via their static directory\n` +
        `  index (public/<path>/index.html). Vercel serves those at the bare path;\n` +
        `  \`next start\` does not.`
    )
    for (const u of viaDirectoryIndex.sort()) console.log(`        ${u}`)
    console.log()
  }

  const ok =
    failures.length === 0 &&
    unrendered.length === 0 &&
    uncovered.length === 0 &&
    deadSources.length === 0
  if (ok) {
    console.log(`✓ All ${targets.length} article links resolve (200).`)
    return
  }

  if (deadSources.length > 0) {
    console.error(`\n✗ ${deadSources.length} link source(s) found nothing, so this audit is blind:\n`)
    for (const s of deadSources) console.error(`       ${s}`)
    console.error(`\n  A source that finds zero links is broken, not clean.`)
  }

  if (uncovered.length > 0) {
    console.error(`\n✗ ${uncovered.length} page(s) render writing data but are not audited surfaces:\n`)
    for (const u of uncovered.sort()) console.error(`       ${u}`)
    console.error(`\n  Add them to SURFACES in scripts/check-article-links.ts.`)
  }

  if (unrendered.length > 0) {
    console.error(`\n✗ ${unrendered.length} surface(s) failed to render, so their links went unchecked:\n`)
    for (const s of unrendered.sort()) console.error(`       ${s}`)
  }

  if (failures.length > 0) {
    console.error(`\n✗ ${failures.length} of ${targets.length} article links are broken:\n`)
    for (const f of failures.sort((a, b) => a.url.localeCompare(b.url))) {
      console.error(`  ${String(f.status).padEnd(3)}  ${f.url}`)
      console.error(`       linked from: ${f.foundOn.join(', ')}`)
    }
    console.error(
      `\n  A link that is rendered must resolve. Either fix the target or stop\n` +
        `  linking it — see lib/writing-href.ts for the single link resolver.\n`
    )
  }

  process.exit(1)
}

main().catch((err) => {
  console.error('Article link audit crashed:', err)
  process.exit(1)
})
