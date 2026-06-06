'use client'

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

const tips = [
  {
    title: '1. Front-load what matters',
    body: 'Put the most important information first. The AI pays more attention to what comes early.',
    pairs: [
      { label: 'Bad', text: '"Here\'s my entire project history... oh and I need a subject line for this email."' },
      { label: 'Good', text: '"Write a subject line for this sales follow-up email. Context: meeting yesterday, discussed pricing, they seemed interested."', good: true },
    ],
  },
  {
    title: "2. Don't dump everything",
    body: "More pages doesn't mean better output. Give context that's relevant to THIS task.",
    pairs: [
      { label: 'Ask yourself', text: '"If I were delegating this to a human, what would they actually need to know?"' },
    ],
  },
  {
    title: '3. Long conversations drift',
    body: "After 10-15 back-and-forth messages, the AI starts losing track of what you're actually trying to do.",
    pairs: [
      { label: 'Solution', text: 'Start a new conversation and restate what you need with fresh context.' },
    ],
  },
  {
    title: '4. Restating helps refocus',
    body: 'If output quality drops mid-conversation, summarize what you need again.',
    pairs: [
      { label: '', text: '"Let me refocus: I need three subject line options for a cold outreach email to CTOs. Keep them under 50 characters."' },
    ],
  },
]

export default function Module4Page() {
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

          <Kicker dot>Module 4 · ~10 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            The Attention <em className="italic text-id8-orange">Budget</em>
          </h1>

          <Deck className="mt-6">
            Why more context often makes things worse. How to feed information strategically.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 4 of 6' },
              { label: '~10 min read' },
            ]}
          />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* The Concept */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Concept" className="mb-8" />
          <Prose>
            <p>
              AI has a limited context window — think of it as working memory. It can only &quot;see&quot; so much at once.
            </p>
            <p>
              Here&apos;s the counterintuitive part: <strong>more isn&apos;t always better</strong>. More context often makes output worse because attention gets diluted.
            </p>
          </Prose>
          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">
              The Rule
            </p>
            <p className="text-[var(--ink)] leading-[1.7]">
              Give the AI exactly what it needs to do the job. No more, no less.
            </p>
          </div>
        </Container>
      </section>

      {/* The Desk Analogy */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Desk Analogy" className="mb-8" />
          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] mb-6">
            <div className="bg-[var(--paper)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                Cluttered Desk
              </p>
              <p className="text-sm text-[var(--body)] mb-3">
                Important things get buried under context that doesn&apos;t matter for the current task.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Result: Unfocused, generic output
              </p>
            </div>
            <div className="bg-[var(--paper)] p-5 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">
                Clean Desk
              </p>
              <p className="text-sm text-[var(--body)] mb-3">
                The AI sees exactly what matters. Work gets done efficiently and accurately.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink)]">
                Result: Focused, precise output
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--body)] leading-[1.7]">
            When you dump everything into the conversation hoping the AI will &quot;figure it out,&quot; you&apos;re creating a cluttered desk. It has to sift through noise to find the signal.
          </p>
        </Container>
      </section>

      {/* Practical Tips */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Practical Tips" className="mb-8" />
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-[var(--paper)] p-5">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-[var(--body)] mb-3">{tip.body}</p>
                <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-3 space-y-3">
                  {tip.pairs.map((pair, i) => (
                    <div key={i}>
                      {pair.label && (
                        <p className={`font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] mb-1 ${pair.good ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>
                          {pair.label}
                        </p>
                      )}
                      <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--body)]">
                        {pair.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Right Altitude */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Finding the Right Altitude" className="mb-8" />
          <Prose>
            <p>
              There&apos;s a sweet spot between too specific and too vague. Here&apos;s how to find it:
            </p>
          </Prose>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="border-b border-[var(--hair-hard)]">
                <tr>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Too Specific
                  </th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-id8-orange">
                    Just Right
                  </th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Too Vague
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--hair)]">
                  <td className="py-3 px-4 text-[var(--muted)]">Micromanaging every detail, leaving no room for the AI to think</td>
                  <td className="py-3 px-4 text-[var(--ink)] bg-[var(--paper-shadow)]">Clear intent with room to execute</td>
                  <td className="py-3 px-4 text-[var(--muted)]">&quot;Help me with this&quot;</td>
                </tr>
                <tr className="border-b border-[var(--hair)]">
                  <td className="py-3 px-4 text-[var(--muted)]">Brittle — breaks if anything changes</td>
                  <td className="py-3 px-4 text-[var(--ink)] bg-[var(--paper-shadow)]">Flexible, consistent results</td>
                  <td className="py-3 px-4 text-[var(--muted)]">Inconsistent results every time</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-5 space-y-3 text-sm">
            <div>
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">Too specific</p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--body)]">
                &quot;Use exactly 47 words. Start with &lsquo;The&rsquo;. Use the word &lsquo;innovative&rsquo; in sentence 3...&quot;
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-1">Just right</p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">
                &quot;Write a 50-word product description. Professional tone. Focus on time savings.&quot;
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">Too vague</p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--body)]">&quot;Make it sound good&quot;</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Try This */}
      <section className="pb-14">
        <Container narrow>
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-8">
            <Kicker dot className="mb-6">Try This</Kicker>
            <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">
              The Attention Budget Test
            </h3>
            <p className="text-[var(--body)] mb-4">
              Take a prompt you&apos;ve used recently. Try cutting it in half. Compare the results.
            </p>
            <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                You&apos;ll often find
              </p>
              <ul className="space-y-2">
                {[
                  'The shorter version is clearer',
                  'The AI focuses on what actually matters',
                  'Output quality goes up, not down',
                ].map((s, i) => (
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

      {/* Key Takeaway */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Key Takeaway" className="mb-8" />
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="text-lg text-[var(--ink)] leading-[1.7]">
              The AI&apos;s attention is finite. <strong>More context does not equal better output.</strong> Give it exactly what it needs to do the job. No more, no less. Front-load what matters. Trim the rest.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="ai-conversation-fundamentals"
            moduleSlug="module-4"
            nextModulePath="/courses/ai-conversation-fundamentals/module-5"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-3" variant="ghost">
              &larr; Previous: The Iteration Loop
            </EditorialButton>
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-5" variant="primary">
              Next: Module 5 — Putting It Together &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
