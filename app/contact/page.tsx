import type { Metadata } from 'next'
import { Container, Kicker, Deck, Rule, SectionHead, MetaRow } from '@/components/editorial'
import BookCallCard from '@/components/BookCallCard'

export const metadata: Metadata = {
  title: 'Contact - ID8Labs',
  description: 'Get in touch with ID8Labs. Custom builds, collaborations, or just saying hi.',
}

const intents = [
  {
    id: 'build',
    title: 'Build Something',
    description: 'Need a custom agent system, CLI tool, or automation workflow? Let\'s talk scope.',
    cta: 'DM on X',
    href: 'https://x.com/eddiebe',
  },
  {
    id: 'collaborate',
    title: 'Collaborate',
    description: 'Partnership ideas, joint ventures, or collaboration on something you are building. I read every email.',
    cta: 'Send Email',
    href: 'mailto:eb@id8labs.tech?subject=Collaboration%20Inquiry',
  },
  {
    id: 'hello',
    title: 'Just Saying Hi',
    description: 'Following along, have a question, or want to share something interesting? I\'m around.',
    cta: 'Say Hi on X',
    href: 'https://x.com/eddiebe',
  },
]

interface Intent {
  id: string
  title: string
  description: string
  cta: string
  href: string
}

function IntentCard({ intent }: { intent: Intent }) {
  const isExternal = intent.href.startsWith('http')
  return (
    <a
      href={intent.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col border border-[var(--hair)] p-7 no-underline transition-colors duration-200 hover:border-[var(--hair-hard)] hover:bg-[var(--paper-shadow)]"
    >
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">
        {intent.title}
      </h2>
      <p className="mb-6 flex-grow text-[15px] leading-relaxed text-[var(--body)]">
        {intent.description}
      </p>
      <span className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-id8-orange">
        {intent.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  )
}

export default function ContactPage() {
  return (
    <Container>
      <div className="pt-28 pb-24 md:pt-36">
        {/* Header */}
        <Kicker dot className="mb-5">
          Contact · id8Labs
        </Kicker>
        <h1 className="mb-7 max-w-3xl font-[family-name:var(--font-display)] font-normal leading-[1.0] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)]">
          What brings you <em className="italic text-id8-orange">here?</em>
        </h1>
        <Deck className="mb-9 max-w-2xl">
          Different conversations need different channels. Pick what fits.
        </Deck>

        <Rule className="mb-12" />

        {/* Intent Cards + Cal embed */}
        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {intents.slice(0, 2).map((intent) => (
            <IntentCard key={intent.id} intent={intent} />
          ))}

          {/* Book a Call - Cal.com Embed (shared component) */}
          <BookCallCard />

          {/* Remaining intent cards */}
          {intents.slice(2).map((intent) => (
            <IntentCard key={intent.id} intent={intent} />
          ))}
        </div>

        {/* Response Expectations */}
        <section className="mb-20">
          <SectionHead title={<>Response <em className="italic">times</em></>} meta="Channels" />
          <MetaRow
            className="mt-8"
            items={[
              { value: 'Cal.com', label: 'Instant' },
              { value: 'X DMs', label: 'Usually <24h' },
              { value: 'Email', label: '1–2 days' },
            ]}
          />
        </section>

        {/* About Me */}
        <section className="mb-20">
          <SectionHead title={<>About <em className="italic">me</em></>} meta="Background" />
          <p className="mt-8 max-w-2xl font-[family-name:var(--font-serif)] text-xl italic leading-[1.5] text-[var(--body)]">
            15+ years in production. Cinematographer turned Story Producer turned Tech Builder.
          </p>
          <div className="mt-7">
            <a
              href="/eddie"
              className="inline-flex items-center gap-2.5 border border-[var(--ink)] bg-[var(--ink)] px-6 py-3.5 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--paper)] no-underline transition-colors duration-150 hover:border-id8-orange hover:bg-id8-orange"
            >
              View Full Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </section>

        <Rule className="mb-9" />

        {/* Direct Links */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Or just go direct
          </p>
          <a
            href="https://x.com/eddiebe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] no-underline transition-colors hover:text-id8-orange"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @eddiebe
          </a>
          <a
            href="mailto:eb@id8labs.tech"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] no-underline transition-colors hover:text-id8-orange"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            eb@id8labs.tech
          </a>
        </div>
      </div>
    </Container>
  )
}
