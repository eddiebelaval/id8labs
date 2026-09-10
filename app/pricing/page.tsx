import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Kicker, Deck, SectionHead } from '@/components/editorial'
import { ServiceCard } from '@/components/ServiceCard'
import { getProductsByCategory } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Pricing - ID8Labs',
  description:
    'The self-paced Academy is free. When you want live training, a system built with you, or a ready-made agent team, this is the ladder.',
}

const training = getProductsByCategory('claude-code-training')
const services = getProductsByCategory('ai-implementation')
const kits = getProductsByCategory('agent-kit')

const GRID = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9'

export default function PricingPage() {
  return (
    <>
      <Container className="py-16">
        <Kicker dot className="mb-5">
          Pricing
        </Kicker>
        <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
          Free to learn. <em className="italic text-id8-orange">Hands-on</em> when you
          want more.
        </h1>
        <Deck className="max-w-2xl mb-9">
          Every self-paced course in the Academy is free, always. When you want live
          sessions, a system built with you, or a ready-made agent team, that is what
          is priced here.
        </Deck>

        {/* Free on-ramp */}
        <div className="rounded-[13px] border border-[var(--hair)] p-6 md:flex md:items-center md:justify-between md:gap-6">
          <div className="max-w-xl">
            <Kicker className="mb-2">Start free</Kicker>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Academy is a full library of self-paced courses on working with
              Claude, from first principles to team scale. No account, no card. Start
              there, come back here when you want to go further.
            </p>
          </div>
          <Link
            href="/academy"
            className="btn btn-secondary mt-4 md:mt-0 whitespace-nowrap"
          >
            Browse the Academy
          </Link>
        </div>
      </Container>

      {/* Live training */}
      <section className="section-spacing">
        <Container>
          <SectionHead
            title={
              <>
                Live <em className="italic text-id8-orange">training</em>
              </>
            }
            meta="Cohorts & sessions"
          />
          <div className={GRID}>
            {training.map((product) => (
              <ServiceCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Implementation services */}
      <section className="section-spacing">
        <Container>
          <SectionHead
            title={
              <>
                Done <em className="italic text-id8-orange">with</em> you
              </>
            }
            meta="Implementation"
          />
          <div className={GRID}>
            {services.map((product) => (
              <ServiceCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Agent kits */}
      <section className="section-spacing">
        <Container>
          <SectionHead
            title={
              <>
                Agent <em className="italic text-id8-orange">kits</em>
              </>
            }
            meta="One-time"
          />
          <p className="mt-6 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
            Ready-made teams of Claude Code agents you install once and own. Each kit
            drops into your workflow the same day.
          </p>
          <div className={GRID}>
            {kits.map((product) => (
              <ServiceCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
