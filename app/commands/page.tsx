import { getAllCommands, getCommandCategories } from '@/lib/commands'
import { CommandCard } from '@/components/commands/CommandCard'
import { Container, Kicker, Deck, Rule, SectionHead } from '@/components/editorial'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

const chipCls = (active: boolean) =>
  'font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-2 border transition-colors duration-150 ' +
  (active
    ? 'border-id8-orange text-id8-orange'
    : 'border-[var(--hair)] text-[var(--muted)] hover:border-[var(--hair-hard)] hover:text-[var(--ink)]')

export default async function CommandsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoryFilter = params.category || null

  const [allCommands, categories] = await Promise.all([
    getAllCommands(),
    getCommandCategories(),
  ])

  // Filter by category if specified
  const filteredCommands = categoryFilter
    ? allCommands.filter((cmd) => cmd.category === categoryFilter)
    : allCommands

  const categoryNames = Object.keys(categories).sort()

  return (
    <main className="relative bg-[var(--paper)]">
      {/* Masthead */}
      <section className="border-b border-[var(--hair)] py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Kicker dot className="mb-6 justify-center">Marketplace · {allCommands.length} commands</Kicker>
            <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.5rem,5vw,4rem)] mb-5">
              Workflow <em className="italic text-id8-orange">commands</em>
            </h1>
            <Deck className="mx-auto max-w-2xl">
              Automate your development workflow with one-click commands.
            </Deck>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <Container>
          {/* Category Filters */}
          <div className="mb-8 flex items-center gap-1.5 flex-wrap">
            <a href="/commands" className={chipCls(!categoryFilter)}>
              All ({allCommands.length})
            </a>
            {categoryNames.map((category) => (
              <a key={category} href={`/commands?category=${category}`} className={chipCls(categoryFilter === category)}>
                {category} ({categories[category]})
              </a>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            {filteredCommands.length === allCommands.length
              ? `Showing all ${allCommands.length} commands`
              : `Showing ${filteredCommands.length} ${categoryFilter} commands`}
          </div>

          {/* Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCommands.map((command) => (
              <CommandCard key={command.id} command={command} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCommands.length === 0 && (
            <div className="text-center py-16 border border-[var(--hair)]">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">No commands found</h3>
              <p className="text-[var(--muted)] mb-6">
                Try a different category or view all commands.
              </p>
              <a
                href="/commands"
                className="inline-flex items-center gap-2 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange"
              >
                View All Commands
              </a>
            </div>
          )}
        </Container>
      </section>

      <Rule />

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container narrow>
          <div className="text-center">
            <SectionHead
              title={<>Install with the <em className="italic text-id8-orange">StackShack CLI</em></>}
              className="border-0 pb-0 justify-center"
            />
            <p className="mt-7 mb-9 text-lg text-[var(--muted)]">
              All commands available via our CLI tool.
            </p>
            <div className="p-6 bg-[var(--paper-shadow)] border border-[var(--hair)] text-left">
              <code className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                npx stackshack install git-smart-commit
              </code>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
