import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Composer - ID8Labs',
  description: 'Timeline-based AI story development platform for writers, directors, and producers.',
  alternates: { canonical: '/products/composer' },
  openGraph: {
    title: 'Composer | id8Labs',
    description: 'Timeline-based AI story development platform for writers, directors, and producers.',
    url: 'https://id8labs.app/products/composer',
  },
}

const features = [
  {
    title: 'Timeline-based structure',
    description: 'Visual story building that matches how creatives actually think.',
  },
  {
    title: 'AI collaboration',
    description: 'Work with AI as a creative partner, not a replacement for human creativity.',
  },
  {
    title: 'Non-linear workflow',
    description: 'Rearrange, experiment, iterate without fighting your tools.',
  },
  {
    title: 'Production-tested',
    description: 'Built by professionals, for professionals.',
  },
  {
    title: 'Real-time updates',
    description: 'Changes propagate instantly across your timeline.',
  },
]

export default function ComposerPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Story Development · Active</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Build your story <em className="italic text-id8-orange">the way you think</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            A timeline-based story development platform for writers, directors, and
            producers who think visually and work non-linearly.
          </Deck>
          <div className="flex flex-wrap gap-3.5">
            <EditorialButton href="https://id8composer.app" external>
              Visit Composer
            </EditorialButton>
            <EditorialButton href="/products" variant="ghost">
              Back to products
            </EditorialButton>
          </div>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: 'Web App', label: 'platform' },
              { value: 'Claude', label: 'ai model' },
              { value: 'Active', label: 'status' },
              { value: '20yr', label: 'production roots' },
            ]}
          />
        </header>

        {/* Overview */}
        <section className="py-16 max-w-2xl">
          <div className="space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              Unlike traditional outlining tools that force you into a linear structure, Composer
              treats story development like the messy, iterative process it actually is. Build your
              narrative on a visual timeline. Rearrange scenes. Experiment with structure. Work with
              AI as a collaborative partner, not a replacement.
            </p>
            <p>
              Born from 20 years of production experience, Composer solves the problems we faced
              daily as storytellers working in television and film.
            </p>
          </div>
        </section>

        <Rule />

        {/* Features */}
        <section className="py-16">
          <SectionHead title={<>Key <em className="italic text-id8-orange">features</em></>} meta="Capabilities" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* CTA */}
        <section className="pt-16">
          <EditorialCard featured className="text-center">
            <p className="font-[family-name:var(--font-serif)] italic text-xl text-[var(--muted)] mb-7 max-w-xl mx-auto">
              Story development, the way it actually happens.
            </p>
            <EditorialButton href="https://id8composer.app" external>
              Visit Composer
            </EditorialButton>
          </EditorialCard>
        </section>
      </Container>
    </div>
  )
}
