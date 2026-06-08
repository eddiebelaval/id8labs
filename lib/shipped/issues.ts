/**
 * Shipped. — Magazine Issue Manifest (API)
 *
 * Each weekly issue lives at /public/shipped/{NN}/index.html as a self-contained
 * static HTML file and is listed on the hub archive at /shipped. This module is
 * the typed API the rest of the site consumes; the issue *data* lives in the
 * AUTO-GENERATED sibling `./issues.data`, which the publish pipeline rewrites
 * from the hub archive so the unified /writing feed can never drift from the
 * magazine's own archive page.
 *
 * Canonical home of record: https://id8labs.app/shipped
 *
 * To add an issue: run `/publish-shipped` (renders the issue, updates the hub,
 * and regenerates issues.data.ts). Do not hand-edit issues.data.ts.
 */

import { SHIPPED_ISSUES } from './issues.data'

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
 * Returns all Shipped. issues, newest first.
 */
export function getAllShippedIssues(): ShippedIssuePreview[] {
  return [...SHIPPED_ISSUES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

/**
 * Build the public (relative) URL for an issue. Pages live in
 * /public/shipped/{NN}/index.html which Vercel serves at id8labs.app/shipped/{NN}.
 * This is the single canonical link builder — every internal reference should
 * route through it so all links point to the same place.
 */
export function getShippedIssueHref(issueNumber: string): string {
  return `/shipped/${issueNumber}`
}

/**
 * Absolute canonical URL for an issue, for use in emails / outbound messages
 * where a relative path will not resolve.
 */
export function getShippedIssueUrl(issueNumber: string): string {
  return `${SHIPPED_HUB_URL}/${issueNumber}`
}

/** Absolute canonical URL for the Shipped. hub (all issues, newest first). */
export const SHIPPED_HUB_URL = 'https://id8labs.app/shipped'
