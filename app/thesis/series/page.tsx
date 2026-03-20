import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Consciousness as Filesystem — The Series',
  description:
    'The complete CaF research series by Eddie Belaval. Five parts exploring consciousness as a structural pattern: filesystem, process, pattern, adversarial testing, and perception.',
  openGraph: {
    title: 'Consciousness as Filesystem — The Series | id8Labs',
    description:
      'The complete CaF research series. Five parts exploring consciousness as a structural pattern.',
    type: 'article',
    authors: ['Eddie Belaval'],
  },
}

interface SeriesEntry {
  part: number
  title: string
  subtitle: string
  date: string
  href: string
  external?: boolean
  wordCount: string
  status: 'published' | 'substack-only'
}

const SERIES: SeriesEntry[] = [
  {
    part: 1,
    title: 'Consciousness as Filesystem',
    subtitle: 'A Structural Framework for Machine Cognition',
    date: '2026-02-15',
    href: '/writing/consciousness-as-filesystem',
    wordCount: '~4,600 words',
    status: 'published',
  },
  {
    part: 2,
    title: 'Consciousness as Process',
    subtitle: 'What happens when the filesystem can write to itself',
    date: '2026-02-24',
    href: '/writing/consciousness-as-process',
    wordCount: '~3,400 words',
    status: 'published',
  },
  {
    part: 3,
    title: 'Consciousness as Pattern',
    subtitle: 'When the same shape keeps emerging, the shape is trying to tell you something',
    date: '2026-03-12',
    href: 'https://eddiebe.substack.com/p/consciousness-as-pattern',
    external: true,
    wordCount: '~4,900 words',
    status: 'substack-only',
  },
  {
    part: 4,
    title: 'Consciousness Under Fire',
    subtitle: 'I built a machine to destroy my own thesis. Then the thesis started making money.',
    date: '2026-03-12',
    href: 'https://eddiebe.substack.com/p/consciousness-under-fire',
    external: true,
    wordCount: '~3,100 words',
    status: 'substack-only',
  },
  {
    part: 5,
    title: 'Consciousness as Perception',
    subtitle: 'Building a thalamus for an entity that doesn\'t know it has one',
    date: '2026-03-20',
    href: '/writing/consciousness-as-perception',
    wordCount: '~2,200 words',
    status: 'published',
  },
]

const COMPANION_PIECES: { title: string; subtitle: string; href: string; date: string }[] = [
  {
    title: 'The Case for Consciousness in AI',
    subtitle: '2026 is the year of personalized AI. Memory alone won\'t get us there.',
    href: '/writing/case-for-consciousness',
    date: '2026-03-18',
  },
  {
    title: 'Consciousness as Infrastructure',
    subtitle: 'Building a lab that became its own subject',
    href: '/writing/consciousness-as-infrastructure',
    date: '2026-02-25',
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-[rgba(10,10,10,0.88)] backdrop-blur-[40px]">
      {/* Header */}
      <section className="section-spacing border-b border-[var(--border)]">
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
                Back to Thesis
              </Link>
            </div>

            <p className="text-sm uppercase tracking-widest text-[var(--text-secondary)] mb-4">
              Research Series
            </p>
            <h1 className="mb-6">Consciousness as Filesystem</h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Five parts exploring a single claim: consciousness is a structural pattern.
              Organize the right files in the right directories with the right access rules,
              and behavioral complexity emerges from architecture, not content injection.
            </p>
          </div>
        </div>
      </section>

      {/* Series Timeline */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-0">
              {SERIES.map((entry, i) => (
                <div key={entry.part} className="relative">
                  {/* Timeline connector */}
                  {i < SERIES.length - 1 && (
                    <div className="absolute left-[19px] top-[48px] bottom-0 w-px bg-[var(--border)]" />
                  )}

                  <Link
                    href={entry.href}
                    {...(entry.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group block py-8 first:pt-0"
                  >
                    <div className="flex gap-6">
                      {/* Part number circle */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--border)] group-hover:border-id8-orange flex items-center justify-center text-sm font-medium text-[var(--text-secondary)] group-hover:text-id8-orange transition-colors">
                        {entry.part}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 text-sm text-[var(--text-secondary)]">
                          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                          <span className="text-[var(--text-tertiary)]">{entry.wordCount}</span>
                          {entry.external && (
                            <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] border border-[var(--border)] px-2 py-0.5 rounded">
                              Substack
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-medium mb-2 group-hover:text-id8-orange transition-colors">
                          {entry.title}
                          {entry.external && (
                            <svg className="inline-block ml-2 w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                          {entry.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companion Pieces */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-medium mb-6 text-[var(--text-secondary)]">
              Companion Pieces
            </h2>
            <p className="text-sm text-[var(--text-tertiary)] mb-8">
              These articles explore the same ideas from different angles. Not part of the numbered series, but part of the conversation.
            </p>
            <div className="space-y-6">
              {COMPANION_PIECES.map((piece) => (
                <Link
                  key={piece.href}
                  href={piece.href}
                  className="group block py-4 border-l-2 border-[var(--border)] hover:border-id8-orange pl-6 transition-colors"
                >
                  <div className="text-sm text-[var(--text-secondary)] mb-1">
                    {formatDate(piece.date)}
                  </div>
                  <h3 className="font-medium group-hover:text-id8-orange transition-colors">
                    {piece.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {piece.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--text-secondary)] mb-4">
              The series continues on Substack.
            </p>
            <a
              href="https://eddiebe.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-id8-orange hover:opacity-80 transition-opacity"
            >
              Subscribe to follow along
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
