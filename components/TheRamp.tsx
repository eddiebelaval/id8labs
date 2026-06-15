import { Container, Kicker, Deck, EditorialButton, Hairline } from '@/components/editorial'

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
        <Deck className="mb-14 max-w-[760px]">
          Each step stands on its own and earns the next. You can stop anywhere; most do not.
        </Deck>

        <ol className="mb-14 max-w-[820px]">
          {rungs.map((r, i) => {
            const isEntry = i === 0
            const isLast = i === rungs.length - 1
            return (
              <li key={r.step} className="flex gap-5 pb-9 last:pb-0 md:gap-7">
                <div className="relative w-12 shrink-0">
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-0 bottom-[-2.25rem] w-px -translate-x-1/2 bg-[var(--hair)]"
                    />
                  )}
                  <span
                    className={
                      isEntry
                        ? 'rounded-[10px] relative z-10 grid h-12 w-12 place-items-center bg-id8-orange font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--paper)]'
                        : 'rounded-[10px] relative z-10 grid h-12 w-12 place-items-center border border-[var(--hair-hard)] bg-[var(--paper)] font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]'
                    }
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="pt-1.5">
                  <div className="mb-1.5 flex items-baseline gap-3">
                    <h3 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-xl md:text-2xl">
                      {r.step}
                    </h3>
                    {isEntry && (
                      <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.22em] text-id8-orange">
                        Start here
                      </span>
                    )}
                  </div>
                  <p className="max-w-[640px] leading-relaxed text-[var(--body)]">{r.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>

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
