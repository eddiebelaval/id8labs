import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getStackByShareId } from '@/lib/stacks-db'
import { ImportStackButton } from '@/components/stack/ImportStackButton'
import { StackStats, buildStackStats, groupItemsByType } from '@/components/stack/StackStats'
import { StackItemSection } from '@/components/stack/StackItemSection'
import { Container, Kicker, Deck, Rule, SectionHead } from '@/components/editorial'

interface PageProps {
  params: Promise<{ shareId: string }>
}

export const revalidate = 60

export default async function GalleryStackDetailPage({ params }: PageProps): Promise<React.ReactElement> {
  const { shareId } = await params
  const stack = await getStackByShareId(shareId)

  if (!stack) {
    notFound()
  }

  const items = stack.items || []
  const { skills, agents, commands, settings } = groupItemsByType(items)
  const stats = buildStackStats(items)

  const formattedDate = new Date(stack.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const importableStack = {
    id: stack.id,
    name: stack.name,
    description: stack.description || undefined,
    items,
    createdAt: stack.created_at,
    updatedAt: stack.updated_at,
  }

  return (
    <div className="relative bg-[var(--paper)]">
      {/* Back Button */}
      <section className="py-8 border-b border-[var(--hair)]">
        <Container>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange transition-colors"
          >
            &larr; Back to Gallery
          </Link>
        </Container>
      </section>

      {/* Masthead */}
      <section className="py-16 border-b border-[var(--hair)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Kicker dot className="mb-6 justify-center">Community Stack</Kicker>

            <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-4">{stack.name}</h1>

            {stack.description && (
              <Deck className="mx-auto max-w-2xl mb-6">
                {stack.description}
              </Deck>
            )}

            <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mb-8">
              Updated {formattedDate}
            </div>

            <StackStats stats={stats} />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <ImportStackButton stack={importableStack} />
            </div>
          </div>
        </Container>
      </section>

      {/* Stack Contents */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHead title={<>Stack <em className="italic text-id8-orange">contents</em></>} className="mb-8" />

            {items.length === 0 ? (
              <div className="text-center py-12 text-[var(--muted)] border border-[var(--hair)]">
                This stack is empty.
              </div>
            ) : (
              <div className="space-y-6">
                <StackItemSection title="Skills" emoji="" items={skills} linkPrefix="/skills/" />
                <StackItemSection title="Agents" emoji="" items={agents} linkPrefix="/skills/" />
                <StackItemSection title="Commands" emoji="" items={commands} linkPrefix="/commands/" />
                <StackItemSection title="Settings" emoji="" items={settings} linkPrefix="/settings/" />
              </div>
            )}
          </div>
        </Container>
      </section>

      <Rule />

      {/* How to Install */}
      <section className="py-16 md:py-20">
        <Container narrow>
          <div className="text-center">
            <SectionHead title={<>Ready to <em className="italic text-id8-orange">install?</em></>} className="border-0 pb-0 justify-center" />
            <p className="mt-7 mb-9 text-lg text-[var(--muted)]">
              Fork this stack to your collection and install everything at once.
            </p>
            <ImportStackButton stack={importableStack} />
          </div>
        </Container>
      </section>
    </div>
  )
}
