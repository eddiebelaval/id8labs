import Link from 'next/link'
import { type WritingItem } from '@/lib/writing'
import { Container, Kicker, Deck, Tag, EditorialCard, Hairline } from '@/components/editorial'

function categoryLabel(item: WritingItem): string {
  if (item.category === 'newsletter' && item.issueNumber) {
    return `Issue #${item.issueNumber}`
  }
  return item.category
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function FeaturedArticle({ item }: { item: WritingItem }) {
  return (
    <EditorialCard href={`/writing/${item.slug}`}>
      {/* Meta line */}
      <div className="mb-4 flex items-center gap-4">
        <Tag>{categoryLabel(item)}</Tag>
        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
          {formatDate(item.date)}
        </span>
      </div>

      <h3 className="mb-3 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-2xl md:text-3xl">
        {item.title}
      </h3>

      {item.subtitle && (
        <p className="mb-3 font-[family-name:var(--font-serif)] italic text-lg text-[var(--muted)]">
          {item.subtitle}
        </p>
      )}

      <p className="mb-6 leading-relaxed text-[var(--body)] line-clamp-3">{item.excerpt}</p>

      <div className="flex items-center justify-between border-t border-[var(--hair)] pt-4">
        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
          {item.readTime}
        </span>
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
          Read article &rarr;
        </span>
      </div>
    </EditorialCard>
  )
}

function RecentArticleItem({ item }: { item: WritingItem }) {
  return (
    <Link
      href={`/writing/${item.slug}`}
      className="group flex items-start justify-between gap-4 py-4 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-3">
          <span className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
            {item.category === 'newsletter' ? `#${item.issueNumber}` : item.category}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
            {formatDate(item.date)}
          </span>
        </div>
        <h4 className="font-medium text-[var(--ink)] line-clamp-1 transition-colors group-hover:text-id8-orange">
          {item.title}
        </h4>
        <p className="mt-0.5 text-sm text-[var(--muted)] line-clamp-1">{item.excerpt}</p>
      </div>
      <span className="mt-1 shrink-0 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--muted)] transition-colors group-hover:text-id8-orange">
        &rarr;
      </span>
    </Link>
  )
}

function NewsletterCTA() {
  return (
    <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-6">
      <Kicker className="mb-2">Shipped. Newsletter</Kicker>
      <p className="mb-3 text-sm text-[var(--body)]">
        Thoughts on AI, building, and working through problems in public.
      </p>
      <Link
        href="/newsletter"
        className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange transition-colors hover:text-[var(--ink)]"
      >
        Subscribe &rarr;
      </Link>
    </div>
  )
}

interface LatestFromLabProps {
  items: WritingItem[]
}

export default function LatestFromLab({ items }: LatestFromLabProps) {
  const featured = items[0]
  const recent = items.slice(1, 4)

  if (!featured) {
    return null
  }

  return (
    <section id="latest" className="py-20 md:py-24 scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24">
          {/* Left - Sticky Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker className="mb-4">From the Lab</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              Latest from <em className="italic font-normal text-id8-orange">the lab</em>
            </h2>
            <Deck>Essays, research, and updates. Working through problems in public.</Deck>
          </div>

          {/* Right - Content */}
          <div className="space-y-10">
            {/* Featured Article */}
            <FeaturedArticle item={featured} />

            {/* Recent Articles */}
            <div>
              <h3 className="mb-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Recent Writing
              </h3>
              <div className="divide-y divide-[var(--hair)]">
                {recent.map((item) => (
                  <RecentArticleItem key={item.slug} item={item} />
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <NewsletterCTA />

            <Hairline />

            {/* View All Link */}
            <div>
              <Link
                href="/writing"
                className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange transition-colors hover:text-[var(--ink)]"
              >
                View all writing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
