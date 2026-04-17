/**
 * Shipped. — Magazine Issue Manifest
 *
 * Each weekly issue lives at /public/shipped/{NN}/index.html as a self-contained
 * static HTML file. This manifest mirrors that listing so the magazine appears
 * alongside Essays / Newsletter / Research / Releases in the unified /writing feed.
 *
 * When a new issue ships (next Friday's /publish-shipped run), append to this array.
 * Future enhancement: have the renderer's archive step append automatically.
 */

export interface ShippedIssuePreview {
  /** Two-digit issue number, e.g. "01" */
  issueNumber: string
  /** Headline used in the writing-list card title */
  title: string
  /** Subtitle / dek used in the writing-list card subtitle */
  subtitle: string
  /** Publish date (ISO YYYY-MM-DD) */
  date: string
  /** Excerpt shown in the writing-list card preview */
  excerpt: string
  /** Approximate read time string */
  readTime: string
  /** Tags surfaced as topic chips */
  tags: string[]
  /** Featured flag — surfaces on the homepage if true */
  featured?: boolean
  /** Period covered by the issue (informational; e.g., "2026-03-27 → 2026-04-17") */
  period?: string
}

/**
 * The canonical Shipped. issue list. Append on each weekly publish.
 */
const SHIPPED_ISSUES: ShippedIssuePreview[] = [
  {
    issueNumber: '01',
    title: 'The chart that wasn\u2019t about Opus 4.7.',
    subtitle: 'Three weeks of Anthropic, in one read. Plus: the model you can\u2019t have.',
    date: '2026-04-17',
    period: '2026-03-27 \u2192 2026-04-17',
    excerpt:
      'The Founding Issue covers Opus 4.7, Project Glasswing, the Mythos shadow, and 56 releases over three weeks. Front-of-book editorial plus a comprehensive Release Log catalogued by category.',
    readTime: '25\u201340 min read',
    tags: ['Opus 4.7', 'Mythos Preview', 'Project Glasswing', 'Agent SDK', 'Claude Code'],
    featured: true,
  },
]

/**
 * Returns all Shipped. issues, newest first.
 */
export function getAllShippedIssues(): ShippedIssuePreview[] {
  return [...SHIPPED_ISSUES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

/**
 * Build the public URL for an issue. Pages live in /public/shipped/{NN}/index.html
 * which Vercel serves at id8labs.app/shipped/{NN}.
 */
export function getShippedIssueHref(issueNumber: string): string {
  return `/shipped/${issueNumber}`
}
