import { getAllCategories, getSkillCounts } from '@/lib/skills'
import { Container, Kicker, Deck, EditorialCard } from '@/components/editorial'

export const revalidate = 3600

export default async function CategoriesPage(): Promise<React.JSX.Element> {
  const [categories, counts] = await Promise.all([
    getAllCategories(),
    getSkillCounts(),
  ])

  return (
    <div className="bg-[var(--paper)] py-16 md:py-24">
      <Container>
        <header className="border-b border-[var(--hair)] pb-12 mb-12 text-center">
          <Kicker dot className="mb-5 justify-center">Marketplace · Categories</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.5rem,5vw,4rem)] mb-5">
            Browse by <em className="italic text-id8-orange">category</em>
          </h1>
          <Deck className="mx-auto max-w-2xl">
            Explore {counts.published}+ skills organized by use case.
          </Deck>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {categories.map((category) => {
            const count = counts.byCategory[category.id] || 0

            return (
              <EditorialCard key={category.id} href={`/stackshack/categories/${category.id}`} className="h-full">
                <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-sm text-[var(--body)] leading-relaxed mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                  {count} skill{count !== 1 ? 's' : ''}
                </p>
              </EditorialCard>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
