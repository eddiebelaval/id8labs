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
import { CopyableCode, TryThisNow, MentorNote } from '../_components'

const kbd = 'font-[family-name:var(--font-mono)] text-xs px-2 py-1 border border-[var(--hair-hard)] bg-[var(--paper-mid)]'
const ic = 'font-[family-name:var(--font-mono)] text-[0.9em] bg-[var(--paper-mid)] px-1.5 py-0.5'

const problems = [
  { title: 'Context Pollution', body: "Old, irrelevant info clutters Claude's working memory" },
  { title: 'Conflicting Instructions', body: 'You said "do X" then later "actually do Y" — both are still in context' },
  { title: 'Drift', body: 'Small misunderstandings compound over many exchanges' },
]

const tools = [
  {
    n: 1, title: 'Escape (Stop Mid-Action)', sub: 'When Claude is doing something wrong, stop it immediately',
    body: 'If Claude starts down the wrong path — writing the wrong thing, reading the wrong file, taking too long — you can interrupt it.',
    how: <>Press <kbd className={kbd}>Escape</kbd> or <kbd className={kbd}>Ctrl+C</kbd> while Claude is responding</>,
    example: 'Example: Claude starts writing a 2000-word essay when you wanted bullet points. Escape. Redirect.',
  },
  {
    n: 2, title: 'Rewind (Go Back in Time)', sub: 'Undo the last few exchanges like they never happened',
    body: 'Sometimes you realize the conversation went wrong 3 messages ago. Instead of trying to correct course, just go back.',
    how: <>Type <code className={ic}>/undo</code> to remove the last exchange, or click the rewind icon next to a message</>,
    example: "Example: You gave Claude wrong context and it's been building on that mistake. Rewind to before you gave it, provide correct context, continue.",
  },
  {
    n: 3, title: 'Compact / Fresh Start', sub: 'Summarize and compress, or start completely fresh',
    body: 'After a long exploration, you know what you want. Compact the conversation to just the essentials, or start a new session with a clear brief.',
    how: <>Type <code className={ic}>/compact</code> to summarize context, or start a new conversation entirely</>,
    example: "Example: You've explored 5 approaches and settled on one. Compact removes the 4 rejected approaches from context.",
  },
]

const whenTable = [
  { situation: 'Claude is writing the wrong format', tool: 'Escape', why: 'Stop immediately, redirect' },
  { situation: 'I gave wrong instructions 2 messages ago', tool: 'Rewind', why: 'Undo the mistake, try again' },
  { situation: 'We explored 5 options, picked one', tool: 'Compact', why: 'Remove rejected options from context' },
  { situation: 'Session has been going for 2 hours', tool: 'Compact', why: 'Summarize to keep context fresh' },
  { situation: 'Claude seems confused about what I want', tool: 'Fresh Start', why: 'Clean slate with clear instructions' },
  { situation: 'I want to try a completely different approach', tool: 'Fresh Start', why: 'Old approach would pollute new thinking' },
]

const signs = [
  { sign: '"Claude keeps referencing old things I\'ve moved past"', use: <>Use: <span className="font-[family-name:var(--font-mono)] text-id8-orange">Compact</span> or <span className="font-[family-name:var(--font-mono)] text-id8-orange">Fresh Start</span></> },
  { sign: '"I have to repeat myself constantly"', use: <>Use: <span className="font-[family-name:var(--font-mono)] text-id8-orange">Compact</span> to surface key decisions</> },
  { sign: '"Claude seems to contradict itself"', use: <>Use: <span className="font-[family-name:var(--font-mono)] text-id8-orange">Rewind</span> to before the contradiction, or <span className="font-[family-name:var(--font-mono)] text-id8-orange">Fresh Start</span></> },
  { sign: '"The outputs are getting worse, not better"', use: <>Use: <span className="font-[family-name:var(--font-mono)] text-id8-orange">Fresh Start</span> with a clear, specific brief</> },
  { sign: '"I feel frustrated and stuck"', use: <>Use: <span className="font-[family-name:var(--font-mono)] text-id8-orange">Fresh Start</span> — your frustration signals the context is polluted</> },
]

const hygiene = [
  { title: 'The 30-Minute Check', body: 'Every 30 minutes of work, ask: "Is this conversation still focused? Do we need to compact?"' },
  { title: 'One Task, One Session', body: 'When switching to a completely different task, consider starting fresh rather than continuing.' },
  { title: 'Decision Checkpoints', body: 'When you make a key decision, confirm it: "So we\'re going with [X], correct? Let\'s proceed on that basis."' },
  { title: 'End-of-Exploration Compact', body: 'After exploring options, compact before implementing: "We explored A, B, C. We chose B. Summarize why and let\'s proceed."' },
]

const takeaways = [
  { num: 1, text: "Long sessions accumulate context — some helpful, some noise. You need tools to manage it." },
  { num: 2, text: "Escape stops Claude mid-action. Rewind undoes exchanges. Compact summarizes and clears." },
  { num: 3, text: "Strategic resets (fresh start with summary) beat pushing through messy contexts." },
  { num: 4, text: "Watch for warning signs: repetition, contradiction, declining quality, frustration." },
  { num: 5, text: "Proactive hygiene (30-min checks, one task per session) prevents most context problems." },
]

export default function Module8Page() {
  return (
    <article className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-10">
        <Container narrow>
          <div className="mb-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="ghost">
              &larr; Back to Course
            </EditorialButton>
          </div>

          <Kicker dot>Module 8 · 40 min · Hands-On</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Managing Long <em className="italic text-id8-orange">Sessions</em>
          </h1>

          <Deck className="mt-6">
            Keep Claude sharp during complex projects. Learn when to reset, how to rewind, and what to do when Claude seems confused.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 8' },
              { label: '40 min' },
            ]}
          />

          <p className="mt-6 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            Open Claude — we&apos;ll practice these techniques together.
          </p>

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* Split Tab Callout */}
      <section className="py-4 border-b border-[var(--hair)] bg-[var(--paper-shadow)]">
        <Container narrow>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--body)]">
              <span className="font-medium text-[var(--ink)]">Pro Tip:</span> Use your browser&apos;s Split Tab feature to follow along side-by-side with Claude Code open.
            </p>
            <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange whitespace-nowrap">New</span>
          </div>
        </Container>
      </section>

      {/* The Problem */}
      <section className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="Why Long Sessions Get Messy" className="mb-8" />
          <Prose>
            <p>
              You&apos;ve been working with Claude for an hour. You&apos;ve explored three different approaches, changed your mind twice, and now Claude seems... confused. It&apos;s referencing things from 30 messages ago that are no longer relevant. Sound familiar?
            </p>
          </Prose>

          <div className="my-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Here&apos;s what&apos;s happening</p>
            <p className="text-[var(--body)]">
              Claude remembers <strong className="text-[var(--ink)]">everything</strong> in the conversation. That&apos;s usually good — but when you&apos;ve gone down rabbit holes and changed direction, all that old context creates noise. Claude tries to honor all of it, even the stuff you&apos;ve moved past.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            {problems.map((p) => (
              <div key={p.title} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-1">{p.title}</p>
                <p className="text-sm text-[var(--body)]">{p.body}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            This isn&apos;t a flaw — it&apos;s how conversation works. You just need tools to manage it. Think of it like a whiteboard that never gets erased. Sometimes you need to wipe a section clean.
          </MentorNote>
        </Container>
      </section>

      {/* The Three Tools */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Your Three Context Tools" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Master these and you&apos;ll never feel stuck in a messy session again.</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {tools.map((t) => (
              <div key={t.n} className="bg-[var(--paper)] p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{String(t.n).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{t.title}</h3>
                    <p className="text-sm text-[var(--body)]">{t.sub}</p>
                  </div>
                </div>
                <p className="text-[var(--body)] mb-3">{t.body}</p>
                <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-3 mb-3">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-1">How to do it</p>
                  <p className="text-sm text-[var(--body)]">{t.how}</p>
                </div>
                <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--muted)]">{t.example}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Try This Now: The Tools */}
      <section className="pb-14">
        <Container narrow>
          <TryThisNow title="Practice the Three Tools">
            <p className="text-[var(--body)] mb-4">Let&apos;s practice each tool so you know how they feel. Open Claude and try these:</p>
            <div className="space-y-4">
              <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">1. Practice Escape</p>
                <p className="text-sm text-[var(--body)] mb-2">Ask Claude to write something long, then interrupt it:</p>
                <CopyableCode code={`Write a detailed 1000-word essay about the history of coffee.`} />
                <p className="text-sm text-[var(--body)] mt-2">As soon as it starts, press Escape or Ctrl+C. Notice how you can stop it mid-sentence.</p>
              </div>
              <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">2. Practice Rewind</p>
                <p className="text-sm text-[var(--body)] mb-2">Have a short exchange, then undo it:</p>
                <CopyableCode code={`Tell me a joke about programmers.`} />
                <p className="text-sm text-[var(--body)] mt-2">After Claude responds, type <code className={ic}>/undo</code>. The joke exchange disappears — Claude no longer remembers it.</p>
              </div>
              <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">3. Practice Compact</p>
                <p className="text-sm text-[var(--body)] mb-2">After a few exchanges, compress the context:</p>
                <CopyableCode code={`/compact`} />
                <p className="text-sm text-[var(--body)] mt-2">Claude will summarize everything discussed. Now you have a clean, focused context.</p>
              </div>
            </div>
            <div className="mt-4 border border-[var(--hair)] bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-1">Success looks like</p>
              <p className="text-sm text-[var(--body)]">You can confidently stop, rewind, or reset any session. No more feeling trapped in messy conversations.</p>
            </div>
          </TryThisNow>
        </Container>
      </section>

      {/* When to Use Each Tool */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="When to Use Each Tool" className="mb-8" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="border-b border-[var(--hair-hard)]">
                <tr>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Situation</th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Tool</th>
                  <th className="py-3 px-4 text-left font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Why</th>
                </tr>
              </thead>
              <tbody>
                {whenTable.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--hair)]">
                    <td className="py-3 px-4 text-[var(--body)]">{row.situation}</td>
                    <td className="py-3 px-4"><span className="font-[family-name:var(--font-mono)] text-id8-orange">{row.tool}</span></td>
                    <td className="py-3 px-4 text-[var(--muted)]">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MentorNote>
            I used to push through messy sessions, trying to &quot;correct&quot; Claude with more instructions. Now I recognize when it&apos;s faster to just reset. Don&apos;t be afraid to use these tools — they&apos;re not admitting failure, they&apos;re smart workflow management.
          </MentorNote>
        </Container>
      </section>

      {/* The Strategic Reset */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Strategic Reset: Start Fresh With Context" className="mb-8" />
          <Prose>
            <p>
              Sometimes the best move is starting a new conversation entirely. But here&apos;s the key: <strong>you bring the lessons learned with you.</strong>
            </p>
          </Prose>

          <div className="my-6 border border-[var(--hair)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">The Strategic Reset Pattern</p>
            <ol className="space-y-3">
              {[
                'Before you reset, ask Claude: "Summarize what we\'ve figured out so far in 3-4 bullet points."',
                'Copy that summary.',
                'Start a new conversation.',
                'Begin with: "Here\'s where I am on [project]: [paste summary]. Now I want to [next step]."',
              ].map((s, i) => (
                <li key={i} className="flex gap-3 text-[var(--body)]">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <TryThisNow title="Practice the Strategic Reset">
            <p className="text-[var(--body)] mb-4">Imagine you&apos;ve been exploring a project with Claude and want to start fresh. Use this pattern:</p>
            <CopyableCode
              label="Step 1: Get the summary (in current session)"
              code={`Before we continue, summarize what we've figured out so far:
- What decisions have we made?
- What approach are we taking?
- What's the current status?

Give me 3-4 bullet points I can use to start a fresh session.`}
            />
            <div className="my-4 border border-[var(--hair)] bg-[var(--paper)] p-3">
              <p className="text-sm text-[var(--body)]">
                <strong className="text-[var(--ink)]">Then:</strong> Copy the summary, start a new conversation, and begin with context.
              </p>
            </div>
            <CopyableCode
              label="Step 2: Start fresh (in new session)"
              code={`Here's where I am on [PROJECT]:

[PASTE YOUR SUMMARY HERE]

Now I want to [NEXT STEP]. Let's pick up from here with a clear focus.`}
            />
          </TryThisNow>
        </Container>
      </section>

      {/* Signs You Need to Reset */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Signs You Need a Reset" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Learn to recognize these signals — they mean it&apos;s time to use your context tools:</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {signs.map((s, i) => (
              <div key={i} className="bg-[var(--paper)] p-4 border-l-2 border-[var(--hair-hard)]">
                <p className="font-medium text-[var(--ink)]">{s.sign}</p>
                <p className="text-sm text-[var(--body)] mt-1">{s.use}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            The best sessions aren&apos;t the ones without resets — they&apos;re the ones where you recognize quickly when a reset is needed. It&apos;s like driving: the best drivers aren&apos;t the ones who never brake, they&apos;re the ones who brake at the right times.
          </MentorNote>
        </Container>
      </section>

      {/* Proactive Session Hygiene */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Proactive Session Hygiene" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Don&apos;t wait until things are messy. Build these habits into your workflow:</p>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {hygiene.map((h) => (
              <div key={h.title} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">{h.title}</p>
                <p className="text-sm text-[var(--body)]">{h.body}</p>
              </div>
            ))}
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
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">{String(item.num).padStart(2, '0')}</span>
                <p className="text-[var(--body)] flex-1">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What's Next */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">What&apos;s Next</Kicker>
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4">Project Memory</h2>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)] mb-4">
              Now you can manage context within a session. But what about between sessions? How do you make Claude remember your projects, your preferences, your way of working?
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--ink)]">
              In <strong>Module 9: Project Memory</strong>, we&apos;ll learn how to create persistent context that survives across sessions — so Claude always knows your projects.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="claude-for-knowledge-workers"
            moduleSlug="module-8"
            nextModulePath="/courses/claude-for-knowledge-workers/module-9"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-7" variant="ghost">
              &larr; Previous: Connecting Your Tools
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-9" variant="primary">
              Next: Project Memory &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
