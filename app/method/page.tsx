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
    'How id8Labs works: AI system architecture and forward deployment. Primitive chains, AI harnesses, and intelligence layers, installed as a HALO and tended through the Spiral.',
  openGraph: {
    title: 'The Method | id8Labs',
    description:
      'AI system architecture and forward deployment. Primitive chains, AI harnesses, intelligence layers, HALO, the Spiral, the Membrane, and Attunement.',
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
                { label: 'HALO' },
                { label: 'Genome' },
                { label: 'Spiral' },
                { label: 'Membrane' },
                { label: 'Attunement' },
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
              HALO is the whole system we install inside your operation, versioned and handed off as one unit. It carries the Genome at its core, the chains and harnesses that run your work, and the post-launch governance that keeps it on brand.
            </p>
            <p>
              At the center is the <span className="text-[var(--ink)] font-medium">Genome</span>, the DNA of how you work in three parts. <span className="text-[var(--ink)] font-medium">Design</span> is how the work looks and the standard it must meet. <span className="text-[var(--ink)] font-medium">Voice</span> is how your business sounds. <span className="text-[var(--ink)] font-medium">Ethos</span> is the judgment underneath both. Everything HALO produces reads the Genome before it acts, so the work is on brand by construction, not by reminder. The Genome is held by the studio. That is deliberate.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            <Movement step="Attune" title="We learn how you actually work" desc="We mine your real corpus in place, the finished work, the way decisions get made, the exceptions. We tune the system to your form and take its facts from your own sources." />
            <Movement step="Build" title="We compose the chains" desc="Primitive chains and harnesses built domain-deep, with a person in the loop wherever judgment belongs." />
            <Movement step="Verify" title="We grade against your own work" desc="Checked for form-parity against real output from your team. It ships because it matches the bar you set, not because it runs." />
            <Movement step="Tend" title="It keeps matching you" desc="After launch the system keeps tuning to how the work actually arrives, so it never drifts from a frozen opening-day snapshot. Tend is Attune coming back around." />
          </div>
        </Container>
      </section>

      {/* THE SPIRAL */}
      <section className="py-14 md:py-16">
        <Container>
          <SectionHead title={<>The <em className="italic text-id8-orange">Spiral</em></>} meta="How we engage" />
          <div className="mt-8 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              The shape of an engagement. Not a funnel, which is wide at the top, leaks out the bottom, and ends. A loop that closes on itself and climbs: a workshop opens it, a workshop closes it, and the close seeds the next turn. It re-enters higher because four things compound, the system, the trust, your team starting already tuned, and our knowledge of your operation.
            </p>
            <p>
              Two decision points sit before any build, both made real by payment. The <span className="text-[var(--ink)] font-medium">Fit gate</span>, an interview, both directions. The <span className="text-[var(--ink)] font-medium">Commit gate</span>, the implementation quote, delivered inside the paid audit. A no at either is a clean stop, not a failure.
            </p>
          </div>
        </Container>
      </section>

      {/* THE MEMBRANE */}
      <section className="py-14 md:py-16">
        <Container>
          <SectionHead title={<>The <em className="italic text-id8-orange">Membrane</em></>} meta="After launch" />
          <div className="mt-8 mb-10 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              Once HALO is live, you run it, and every change passes through a membrane, not a wall. Reversible, on-brand edits flow freely. Anything that would touch the DNA routes back to us. You get autonomy and an anchor at once. Two gates, one DNA.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <EditorialCard>
              <p className="mb-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Gate One, the agent</p>
              <p className="font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.6] text-[var(--body)]">
                Reversible, on-brand changes pass freely, checked against your DNA the way we check our own work. The retainer keeps it running. The agent never acts beyond what is reversible.
              </p>
            </EditorialCard>
            <EditorialCard featured>
              <p className="mb-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">Gate Two, the studio</p>
              <p className="font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.6] text-[var(--body)]">
                Anything structural, a new look, a shift in voice, a change to the judgment underneath, routes to us as a clean ticket. The system never changes its own DNA on its own.
              </p>
            </EditorialCard>
          </div>
          <div className="mt-10 max-w-3xl space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              The retainer is custodianship, not support hours. Through <span className="text-[var(--ink)] font-medium">Attunement</span> we take golden examples from the actual workers, the corrections they make, the cases that escalate, and turn them into an eval rubric and a golden dataset, so the system keeps matching how the work really arrives. The loop eats human signal, never its own output. The human in the loop is the load-bearing column, placed there by design. It is the thing everyone else races to remove, and the thing we build the position on.
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
