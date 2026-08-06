'use client'

import EmailCapture from '@/components/EmailCapture'
import CourseFeedback from '@/components/CourseFeedback'
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

const DiscordIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const learnings = [
  {
    title: "The mental model shift",
    description: "AI output is diagnostic feedback, not final deliverables"
  },
  {
    title: "The 5 levers",
    description: "Specificity, context, constraints, format, iteration"
  },
  {
    title: "The iteration loop",
    description: "How to read output and decide: refine, redirect, or restart"
  },
  {
    title: "The attention budget",
    description: "More context doesn't always help. Front-load what matters."
  },
  {
    title: "The pattern",
    description: "Context + Task + Constraints + Quality bar — works every time"
  }
]

const chatLimits = [
  'Process entire folders of files at once',
  'Run code and see real output',
  'Build recurring workflows that run automatically',
  'Delegate file management, data cleanup, and system-level tasks',
  'Actually take action on your computer',
]

export default function Module6Page() {
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

          <Kicker dot>Module 6 · ~3 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            What&apos;s <em className="italic text-id8-orange">Next</em>
          </h1>

          <Deck className="mt-6">
            You&apos;ve completed the fundamentals. Here&apos;s what you&apos;ve learned and where to go from here.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 6 of 6' },
              { label: '~3 min read' },
            ]}
          />

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* What You've Learned */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What You&apos;ve Learned" className="mb-8" />
          <ol className="space-y-4">
            {learnings.map((item, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{item.title}</h3>
                  <p className="text-sm text-[var(--body)]">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-5">
            <p className="text-[var(--body)] leading-[1.7]">
              You now have the mental framework most people never develop. You understand how to think about AI conversations, how to read the feedback, and how to iterate toward better results.
            </p>
          </div>
        </Container>
      </section>

      {/* But There's a Ceiling */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="But There&apos;s a Ceiling" className="mb-8" />
          <Prose>
            <p>
              Chat interfaces like ChatGPT and Claude.ai are powerful for conversations. But they have limits.
            </p>
          </Prose>
          <div className="mt-6 border border-[var(--hair)] bg-[var(--paper-shadow)] p-5">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
              What you can&apos;t do in a chat interface
            </p>
            <ul className="space-y-2">
              {chatLimits.map((limit, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--body)]">
                  <span className="text-[var(--muted)] flex-shrink-0">—</span>
                  {limit}
                </li>
              ))}
            </ul>
          </div>
          <Prose className="mt-6">
            <p>
              That&apos;s where <strong>Claude Code</strong> (formerly Claude Desktop) comes in. It&apos;s the same AI, but with the ability to read your files, run commands, and actually do work on your behalf.
            </p>
          </Prose>
        </Container>
      </section>

      {/* CTAs */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Ready for the Next Level?" className="mb-8" />
          <div className="space-y-4">
            {/* CTA 1: Free Module 0 */}
            <div className="border border-[var(--hair)] p-6">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">Try Module 0 Free</h3>
              <p className="text-[var(--body)] mb-4">
                Install Claude Code and clean up your Downloads folder in 10 minutes. Experience what it&apos;s like to delegate real work.
              </p>
              <EditorialButton href="/courses/claude-for-knowledge-workers/module-0" variant="ghost">
                Start Module 0 &rarr;
              </EditorialButton>
            </div>

            {/* CTA 2: Full Course */}
            <div className="border border-[var(--rule)] relative before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange p-6 pt-7">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">Get the Full Course</h3>
                <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange">Recommended</span>
              </div>
              <p className="text-[var(--body)] mb-3">
                <strong className="text-[var(--ink)]">Claude for Knowledge Workers</strong> — Learn to delegate file management, data processing, research, and more. 5 modules of hands-on practice.
              </p>
              <div className="flex items-center gap-3 mb-4 font-[family-name:var(--font-mono)]">
                <span className="text-[var(--muted)] line-through">$197</span>
                <span className="text-2xl text-id8-orange">$99</span>
                <span className="text-xs text-[var(--teal)]">Launch Special</span>
              </div>
              <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
                Get Full Access &rarr;
              </EditorialButton>
            </div>

            {/* CTA 3: Keep exploring */}
            <div className="border border-[var(--hair)] p-6">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">Keep Exploring</h3>
              <p className="text-[var(--body)] mb-4">
                Browse the full Academy for more free and paid courses on building with AI.
              </p>
              <EditorialButton href="/academy" variant="ghost">
                Browse the Academy &rarr;
              </EditorialButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Discord Community */}
      <section className="pb-14">
        <Container narrow>
          <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-8 text-center">
            <Kicker dot className="justify-center">Community</Kicker>
            <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-3">
              Join the Community
            </h2>
            <p className="text-[var(--body)] mb-6 max-w-md mx-auto">
              Connect with other knowledge workers learning to delegate to AI. Share wins, ask questions, and see how others are using these patterns.
            </p>
            <div className="flex justify-center">
              <EditorialButton href="https://discord.gg/zun9MnNVcv" variant="primary" external>
                <DiscordIcon /> Join Discord
              </EditorialButton>
            </div>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              Free to join. No spam.
            </p>
          </div>
        </Container>
      </section>

      {/* Course Feedback */}
      <section className="pb-14">
        <Container narrow>
          <CourseFeedback
            courseId="ai-conversation-fundamentals"
            courseName="AI Conversation Fundamentals"
          />
        </Container>
      </section>

      {/* Email Capture */}
      <section className="pb-14">
        <Container narrow>
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-3">Stay in the Loop</h2>
            <p className="text-[var(--body)]">
              Get notified when we release new courses, tools, and resources.
            </p>
          </div>
          <EmailCapture
            source="ai-conversation-fundamentals-module-6"
            title="Join our mailing list for updates and tips"
          />
        </Container>
      </section>

      {/* Final Message */}
      <section className="py-20 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">Course Complete</Kicker>
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
              You&apos;ve Completed the <em className="italic text-id8-orange">Fundamentals</em>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[var(--body)] max-w-xl mx-auto">
              You now think differently about AI conversations. The patterns you&apos;ve learned here will serve you across every tool, every task, every domain.
            </p>
            <p className="mt-4 font-[family-name:var(--font-serif)] italic text-lg text-[var(--muted)]">
              Now go use it.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="ai-conversation-fundamentals"
            moduleSlug="module-6"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-5" variant="ghost">
              &larr; Previous: Putting It Together
            </EditorialButton>
            <EditorialButton href="/courses/ai-conversation-fundamentals" variant="ghost">
              Back to Course Overview
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
