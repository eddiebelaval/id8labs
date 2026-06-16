'use client'

import { type WritingItem, type WritingCategory } from '@/lib/writing'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { NewsletterSubscribe } from '@/components/newsletter'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  IssueCard,
} from '@/components/editorial'

interface WritingListProps {
  items: WritingItem[]
}

/**
 * Format a date string - handles both ISO dates and human-readable dates like "January 2025"
 * Uses UTC parsing to avoid timezone hydration mismatches
 */
function formatDate(dateStr: string): string {
  // Handle edge case where dateStr might be undefined or null
  if (!dateStr) return 'Unknown Date'

  // Try parsing as ISO date first (YYYY-MM-DD format)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const parsed = new Date(dateStr + 'T00:00:00.000Z') // Force UTC to avoid timezone issues

    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC' // Force UTC to match server rendering
      })
    }
  }

  // Try parsing as a standard date (fallback)
  const parsed = new Date(dateStr + 'T00:00:00')
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // If not parseable (like "January 2025"), return as-is
  return dateStr
}

type FilterKey = 'all' | WritingCategory

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All Writing' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'magazine', label: 'Magazine' },
  { key: 'essay', label: 'Essays' },
  { key: 'research', label: 'Research' },
  { key: 'release', label: 'Releases' },
]

const VALID_FILTERS = new Set<string>(FILTERS.map(f => f.key))

export function WritingList({ items }: WritingListProps) {
  return (
    <Suspense fallback={null}>
      <WritingListInner items={items} />
    </Suspense>
  )
}

function WritingListInner({ items }: WritingListProps) {
  // Initial filter is deep-linkable via ?filter= (e.g. /writing?filter=magazine
  // is the navbar "Shipped." destination). Validate against known keys, else 'all'.
  const searchParams = useSearchParams()
  const paramFilter = searchParams.get('filter')
  const initialFilter: FilterKey =
    paramFilter && VALID_FILTERS.has(paramFilter)
      ? (paramFilter as FilterKey)
      : 'all'

  const [filter, setFilter] = useState<FilterKey>(initialFilter)

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.category === filter)

  const categoryLabels: Record<WritingCategory, string> = {
    essay: 'Essay',
    research: 'Research',
    release: 'Release Note',
    newsletter: 'Newsletter',
    magazine: 'Magazine'
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-12">
        <Container>
          <Kicker dot>Index · Field Notes</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            Writing<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[640px]">
            Essays, research, release notes, the signal:noise newsletter, and{' '}
            <span className="not-italic font-[family-name:var(--font-display)]">Shipped<span className="text-id8-orange">.</span></span>{' '}
            — the weekly magazine on what Anthropic ships.
          </Deck>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section className="border-y border-[var(--rule)] py-4">
        <Container>
          <div className="flex gap-7 overflow-x-auto font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em]">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={`whitespace-nowrap pb-1 transition-colors ${
                  filter === key
                    ? 'border-b-2 border-id8-orange text-id8-orange'
                    : 'border-b-2 border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter masthead — only when Newsletter tab is active */}
      {filter === 'newsletter' && (
        <section className="border-b border-[var(--hair)] py-8">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <Kicker dot>The id8Labs Newsletter</Kicker>
                <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium italic tracking-[-0.01em] text-[var(--ink)]">
                  Signal:Noise
                </p>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Monthly · {filteredItems.length} issue{filteredItems.length !== 1 ? 's' : ''}
              </span>
            </div>
          </Container>
        </section>
      )}

      {/* Writing List */}
      <section className="py-12">
        <Container>
          {filteredItems.map((item) => {
            const isNewsletter = item.category === 'newsletter'
            const isMagazine = item.category === 'magazine'
            // Magazine items carry an explicit href to /shipped/{NN}.
            // Newsletter items resolve to /newsletter/{slug} (slug already prefixed).
            // Everything else routes to /writing/{slug}.
            const linkHref = item.href
              ? item.href
              : isNewsletter
                ? `/${item.slug}`
                : `/writing/${item.slug}`

            const number = (isNewsletter || isMagazine) && item.issueNumber != null
              ? String(item.issueNumber).padStart(2, '0')
              : null

            const label = isNewsletter
              ? 'Newsletter'
              : isMagazine
                ? 'Shipped.'
                : categoryLabels[item.category]

            const tags = [label, ...(item.subtitle ? [] : [])]

            return (
              <IssueCard
                key={item.slug}
                href={linkHref}
                number={number ?? '—'}
                title={item.title}
                deck={item.subtitle || item.excerpt}
                tags={tags}
                date={formatDate(item.date)}
                label={item.readTime}
              />
            )
          })}
        </Container>
      </section>

      {/* Newsletter Subscribe CTA */}
      <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-20">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">Subscribe</Kicker>
            <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
              Get signal:noise delivered
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-xl font-[family-name:var(--font-sans)] text-[var(--body)] leading-relaxed">
              Weekly insights on AI, automation, and building the future. Join 1,000+ builders.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterSubscribe
                variant="inline"
                source="writing-page"
                title=""
                description=""
                buttonText="Subscribe to Newsletter"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
