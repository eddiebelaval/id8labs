/**
 * Unified Writing Content Loader
 * 
 * Combines essays and newsletter issues into a single content feed
 */

import { getAllEssays, type Essay } from './essays'
import { getAllIssues, type NewsletterIssuePreview } from './newsletter/issues'
import {
  getAllShippedIssues,
  getShippedIssueHref,
  type ShippedIssuePreview,
} from './shipped/issues'
import { CORPUS_REGISTER } from './corpus-register'

export type WritingCategory =
  | 'essay'
  | 'research'
  | 'release'
  | 'newsletter'
  | 'magazine'

export interface WritingItem {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: WritingCategory
  readTime: string
  excerpt: string
  tags?: string[]
  featured?: boolean
  // Newsletter-specific fields
  issueNumber?: number
  /** Permanent corpus accession number (the folio on /writing). Assigned from
   *  the append-only CORPUS_REGISTER; new pieces get the next number by date. */
  corpusNumber?: number
  /** Optional explicit href. When present, the writing list links to this URL
   *  directly rather than the default /writing/{slug} pattern. Used for
   *  Magazine items that live at /shipped/{NN}. */
  href?: string
}

/**
 * Convert an essay to a writing item
 */
function essayToWritingItem(essay: Essay): WritingItem {
  return {
    slug: essay.slug,
    title: essay.title,
    subtitle: essay.subtitle,
    date: essay.date,
    category: essay.category,
    readTime: essay.readTime,
    excerpt: essay.excerpt,
    tags: essay.tags,
    featured: essay.featured,
  }
}

/**
 * Convert a newsletter issue to a writing item
 */
function newsletterToWritingItem(issue: NewsletterIssuePreview): WritingItem {
  return {
    slug: `newsletter/${issue.slug}`,
    title: issue.title,
    subtitle: issue.subtitle,
    date: issue.date,
    category: 'newsletter',
    readTime: issue.isEssay ? '8 min read' : '5 min read',
    excerpt: issue.excerpt,
    tags: ['newsletter', 'shipped'],
    issueNumber: issue.issueNumber,
  }
}

/**
 * Convert a Shipped. magazine issue to a writing item.
 * Magazine issues live at /shipped/{NN} (NOT /writing/{slug}), so they
 * carry an explicit href that the list rendering respects.
 */
function shippedToWritingItem(issue: ShippedIssuePreview): WritingItem {
  return {
    slug: `shipped-${issue.issueNumber}`,
    title: issue.title,
    subtitle: issue.subtitle,
    date: issue.date,
    category: 'magazine',
    readTime: issue.readTime,
    excerpt: issue.excerpt,
    tags: issue.tags,
    featured: issue.featured,
    issueNumber: parseInt(issue.issueNumber, 10),
    href: getShippedIssueHref(issue.issueNumber),
  }
}

/**
 * Standalone pieces that live as their own hosted HTML page under /public
 * (not MDX essays, because they embed interactive content the markdown
 * renderer cannot). Surfaced in the writing index via an explicit href, the
 * same mechanism the Magazine issues use.
 */
const STANDALONE_PIECES: WritingItem[] = [
  {
    slug: 'the-gaps-are-the-product',
    title: 'The Gaps Are the Product',
    subtitle: 'A periodic table for the work every business runs on',
    date: '2026-07-20',
    category: 'essay',
    readTime: '5 min read',
    excerpt:
      'I went to a planetarium and watched the periodic table get built by dying stars. Then I built one for the work every business runs on. It handed me back two elements I had been running for months without a name.',
    tags: ['primitives', 'doctrine', 'interactive'],
    href: '/periodic-table-of-primitives.html',
  },
  {
    slug: 'the-table-has-a-pulse',
    title: 'The Table Has a Pulse',
    subtitle: 'The first audit of a periodic table that checks itself',
    date: '2026-08-15',
    category: 'essay',
    readTime: '5 min read',
    excerpt:
      'Twenty-six days after I built a periodic table for the work every business runs on, I finally ran the audit it came with. It handed me an element I had been running for months without a name, then corrected me about where it belonged.',
    tags: ['primitives', 'doctrine', 'interactive'],
    href: '/the-table-has-a-pulse.html',
  },
]

/**
 * Assign the permanent corpus accession number to every item.
 * Registered slugs keep their frozen number (CORPUS_REGISTER). Any slug not yet
 * registered is assigned the next number (max + 1) in date order (oldest first),
 * so new work always lands on top with a fresh number and existing numbers never
 * shift. Computed server-side, so the number is baked into the data the client
 * receives (no client recompute, no hydration drift).
 */
function assignCorpusNumbers(items: WritingItem[]): WritingItem[] {
  let maxNum = 0
  for (const n of Object.values(CORPUS_REGISTER)) if (n > maxNum) maxNum = n

  const assigned: Record<string, number> = {}
  items
    .filter((it) => CORPUS_REGISTER[it.slug] == null)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.slug < b.slug ? -1 : 1))
    .forEach((it, i) => { assigned[it.slug] = maxNum + i + 1 })

  return items.map((it) => ({
    ...it,
    corpusNumber: CORPUS_REGISTER[it.slug] ?? assigned[it.slug],
  }))
}

/**
 * Get all writing content (essays + newsletters + magazine issues)
 */
export function getAllWriting(): WritingItem[] {
  const essays = getAllEssays().map(essayToWritingItem)
  const newsletters = getAllIssues().map(newsletterToWritingItem)
  const magazine = getAllShippedIssues().map(shippedToWritingItem)

  // Combine, stamp permanent corpus numbers, then sort by date (newest first).
  const allContent = assignCorpusNumbers([...essays, ...newsletters, ...magazine, ...STANDALONE_PIECES])
  return allContent.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Get writing content filtered by category
 */
export function getWritingByCategory(category: WritingCategory): WritingItem[] {
  return getAllWriting().filter(item => item.category === category)
}

/**
 * Get a specific writing item by slug
 */
export function getWritingBySlug(slug: string): WritingItem | undefined {
  return getAllWriting().find(item => item.slug === slug)
}
