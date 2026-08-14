import type { Metadata } from 'next'
import {
  getAllShippedIssues,
  getShippedIssueHref,
} from '@/lib/shipped/issues'
import { SHIPPED_DAILIES } from '@/lib/shipped/dailies.data'
import {
  SHIPPED_WEEKLY_SWEEPS,
  SHIPPED_MONTHLY_SWEEPS,
} from '@/lib/shipped/sweeps.data'
import { getLeadDaily, getBigStories } from '@/lib/shipped/frontpage'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  SectionHead,
  IssueCard,
  EditorialButton,
  SubscribeForm,
} from '@/components/editorial'
import { DailyArchive } from './daily-archive'
import { SweepList } from './sweep-list'

export const metadata: Metadata = {
  title: 'Shipped. | ID8Labs',
  description:
    'The magazine on what the AI labs ship. The front page leads with the latest edition and the biggest coverage days; the archive holds every confirmed release.',
  openGraph: {
    title: 'Shipped. | id8Labs',
    description:
      'The magazine on what the AI labs ship. Front page first; the full archive behind it.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipped.',
    description: 'The magazine on what the AI labs ship.',
  },
}

// Revalidate hourly so newly published issues/dailies surface without a redeploy.
export const revalidate = 3600

/** UTC-safe formatter for issue/edition date columns. */
function formatDate(dateStr: string): string {
  const parsed = new Date(dateStr + 'T00:00:00.000Z')
  if (isNaN(parsed.getTime())) return dateStr
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function ShippedPage() {
  const issues = getAllShippedIssues()
  const featuredIssue = issues.find((issue) => issue.featured) ?? issues[0]
  const restIssues = issues.filter((issue) => issue !== featuredIssue)

  const dailies = SHIPPED_DAILIES
  const lead = getLeadDaily()
  const bigStories = getBigStories(lead?.date)
  const latestWeekly = SHIPPED_WEEKLY_SWEEPS[0]
  const latestMonthly = SHIPPED_MONTHLY_SWEEPS[0]
  const sweepCount = SHIPPED_WEEKLY_SWEEPS.length + SHIPPED_MONTHLY_SWEEPS.length

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-10">
        <Container>
          <Kicker dot>The Magazine</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            Shipped<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[660px]">
            The magazine on what the AI labs ship. The front page carries the
            latest edition and the days that mattered most; the archives hold
            every confirmed release, day by day.
          </Deck>
          <MetaRow
            className="mt-8"
            items={[
              { value: String(dailies.length), label: 'Daily editions' },
              { value: String(sweepCount), label: 'Sweeps' },
              { value: String(issues.length), label: 'Magazine issues' },
              {
                value: lead ? formatDate(lead.date) : '—',
                label: 'Latest edition',
              },
            ]}
          />
          {/* Top CTA — the ask sits above the fold; the form itself is at the foot. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <EditorialButton href="#subscribe">Subscribe</EditorialButton>
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Free · Daily digest 9 PM ET · Weekly issue Friday 9 AM ET
            </p>
          </div>
          <Rule className="mt-8" />
        </Container>
      </section>

      {/* The front page — lead story + the current sweeps beside it */}
      {lead && (
        <section className="pb-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[7fr_3fr] lg:gap-16">
              {/* Lead story: the latest daily edition */}
              <article>
                <Kicker dot>Latest edition · {lead.dayLabel}</Kicker>
                <a
                  href={lead.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] leading-[1.18] text-[var(--ink)] text-[clamp(1.5rem,3.2vw,2.375rem)]">
                    {lead.title}
                  </h2>
                  <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                    <span className="tabular-nums">
                      {lead.wordCount.toLocaleString('en-US')} words
                    </span>
                    <span>Daily edition</span>
                    <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
                      Read the edition ↗
                    </span>
                  </p>
                </a>
              </article>

              {/* Sidebar: the freshest sweep of each cadence */}
              <aside className="space-y-8 border-t border-[var(--rule)] pt-8 lg:border-l lg:border-t-0 lg:border-[var(--hair)] lg:pl-10 lg:pt-0">
                {latestWeekly && (
                  <a
                    href={latestWeekly.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      The week, swept
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--ink)]">
                      {latestWeekly.label}
                    </p>
                    <p className="mt-2.5 font-[family-name:var(--font-sans)] text-[15px] leading-[1.5] text-[var(--body)] transition-colors group-hover:text-[var(--ink)]">
                      {latestWeekly.title}
                    </p>
                  </a>
                )}
                {latestMonthly && (
                  <a
                    href={latestMonthly.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-t border-[var(--hair)] pt-8"
                  >
                    <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      The month
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--ink)]">
                      {latestMonthly.label}
                    </p>
                    <p className="mt-2.5 font-[family-name:var(--font-sans)] text-[15px] leading-[1.5] text-[var(--body)] transition-colors group-hover:text-[var(--ink)]">
                      {latestMonthly.title}
                    </p>
                  </a>
                )}
              </aside>
            </div>
          </Container>
        </section>
      )}

      {/* Big stories — the heaviest coverage days, derived from the archive */}
      {bigStories.length > 0 && (
        <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-20">
          <Container>
            <SectionHead
              as="h2"
              title={<>The <em>big</em> days.</>}
              meta="Derived from the archive"
            />
            <Deck className="mt-6 mb-10 max-w-[620px] text-[1.125rem]">
              The heaviest coverage days on record — when the labs shipped the
              most, the editions ran longest. Surfaced automatically, newest
              first.
            </Deck>
            <div
              className={
                // Exactly four stories square up as 2×2; otherwise three
                // across so full rows stay full.
                bigStories.length === 4
                  ? 'grid gap-4 md:grid-cols-2'
                  : 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
              }
            >
              {bigStories.map((story) => (
                <a
                  key={story.date}
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-[13px] border border-[var(--hair)] bg-[var(--paper)] p-6 transition-colors hover:border-[var(--hair-hard)]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--ink)]">
                    {story.dayLabel}
                  </span>
                  <span className="mt-3 font-[family-name:var(--font-display)] font-normal leading-[1.3] tracking-[-0.01em] text-[var(--ink)] text-[1.0625rem] line-clamp-4">
                    {story.title}
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-4 pt-4 font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
                    <span className="tabular-nums">
                      {story.wordCount.toLocaleString('en-US')} words
                    </span>
                    <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] text-id8-orange opacity-0 transition-opacity group-hover:opacity-100">
                      Read ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* The magazine collection — featured issue full-size, the rest compact */}
      <section className="border-t border-[var(--rule)] py-20">
        <Container>
          <SectionHead
            as="h2"
            title={<>The <em>collection</em>.</>}
            meta={`${issues.length} magazine issues`}
          />
          <Deck className="mt-6 mb-2 max-w-[620px] text-[1.125rem]">
            The marquee editions — weeks of hindsight shaped into single
            long-form issues.
          </Deck>

          {featuredIssue && (
            <div className="mt-4">
              <IssueCard
                href={getShippedIssueHref(featuredIssue.issueNumber)}
                number={featuredIssue.issueNumber}
                title={featuredIssue.title}
                deck={featuredIssue.subtitle || featuredIssue.excerpt}
                tags={featuredIssue.tags}
                date={formatDate(featuredIssue.date)}
                label={featuredIssue.readTime}
              />
            </div>
          )}

          {restIssues.length > 0 && (
            <ul className="mt-2 grid md:grid-cols-2 md:gap-x-12">
              {restIssues.map((issue) => (
                <li key={issue.issueNumber}>
                  <a
                    href={getShippedIssueHref(issue.issueNumber)}
                    className="group grid grid-cols-[52px_1fr_auto] items-baseline gap-4 border-b border-[var(--hair)] py-4 transition-colors hover:bg-[var(--paper-shadow)]"
                  >
                    <span className="font-[family-name:var(--font-display)] font-normal leading-none tracking-[-0.03em] text-[var(--ink)] text-2xl">
                      {issue.issueNumber}
                      <span className="text-id8-orange">.</span>
                    </span>
                    <span className="font-[family-name:var(--font-sans)] text-[15px] leading-[1.45] text-[var(--body)] transition-colors group-hover:text-[var(--ink)]">
                      {issue.title}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
                      {formatDate(issue.date)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Weekly + monthly sweeps — the routine cadence, side by side */}
      <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-20">
        <Container>
          <SectionHead
            as="h2"
            title={<>The <em>sweeps</em>.</>}
            meta="Weekly + monthly"
          />
          <Deck className="mt-6 mb-10 max-w-[620px] text-[1.125rem]">
            The week and the month, compressed. Published on the same cadence
            the labs ship on.
          </Deck>
          <SweepList />
        </Container>
      </section>

      {/* Daily editions — collapsed by month, newest open */}
      <section className="border-t border-[var(--rule)] py-20">
        <Container>
          <SectionHead
            as="h2"
            title={<>The <em>daily</em> archive.</>}
            meta={`${dailies.length} editions`}
          />
          <Deck className="mt-6 mb-10 max-w-[620px] text-[1.125rem]">
            Every confirmed release, day by day. The newest month is open;
            the rest unfold on demand.
          </Deck>
          <DailyArchive />
        </Container>
      </section>

      {/* Subscribe — the foot of the hub, and the target of the top CTA */}
      <section
        id="subscribe"
        className="scroll-mt-24 border-t border-[var(--rule)] py-20"
      >
        <Container>
          <div className="mx-auto max-w-[620px] text-center">
            <Kicker dot>Stay on the frontier</Kicker>
            <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4vw,2.75rem)]">
              Get <em className="italic text-id8-orange">Shipped.</em> in your
              inbox.
            </h2>
            <Deck className="mt-5">
              The daily digest lands at 9 PM ET. The weekly issue lands Friday
              at 9 AM ET. Six labs, one feed.
            </Deck>
            <div className="mt-8">
              <SubscribeForm
                source="shipped-hub"
                buttonLabel="Subscribe"
                successText="You’re in. The next issue lands Friday, 9 AM ET."
                cadences={['nightly', 'weekly']}
                note="No spam. One-click unsubscribe in every email."
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
