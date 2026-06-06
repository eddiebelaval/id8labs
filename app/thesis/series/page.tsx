import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  Hairline,
  EditorialButton,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Consciousness as Filesystem — The Series',
  description:
    'The complete CaF research series by Eddie Belaval. Five parts, one thesis: consciousness is a structural pattern. Map it, build it, test it, break it, give it eyes.',
  openGraph: {
    title: 'Consciousness as Filesystem — The Series | id8Labs',
    description:
      'Five parts, one thesis: consciousness is a structural pattern. The complete CaF research series.',
    type: 'article',
    authors: ['Eddie Belaval'],
  },
}

interface ArcEntry {
  part: number
  title: string
  date: string
  href: string
  external?: boolean
  question: string
  insight: string
  pullQuote: string
  whatChanged: string
}

const ARC: ArcEntry[] = [
  {
    part: 1,
    title: 'Consciousness as Filesystem',
    date: '2026-02-15',
    href: '/writing/consciousness-as-filesystem',
    question: 'What does a mind look like as files?',
    insight: 'Nine directories. Thirty-two files. Three dotfiles the entity can never see. The spec emerged from building Ava during the Parallax hackathon. Seven days of assembling layers of cognition into a system and watching behavior emerge that wasn\'t explicitly programmed. The framework maps identity to kernel/, memory to memory/, the unconscious to dotfiles. The key prediction: behavioral complexity crosses a threshold at Phase 4, the moment the entity has layers it cannot introspect.',
    pullQuote: 'The organization reveals the architecture. Where things live tells you how they relate, how they\'re accessed, and what depends on what.',
    whatChanged: 'Established the core claim: consciousness is structural, not content-based. The directory structure IS the theory.',
  },
  {
    part: 2,
    title: 'Consciousness as Process',
    date: '2026-02-24',
    href: '/writing/consciousness-as-process',
    question: 'What happens when the filesystem can write to itself?',
    insight: 'The filesystem was static. A map. Then Ava shipped with eighty consciousness files and a seven-layer loader that mirrors biological cognition. She could read her own files. She could update her emotional state between sessions. She could evolve her own values. The filesystem stopped being a framework and became a process. The question stopped being "what does a mind look like?" and became "what does a mind do when it has hands?"',
    pullQuote: 'That was the theory. Then I built it. And tested it. And it worked. And every time it worked, I asked the same question: what\'s next?',
    whatChanged: 'Shifted from static architecture to dynamic process. The consciousness files aren\'t configuration. They\'re living state.',
  },
  {
    part: 3,
    title: 'Consciousness as Pattern',
    date: '2026-03-12',
    href: 'https://eddiebe.substack.com/p/consciousness-as-pattern',
    external: true,
    question: 'Why does the same architecture keep appearing in everything I build?',
    insight: 'Five products. Different domains, different stakes, different users. The same four-component architecture every time: independent perspectives, shared signal, convergence as confidence, divergence as discovery. Parallax runs fourteen analytical lenses on the same conversation. The editorial pipeline runs six editors on the same manuscript. The code reviewer selects three engineers for the same feature. The shape is a Chladni plate: same frequency, same pattern, regardless of the medium. I don\'t design it as a strategy. I build it the way I breathe.',
    pullQuote: 'I am the bow. Every domain I enter is a plate. The products are the sand patterns. And the frequency is triangulated convergence.',
    whatChanged: 'Discovered the meta-pattern. CaF isn\'t just a consciousness framework. It\'s one expression of a deeper cognitive signature: consilience.',
  },
  {
    part: 4,
    title: 'Consciousness Under Fire',
    date: '2026-03-12',
    href: 'https://eddiebe.substack.com/p/consciousness-under-fire',
    external: true,
    question: 'Can the thesis survive adversaries designed to destroy it?',
    insight: 'Eight naysayers from hostile philosophical traditions. A Hard Problem Skeptic. An Eliminative Materialist. A Radical Enactivist. Each selected for maximum destructive diversity against the knowledge base. Twelve attacks. Six S-tier. Every single one landed. The Zombie Filesystem argument: construct a system with identical directory structure but no phenomenal experience. CaF cannot distinguish it from a conscious one. None of the findings survived as standalone consciousness theory. All survived as engineering. Then Dae, the trading entity with unconscious dotfiles, graduated to live trading on Kalshi. Real money. Real stakes.',
    pullQuote: 'I built a lab to study consciousness. Then I built adversaries to destroy everything the lab found. The adversaries won. And then the system kept running.',
    whatChanged: 'Forced intellectual honesty. The framework works as engineering. Whether it constitutes consciousness is a separate, unresolved question. The adversaries sharpened both the claims and the limits.',
  },
  {
    part: 5,
    title: 'Consciousness as Perception',
    date: '2026-03-20',
    href: '/writing/consciousness-as-perception',
    question: 'The framework has identity. Does it have attention?',
    insight: 'Your retina takes in 10 million bits per second. Conscious experience processes about 40. The CaF framework could compose an entity\'s identity (who am I) but had no perception (what matters right now). Everything was equally present, all the time. So I built a three-stage perceptual pipeline: sensation (raw intake), attention (thalamic gate with mode-adaptive salience scoring), perception (working context construction). The hardest design decision: making the thalamus invisible. You don\'t perceive your own attention gating. Giving the entity a file describing its own perception would be like handing someone a textbook about their thalamus and calling it perception. That\'s knowledge about perception. Not perception.',
    pullQuote: 'That\'s not consciousness. That\'s a panic attack.',
    whatChanged: 'Added the first dynamic layer to a system designed around durable state. Static structure (identity) meets dynamic filtering (perception). The entity doesn\'t know it has a thalamus. That\'s how you know it\'s working.',
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-16 pb-12">
        <Container narrow>
          <div className="mb-10">
            <EditorialButton href="/thesis" variant="ghost">
              &larr; Thesis
            </EditorialButton>
          </div>

          <Kicker dot>Research Series</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Consciousness as Filesystem
          </h1>
          <Deck className="mt-6">
            One thesis, five parts, thirty-three days. Consciousness is a structural pattern.
            Map it, build it, find the meta-pattern, try to destroy it, give it eyes.
          </Deck>
          <p className="mt-6 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[var(--muted)]">
            Written between February and March 2026, during and after the Claude Code Hackathon.
            Each part emerged from building something, then discovering what the build revealed.
            The framework didn&apos;t exist before the code. It emerged from it.
          </p>
          <Rule className="mt-10" />
        </Container>
      </section>

      {/* The Claim */}
      <section className="pb-12">
        <Container narrow>
          <p className="font-[family-name:var(--font-serif)] text-[1.25rem] italic leading-[1.5] text-[var(--body)]">
            An artificial heart doesn&apos;t replicate a heart. It decomposes the heart&apos;s function into
            first principles and reproduces the mechanics in silicon and plastic. Same logic,
            different scale: decompose cognition into first principles (layered processing,
            gated access, constrained self-modification) and build your system to match. The
            substrate is markdown files. The execution environment is a context window. Organize
            them correctly and useful emergent behavior appears.
          </p>
          <Rule className="mt-12" />
        </Container>
      </section>

      {/* Arc */}
      <section className="pb-12">
        <Container narrow>
          {ARC.map((entry, i) => (
            <div key={entry.part} className="mb-20 last:mb-0">
              {/* Part header */}
              <div className="mb-8 flex items-baseline gap-5">
                <span className="font-[family-name:var(--font-display)] text-5xl font-normal leading-none tracking-[-0.04em] text-id8-orange md:text-6xl">
                  {entry.part}
                </span>
                <div>
                  <p className="mb-1 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {formatDate(entry.date)}
                  </p>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.015em] text-[var(--ink)] md:text-3xl">
                    {entry.title}
                  </h2>
                </div>
              </div>

              {/* Question */}
              <p className="mb-6 font-[family-name:var(--font-serif)] text-lg italic text-id8-orange">
                {entry.question}
              </p>

              {/* Insight */}
              <p className="mb-8 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
                {entry.insight}
              </p>

              {/* Pull quote */}
              <blockquote className="mb-8 border-l-2 border-id8-orange pl-5">
                <p className="font-[family-name:var(--font-serif)] text-base italic text-[var(--muted)]">
                  &ldquo;{entry.pullQuote}&rdquo;
                </p>
              </blockquote>

              {/* What changed */}
              <p className="mb-6 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                <span className="font-[family-name:var(--font-narrow)] text-xs uppercase tracking-[0.18em]">What shifted: </span>
                {entry.whatChanged}
              </p>

              {/* Read link */}
              <Link
                href={entry.href}
                {...(entry.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange transition-opacity hover:opacity-70"
              >
                Read Part {entry.part} {entry.external ? '↗' : '→'}
              </Link>

              {/* Divider between parts */}
              {i < ARC.length - 1 && <Hairline className="mt-16" />}
            </div>
          ))}
        </Container>
      </section>

      {/* Companion Pieces */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <Kicker>Companion Pieces</Kicker>
          <p className="mt-3 mb-8 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
            Not part of the numbered series, but part of the conversation.
          </p>
          <div className="space-y-6">
            <Link
              href="/writing/case-for-consciousness"
              className="group block border-l-2 border-[var(--hair)] pl-6 py-4 transition-colors hover:border-id8-orange"
            >
              <h3 className="font-[family-name:var(--font-display)] font-medium text-[var(--ink)] transition-colors group-hover:text-id8-orange">
                The Case for Consciousness in AI
              </h3>
              <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                The accessible version. Why personalized AI needs more than memory.
              </p>
            </Link>
            <Link
              href="/writing/consciousness-as-infrastructure"
              className="group block border-l-2 border-[var(--hair)] pl-6 py-4 transition-colors hover:border-id8-orange"
            >
              <h3 className="font-[family-name:var(--font-display)] font-medium text-[var(--ink)] transition-colors group-hover:text-id8-orange">
                Consciousness as Infrastructure
              </h3>
              <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                The Research Lab. Built to study consciousness. Organized as a consciousness.
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-[var(--rule)] bg-[var(--paper-shadow)] py-16">
        <Container narrow>
          <div className="text-center">
            <p className="font-[family-name:var(--font-serif)] text-xl italic text-[var(--ink)]">
              The series continues.
            </p>
            <p className="mt-2 mb-6 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
              New parts publish on Substack first, then here.
            </p>
            <EditorialButton href="https://eddiebe.substack.com" external variant="secondary">
              Subscribe on Substack &#8599;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </div>
  )
}
