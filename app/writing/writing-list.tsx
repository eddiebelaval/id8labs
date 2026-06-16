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

/**
 * Folio mark for un-numbered pieces (essays / research / release notes).
 * Uses the title's first letter — leading article (The / A / An) stripped —
 * uppercased, so the index column reads as a deliberate editorial drop-cap
 * (e.g. "P." "C." "T.") that mirrors magazine issue folios ("01.") instead of
 * a missing-number placeholder.
 */
function folioInitial(title: string): string {
  const cleaned = title.replace(/^(the|a|an)\s+/i, '').trim()
  const match = cleaned.match(/[A-Za-z0-9]/)
  return (match ? match[0] : title.charAt(0) || '·').toUpperCase()
}

/**
 * Roman-numeral folio for numbered issues (Shipped / Newsletter), e.g. 9 -> IX.
 * Classical magazine-folio feel; meaningful (it is the real issue number).
 */
function toRoman(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return String(n)
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let r = '', x = Math.floor(n)
  for (const [v, s] of map) while (x >= v) { r += s; x -= v }
  return r
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

  // The navbar "Shipped." link lands here as ?filter=magazine. In that view the
  // masthead wears the Shipped identity, not the generic Writing one.
  const isMagazineView = filter === 'magazine'

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
          <Kicker dot>{isMagazineView ? 'The Weekly Magazine' : 'Index · Field Notes'}</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            {isMagazineView ? 'Shipped' : 'Writing'}<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[640px]">
            {isMagazineView ? (
              <>The weekly magazine on what the AI labs ship — three weeks of hindsight in one read.</>
            ) : (
              <>
                Essays, research, release notes, the{' '}
                <span className="not-italic font-[family-name:var(--font-display)]">Shipped<span className="text-id8-orange">.</span></span>{' '}
                newsletter, and the weekly magazine on what the AI labs ship.
              </>
            )}
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
                  Shipped<span className="text-id8-orange">.</span>
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
              ? toRoman(item.issueNumber)
              : null
            // Un-numbered pieces get a title drop-cap folio, not a placeholder dash.
            const folio = number ?? folioInitial(item.title)

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
                number={folio}
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
              Get Shipped<span className="text-id8-orange">.</span> delivered
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-xl font-[family-name:var(--font-sans)] text-[var(--body)] leading-relaxed">
              Weekly insights on AI, automation, and building the future. Join 1,000+ builders.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterSubscribe
                variant="inline"
                source="shipped-writing"
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
