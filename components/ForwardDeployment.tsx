import {
  Container,
  Kicker,
  Deck,
  EditorialButton,
  MetaRow,
  Hairline,
} from '@/components/editorial'

const steps = [
  {
    step: '01',
    title: 'We learn how you work',
    desc: 'A workshop and a paid audit read your operation and name where it leaks. You leave with the findings, the approach, and a quote to build it.',
  },
  {
    step: '02',
    title: 'We build and install',
    desc: 'We design the primitive chains, install the system inside your operation, wire your tools, and set your data posture from day one. You do not touch a terminal.',
  },
  {
    step: '03',
    title: 'We stay on as custodians',
    desc: 'After launch the system stays healthy and keeps improving as your work changes, so the brand is still true long after we hand you the keys.',
  },
]

const stats = [
  { value: 'Inside', label: 'your operation' },
  { value: 'Human gates', label: 'by design' },
  { value: 'Custodians', label: 'not vendors' },
]

export default function ForwardDeployment() {
  return (
    <section id="deploy" className="py-20 md:py-24 scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24">
          {/* Left - Sticky Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker className="mb-4">Forward Deployment</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              We deploy it{' '}
              <em className="italic font-normal text-id8-orange">inside your business</em>
            </h2>
            <Deck>
              Not a tool you have to learn. A working architecture, built and run for you.
            </Deck>
          </div>

          {/* Right - Content */}
          <div className="space-y-12">
            {/* Lead */}
            <div className="space-y-6 font-[family-name:var(--font-serif)] text-lg md:text-xl leading-[1.55] text-[var(--body)]">
              <p>
                id8Labs designs{' '}
                <span className="text-id8-orange">
                  primitive chain architectures with human gates
                </span>{' '}
                and deploys them inside your business. Your operation, your tools, your judgment.
              </p>
              <p className="text-[var(--muted)]">
                The difference between an AI tool and an AI agent is simple: tools wait for you to
                type. Agents do the work while you focus on something else. We build the chain that
                eats the drudgery before the work, so you reach a scale tools alone cannot deliver.
              </p>
            </div>

            {/* Steps */}
            <div>
              {steps.map((item, i) => (
                <div
                  key={item.step}
                  className="flex gap-6 md:gap-8 py-8 border-b border-[var(--hair)]"
                  style={i === 0 ? { paddingTop: 0 } : undefined}
                >
                  <span className="shrink-0 font-[family-name:var(--font-display)] font-normal leading-none tracking-[-0.04em] text-id8-orange text-4xl md:text-5xl">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="mb-2 font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-xl md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-[var(--body)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div>
              <Hairline className="mb-6" />
              <MetaRow
                items={stats.map((s) => ({ value: s.value, label: s.label }))}
                className="text-sm"
              />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <EditorialButton href="/services">
                See how we work
              </EditorialButton>
              <EditorialButton href="/services#apply-form" variant="ghost">
                Start the conversation
              </EditorialButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
