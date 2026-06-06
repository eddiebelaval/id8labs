import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Download } from 'lucide-react'
import { getCollectionBySlug, getAllCollections } from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { OfficialBadge } from '@/components/skills/TrustBadges'
import { CopyInstallPrompt } from '@/components/stackshack/CopyInstallPrompt'
import { Container, Kicker, Deck, SectionHead } from '@/components/editorial'

interface PageProps {
  params: Promise<{ kit: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { kit } = await params
    const collection = await getCollectionBySlug(kit)

    if (!collection) {
      return { title: 'Starter Kit Not Found' }
    }

    return {
      title: collection.name,
      description:
        collection.description ||
        `${collection.name} starter kit with ${collection.skill_count} skills`,
    }
  } catch (err) {
    console.error('[StarterKitPage:generateMetadata] Error:', err)
    return { title: 'Starter Kit' }
  }
}

export async function generateStaticParams() {
  try {
    const collections = await getAllCollections()
    if (!collections || !Array.isArray(collections)) {
      console.warn('[StarterKitPage:generateStaticParams] Invalid collections response')
      return []
    }
    return collections.map((col) => ({
      kit: col.slug,
    }))
  } catch (err) {
    console.error('[StarterKitPage:generateStaticParams] Error:', err)
    return []
  }
}

export default async function StarterKitPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { kit } = await params
  const collection = await getCollectionBySlug(kit)

  if (!collection) {
    notFound()
  }

  const skillCount = collection.skill_count || collection.skills?.length || 0
  const isConfiguration = collection.content_type === 'configuration'

  return (
    <main className="bg-[var(--paper)] min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href="/stackshack/starter-kits"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; All Starter Kits
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {collection.is_official ? <OfficialBadge /> : <Kicker>Starter Kit</Kicker>}
                {isConfiguration && (
                  <span className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Configuration
                  </span>
                )}
              </div>

              <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-4">
                {collection.name}
              </h1>

              {collection.description && (
                <Deck className="max-w-2xl mb-5">{collection.description}</Deck>
              )}

              <div className="flex flex-wrap gap-x-8 gap-y-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                {!isConfiguration && (
                  <span><b className="font-medium text-[var(--ink)]">{skillCount}</b> skills</span>
                )}
                <span><b className="font-medium text-[var(--ink)]">{collection.author}</b> author</span>
                <span><b className="font-medium text-[var(--ink)]">{new Date(collection.created_at).toLocaleDateString()}</b> created</span>
              </div>
            </div>

            {/* Install Button - only show for skill bundles */}
            {!isConfiguration && (
              <div className="lg:w-64">
                <button className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange">
                  <Download className="w-5 h-5" />
                  Install All Skills
                </button>
                <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)] text-center mt-2">
                  Copies install script to clipboard
                </p>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Configuration Install Prompt */}
      {isConfiguration && collection.install_prompt && (
        <Container className="py-12">
          <div className="max-w-3xl">
            <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">How to Install</h2>
            <p className="text-[var(--muted)] mb-6">
              Copy the prompt below and paste it into Claude Code to install this configuration.
            </p>
            <CopyInstallPrompt prompt={collection.install_prompt} />
          </div>
        </Container>
      )}

      {/* Skills Grid - only show for skill bundles */}
      {!isConfiguration && (
        <Container className="py-12">
          <SectionHead title={<>Skills in this <em className="italic text-id8-orange">kit</em></>} meta={`${skillCount} skills`} className="mb-8" />

          {collection.skills && collection.skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {collection.skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-[var(--hair)]">
              <p className="text-[var(--muted)]">
                No skills in this kit yet.
              </p>
            </div>
          )}
        </Container>
      )}
    </main>
  )
}
