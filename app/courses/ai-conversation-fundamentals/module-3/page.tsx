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
const moves = [
  {
    name: "REDIRECT",
    when: "AI misunderstood your intent",
    phrase: "That's not quite it. I meant [X].",
    example: "You asked for 'simple pricing table' and got a complex chart. Say: 'Not quite — I meant a 3-column comparison with just plan names, prices, and top features.'",
  },
  {
    name: "REFINE",
    when: "Output is mostly right but needs tweaking",
    phrase: "Good, but adjust [specific thing].",
    example: "You got a good draft but the tone is too formal. Say: 'This is close. Make it more conversational — like you're talking to a friend over coffee.'",
  },
  {
    name: "RESTART",
    when: "Completely off track",
    phrase: "Start fresh with better prompt",
    example: "You asked vaguely and got something useless. Don't iterate on garbage. Write a new prompt using the 5 levers.",
  }
]

const decisionTable = [
  { quality: "70%+ right", move: "REFINE", example: "Good structure, wrong tone" },
  { quality: "50-70% right", move: "REDIRECT", example: "Wrong focus, but salvageable" },
  { quality: "Directionally wrong", move: "REDIRECT", example: "Misunderstood the core ask" },
  { quality: "Completely off", move: "RESTART", example: "Not even close to useful" },
]

const takeaways = [
  { num: 1, text: "Don't start over when output is imperfect. Iteration preserves useful context." },
  { num: 2, text: "Diagnose first: What percentage right? Why didn't it work? Which move fits?" },
  { num: 3, text: "REDIRECT when AI misunderstood. REFINE when it's close. RESTART when it's hopeless." },
  { num: 4, text: "The decision table is your friend: 70%+ = Refine, 50-70% = Redirect, <50% = Restart." },
  { num: 5, text: "Great results usually take 2-3 iterations. That's normal and much faster than starting over." },
]

export default function Module3Page() {
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
            currentModule={3}
            totalModules={6}
            courseTitle="AI Conversation Fundamentals"
          />

          <Kicker dot>Module 3 · ~10 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            The Iteration <em className="italic text-id8-orange">Loop</em>
          </h1>

          <Deck className="mt-6">
            How to read AI output as feedback. When to refine, when to redirect, when to restart.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 3 of 6' },
              { label: '~10 min read' },
            ]}
          />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* The Mistake Most People Make */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Mistake Most People Make" className="mb-8" />
          <Prose>
            <p>
              When the output isn&apos;t quite right, most people start completely over. They throw away the conversation and write a brand new prompt from scratch.
            </p>
          </Prose>
          <div className="mt-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
              Why this is wrong
            </p>
            <p className="text-[var(--body)] leading-[1.7]">
              You&apos;re throwing away useful context. The AI already understands the domain, the general direction, the constraints. Starting over means re-teaching all of that.
            </p>
          </div>
        </Container>
      </section>

      {/* The Better Approach */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Better Approach" className="mb-8" />
          <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-6 mb-8">
            <p className="font-[family-name:var(--font-mono)] text-center text-[var(--ink)] mb-2">
              Prompt &rarr; Output &rarr; Diagnose &rarr; Adjust &rarr; Better Output
            </p>
            <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--muted)] text-center">
              Iteration is a conversation, not a slot machine
            </p>
          </div>
          <Prose>
            <p>
              When output isn&apos;t right, pause and diagnose: <strong>Why didn&apos;t this work?</strong> Did the AI misunderstand? Is it close but needs tweaking? Is it completely off base?
            </p>
          </Prose>
        </Container>
      </section>

      {/* The Three Moves */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Three Moves" className="mb-8" />
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {moves.map((move, index) => (
              <div key={move.name} className="bg-[var(--paper)] p-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">
                    {move.name}
                  </h3>
                </div>
                <div className="mb-4">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">
                    Use when
                  </p>
                  <p className="text-[var(--body)]">{move.when}</p>
                </div>
                <div className="mb-4 border border-[var(--hair)] bg-[var(--paper-shadow)] p-3">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-1">
                    What to say
                  </p>
                  <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]">
                    &quot;{move.phrase}&quot;
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">
                    Example
                  </p>
                  <p className="text-sm text-[var(--body)]">{move.example}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Decision Heuristic */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Decision Heuristic: Which Move?" className="mb-8" />
          <Prose>
            <p>Use this quick decision tree when output isn&apos;t perfect:</p>
          </Prose>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="border-b border-[var(--hair-hard)]">
                <tr>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Output Quality
                  </th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Move
                  </th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {decisionTable.map((row, index) => (
                  <tr key={index} className="border-b border-[var(--hair)]">
                    <td className="py-3 px-4 text-[var(--body)]">{row.quality}</td>
                    <td className="py-3 px-4">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange">
                        {row.move}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Real Iteration Example */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Real Iteration Example" className="mb-8" />
          <div className="space-y-4">
            <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                First Attempt
              </p>
              <p className="text-sm text-[var(--body)] mb-2">
                <strong className="text-[var(--ink)]">You:</strong> &quot;Write an email to my team about the new project timeline.&quot;
              </p>
              <p className="text-sm text-[var(--body)]">
                <strong className="text-[var(--ink)]">AI:</strong> [Generic, formal email that doesn&apos;t match your voice]
              </p>
            </div>

            <p className="text-center font-[family-name:var(--font-mono)] text-xs text-id8-orange">
              Diagnosis: 60% right &rarr; REDIRECT
            </p>

            <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">
                Redirect (clarify intent)
              </p>
              <p className="text-sm text-[var(--body)]">
                <strong className="text-[var(--ink)]">You:</strong> &quot;Not quite. We&apos;re behind schedule and I need to be honest about that without creating panic. Tone should be: &lsquo;Here&apos;s what happened, here&apos;s the new plan, we&apos;ve got this.&apos;&quot;
              </p>
              <p className="text-sm text-[var(--body)] mt-2">
                <strong className="text-[var(--ink)]">AI:</strong> [Better email, right tone, but too long]
              </p>
            </div>

            <p className="text-center font-[family-name:var(--font-mono)] text-xs text-id8-orange">
              Diagnosis: 85% right &rarr; REFINE
            </p>

            <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">
                Refine (small adjustment)
              </p>
              <p className="text-sm text-[var(--body)]">
                <strong className="text-[var(--ink)]">You:</strong> &quot;Good. Cut it to 3 paragraphs max. Keep the directness.&quot;
              </p>
              <p className="text-sm text-[var(--body)] mt-2">
                <strong className="text-[var(--ink)]">AI:</strong> [Perfect. Ready to send.]
              </p>
            </div>

            <div className="border border-[var(--hair)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                Result
              </p>
              <p className="text-sm text-[var(--body)]">
                Two iterations, 90 seconds total. You got exactly what you needed by diagnosing quality and making the right move each time.
              </p>
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
              Your challenge: Practice diagnosing output
            </p>
            <p className="text-[var(--body)] mb-4">
              Next time you get imperfect output from AI, pause before starting over. Ask yourself:
            </p>
            <ol className="space-y-3 mb-6">
              {[
                <><strong className="text-[var(--ink)]">What percentage is this right?</strong> (Be honest)</>,
                <><strong className="text-[var(--ink)]">Why didn&apos;t it work perfectly?</strong> (Misunderstanding? Missing context? Wrong tone?)</>,
                <><strong className="text-[var(--ink)]">Which move fits?</strong> (Redirect, Refine, or Restart)</>,
              ].map((q, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[var(--body)] flex-1">{q}</p>
                </li>
              ))}
            </ol>
            <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
                Success looks like
              </p>
              <p className="text-sm text-[var(--body)]">
                You get to a great result in 2-3 iterations instead of starting from scratch 5 times.
              </p>
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
            moduleSlug="module-3"
            nextModulePath="/courses/ai-conversation-fundamentals/module-4"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-2" variant="ghost">
              &larr; Previous: The Core Toolkit
            </EditorialButton>
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-4" variant="primary">
              Next: Module 4 — The Attention Budget &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
