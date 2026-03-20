import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Where id8Labs does the thinking. Thesis, research, and the story behind what we build.',
}

const labItems = [
  {
    title: 'Thesis',
    subtitle: 'Consciousness as Filestructure',
    description: 'What AI architecture accidentally revealed about the operating system of awareness. Interactive essay with Chladni plate shader.',
    href: '/thesis',
    tag: 'Featured',
    tagColor: 'bg-[var(--id8-orange)] text-white',
  },
  {
    title: 'Lab Story',
    subtitle: 'How We Got Here',
    description: 'From cameraman to systems architect. Twenty years in production, now building tools for creators and infrastructure for builders.',
    href: '/lab/story',
    tag: 'Origin',
    tagColor: 'bg-[var(--accent-green)] text-white',
  },
  {
    title: 'Research',
    subtitle: 'Published Research and Deep Dives',
    description: 'Consciousness as infrastructure, agent-native pipelines, and everything we publish from the lab.',
    href: '/writing?category=research',
    tag: 'Ongoing',
    tagColor: 'bg-[var(--accent-blue)] text-white',
  },
]

export default function LabPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-4">
            id8Labs
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The Lab.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Where the thinking happens. Thesis work, published research, and the story behind what we build. Everything here started as a question we couldn&apos;t stop asking.
          </p>
        </div>

        {/* Lab Items */}
        <div className="space-y-6">
          {labItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border border-[var(--border)] rounded-lg p-8 hover:border-[var(--id8-orange)] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold group-hover:text-[var(--id8-orange)] transition-colors">
                      {item.title}
                    </h2>
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[var(--text-tertiary)]">
                    {item.subtitle}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--id8-orange)] group-hover:translate-x-1 transition-all flex-shrink-0 mt-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--text-tertiary)] font-mono">
            More coming from the lab. Follow the work on{' '}
            <Link href="/writing" className="text-[var(--id8-orange)] hover:underline">
              Writing
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
