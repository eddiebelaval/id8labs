'use client'

import CourseProgress from '@/components/CourseProgress'
import { ModuleComplete } from '@/components/progress'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  SectionHead,
  Prose,
  EditorialButton,
} from '@/components/editorial'

// Content data
const levers = [
  {
    number: 1,
    name: "CLARITY",
    description: "Say exactly what you mean. Specify format, length, tone, audience, goal.",
    before: "Write about marketing",
    after: "Write a 200-word LinkedIn post about why small businesses should invest in email marketing before paid ads. Tone: conversational but credible. End with a question."
  },
  {
    number: 2,
    name: "EXAMPLES",
    description: "Show the pattern you want. 2-3 examples establish a pattern.",
    before: "Write a product description that's punchy",
    after: "Write a product description for my notebook. Here's an example of the style I want: [example]. Now write something similar..."
  },
  {
    number: 3,
    name: "THINKING",
    description: "Let the AI reason before answering. Use for math, comparisons, complex analysis.",
    before: "Should I lease or buy this car?",
    after: "Think through the financial and practical tradeoffs step by step, then give me your recommendation."
  },
  {
    number: 4,
    name: "STRUCTURE",
    description: "Organize complex requests with clear sections.",
    before: "Wall of text about email to client",
    after: "Structured with Context, Goals (numbered), Constraints"
  },
  {
    number: 5,
    name: "ROLE",
    description: "Set the expertise level.",
    before: "Explain how mortgages work",
    after: "You're a financial advisor explaining mortgages to a first-time homebuyer..."
  }
]

const whenToUse = [
  { lever: 'CLARITY', text: 'The output is directionally right but not quite what you wanted. Add specifics about format, length, tone, or goal.' },
  { lever: 'EXAMPLES', text: "You want a specific style or format that's hard to describe. Show 2-3 examples and ask for something similar." },
  { lever: 'THINKING', text: 'The task requires reasoning, comparison, or analysis. Math problems, tradeoff analysis, strategic decisions.' },
  { lever: 'STRUCTURE', text: "You're making a complex request with multiple parts. Break it into numbered sections or bullet points." },
  { lever: 'ROLE', text: 'You need expertise at a specific level. "Explain like I\'m a beginner" vs. "Explain like I have a CS degree."' },
]

const combined = [
  { tag: 'ROLE', text: "You're a financial advisor with 15 years of experience." },
  { tag: 'CLARITY', text: 'Write a 300-word email to a 35-year-old professional who just got their first big raise. Tone: encouraging but practical.' },
  { tag: 'STRUCTURE', text: 'Include: 1) Congratulations, 2) Three actionable suggestions, 3) A warning about lifestyle inflation, 4) Next steps.' },
  { tag: 'THINKING', text: 'Think about what financial mistakes people at this stage commonly make, then write advice that addresses those specifically.' },
  { tag: 'EXAMPLES', text: "Here's an example of the tone I want: [paste example]." },
]

const successLooksLike = [
  'You get a usable first draft',
  'You can see which levers made the biggest difference',
  'You understand why the output improved',
]

const takeaways = [
  { num: 1, text: "The 5 levers give you precise control: Clarity, Examples, Thinking, Structure, Role." },
  { num: 2, text: "Clarity is the most commonly needed lever. Be specific about format, length, tone, and goal." },
  { num: 3, text: "Examples are underrated. 2-3 good examples teach the pattern better than paragraphs of description." },
  { num: 4, text: "Use 'Thinking' for anything that requires reasoning. Let the AI show its work." },
  { num: 5, text: "Combining levers compounds their effectiveness. Don't be afraid to use all 5 on important tasks." },
]

export default function Module2Page() {
  return (
    <article className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-10">
        <Container narrow>
          <div className="mb-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals" variant="ghost">
              &larr; Back to Course
            </EditorialButton>
          </div>

          <CourseProgress
            currentModule={2}
            totalModules={6}
            courseTitle="AI Conversation Fundamentals"
          />

          <Kicker dot>Module 2 · ~15 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            The Core <em className="italic text-id8-orange">Toolkit</em>
          </h1>

          <Deck className="mt-6">
            The 5 levers that control output quality. Master these and you&apos;ll consistently get better results.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 2 of 6' },
              { label: '~15 min read' },
            ]}
          />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* Introduction */}
      <section className="pb-14">
        <Container narrow>
          <Prose>
            <p>
              You&apos;ve learned to read AI output as diagnostic feedback. Now we&apos;re going to give you precise controls to shape that output.
            </p>
            <p>
              Think of these as knobs on a mixing board. Each lever adjusts a different aspect of the response. Used together, they give you remarkable control.
            </p>
          </Prose>
        </Container>
      </section>

      {/* The 5 Levers */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The 5 Levers" className="mb-8" />
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {levers.map((lever) => (
              <div key={lever.number} className="bg-[var(--paper)] p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                    {String(lever.number).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">
                    {lever.name}
                  </h3>
                </div>
                <p className="text-[var(--body)] mb-5">{lever.description}</p>
                <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
                  <div className="bg-[var(--paper-shadow)] p-4">
                    <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
                      Before
                    </p>
                    <p className="text-sm text-[var(--muted)]">{lever.before}</p>
                  </div>
                  <div className="bg-[var(--paper-shadow)] p-4 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
                    <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">
                      After
                    </p>
                    <p className="text-sm text-[var(--ink)]">{lever.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* When to Use Which Lever */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="When to Use Which Lever" className="mb-8" />
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {whenToUse.map((item) => (
              <div key={item.lever} className="bg-[var(--paper)] p-5">
                <p className="text-[var(--ink)] mb-1.5">
                  Use <span className="text-id8-orange font-medium">{item.lever}</span> when&hellip;
                </p>
                <p className="text-sm text-[var(--body)]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Combining Levers */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Combining Levers" className="mb-8" />
          <Prose>
            <p>
              The real power comes from using multiple levers together. Here&apos;s an example using all 5:
            </p>
          </Prose>

          <div className="mt-6 border border-[var(--hair)] bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-4">
              All 5 Levers in Action
            </p>
            <div className="space-y-3 text-sm text-[var(--body)]">
              {combined.map((item) => (
                <p key={item.tag}>
                  <span className="text-id8-orange font-medium">[{item.tag}]</span> {item.text}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Try This */}
      <section className="pb-14">
        <Container narrow>
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-8">
            <Kicker dot className="mb-6">Try This</Kicker>

            <p className="text-lg text-[var(--ink)] mb-4 leading-relaxed">
              Your challenge: Take a real task from your work
            </p>
            <p className="text-[var(--body)] mb-6">
              Think of something you actually need to write or figure out this week. Write a prompt using at least 3 of the 5 levers.
            </p>

            <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                Success looks like
              </p>
              <ul className="space-y-2">
                {successLooksLike.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--body)]">
                    <span className="text-id8-orange flex-shrink-0">&rarr;</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Takeaways */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Key Takeaways" className="mb-8" />
          <ol className="space-y-4">
            {takeaways.map((item) => (
              <li key={item.num} className="flex gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                  {String(item.num).padStart(2, '0')}
                </span>
                <p className="text-[var(--body)] flex-1">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="ai-conversation-fundamentals"
            moduleSlug="module-2"
            nextModulePath="/courses/ai-conversation-fundamentals/module-3"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-1" variant="ghost">
              &larr; Previous: The Mental Model Shift
            </EditorialButton>
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-3" variant="primary">
              Next: Module 3 — The Iteration Loop &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
