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
 * Get all writing content (essays + newsletters + magazine issues)
 */
export function getAllWriting(): WritingItem[] {
  const essays = getAllEssays().map(essayToWritingItem)
  const newsletters = getAllIssues().map(newsletterToWritingItem)
  const magazine = getAllShippedIssues().map(shippedToWritingItem)

  // Combine and sort by date (newest first)
  const allContent = [...essays, ...newsletters, ...magazine]
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
