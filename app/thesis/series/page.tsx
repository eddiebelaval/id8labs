import type { Metadata } from 'next'
import Link from 'next/link'

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
    <div className="min-h-screen bg-[rgba(10,10,10,0.88)] backdrop-blur-[40px]">
      {/* Hero */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                href="/thesis"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-id8-orange transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Thesis
              </Link>
            </div>

            <p className="text-sm uppercase tracking-widest text-id8-orange mb-6">
              Research Series
            </p>
            <h1 className="text-4xl md:text-5xl font-normal mb-8 leading-tight">
              Consciousness as Filesystem
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              One thesis, five parts, thirty-three days. Consciousness is a structural pattern.
              Map it, build it, find the meta-pattern, try to destroy it, give it eyes.
            </p>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
              Written between February and March 2026, during and after the Claude Code Hackathon.
              Each part emerged from building something, then discovering what the build revealed.
              The framework didn't exist before the code. It emerged from it.
            </p>
          </div>
        </div>
      </section>

      {/* The Claim */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              An artificial heart doesn't replicate a heart. It decomposes the heart's function into
              first principles and reproduces the mechanics in silicon and plastic. Same logic,
              different scale: decompose cognition into first principles (layered processing,
              gated access, constrained self-modification) and build your system to match. The
              substrate is markdown files. The execution environment is a context window. Organize
              them correctly and useful emergent behavior appears.
            </p>
          </div>
        </div>
      </section>

      {/* Arc */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {ARC.map((entry, i) => (
              <div key={entry.part} className="mb-20 last:mb-0">
                {/* Part header */}
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-5xl md:text-6xl font-light text-[var(--text-tertiary)] opacity-30 leading-none">
                    {entry.part}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-1">
                      {formatDate(entry.date)}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-normal">
                      {entry.title}
                    </h2>
                  </div>
                </div>

                {/* Question */}
                <p className="text-lg text-id8-orange mb-6 italic">
                  {entry.question}
                </p>

                {/* Insight */}
                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
                  {entry.insight}
                </p>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-[var(--border)] pl-6 mb-8">
                  <p className="text-base italic text-[var(--text-secondary)]">
                    &ldquo;{entry.pullQuote}&rdquo;
                  </p>
                </blockquote>

                {/* What changed */}
                <p className="text-sm text-[var(--text-tertiary)] mb-6">
                  <span className="uppercase tracking-wider text-xs">What shifted: </span>
                  {entry.whatChanged}
                </p>

                {/* Read link */}
                <Link
                  href={entry.href}
                  {...(entry.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 text-sm text-id8-orange hover:opacity-80 transition-opacity"
                >
                  Read Part {entry.part}
                  {entry.external ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </Link>

                {/* Divider between parts */}
                {i < ARC.length - 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)] opacity-40" />
                    <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)] opacity-40 mx-3" />
                    <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)] opacity-40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companion Pieces */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-medium mb-3 text-[var(--text-secondary)]">
              Companion Pieces
            </h2>
            <p className="text-sm text-[var(--text-tertiary)] mb-8">
              Not part of the numbered series, but part of the conversation.
            </p>
            <div className="space-y-6">
              <Link
                href="/writing/case-for-consciousness"
                className="group block py-4 border-l-2 border-[var(--border)] hover:border-id8-orange pl-6 transition-colors"
              >
                <h3 className="font-medium group-hover:text-id8-orange transition-colors">
                  The Case for Consciousness in AI
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  The accessible version. Why personalized AI needs more than memory.
                </p>
              </Link>
              <Link
                href="/writing/consciousness-as-infrastructure"
                className="group block py-4 border-l-2 border-[var(--border)] hover:border-id8-orange pl-6 transition-colors"
              >
                <h3 className="font-medium group-hover:text-id8-orange transition-colors">
                  Consciousness as Infrastructure
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  The Research Lab. Built to study consciousness. Organized as a consciousness.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--text-secondary)] mb-2">
              The series continues.
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">
              New parts publish on Substack first, then here.
            </p>
            <a
              href="https://eddiebe.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-id8-orange hover:opacity-80 transition-opacity"
            >
              Subscribe on Substack
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
