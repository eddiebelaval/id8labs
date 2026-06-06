import { Container, Kicker, Deck, EditorialButton, MetaRow, Hairline } from '@/components/editorial'

export default function Hero() {
  return (
    <section id="hero" className="scroll-mt-20">
      <Container>
        <div className="border-b border-[var(--hair)] pt-20 pb-14 md:pt-24 md:pb-16">
          <Kicker dot className="mb-5">
            id8Labs · Built in Miami
          </Kicker>

          <h1 className="mb-7 max-w-[980px] font-[family-name:var(--font-display)] font-normal leading-[1] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.75rem,6.2vw,6rem)]">
            Architecture, not tools. Primitive chains for{' '}
            <em className="italic font-normal text-id8-orange">AI-era operators.</em>
          </h1>

          <Deck className="mb-9 max-w-[720px]">
            Robust primitive chains with human gates, designed domain-deep. They eat the
            drudgery before the work, so companies reach scale they could not have reached
            otherwise.
          </Deck>

          <div className="mb-12 flex flex-wrap gap-3.5">
            <EditorialButton href="/services">Work with us</EditorialButton>
            <EditorialButton href="#products" variant="ghost">
              See what we&apos;ve shipped
            </EditorialButton>
          </div>

          <Hairline className="mb-6" />
          <MetaRow
            items={[
              { value: 'Composer', label: 'v1.8161 · live' },
              { value: 'DeepStack', label: 'v2.5.0 · live' },
              { label: 'Built in Miami' },
            ]}
          />
        </div>
      </Container>
    </section>
  )
}
