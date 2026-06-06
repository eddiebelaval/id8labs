'use client'

import type { ReactNode } from 'react'
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

type Example = {
  heading: string
  before: { prompt: string; problem: string }
  after: { lines: ReactNode; why: string }
}

const examples: Example[] = [
  {
    heading: 'Example 1: Writing Task (Follow-up Email)',
    before: { prompt: '"Write a follow-up email"', problem: 'No context, no goal, no tone guidance' },
    after: {
      lines: (
        <>
          <p className="mb-2">&quot;Write a follow-up email to a prospect I met at a conference yesterday.</p>
          <p className="mb-2"><strong>Context:</strong> We talked about their team&apos;s struggle with manual data entry. They seemed interested in our automation tool but didn&apos;t commit.</p>
          <p className="mb-2"><strong>Goal:</strong> Schedule a 20-minute demo call next week.</p>
          <p className="mb-2"><strong>Tone:</strong> Professional but conversational. Reference our conversation.</p>
          <p><strong>Length:</strong> Under 150 words.&quot;</p>
        </>
      ),
      why: 'Context (conference, their pain point), Task (schedule demo), Constraints (tone, length), Quality bar (reference conversation)',
    },
  },
  {
    heading: 'Example 2: Analysis Task (Sales Data)',
    before: { prompt: '"Analyze this data"', problem: 'Which angle? For what purpose?' },
    after: {
      lines: (
        <>
          <p className="mb-2">&quot;Analyze this Q4 sales data. I&apos;m presenting to the executive team tomorrow.</p>
          <p className="mb-2"><strong>Specific questions:</strong></p>
          <ul className="ml-4 mb-2 space-y-1">
            <li>• Which product categories drove growth?</li>
            <li>• Did we hit our regional targets?</li>
            <li>• Any concerning trends in customer retention?</li>
          </ul>
          <p className="mb-2"><strong>Format:</strong> 3 bullet points per question. Lead with the answer, then supporting data.</p>
          <p><strong>Focus on:</strong> Actionable insights, not just numbers. If something needs attention, flag it.&quot;</p>
        </>
      ),
      why: 'Clear use case (exec presentation), Specific questions, Deliverable format, Permission to prioritize ("flag issues")',
    },
  },
  {
    heading: 'Example 3: Creative Task (Podcast Ideas)',
    before: { prompt: '"Give me podcast episode ideas"', problem: 'For what show? What audience? What style?' },
    after: {
      lines: (
        <>
          <p className="mb-2">&quot;Generate 5 podcast episode ideas for a show about productivity for remote workers.</p>
          <p className="mb-2"><strong>Show context:</strong> 30-minute episodes. Conversational, not preachy. Audience is knowledge workers tired of generic advice.</p>
          <p className="mb-2"><strong>Recent topics we&apos;ve covered:</strong> Deep work, async communication, avoiding burnout.</p>
          <p className="mb-2"><strong>Format for each idea:</strong></p>
          <ul className="ml-4 mb-2 space-y-1">
            <li>• Episode title (punchy, max 6 words)</li>
            <li>• 2-sentence description</li>
            <li>• One counterintuitive angle or hook</li>
          </ul>
          <p><strong>Avoid:</strong> Anything we&apos;ve done before. Generic &lsquo;tips and tricks&rsquo; angles.&quot;</p>
        </>
      ),
      why: 'Show context (style, audience), What to avoid (past topics), Deliverable format (title + description + hook), Quality bar (counterintuitive)',
    },
  },
  {
    heading: 'Example 4: Research Task (Decision Support)',
    before: { prompt: '"Tell me about solar panels"', problem: "Too broad. What's the decision?" },
    after: {
      lines: (
        <>
          <p className="mb-2">&quot;I&apos;m deciding whether to install solar panels on my house in northern California.</p>
          <p className="mb-2"><strong>My situation:</strong></p>
          <ul className="ml-4 mb-2 space-y-1">
            <li>• Average monthly electric bill: $180</li>
            <li>• Planning to stay in this house for 10+ years</li>
            <li>• Upfront budget: ~$20k</li>
          </ul>
          <p className="mb-2"><strong>What I need:</strong></p>
          <ul className="ml-4 mb-2 space-y-1">
            <li>• Realistic payback timeline</li>
            <li>• Major risks or downsides I should know</li>
            <li>• Whether to buy or lease</li>
          </ul>
          <p><strong>Skip:</strong> History of solar technology, general environmental benefits (I already support the idea).&quot;</p>
        </>
      ),
      why: 'Specific situation (location, budget, timeline), Clear scope (decision factors), Explicit "skip this" (saves attention for what matters)',
    },
  },
]

const pattern = [
  { num: 1, title: 'Context', body: "What's the situation? Who's the audience? What constraints exist?" },
  { num: 2, title: 'Task', body: 'What exactly do you need? Be specific about the deliverable.' },
  { num: 3, title: 'Constraints', body: 'Format, length, tone, style. What are the boundaries?' },
  { num: 4, title: 'Quality bar', body: "What makes this \"good\"? What should it avoid? How will you know it's right?" },
]

function ExampleBlock({ example }: { example: Example }) {
  return (
    <div className="space-y-4">
      <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-4">
        <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
          Before
        </p>
        <p className="font-[family-name:var(--font-mono)] text-sm italic text-[var(--ink)]">{example.before.prompt}</p>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mt-3">
          Problem: {example.before.problem}
        </p>
      </div>

      <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
        <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">
          After
        </p>
        <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--body)] border border-[var(--hair)] bg-[var(--paper)] p-3">
          {example.after.lines}
        </div>
        <div className="mt-3 border-l-2 border-id8-orange bg-[var(--paper)] p-3">
          <p className="text-xs text-[var(--body)]">
            <strong className="text-[var(--ink)]">Why it works:</strong> {example.after.why}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Module5Page() {
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

          <Kicker dot>Module 5 · ~10 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Putting It <em className="italic text-id8-orange">Together</em>
          </h1>

          <Deck className="mt-6">
            Real examples across writing, analysis, research, and creative work. See the patterns in action.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 5 of 6' },
              { label: '~10 min read' },
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
              You&apos;ve learned the mental models. Now let&apos;s see them in practice. Each example shows the before and after — and why the &quot;after&quot; version gets better results.
            </p>
          </Prose>
          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="text-sm text-[var(--body)]">
              <strong className="text-[var(--ink)]">The pattern you&apos;ll see repeated:</strong> Context + Task + Constraints + Quality bar
            </p>
          </div>
        </Container>
      </section>

      {/* Examples */}
      {examples.map((example) => (
        <section key={example.heading} className="pb-14">
          <Container narrow>
            <SectionHead title={example.heading} className="mb-8" />
            <ExampleBlock example={example} />
          </Container>
        </section>
      ))}

      {/* The Pattern */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Pattern" className="mb-8" />
          <Prose>
            <p>
              All four examples share the same structure. Once you see it, you can apply it to anything:
            </p>
          </Prose>
          <ol className="mt-6 space-y-4">
            {pattern.map((item) => (
              <li key={item.num} className="flex gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                  {String(item.num).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{item.title}</h3>
                  <p className="text-sm text-[var(--body)]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="text-sm text-[var(--body)]">
              <strong className="text-[var(--ink)]">Use this as a template.</strong> When you&apos;re not getting good results, check if you&apos;ve covered all four pieces. One of them is probably missing.
            </p>
          </div>
        </Container>
      </section>

      {/* Key Takeaway */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Key Takeaway" className="mb-8" />
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="text-lg text-[var(--ink)] leading-[1.7] mb-4">
              Good prompts aren&apos;t magic. They&apos;re structured. They give the AI exactly what it needs to deliver what you want.
            </p>
            <p className="text-[var(--body)] leading-[1.7]">
              Context + Task + Constraints + Quality bar. Use this pattern, and you&apos;ll get consistent results across any domain.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="ai-conversation-fundamentals"
            moduleSlug="module-5"
            nextModulePath="/courses/ai-conversation-fundamentals/module-6"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-4" variant="ghost">
              &larr; Previous: The Attention Budget
            </EditorialButton>
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-6" variant="primary">
              Next: Module 6 — What&apos;s Next &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
