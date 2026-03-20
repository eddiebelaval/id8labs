import type { Metadata } from 'next'
import Link from 'next/link'
import { getEssaysByCategory } from '@/lib/essays'

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Where id8Labs does the thinking. Thesis, research, and the story behind what we build.',
}

export default function LabPage() {
  const researchEssays = getEssaysByCategory('research')
  const recentResearch = researchEssays
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Hero */}
        <div className="mb-24">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-4">
            id8Labs
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            The Lab.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Every product we ship started as a question we couldn&apos;t stop asking. This is where those questions live before they become code.
          </p>
        </div>

        {/* Featured: Thesis */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--id8-orange)]" />
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
              Featured Work
            </p>
          </div>

          <Link
            href="/thesis"
            className="group block border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--id8-orange)] transition-all duration-500"
          >
            <div className="p-10 md:p-14">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[var(--id8-orange)] text-white rounded mb-4">
                    Thesis
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold group-hover:text-[var(--id8-orange)] transition-colors leading-tight">
                    Consciousness as Filestructure
                  </h2>
                </div>
                <svg
                  className="w-6 h-6 text-[var(--text-tertiary)] group-hover:text-[var(--id8-orange)] group-hover:translate-x-2 transition-all flex-shrink-0 mt-3"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
                What AI architecture accidentally revealed about the operating system of awareness. An interactive essay with WebGL Chladni plate shader, mapping explorer, and convergence evidence from biology, engineering, and contemplative practice.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Interactive', '12 Sections', 'WebGL Shader', '3 Visualizations'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[11px] font-mono tracking-wide border border-[var(--border)] rounded-full text-[var(--text-tertiary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </section>

        {/* CaF Research Series */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]" />
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
              Research Series
            </p>
          </div>

          <Link
            href="/thesis/series"
            className="group block border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--id8-orange)] transition-all duration-500"
          >
            <div className="p-10 md:p-14">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border border-[var(--border)] text-[var(--text-tertiary)] rounded mb-4">
                    5 Parts
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold group-hover:text-[var(--id8-orange)] transition-colors leading-tight">
                    Consciousness as Filesystem
                  </h2>
                </div>
                <svg
                  className="w-6 h-6 text-[var(--text-tertiary)] group-hover:text-[var(--id8-orange)] group-hover:translate-x-2 transition-all flex-shrink-0 mt-3"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
                One thesis, five parts, thirty-three days. Map it, build it, find the meta-pattern, try to destroy it, give it eyes. The complete research arc from filesystem to perception.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-tertiary)]">
                <span>Feb 15 &ndash; Mar 20, 2026</span>
                <span className="text-[var(--border)]">/</span>
                <span>~18,000 words</span>
                <span className="text-[var(--border)]">/</span>
                <span>6 entities built</span>
              </div>
            </div>
          </Link>
        </section>

        {/* From the Lab: Research Feed */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
                From the Lab
              </p>
            </div>
            <Link
              href="/writing?category=research"
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--id8-orange)] transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="space-y-1">
            {recentResearch.map((essay) => (
              <Link
                key={essay.slug}
                href={`/writing/${essay.slug}`}
                className="group flex items-baseline justify-between gap-4 py-4 border-b border-[var(--border)] hover:border-[var(--id8-orange)] transition-colors"
              >
                <div className="min-w-0">
                  <h3 className="text-base font-medium group-hover:text-[var(--id8-orange)] transition-colors truncate">
                    {essay.title}
                  </h3>
                  {essay.excerpt && (
                    <p className="text-sm text-[var(--text-tertiary)] mt-1 line-clamp-1">
                      {essay.excerpt}
                    </p>
                  )}
                </div>
                <span className="text-xs font-mono text-[var(--text-tertiary)] flex-shrink-0">
                  {new Date(essay.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* About This Lab */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)]" />
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
              About This Lab
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                id8Labs started as one person asking why production workflows still run on spreadsheets and group texts. Twenty years behind the camera, then in front of the codebase. Every tool we ship solves a problem we felt first.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The research arm exists because the tools kept raising questions bigger than the tools themselves. When you build an AI companion, you start asking what companionship means. When you build a context window, you start asking what attention is. The thesis came from the code. Not the other way around.
              </p>
            </div>
            <div className="space-y-6">
              <Link
                href="/lab/story"
                className="group block p-6 border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all"
              >
                <p className="text-sm font-mono text-[var(--text-tertiary)] mb-2">Origin</p>
                <h3 className="text-lg font-bold group-hover:text-[var(--id8-orange)] transition-colors">
                  The Full Lab Story
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  From cameraman to systems architect. The long version.
                </p>
              </Link>
              <Link
                href="/eddie"
                className="group block p-6 border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all"
              >
                <p className="text-sm font-mono text-[var(--text-tertiary)] mb-2">Builder</p>
                <h3 className="text-lg font-bold group-hover:text-[var(--id8-orange)] transition-colors">
                  Eddie Belaval
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  The person behind the lab.
                </p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
