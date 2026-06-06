import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAllSkills, getAllCategories } from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { InlineFilters } from '@/components/skills/SkillFilters'
import { Container, Kicker } from '@/components/editorial'

type SortOption = 'newest' | 'popular' | 'rating' | 'installs'

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ sort?: SortOption }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const categories = await getAllCategories()
  const cat = categories.find((c) => c.id === category)

  if (!cat) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${cat.name} Skills`,
    description: cat.description || `Browse ${cat.name} skills in the ID8Labs marketplace`,
  }
}

export async function generateStaticParams() {
  // In development, cookies() isn't available during static generation
  // Return empty array to fall back to dynamic rendering
  try {
    const categories = await getAllCategories()
    return categories.map((cat) => ({
      category: cat.id,
    }))
  } catch {
    // Fall back to dynamic rendering if static generation fails
    return []
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const { sort } = await searchParams

  const categories = await getAllCategories()
  const currentCategory = categories.find((c) => c.id === category)

  if (!currentCategory) {
    notFound()
  }

  const sortBy: SortOption = sort || 'popular'
  const skills = await getAllSkills({ category, sortBy })

  return (
    <div className="bg-[var(--paper)] min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href="/stackshack/categories"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; All Categories
          </Link>

          <Kicker className="mb-4">Category</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-3">
            {currentCategory.name}
          </h1>
          {currentCategory.description && (
            <p className="font-[family-name:var(--font-serif)] italic text-lg text-[var(--muted)] max-w-2xl mb-3">
              {currentCategory.description}
            </p>
          )}
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            {skills.length} skill{skills.length !== 1 ? 's' : ''}
          </p>
        </Container>
      </div>

      {/* Skills Grid */}
      <Container className="py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            Showing <span className="text-[var(--ink)]">{skills.length}</span> skills
          </p>
          <InlineFilters />
        </div>

        {skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[var(--hair)]">
            <p className="text-[var(--muted)]">
              No skills in this category yet.
            </p>
            <Link
              href="/stackshack"
              className="mt-4 inline-block font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
            >
              Browse all skills
            </Link>
          </div>
        )}
      </Container>
    </div>
  )
}
