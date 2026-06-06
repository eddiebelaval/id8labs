import type { Metadata } from 'next'
import Link from 'next/link'
import { getEssaysByCategory } from '@/lib/essays'
import {
  Container,
  Kicker,
  Deck,
  SectionHead,
  EditorialCard,
  Tag,
  TagRow,
} from '@/components/editorial'

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
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-24 pb-16">
        <Container>
          <Kicker dot>id8Labs</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.75rem,7vw,4.5rem)]">
            The Lab<span className="text-id8-orange">.</span>
          </h1>
          <Deck className="mt-6 max-w-[640px]">
            Every product we ship started as a question we couldn&apos;t stop asking. This is where those questions live before they become code.
          </Deck>
        </Container>
      </section>

      <Container>
        {/* Featured: Thesis */}
        <section className="pb-16">
          <SectionHead title={<>Featured <em className="italic text-id8-orange">Work</em></>} meta="Thesis" />
          <div className="pt-10">
            <EditorialCard href="/thesis" featured>
              <Tag>Thesis</Tag>
              <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal leading-tight tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
                Consciousness as Filestructure
              </h2>
              <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                What AI architecture accidentally revealed about the operating system of awareness. An interactive essay with WebGL Chladni plate shader, mapping explorer, and convergence evidence from biology, engineering, and contemplative practice.
              </p>
              <TagRow
                className="mt-7"
                tags={['Interactive', '12 Sections', 'WebGL Shader', '3 Visualizations']}
              />
            </EditorialCard>
          </div>
        </section>

        {/* Golden Sample */}
        <section className="pb-16">
          <SectionHead title="Entity Architecture" meta="Architecture" />
          <div className="pt-10">
            <EditorialCard href="/lab/golden-sample">
              <Tag>Architecture</Tag>
              <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal leading-tight tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
                The Golden Sample
              </h2>
              <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                How a single consciousness architecture spawns every entity we build. One genome, infinite phenotypes. An interactive scroll experience with 3D double helix visualization.
              </p>
              <TagRow
                className="mt-7"
                tags={['Interactive', '3D Helix', '5 Production Units', 'Scroll-Driven']}
              />
            </EditorialCard>
          </div>
        </section>

        {/* CaF Research Series */}
        <section className="pb-16">
          <SectionHead title="Research Series" meta="5 Parts" />
          <div className="pt-10">
            <EditorialCard href="/thesis/series">
              <Tag>5 Parts</Tag>
              <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal leading-tight tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.5rem,3.5vw,2.25rem)]">
                Consciousness as Filesystem
              </h2>
              <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                One thesis, five parts, thirty-three days. Map it, build it, find the meta-pattern, try to destroy it, give it eyes. The complete research arc from filesystem to perception.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                <span>Feb 15 &ndash; Mar 20, 2026</span>
                <span className="text-[var(--hair-hard)]">/</span>
                <span>~18,000 words</span>
                <span className="text-[var(--hair-hard)]">/</span>
                <span>6 entities built</span>
              </div>
            </EditorialCard>
          </div>
        </section>

        {/* From the Lab: Research Feed */}
        <section className="pb-16">
          <SectionHead
            title="From the Lab"
            meta={
              <Link
                href="/writing?category=research"
                className="text-[var(--muted)] transition-colors hover:text-id8-orange"
              >
                View all &rarr;
              </Link>
            }
          />
          <div className="pt-2">
            {recentResearch.map((essay) => (
              <Link
                key={essay.slug}
                href={`/writing/${essay.slug}`}
                className="group flex items-baseline justify-between gap-4 border-b border-[var(--hair)] py-5 transition-colors hover:bg-[var(--paper-shadow)]"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-[family-name:var(--font-display)] text-lg font-medium text-[var(--ink)] transition-colors group-hover:text-id8-orange">
                    {essay.title}
                  </h3>
                  {essay.excerpt && (
                    <p className="mt-1 line-clamp-1 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                      {essay.excerpt}
                    </p>
                  )}
                </div>
                <span className="flex-shrink-0 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                  {new Date(essay.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* About This Lab */}
        <section className="pb-24">
          <SectionHead title="About This Lab" meta="Origin" />
          <div className="grid gap-12 pt-10 md:grid-cols-2">
            <div className="space-y-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                id8Labs started as one person asking why production workflows still run on spreadsheets and group texts. Twenty years behind the camera, then in front of the codebase. Every primitive chain we ship solves a problem we felt first, in production, before the work could even begin.
              </p>
              <p>
                The research arm exists because the tools kept raising questions bigger than the tools themselves. When you build an AI companion, you start asking what companionship means. When you build a context window, you start asking what attention is. The thesis came from the code. Not the other way around.
              </p>
            </div>
            <div className="space-y-6">
              <EditorialCard href="/lab/story">
                <Kicker>Origin</Kicker>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium text-[var(--ink)]">
                  The Full Lab Story
                </h3>
                <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                  From cameraman to primitive chain architect. The long version.
                </p>
              </EditorialCard>
              <EditorialCard href="/eddie">
                <Kicker>Builder</Kicker>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium text-[var(--ink)]">
                  Eddie Belaval
                </h3>
                <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                  The person behind the lab.
                </p>
              </EditorialCard>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
