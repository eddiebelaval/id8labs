import { MetadataRoute } from 'next'
import { getAllEssays } from '@/lib/mdx-essays'
import { getAllSkills, getAllCollections, getAllCategories } from '@/lib/skills'
import { getAllPlugins } from '@/lib/plugins'
import { getAllCommands } from '@/lib/commands'
import { getAllSettings } from '@/lib/settings'
import { getAllShippedIssues, getShippedIssueHref } from '@/lib/shipped/issues'

/**
 * Sitemap. Every canonical public URL, built from the same data sources the
 * routes themselves read, so it can never drift from what actually renders.
 *
 * Only canonical URLs belong here. Legacy paths that redirect (/skills/*,
 * /essays/*, /commands, /settings, /gallery) are deliberately absent, as are
 * internal search results and faceted marketplace views (noindexed and
 * canonicalized respectively).
 *
 * Each dynamic section is isolated: if one data source fails, that section is
 * empty and the rest of the sitemap still ships.
 */

const BASE = 'https://id8labs.app'

type Entry = MetadataRoute.Sitemap[number]
type Freq = NonNullable<Entry['changeFrequency']>

const STATIC_PAGES: Array<[path: string, freq: Freq, priority: number]> = [
  ['/', 'weekly', 1],
  ['/lab', 'monthly', 0.8],
  ['/products', 'weekly', 0.9],
  ['/writing', 'weekly', 0.8],
  ['/shipped', 'weekly', 0.8],
  ['/stackshack', 'daily', 0.9],
  ['/stackshack/starter-kits', 'weekly', 0.7],
  ['/stackshack/categories', 'weekly', 0.6],
  ['/stackshack/trending', 'daily', 0.6],
  ['/academy', 'weekly', 0.8],
  ['/thesis', 'monthly', 0.7],
  ['/eddie', 'monthly', 0.6],
  ['/contact', 'monthly', 0.7],
  ['/newsletter', 'monthly', 0.5],
  ['/privacy', 'yearly', 0.2],
  ['/terms', 'yearly', 0.2],
]

// app/products/<slug>/page.tsx, one entry per directory.
const PRODUCTS: Array<[slug: string, priority: number]> = [
  ['parallax', 0.9],
  ['deepstack', 0.8],
  ['composer', 0.7],
  ['factory', 0.7],
  ['foundry', 0.7],
  ['lexicon', 0.7],
  ['llc-ops', 0.7],
  ['milo', 0.7],
  ['pause', 0.7],
  ['pipeline', 0.7],
  ['clear', 0.7],
  ['rune', 0.6],
  ['xplace', 0.6],
]

// Course landing pages only. Individual modules stay out until the paid
// module gating is settled (see the Phase 1 findability audit).
const ACADEMY_COURSES = [
  'private-ai',
  'ai-partner-mastery',
  'ai-for-leaders',
  'prompt-engineering-creators',
  'ai-at-scale',
  'anthropic/claude-101',
  'anthropic/building-with-claude-api',
  'anthropic/claude-code-in-action',
  'anthropic/claude-code-skills',
  'anthropic/introduction-to-agent-skills',
  'anthropic/introduction-to-mcp',
]

function when(value?: string | null, fallback: Date = new Date()): Date {
  if (!value) return fallback
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? fallback : d
}

function entry(path: string, freq: Freq, priority: number, lastModified: Date): Entry {
  return { url: `${BASE}${path}`, lastModified, changeFrequency: freq, priority }
}

async function section(label: string, build: () => Promise<Entry[]> | Entry[]): Promise<Entry[]> {
  try {
    return await build()
  } catch (error) {
    console.error(`[sitemap] ${label} section failed, shipping without it:`, error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const statics = STATIC_PAGES.map(([path, freq, priority]) => entry(path, freq, priority, now))

  const products = PRODUCTS.map(([slug, priority]) =>
    entry(`/products/${slug}`, 'monthly', priority, now),
  )

  const academy = ACADEMY_COURSES.map((slug) => entry(`/academy/${slug}`, 'monthly', 0.6, now))

  const essays = await section('essays', () =>
    getAllEssays().map((e) => entry(`/writing/${e.slug}`, 'monthly', 0.6, when(e.date, now))),
  )

  const shipped = await section('shipped', () =>
    getAllShippedIssues().map((issue) =>
      entry(getShippedIssueHref(issue.issueNumber), 'monthly', 0.5, when(issue.date, now)),
    ),
  )

  const skills = await section('skills', async () =>
    (await getAllSkills({ limit: 1000 })).map((s) =>
      entry(`/stackshack/${s.slug}`, 'monthly', 0.6, when(s.updated_at ?? s.published_at, now)),
    ),
  )

  const kits = await section('starter-kits', async () =>
    (await getAllCollections()).map((c) =>
      entry(`/stackshack/starter-kits/${c.slug}`, 'weekly', 0.6, when(c.updated_at, now)),
    ),
  )

  const categories = await section('categories', async () =>
    (await getAllCategories()).map((c) => entry(`/stackshack/categories/${c.id}`, 'weekly', 0.5, now)),
  )

  const plugins = await section('plugins', async () =>
    (await getAllPlugins()).map((p) =>
      entry(`/stackshack/plugins/${p.slug}`, 'monthly', 0.5, when(p.updated_at, now)),
    ),
  )

  const commands = await section('commands', async () =>
    (await getAllCommands()).map((c) =>
      entry(`/commands/${c.slug}`, 'monthly', 0.5, when(c.updated_at, now)),
    ),
  )

  const settings = await section('settings', async () =>
    (await getAllSettings()).map((s) =>
      entry(`/settings/${s.slug}`, 'monthly', 0.4, when(s.updated_at, now)),
    ),
  )

  return [
    ...statics,
    ...products,
    ...academy,
    ...essays,
    ...shipped,
    ...skills,
    ...kits,
    ...categories,
    ...plugins,
    ...commands,
    ...settings,
  ]
}
