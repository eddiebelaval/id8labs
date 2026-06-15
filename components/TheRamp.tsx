import {
  Container,
  Kicker,
  Deck,
  Pipeline,
  EditorialButton,
  Hairline,
} from '@/components/editorial'

const rungs = [
  {
    step: 'Workshop',
    desc: 'A working session that names where your operation leaks and shows you your business as chains. The lowest-friction way to start.',
  },
  {
    step: 'Audit',
    desc: 'A paid read of your operation: the primitives, the chains, the plan, and a quote to build it. The findings are yours to keep.',
  },
  {
    step: 'Build',
    desc: 'We design and install the chains inside your business, wire your tools, and set your data posture from day one. You never touch a terminal.',
  },
  {
    step: 'Retainer',
    desc: 'We stay on as custodians. The system stays healthy and keeps improving as your work changes.',
  },
]

export default function TheRamp() {
  return (
    <section id="ramp" className="py-20 md:py-24 scroll-mt-20 border-t border-[var(--hair)]">
      <Container>
        <Kicker dot className="mb-4">
          How to work with us
        </Kicker>
        <h2 className="mb-6 max-w-[900px] font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,4vw,2.75rem)]">
          Four steps. <em className="italic font-normal text-id8-orange">Low friction</em> to start.
        </h2>
        <Deck className="mb-12 max-w-[760px]">
          Each step stands on its own and earns the next. You can stop anywhere; most do not.
        </Deck>

        <div className="mb-12">
          <Pipeline
            steps={[
              { label: 'Workshop', human: true },
              { label: 'Audit' },
              { label: 'Build' },
              { label: 'Retainer' },
            ]}
          />
        </div>

        <div className="mb-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {rungs.map((r, i) => (
            <div key={r.step} className="border-t border-[var(--hair)] pt-5">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                  0{i + 1}
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-xl md:text-2xl">
                  {r.step}
                </h3>
              </div>
              <p className="leading-relaxed text-[var(--body)]">{r.desc}</p>
            </div>
          ))}
        </div>

        <Hairline className="mb-6" />
        <div className="flex flex-col gap-3.5 sm:flex-row">
          <EditorialButton href="/services">Start with a workshop</EditorialButton>
          <EditorialButton href="/services#apply-form" variant="ghost">
            Start the conversation
          </EditorialButton>
        </div>
      </Container>
    </section>
  )
}
