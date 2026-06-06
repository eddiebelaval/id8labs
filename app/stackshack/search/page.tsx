import { Suspense } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { searchSkills, getAllCategories } from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { SkillFilters } from '@/components/skills/SkillFilters'
import { Container, Kicker } from '@/components/editorial'

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; complexity?: string }>
}

interface EmptyStateProps {
  title: string
  description: string
  showBrowseLink?: boolean
}

function EmptyState({ title, description, showBrowseLink }: EmptyStateProps): React.JSX.Element {
  return (
    <div className="text-center py-16 border border-[var(--hair)]">
      <Search className="w-8 h-8 mx-auto mb-4 text-[var(--muted)]" />
      <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">{title}</h3>
      <p className="text-[var(--muted)] max-w-md mx-auto">{description}</p>
      {showBrowseLink && (
        <Link
          href="/stackshack"
          className="inline-flex items-center gap-2 mt-6 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
        >
          Browse all skills
        </Link>
      )}
    </div>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q || ''
  const categories = await getAllCategories()

  // Search if we have a query
  const results = query ? await searchSkills(query, 50) : []

  return (
    <main className="bg-[var(--paper)] min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-12">
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; Back to Marketplace
          </Link>

          <Kicker className="mb-4">Search</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,4vw,3rem)] mb-6">
            Search <em className="italic text-id8-orange">skills</em>
          </h1>

          <Suspense fallback={<div className="h-14 border border-[var(--hair)]" />}>
            <SkillSearchBar
              placeholder="Search skills..."
              autoFocus
              showResultsInline={false}
            />
          </Suspense>
        </Container>
      </div>

      {/* Results */}
      <Container className="py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <SkillFilters categories={categories} />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {!query && (
              <EmptyState
                title="Search for skills"
                description="Enter a search term above to find skills by name, description, or tags"
              />
            )}

            {query && results.length === 0 && (
              <EmptyState
                title="No skills found"
                description="Try a different search term or browse by category"
                showBrowseLink
              />
            )}

            {query && results.length > 0 && (
              <>
                <p className="mb-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                  <span className="text-[var(--ink)]">{results.length}</span> result{results.length === 1 ? '' : 's'} for{' '}
                  <span className="text-[var(--ink)]">&quot;{query}&quot;</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {results.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
