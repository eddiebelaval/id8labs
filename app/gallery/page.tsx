import { getPublicStacks } from '@/lib/stacks-db'
import { GalleryStackCard } from '@/components/gallery/GalleryStackCard'
import { Container, Kicker, Deck, EditorialButton } from '@/components/editorial'

export const revalidate = 300

export default async function GalleryPage() {
  const publicStacks = await getPublicStacks(50)

  return (
    <main className="relative bg-[var(--paper)]">
      <section className="border-b border-[var(--hair)] py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Kicker dot className="mb-6 justify-center">Marketplace · {publicStacks.length} community stacks</Kicker>
            <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.5rem,5vw,4rem)] mb-5">
              Community stack <em className="italic text-id8-orange">gallery</em>
            </h1>
            <Deck className="mx-auto max-w-2xl mb-9">
              Discover and fork stacks shared by the StackShack community.
            </Deck>
            <EditorialButton href="/stackshack">Build Your Own Stack</EditorialButton>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          {publicStacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {publicStacks.map((stack) => (
                <GalleryStackCard key={stack.id} stack={stack} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-[var(--hair)]">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-2">No public stacks yet</h3>
              <p className="text-[var(--muted)] max-w-md mx-auto">
                Be the first to share a stack with the community.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
