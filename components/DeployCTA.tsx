import { Container, Kicker, Deck, EditorialButton, Rule } from '@/components/editorial'

/**
 * DeployCTA
 * Closing call-to-action before the footer. Drives toward the
 * forward-deployment offering — the lab's core business.
 */
export default function DeployCTA() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <Rule className="mb-16 md:mb-20" />
        <div className="mx-auto max-w-3xl text-center">
          <Kicker className="mb-5 text-center">Limited setups each month</Kicker>
          <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.025em] text-[var(--ink)] text-[clamp(2.25rem,5vw,4rem)]">
            Your AI team, deployed and{' '}
            <em className="italic font-normal text-id8-orange">running this week.</em>
          </h2>
          <Deck className="mx-auto mb-9 max-w-xl">
            We take on a limited number of setups each month. Tell us what is eating your time, and we
            will tell you which agents to build &mdash; or if this is not right for you.
          </Deck>
          <div className="flex flex-col sm:flex-row justify-center gap-3.5">
            <EditorialButton href="/services#apply-form">Apply for a setup</EditorialButton>
            <EditorialButton href="/services" variant="ghost">
              See the offering
            </EditorialButton>
          </div>
        </div>
        <Rule className="mt-16 md:mt-20" />
      </Container>
    </section>
  )
}
