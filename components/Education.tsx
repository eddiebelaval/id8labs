import Link from 'next/link'
import { Container, Kicker, Deck, Tag } from '@/components/editorial'

const learningPaths = [
  {
    title: 'AI Foundations',
    description: 'Start here. Learn how to think about AI before touching any tools.',
    badge: 'Free',
    free: true,
    courses: [
      { name: 'AI Conversation Fundamentals', duration: '45 min', href: '/courses/ai-conversation-fundamentals' },
      { name: 'Prompt Engineering for Creators', duration: '9 modules', href: '/academy/prompt-engineering-creators', isNew: true },
    ],
  },
  {
    title: 'Claude Mastery',
    description: 'Go from casual user to power user. Build real workflows.',
    badge: 'Free',
    free: true,
    courses: [
      { name: 'Claude Code for Knowledge Workers', duration: '10 modules', href: '/courses/claude-for-knowledge-workers' },
    ],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-24 scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24 items-start">
          {/* Left - Sticky Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker className="mb-4">The Academy</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              Learn the <em className="italic font-normal text-id8-orange">approach</em>
            </h2>
            <Deck>
              From free foundations to live training. Learn to build with AI the way I do.
            </Deck>
          </div>

          {/* Right - Learning Paths */}
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <div
                key={path.title}
                className="border border-[var(--hair)] p-7 transition-colors duration-200 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="mb-1 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-2xl">
                      {path.title}
                    </h3>
                    <p className="text-[var(--body)]">{path.description}</p>
                  </div>
                  {path.free ? (
                    <span className="shrink-0 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
                      {path.badge}
                    </span>
                  ) : (
                    <Tag>{path.badge}</Tag>
                  )}
                </div>

                {/* Courses */}
                <div className="border-t border-[var(--hair)] pt-2">
                  {path.courses.map((course) => (
                    <Link
                      key={course.name}
                      href={course.href}
                      className="flex items-center justify-between gap-4 py-2.5 transition-colors hover:text-id8-orange"
                    >
                      <span className="flex items-center gap-3">
                        {course.isNew && (
                          <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--teal)]">
                            New
                          </span>
                        )}
                        <span className="font-medium text-[var(--ink)]">{course.name}</span>
                      </span>
                      <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        {course.duration}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/academy"
                className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange transition-colors hover:text-[var(--ink)]"
              >
                View all courses &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
