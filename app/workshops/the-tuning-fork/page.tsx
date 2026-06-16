import type { Metadata } from 'next'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
  Pipeline,
} from '@/components/editorial'
import { WorkshopRegistrationForm } from '@/components/workshops/WorkshopRegistrationForm'
import { THE_TUNING_FORK_I, formatPrice, schedulingSummary } from '@/lib/workshops'

const workshop = THE_TUNING_FORK_I

export const metadata: Metadata = {
  title: 'The Tuning Fork I — Workshop',
  description: workshop.deck,
  openGraph: {
    title: 'The Tuning Fork I — Workshop | ID8Labs',
    description: workshop.deck,
    url: 'https://id8labs.app/workshops/the-tuning-fork',
    siteName: 'ID8Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Tuning Fork I — Workshop | ID8Labs',
    description: workshop.deck,
  },
}

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function TheTuningForkPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">

      {/* ── 1. HERO ───────────────────────────────────── */}
      <section className="border-b border-[var(--hair)]">
        <Container>
          <div className="max-w-4xl pt-28 pb-16 md:pt-36 md:pb-20">
            <Kicker dot className="mb-5">
              Workshop · Inaugural edition
            </Kicker>
            {/* Heading mirrors workshop.name — em on the edition numeral. */}
            <h1 className="mb-7 font-[family-name:var(--font-display)] font-normal leading-[0.98] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.75rem,6.2vw,5.5rem)]">
              The Tuning Fork <em className="italic font-normal text-id8-orange">I</em>
            </h1>
            <Deck className="mb-9 max-w-2xl">{workshop.deck}</Deck>
            <div className="mb-10 flex flex-col gap-3.5 sm:flex-row">
              <EditorialButton href="#register">
                Register your interest
                <ArrowRightIcon />
              </EditorialButton>
              <EditorialButton href="/writing/the-ai-workshop" variant="ghost">
                Read: The AI Workshop
              </EditorialButton>
            </div>
            <Rule className="mb-6" />
            <MetaRow
              items={[
                { label: 'Hybrid — Miami or remote' },
                { label: `${workshop.seats} seats` },
                { label: formatPrice(workshop) },
                { label: workshop.duration },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ── 2. WHAT IT IS ──────────────────────────────── */}
      <section className="py-20 md:py-24">
        <Container narrow>
          <SectionHead
            title={<>A tuning fork sets a <em className="italic">true</em> reference.</>}
            meta="The idea"
          />
          <div className="mt-10 space-y-6">
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              Strike a tuning fork and it gives you one true pitch to tune everything else against. Most operations
              have lost theirs — the work drifts, every person does it a little differently, and nothing stays
              consistent as you grow.
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">The Tuning Fork</span> is a
              working session, not a lecture. In one room we find the reference your business should run against, then
              tune your first workflow to it — designed as a primitive chain with human gates, the same way we build
              when we deploy <span className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">HALO</span>{' '}
              inside a business. You leave with a plan you could build from on Monday.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 3. AGENDA ──────────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>The <em className="italic">half day</em>, in four moves.</>}
            meta="What we do"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {workshop.agenda.map((item, i) => (
              <EditorialCard key={i}>
                <span className="mb-5 block font-[family-name:var(--font-mono)] text-xs tabular-nums text-[var(--muted)]">
                  {`0${i + 1}`}
                </span>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg font-normal leading-snug tracking-[-0.01em] text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--body)]">{item.body}</p>
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. WHO IT'S FOR ────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container narrow>
          <SectionHead title={<>Who&apos;s in the <em className="italic">room</em>.</>} meta="Fit" />
          <ul className="mt-10 space-y-px overflow-hidden rounded-[13px] border border-[var(--hair)] bg-[var(--hair)]">
            {workshop.forWhom.map((who, i) => (
              <li key={i} className="flex items-start gap-4 bg-[var(--paper)] px-6 py-5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-id8-orange" />
                <span className="text-[1.0625rem] leading-[1.6] text-[var(--body)]">{who}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 5. HOW BOOKING WORKS ───────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>How a seat <em className="italic">opens</em>.</>}
            meta="Booking"
          />
          <Deck className="mt-8 mb-12 max-w-2xl">{schedulingSummary(workshop)}</Deck>
          <Pipeline
            title="From interest to your seat"
            steps={[
              { label: '01 Register interest' },
              { label: '02 We talk', human: true },
              { label: '03 Seat confirmed' },
              { label: `04 The room runs at ${workshop.seats}` },
            ]}
          />
        </Container>
      </section>

      {/* ── 6. REGISTER ────────────────────────────────── */}
      <section id="register" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container narrow>
          <div className="mb-12 text-center">
            <Kicker dot className="mb-5 justify-center">
              Register your interest
            </Kicker>
            <h2 className="mb-5 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)]">
              Pull up a <em className="italic text-id8-orange">chair</em>
            </h2>
            <p className="mx-auto max-w-md text-[1.0625rem] leading-[1.6] text-[var(--body)]">
              The first cohort is capped at {workshop.seats}. Tell me a little about your operation and I&apos;ll
              confirm your seat and the date directly. No payment until we&apos;ve talked.
            </p>
          </div>
          <WorkshopRegistrationForm
            workshopSlug={workshop.slug}
            workshopName={workshop.name}
            askAttendance={workshop.format === 'hybrid'}
          />
          <p className="mt-8 text-center font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            Prefer email? Reach me at{' '}
            <a
              href="mailto:eb@id8labs.tech"
              className="text-[var(--ink)] underline decoration-[var(--hair)] underline-offset-2 transition-colors hover:decoration-id8-orange"
            >
              eb@id8labs.tech
            </a>
          </p>
        </Container>
      </section>

    </div>
  )
}
