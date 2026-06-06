'use client'

import Link from 'next/link'
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

export default function Module1Page() {
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
            currentModule={1}
            totalModules={6}
            courseTitle="AI Conversation Fundamentals"
          />

          <Kicker dot>Module 1 · ~10 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            The Mental <em className="italic text-id8-orange">Model Shift</em>
          </h1>

          <Deck className="mt-6">
            Why AI is a collaborator, not a search engine — and what that means for how you use it.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 1 of 6' },
              { label: '~10 min read' },
            ]}
          />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* The Big Idea */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Big Idea" className="mb-8" />
          <Prose>
            <p>
              Most people treat AI like a search engine:{' '}
              <code>Type query → Get result → If result is bad, try different words</code>.
              This is why they get inconsistent results.
            </p>
            <p>
              <strong>AI isn&apos;t a search engine. It&apos;s a collaborator</strong> — one that&apos;s
              trying to figure out what you actually want based on incomplete information.
            </p>
          </Prose>

          {/* Comparison Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="border-b border-[var(--hair-hard)]">
                <tr>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    Search Engine
                  </th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-id8-orange">
                    Collaborator
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--hair)]">
                  <td className="py-3 px-4 text-[var(--muted)]">Query → Result</td>
                  <td className="py-3 px-4 text-[var(--body)]">Conversation → Refinement → Outcome</td>
                </tr>
                <tr className="border-b border-[var(--hair)]">
                  <td className="py-3 px-4 text-[var(--muted)]">One shot</td>
                  <td className="py-3 px-4 text-[var(--body)]">Iterative</td>
                </tr>
                <tr className="border-b border-[var(--hair)]">
                  <td className="py-3 px-4 text-[var(--muted)]">Right or wrong</td>
                  <td className="py-3 px-4 text-[var(--body)]">Closer or further</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-[var(--muted)]">You find info</td>
                  <td className="py-3 px-4 text-[var(--body)]">You shape output together</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* The Key Insight */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Key Insight: Output Is Diagnostic" className="mb-8" />
          <Prose>
            <p>
              When AI gives you something wrong, it&apos;s not failing.{' '}
              <strong>It&apos;s telling you what it thought you meant.</strong> Bad output =
              useful information about what was unclear in your input.
            </p>
          </Prose>

          <div className="mt-8 border border-[var(--hair)] bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-5">
              Example
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mb-1.5">You asked:</p>
                <p className="font-[family-name:var(--font-mono)] text-[var(--ink)]">&quot;Write me a bio&quot;</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mb-1.5">AI wrote:</p>
                <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">A formal, third-person, 500-word professional biography</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-id8-orange mb-1.5">What you learned:</p>
                <p className="text-[var(--body)]">You didn&apos;t specify tone, length, perspective, or context</p>
              </div>
            </div>
          </div>

          <Prose className="mt-8">
            <p>
              The AI&apos;s output just revealed four assumptions it made that you didn&apos;t intend.
              Now you know exactly what to clarify in your next message.
            </p>
          </Prose>
        </Container>
      </section>

      {/* The Mindset */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Mindset" className="mb-8" />
          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-6">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Instead of</p>
              <p className="text-lg text-[var(--muted)]">
                &quot;This AI is dumb, it didn&apos;t understand me&quot;
              </p>
            </div>
            <div className="bg-[var(--paper)] p-6 border-t-2 border-id8-orange">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">Try</p>
              <p className="text-lg text-[var(--ink)]">
                &quot;What did the AI think I meant? What was I unclear about?&quot;
              </p>
            </div>
          </div>

          <Prose className="mt-8">
            <p>
              This shift in mindset is the foundation of everything else in this course. When you
              start treating AI output as <strong>information about your input</strong> rather than{' '}
              <strong>the final answer</strong>, you can iterate toward exactly what you need.
            </p>
          </Prose>
        </Container>
      </section>

      {/* Try This Callout */}
      <section className="pb-14">
        <Container narrow>
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-8">
            <Kicker dot className="mb-6">Try This</Kicker>

            <p className="text-lg text-[var(--ink)] mb-6 leading-relaxed">
              Think of a recent AI interaction that didn&apos;t go well. Ask yourself:
            </p>

            <ol className="space-y-4">
              {[
                'What did I actually type?',
                'What did the AI produce?',
                'What assumptions did the AI make that I didn’t intend?',
                'What could I have said differently?',
              ].map((q, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[var(--body)] flex-1">{q}</p>
                </li>
              ))}
            </ol>

            <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--muted)] mt-6">
              This exercise is the diagnostic process in action. You&apos;re reverse-engineering what
              the AI inferred from your prompt.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="ai-conversation-fundamentals"
            moduleSlug="module-1"
            nextModulePath="/courses/ai-conversation-fundamentals/module-2"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals" variant="ghost">
              &larr; Back to Course Overview
            </EditorialButton>
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-2" variant="primary">
              Next: Module 2 — The Core Toolkit &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
