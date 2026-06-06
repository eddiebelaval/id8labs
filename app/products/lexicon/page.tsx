import Link from 'next/link'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
} from '@/components/editorial'

/**
 * Lexicon - Wikipedia + Perplexity for Story Universes
 * Graph-powered knowledge platform for narrative worlds.
 */

const features = [
  {
    title: 'Graph-Powered',
    description: 'Neo4j under the hood. Every relationship is a first-class citizen. Query character connections, faction alliances, and plot threads instantly.',
  },
  {
    title: 'Semantic Search',
    description: 'Ask in natural language. "Find all secrets known by House Stark" or "Who has betrayed the protagonist?" Your universe understands you.',
  },
  {
    title: 'AI Synthesis',
    description: 'Claude reads your graph, synthesizes connections, and gives you coherent answers. Not keyword matching—actual understanding.',
  },
  {
    title: 'Wiki View',
    description: 'Browse your universe like Wikipedia. Each entity gets a beautiful page with relationships, history, and AI-generated context.',
  },
  {
    title: 'Web Enhanced',
    description: 'For historical or real-world characters, toggle web data to enrich descriptions with real facts. AI pulls relevant context automatically.',
  },
]

const useCases = [
  {
    title: 'TV Writers Rooms',
    description: '100 episodes deep? Never lose track of who knows what, who loves who, or what happened in season 2 episode 7.',
  },
  {
    title: 'Novel Series Authors',
    description: 'Maintain continuity across multiple books. Your story bible, but actually searchable and intelligent.',
  },
  {
    title: 'Game Designers',
    description: 'Track lore, factions, quests, and character arcs for expansive RPG worlds. Graph visualization shows everything.',
  },
  {
    title: 'Franchise Managers',
    description: 'Comics, movies, shows—all connected. Query across media to ensure consistency in your expanded universe.',
  },
]

const questions = [
  '"Who was at the tavern in episode 47?"',
  '"Wait, are they related?"',
  '"Let me check my Excel spreadsheet..."',
]

export default function LexiconLandingPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Knowledge Graph · Free Beta</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Your universe, <em className="italic text-id8-orange">searchable</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            Wikipedia + Perplexity for story worlds. Search your narrative universe like a wiki.
            Get AI-synthesized answers from your knowledge graph.
          </Deck>
          <div className="flex flex-wrap gap-3.5">
            <EditorialButton href="https://lexicon-phi.vercel.app" external>
              Launch Lexicon
            </EditorialButton>
            <EditorialButton href="#features" variant="ghost">
              See features
            </EditorialButton>
          </div>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: 'Web App', label: 'platform' },
              { value: 'Neo4j + Claude', label: 'engine' },
              { value: 'Free Beta', label: 'price' },
            ]}
          />
        </header>

        {/* Problem */}
        <section className="py-16">
          <div className="max-w-2xl space-y-3">
            {questions.map((q) => (
              <p key={q} className="font-[family-name:var(--font-serif)] italic text-xl md:text-2xl text-[var(--muted)]">
                {q}
              </p>
            ))}
            <p className="font-[family-name:var(--font-serif)] italic text-2xl md:text-3xl text-[var(--ink)] pt-4">
              What if your story universe could <em className="text-id8-orange">answer back</em>?
            </p>
          </div>
        </section>

        <Rule />

        {/* Product Demo */}
        <section className="py-16">
          <SectionHead title={<>Every character. Every <em className="italic text-id8-orange">connection</em>.</>} />
          <div className="mt-10 max-w-2xl space-y-5 text-[var(--body)] leading-relaxed">
            <p>
              Built on Neo4j graph database for lightning-fast traversal. Every entity connects
              to every other entity. Query relationships in milliseconds. See your entire
              narrative world come alive.
            </p>
          </div>
          <EditorialCard className="mt-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border border-[var(--hair)] bg-[var(--paper-shadow)] p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">
                <span className="text-id8-orange">&#9906;</span>
                Find all betrayals involving the Cardinal...
              </div>
              <div className="border border-[var(--hair-hard)] bg-[var(--paper)] p-4 space-y-3">
                <div className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">
                  AI-Synthesized Answer
                </div>
                <p className="text-[var(--body)] leading-relaxed">
                  The Cardinal orchestrated 3 major betrayals: Milady&apos;s mission to
                  eliminate Buckingham, the conspiracy with Rochefort against the Queen, and
                  the false accusation of D&apos;Artagnan...
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Cardinal Richelieu', 'Milady', 'Rochefort'].map((tag) => (
                    <span key={tag} className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </EditorialCard>
        </section>

        <Rule />

        {/* AI Search */}
        <section className="py-16 max-w-2xl">
          <SectionHead title={<>Ask. Get <em className="italic text-id8-orange">answers</em>.</>} />
          <div className="mt-8 space-y-4 text-[var(--body)] leading-relaxed">
            <p>
              Powered by Claude AI. Ask questions in plain English. Get answers synthesized
              from your actual canon&mdash;not hallucinated guesses. Every response grounded in
              your knowledge graph.
            </p>
            <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
              Toggle &quot;Web Enhanced&quot; to pull real-world context for historical characters.
            </p>
          </div>
        </section>

        <Rule />

        {/* Features */}
        <section id="features" className="py-16 scroll-mt-24">
          <SectionHead title="Built for world-builders" meta="5 systems" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{feature.title}</h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Use Cases */}
        <section className="py-16">
          <SectionHead title="Perfect for" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{useCase.title}</h3>
                <p className="text-[var(--muted)]">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* CTA */}
        <section className="py-16 text-center">
          <SectionHead title={<>Stop searching. Start <em className="italic text-id8-orange">finding</em>.</>} className="border-0 pb-0 justify-center" />
          <p className="mt-7 mb-9 text-lg text-[var(--muted)] max-w-xl mx-auto">
            Lexicon is live. Free during beta. Start building your knowledge graph today.
          </p>
          <EditorialButton href="https://lexicon-phi.vercel.app" external>
            Launch Lexicon
          </EditorialButton>
          <p className="mt-6 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            For creators who refuse to lose track of their world.
          </p>
        </section>

        <Rule />

        {/* Footer meta */}
        <section className="pt-16 flex flex-wrap items-center justify-between gap-5">
          <MetaRow
            items={[
              { value: 'Web App', label: 'Neo4j + Claude AI' },
              { value: 'id8Labs', label: 'Creator Stack' },
            ]}
          />
          <div className="flex gap-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Link href="/products" className="text-[var(--muted)] transition-colors hover:text-id8-orange">All Products</Link>
            <Link href="/privacy" className="text-[var(--muted)] transition-colors hover:text-id8-orange">Privacy</Link>
          </div>
        </section>
      </Container>
    </div>
  )
}
