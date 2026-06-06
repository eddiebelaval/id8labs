import Link from 'next/link'
import { getAllCollections } from '@/lib/skills'
import { SkillStarterKits, FeaturedStarterKit } from '@/components/skills/SkillStarterKits'
import { Container, Kicker, Deck, SectionHead } from '@/components/editorial'

export const revalidate = 3600

// Error fallback component
function StarterKitsError({ error }: { error?: string }) {
  return (
    <main className="bg-[var(--paper)] min-h-screen">
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; Back to Marketplace
          </Link>
          <Kicker className="mb-4">Marketplace</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-3">
            Starter <em className="italic text-id8-orange">kits</em>
          </h1>
          <Deck className="max-w-2xl">Curated skill bundles for common workflows.</Deck>
        </Container>
      </div>
      <Container className="py-12">
        <div className="text-center py-16 border border-[var(--hair)]">
          <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">Unable to load starter kits</h3>
          <p className="text-[var(--muted)] max-w-md mx-auto mb-6">
            We&apos;re having trouble loading the starter kits right now. Please try again in a moment.
          </p>
          {error && process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-mono)] mb-4">{error}</p>
          )}
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
          >
            Browse all skills instead
          </Link>
        </div>
      </Container>
    </main>
  )
}

export default async function StarterKitsPage() {
  let collections
  let error: string | undefined

  try {
    collections = await getAllCollections()
  } catch (err) {
    console.error('[StarterKitsPage] Failed to fetch collections:', err)
    error = err instanceof Error ? err.message : 'Unknown error'
    return <StarterKitsError error={error} />
  }

  // Handle empty or failed response gracefully
  if (!collections || !Array.isArray(collections)) {
    console.warn('[StarterKitsPage] Invalid collections response')
    return <StarterKitsError error="Invalid response from database" />
  }

  const officialCollections = collections.filter((c) => c.is_official)
  const communityCollections = collections.filter((c) => !c.is_official)

  // Get the first official collection for the featured banner
  const featuredCollection = officialCollections[0]

  return (
    <main className="bg-[var(--paper)] min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; Back to Marketplace
          </Link>

          <Kicker className="mb-4">Marketplace</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-3">
            Starter <em className="italic text-id8-orange">kits</em>
          </h1>
          <Deck className="max-w-2xl">Curated skill bundles for common workflows.</Deck>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12">
        {/* Featured Collection */}
        {featuredCollection && (
          <section className="mb-16">
            <FeaturedStarterKit collection={featuredCollection} />
          </section>
        )}

        {/* Official Collections */}
        {officialCollections.length > 0 && (
          <section className="mb-16">
            <SectionHead title={<>Official <em className="italic text-id8-orange">kits</em></>} meta="id8Labs" className="mb-8" />
            <SkillStarterKits
              collections={officialCollections.slice(1)} // Exclude featured
              variant="grid"
            />
          </section>
        )}

        {/* Community Collections */}
        {communityCollections.length > 0 && (
          <section>
            <SectionHead title={<>Community <em className="italic text-id8-orange">kits</em></>} className="mb-8" />
            <SkillStarterKits collections={communityCollections} variant="grid" />
          </section>
        )}

        {/* Empty State */}
        {collections.length === 0 && (
          <div className="text-center py-16 border border-[var(--hair)]">
            <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">No starter kits yet</h3>
            <p className="text-[var(--muted)] max-w-md mx-auto">
              Starter kits are coming soon. In the meantime, browse individual skills.
            </p>
            <Link
              href="/stackshack"
              className="inline-flex items-center gap-2 mt-6 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
            >
              Browse all skills
            </Link>
          </div>
        )}
      </Container>
    </main>
  )
}
