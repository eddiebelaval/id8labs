import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialCard,
  EditorialButton,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'The Method',
  description:
    'How id8Labs works: AI system architecture and forward deployment. We build primitive chains, AI harnesses, and intelligence layers, installed as a HALO and tended as your work changes.',
  openGraph: {
    title: 'The Method | id8Labs',
    description:
      'AI system architecture and forward deployment. Primitive chains, AI harnesses, intelligence layers, agents with depth and breadth that create presence, not a chatbot.',
  },
}

/* A definition row: ink term + narrow plain-language tag, body beneath, hairline ruled. */
function Term({ name, plain, children }: { name: ReactNode; plain: string; children: ReactNode }) {
  return (
    <div className="border-b border-[var(--hair)] py-9 last:border-b-0">
      <div className="mb-4 flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-5">
        <h3 className="font-[family-name:var(--font-display)] text-[1.625rem] font-normal leading-tight tracking-[-0.015em] text-[var(--ink)]">
          {name}
        </h3>
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">
          {plain}
        </span>
      </div>
      <div className="max-w-[68ch] space-y-3 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
        {children}
      </div>
    </div>
  )
}

function Movement({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-[var(--hair)] py-7 last:border-b-0 md:gap-8">
      <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">
        {step}
      </span>
      <div>
        <h4 className="mb-1.5 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">
          {title}
        </h4>
        <p className="max-w-[64ch] font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.6] text-[var(--body)]">
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function MethodPage() {
  return (
    <main>
      {/* HERO */}
      <section className="pt-20 pb-14 md:pt-28 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <Kicker dot className="mb-6">The Method</Kicker>
            <h1 className="mb-7 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.5rem,6vw,4.5rem)]">
              The architecture <em className="italic font-normal text-id8-orange">behind the work.</em>
            </h1>
            <Deck className="mb-10">
              We work in AI system architecture and forward deployment. Most of what we do reads as a clean outcome, a business that runs itself and stays true. Underneath is a small set of parts that fit together.
            </Deck>
            <MetaRow
              items={[
                { label: 'AI system architecture' },
                { label: 'Forward deployment' },
                { label: 'HALO' },
                { label: 'Presence, not a chatbot' },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-14 md:py-16">
        <Container>
          <SectionHead title={<>What we <em className="italic text-id8-orange">build</em></>} meta="The stack" />
          <div className="mt-8 mb-2 max-w-3xl">
            <p className="font-[family-name:var(--font-sans)] text-[1.125rem] leading-[1.7] text-[var(--body)]">
              Not a chatbot. We build agents with depth and breadth, systems that hold context, judgment, and reach, so they create <span className="text-[var(--ink)] font-medium">presence</span> inside your operation instead of a window you have to keep prompting.
            </p>
          </div>
          <div className="mt-6 max-w-4xl">
            <Term name="Primitive chains" plain="the unit of work">
              <p>
                A sequence of small, well-scoped steps with a human gate wherever judgment belongs. A vertical, intake, file-opening, a sales motion, is one chain. We build them domain-deep for your operation, never from a template. The chains are what actually run the work.
              </p>
            </Term>
            <Term name="AI harnesses" plain="what holds the agent to the work">
              <p>
                The structure that wires an agent into your real systems: its tools, its context, its memory, and the gates that keep it safe and repeatable. The harness is the difference between a model that answers in a sandbox and an agent that does the work on your tools, the same way, every time.
              </p>
            </Term>
            <Term name="Intelligence layers" plain="what the agent reasons over">
              <p>
                The knowledge and judgment the agent stands on: your corpus, your rules, your standards, mined in place and kept current. This is where the system learns how your operation actually decides, so its output reads as yours rather than as generic AI.
              </p>
            </Term>
            <Term name="Agents with depth and breadth" plain="presence, not a chatbot">
              <p>
                Depth is how far a single task is carried before a human is needed. Breadth is how much of your operation one agent can hold at once. Build both and you get presence: a system that is simply there and working, not a window you have to drive. Presence is the product. The chatbot is what we are not.
              </p>
            </Term>
          </div>
        </Container>
      </section>

      {/* HALO */}
      <section className="py-14 md:py-16">
        <Container>
          <SectionHead title={<>HALO, <em className="italic text-id8-orange">the product</em></>} meta="What we install" />
          <div className="mt-8 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              HALO is the whole system we build and run inside your operation: the Genome at its core, the chains and harnesses that do your work, and the governance that keeps it on brand. We do not hand it off. HALO is ours to operate, tuned to your DNA, and we stay its custodian. What you get is the result, work that comes out the way you would have done it, from a system we keep true.
            </p>
            <p>
              At the center is the <span className="text-[var(--ink)] font-medium">Genome</span>, the DNA of how you work in four parts. <span className="text-[var(--ink)] font-medium">Design</span> is how the work looks and the standard it must meet. <span className="text-[var(--ink)] font-medium">Voice</span> is how your business sounds. <span className="text-[var(--ink)] font-medium">Ethos</span> is the judgment underneath both. <span className="text-[var(--ink)] font-medium">Lexicon</span> is the language you own, your terms of art used exactly the way you use them. Everything HALO produces reads the Genome before it acts, so the work is on brand by construction, not by reminder. We hold and maintain the Genome as your custodian.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            <Movement step="Attune" title="We learn how you actually work" desc="From your real work and the way your team actually decides. We tune the system to your standards, not a template." />
            <Movement step="Build" title="We compose the chains" desc="Primitive chains and harnesses built domain-deep, with a person in the loop wherever judgment belongs." />
            <Movement step="Verify" title="We check it against your work" desc="Checked against your team’s real work before it ships. It ships because it meets your bar, not because it runs." />
            <Movement step="Tend" title="It keeps matching you" desc="After launch it keeps improving as your work changes, so it never goes stale. The system gets better with use, not worse." />
          </div>
        </Container>
      </section>

      {/* THE SPIRAL */}
      <section className="py-14 md:py-16">
        <Container>
          <SectionHead title={<>How we <em className="italic text-id8-orange">engage</em></>} meta="The work" />
          <div className="mt-8 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              An engagement runs in clear steps. A workshop to start and find the fit, a paid audit that reads your operation and names the approach, a build, then an ongoing partnership. Each engagement builds on the last, so the work compounds instead of starting over.
            </p>
            <p>
              There are two honest decision points before any build, and a no at either is a clean stop, not a failure. We would rather find the wrong fit early than sell you a build that will not land.
            </p>
          </div>
        </Container>
      </section>

      {/* THE MEMBRANE */}
      <section className="py-14 md:py-16">
        <Container>
          <SectionHead title={<>After <em className="italic text-id8-orange">launch</em></>} meta="Custodianship" />
          <div className="mt-8 mb-10 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              Once the system is live, you run it. The everyday, on-brand work happens on your side. Anything structural comes back to us. You get autonomy and an anchor at once.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <EditorialCard>
              <p className="mb-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Day to day</p>
              <p className="font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.6] text-[var(--body)]">
                The everyday, on-brand changes happen on your side, fast and on standard. Nothing irreversible happens without a person.
              </p>
            </EditorialCard>
            <EditorialCard featured>
              <p className="mb-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">Structural</p>
              <p className="font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.6] text-[var(--body)]">
                A new look, a shift in voice, a change in the judgment underneath, that is our work. The system never reshapes itself on its own.
              </p>
            </EditorialCard>
          </div>
          <div className="mt-10 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              We stay on as custodians. The system keeps improving as your work changes, and there is always a person in the loop, by design. Most studios hand off and the work drifts within a month. We stay, so the brand is still true a year after launch.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <Container>
          <Rule className="mb-12" />
          <div className="max-w-3xl">
            <Kicker className="mb-5">Start here</Kicker>
            <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,4vw,3rem)]">
              That is the architecture. <em className="italic font-normal text-id8-orange">Here is where it starts.</em>
            </h2>
            <p className="mb-9 max-w-2xl font-[family-name:var(--font-sans)] text-[1.125rem] leading-[1.7] text-[var(--body)]">
              A workshop opens the Spiral. An audit confirms the fit and names the leak. From there we build, install, and stay on as custodians.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <EditorialButton href="/services#apply-form" variant="primary">Start the conversation</EditorialButton>
              <EditorialButton href="/services" variant="ghost">Back to services</EditorialButton>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
