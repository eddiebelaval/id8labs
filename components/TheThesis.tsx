import { Container, Kicker, Deck, Pipeline } from '@/components/editorial'

const beats = [
  {
    n: '01',
    label: 'From can to are',
    body: 'Everyone can describe an AI that does the work. We ship them: named chains carrying the mechanical load inside products that run real businesses, today, not on a roadmap.',
  },
  {
    n: '02',
    label: 'Real work, not demos',
    body: 'Not a sandbox. The quote that actually goes out, the file that actually opens, the reply that actually lands, moving through a chain instead of someone’s afternoon.',
  },
  {
    n: '03',
    label: 'Judgment stays',
    body: 'We keep a human gate wherever taste or a real decision lives. The machine clears everything up to that point and waits. The call is still yours.',
  },
]

export default function TheThesis() {
  return (
    <section id="thesis" className="py-20 md:py-24 scroll-mt-20 border-t border-[var(--hair)]">
      <Container>
        <Kicker dot className="mb-4">
          What we&apos;re doing now
        </Kicker>
        <h2 className="mb-6 max-w-[900px] font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,4vw,2.75rem)]">
          We stopped describing what&apos;s possible. We&apos;re{' '}
          <em className="italic font-normal text-id8-orange">doing it.</em>
        </h2>
        <Deck className="mb-12 max-w-[760px]">
          The idea is the easy part. The work is building products that run inside real
          businesses, every day, without taking the judgment out. That is the part we ship.
        </Deck>

        <div className="mb-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {beats.map((b) => (
            <div key={b.n}>
              <div className="mb-3 font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                {b.n} &middot; {b.label}
              </div>
              <p className="leading-relaxed text-[var(--body)]">{b.body}</p>
            </div>
          ))}
        </div>

        <Pipeline
          title="A live chain. The machine clears the path to the gate; the human makes the call."
          steps={[
            { label: 'Trigger' },
            { label: 'Look up' },
            { label: 'Draft' },
            { label: 'Decide', human: true },
            { label: 'Notify' },
            { label: 'File' },
          ]}
        />
      </Container>
    </section>
  )
}
