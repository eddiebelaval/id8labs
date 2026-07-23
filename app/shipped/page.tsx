import type { Metadata } from 'next'
import {
  getAllShippedIssues,
  getShippedIssueHref,
} from '@/lib/shipped/issues'
import { SHIPPED_DAILIES } from '@/lib/shipped/dailies.data'
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

export const metadata: Metadata = {
  title: 'Shipped. | ID8Labs',
  description:
    'The magazine on what the AI labs ship. Weekly issues and the daily edition archive — every confirmed Anthropic release, organized to read by issue.',
  openGraph: {
    title: 'Shipped. | id8Labs',
    description:
      'The magazine on what the AI labs ship. Weekly issues and the daily edition archive.',
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

/** UTC-safe formatter for the weekly issue date column. */
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
  const dailies = SHIPPED_DAILIES
  const latestDaily = dailies[0]

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-12">
        <Container>
          <Kicker dot>The Magazine</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            Shipped<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[660px]">
            The magazine on what the AI labs ship. The weekly issues are the
            marquee read; the daily editions log every confirmed Anthropic
            release as it lands. All of it, organized to go through by issue.
          </Deck>
          <MetaRow
            className="mt-8"
            items={[
              { value: String(issues.length), label: 'Weekly issues' },
              { value: String(dailies.length), label: 'Daily editions' },
              {
                value: latestDaily ? formatDate(latestDaily.date) : '—',
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

      {/* Weekly issues — the marquee editions */}
      <section className="pb-20">
        <Container>
          <SectionHead
            as="h2"
            title={<>The <em>weekly</em> issues.</>}
            meta="Marquee editions"
          />
          <Deck className="mt-6 mb-2 max-w-[620px] text-[1.125rem]">
            Three weeks of hindsight in one read — the signal pulled out of the
            noise and shaped into a single issue.
          </Deck>
          <div className="mt-4">
            {issues.map((issue) => (
              <IssueCard
                key={issue.issueNumber}
                href={getShippedIssueHref(issue.issueNumber)}
                number={issue.issueNumber}
                title={issue.title}
                deck={issue.subtitle || issue.excerpt}
                tags={issue.tags}
                date={formatDate(issue.date)}
                label={issue.readTime}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Daily editions — grouped by week */}
      <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-20">
        <Container>
          <SectionHead
            as="h2"
            title={<>The <em>daily</em> editions.</>}
            meta="The archive"
          />
          <Deck className="mt-6 mb-10 max-w-[620px] text-[1.125rem]">
            Every confirmed Anthropic release, day by day, grouped into weekly
            issues. Newest first.
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
