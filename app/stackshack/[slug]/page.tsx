import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ExternalLink, Github } from 'lucide-react'
import { getSkillBySlug, getAllSkills } from '@/lib/skills'
import { SkillInstallButton } from '@/components/skills/SkillInstallButton'
import {
  TrustBadges,
  VerifiedBadge,
  ComplexityBadge,
  QualityTierBadge,
} from '@/components/skills/TrustBadges'
import { CategoryBadge } from '@/components/skills/CategoryTabs'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillViewTracker } from './SkillViewTracker'
import { Container, Kicker, Deck, Rule, SectionHead } from '@/components/editorial'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const skill = await getSkillBySlug(slug)

    if (!skill) {
      return {
        title: 'Skill Not Found',
      }
    }

    return {
      title: skill.name,
      description: skill.description,
      openGraph: {
        title: `${skill.name} | StackShack`,
        description: skill.description,
        type: 'article',
      },
    }
  } catch (error) {
    console.error('[generateMetadata] Error:', error)
    return {
      title: 'Skill',
    }
  }
}

export async function generateStaticParams() {
  // In development, cookies() isn't available during static generation
  // Return empty array to fall back to dynamic rendering
  try {
    const skills = await getAllSkills({ limit: 100 })
    return skills.map((skill) => ({
      slug: skill.slug,
    }))
  } catch {
    // Fall back to dynamic rendering if static generation fails
    return []
  }
}

export default async function SkillDetailPage({
  params,
  basePath = '/stackshack',
}: PageProps & { basePath?: string }) {
  const { slug } = await params
  const skill = await getSkillBySlug(slug)

  if (!skill) {
    notFound()
  }

  // Get related skills from the same category
  const relatedSkills = await getAllSkills({
    category: skill.category_id || undefined,
    limit: 4,
  })
  const filteredRelated = relatedSkills.filter((s) => s.id !== skill.id).slice(0, 3)

  return (
    <main className="bg-[var(--paper)] pb-20">
      {/* Track view client-side */}
      <SkillViewTracker skillId={skill.id} />

      {/* Masthead */}
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href={basePath}
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; Back to Skills
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Skill Info */}
            <div className="flex-1">
              <Kicker className="mb-4">
                {skill.category?.name || 'Skill'}
              </Kicker>

              <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-4">
                {skill.name}
              </h1>

              <Deck className="max-w-2xl mb-6">{skill.description}</Deck>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                {skill.verified && <VerifiedBadge />}
                <ComplexityBadge complexity={skill.complexity} />
                {skill.quality_tier && <QualityTierBadge tier={skill.quality_tier} />}
                {skill.category && (
                  <CategoryBadge
                    categoryId={skill.category.id}
                    categoryName={skill.category.name}
                  />
                )}
              </div>

              <TrustBadges
                verified={skill.verified}
                installCount={skill.install_count}
                rating={skill.avg_rating}
                reviewCount={skill.review_count}
              />
            </div>

            {/* Install Card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="p-6 bg-[var(--paper-shadow)] border border-[var(--hair)]">
                <SkillInstallButton skill={skill} variant="primary" />

                <div className="mt-6 pt-6 border-t border-[var(--hair)] space-y-3 font-[family-name:var(--font-mono)] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">Version</span>
                    <span className="text-[var(--ink)]">{skill.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">Author</span>
                    <span className="text-[var(--ink)]">{skill.author}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">License</span>
                    <span className="text-[var(--ink)]">{skill.license}</span>
                  </div>
                  {skill.published_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted)]">Published</span>
                      <span className="text-[var(--ink)]">
                        {new Date(skill.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {skill.repo_url && (
                    <a
                      href={skill.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full mt-4 py-2 border border-[var(--hair)] text-[var(--body)] hover:border-id8-orange hover:text-id8-orange transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Triggers */}
            {skill.triggers && skill.triggers.length > 0 && (
              <section className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">Trigger Phrases</h2>
                <p className="text-sm text-[var(--muted)] mb-4">
                  Use these phrases to activate this skill in Claude Code:
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.triggers.map((trigger) => (
                    <code
                      key={trigger}
                      className="px-3 py-1.5 bg-[var(--paper-mid)] text-sm font-[family-name:var(--font-mono)] text-[var(--body)]"
                    >
                      {trigger}
                    </code>
                  ))}
                </div>
              </section>
            )}

            {/* Commands */}
            {skill.commands && skill.commands.length > 0 && (
              <section className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-4">Commands</h2>
                <div className="flex flex-wrap gap-2">
                  {skill.commands.map((command) => (
                    <code
                      key={command}
                      className="px-3 py-1.5 bg-[var(--paper-mid)] text-id8-orange text-sm font-[family-name:var(--font-mono)]"
                    >
                      /{command}
                    </code>
                  ))}
                </div>
              </section>
            )}

            {/* Skill Content */}
            {skill.content && (
              <section className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-4">Skill Content</h2>
                <div className="p-6 bg-[var(--paper-shadow)] border border-[var(--hair)]">
                  <pre className="whitespace-pre-wrap text-sm font-[family-name:var(--font-mono)] text-[var(--body)] overflow-x-auto">
                    {skill.content}
                  </pre>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <section className="mb-8">
                <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`${basePath}/search?q=${encodeURIComponent(tag)}`}
                      className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Stats */}
            <section className="mb-8 p-4 bg-[var(--paper-shadow)] border border-[var(--hair)]">
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
                Statistics
              </h3>
              <div className="space-y-3 font-[family-name:var(--font-mono)] text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Installs</span>
                  <span className="text-[var(--ink)]">{skill.install_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Views</span>
                  <span className="text-[var(--ink)]">{skill.view_count.toLocaleString()}</span>
                </div>
                {skill.avg_rating > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Rating</span>
                    <span className="text-[var(--ink)]">
                      {skill.avg_rating.toFixed(1)} ({skill.review_count})
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Related Skills */}
        {filteredRelated.length > 0 && (
          <section className="mt-16">
            <Rule className="mb-10" />
            <SectionHead title={<>Related <em className="italic text-id8-orange">skills</em></>} className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredRelated.map((related) => (
                <SkillCard key={related.id} skill={related} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  )
}
