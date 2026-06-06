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
import { CopyableCode, TryThisNow, MentorNote } from '../_components'

const ic = 'font-[family-name:var(--font-mono)] text-[0.9em] bg-[var(--paper-mid)] px-1.5 py-0.5'

const contains = [
  'What this project is about',
  'Key decisions you\'ve made',
  'Your preferences and style',
  'Important context Claude needs',
  'Where things are located',
]
const enables = [
  'No more re-explaining your project',
  'Consistent outputs that match your style',
  'Claude knows your file structure',
  'Context that persists across sessions',
  'Teammates can share context with Claude',
]

const includeSections = [
  { title: 'Project Overview', tag: 'Essential', accent: true, body: "What is this? What's the goal? 2-3 sentences that ground Claude in what you're building." },
  { title: 'File Structure', tag: 'Essential', accent: true, body: "Where are things? What's in each folder? Claude can navigate better when it knows the layout." },
  { title: 'Voice & Style', tag: 'For writing projects', accent: false, body: "How should outputs sound? Formal? Casual? What's your brand voice? Include examples if helpful." },
  { title: 'Key Decisions', tag: 'Optional but helpful', accent: false, body: 'Decisions you\'ve already made that Claude shouldn\'t question. "We\'re using X approach, not Y."' },
  { title: 'Current Status', tag: 'Keep updated', accent: false, body: "What phase is the project in? What's being worked on now? Update this as things change." },
  { title: 'Audience / Stakeholders', tag: 'For client/public work', accent: false, body: 'Who is this for? What do they care about? What\'s their context? Helps Claude tailor outputs.' },
]

const updating = [
  { title: 'Weekly: Update "Current Status"', body: 'Spend 2 minutes updating what you\'re working on. "Currently drafting Part 2" → "Currently editing Part 2"' },
  { title: 'After Big Decisions: Add to "Key Decisions"', body: 'When you make an important choice ("We\'re targeting enterprise, not SMB"), add it so Claude doesn\'t re-litigate.' },
  { title: 'Monthly: Review and Prune', body: 'Remove outdated info. Old status updates, completed milestones, decisions that no longer matter.' },
  { title: 'When Claude Gets It Wrong: Add Clarification', body: 'If Claude keeps making the same mistake, add guidance to prevent it. "Don\'t use jargon" or "Always include examples"' },
]

const templates = [
  {
    title: 'Writing Project (Blog, Newsletter, Book)',
    code: `# [Project Name] Memory

## What This Is
[1-2 sentences: what are you writing and why]

## Voice & Style
- Tone: [formal/casual/conversational/academic]
- Perspective: [first person/second person/third person]
- Sentence length: [short and punchy / longer and flowing]
- Key trait: [what makes your voice distinctive]

## Audience
[Who reads this? What do they care about? What's their level of knowledge?]

## Current Work
- Working on: [current piece]
- Status: [drafting/editing/almost done]
- Next up: [what's after this]

## Structure
- /drafts/ — work in progress
- /published/ — completed pieces
- /ideas/ — future topics

## Rules
- [Things to always do]
- [Things to never do]`,
  },
  {
    title: 'Research Project',
    code: `# [Research Topic] Memory

## Research Question
[The main question you're investigating]

## Scope
- Focus areas: [what's included]
- Out of scope: [what you're NOT researching]
- Time period: [if relevant]

## Sources
- Primary: [where you're getting data]
- Key references: [important papers/books/sources]
- To explore: [sources you haven't gotten to yet]

## Current Status
- Phase: [discovery/deep dive/synthesis/writing]
- Working on: [current focus]
- Key findings so far: [bullet points]

## File Structure
- /sources/ — PDFs, articles, raw materials
- /notes/ — Your notes and annotations
- /synthesis/ — Emerging insights and frameworks
- /output/ — Final deliverables`,
  },
  {
    title: 'Client Project',
    code: `# [Client Name] Project Memory

## Client Overview
- Company: [what they do]
- Our engagement: [what we're doing for them]
- Key contact: [who we work with]

## Project Scope
[What we're delivering and by when]

## Client Preferences
- Communication style: [formal/casual]
- Decision maker: [who approves things]
- Hot buttons: [what they care most about]
- Avoid: [topics or approaches they don't like]

## Current Phase
- Status: [where we are]
- Deliverables: [what's due]
- Blockers: [what's slowing us down]

## Key Decisions Made
- [Decision 1: what we decided and why]
- [Decision 2: what we decided and why]

## Files
- /deliverables/ — work products for client
- /internal/ — our working documents
- /communications/ — emails and meeting notes`,
  },
]

const courseRecap = [
  'Module 0-5: Delegation mindset, files, writing, research, workflows',
  'Module 6: Custom commands — your saved prompts',
  'Module 7: Tool connections — Claude accessing your apps',
  'Module 8: Session management — staying sharp in long projects',
  'Module 9: Project memory — persistent context across sessions',
]

const takeaways = [
  { num: 1, text: "CLAUDE.md files give Claude persistent memory. Create one in each project folder." },
  { num: 2, text: "Include: what the project is, file structure, your style, key decisions, current status." },
  { num: 3, text: "Global memory (~/.claude/CLAUDE.md) holds preferences that apply everywhere." },
  { num: 4, text: "Keep it updated — outdated memory is almost as bad as no memory." },
  { num: 5, text: "Start simple. A 10-line file is better than nothing. Expand as you learn what helps." },
]

export default function Module9Page() {
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

          <Kicker dot>Module 9 · 45 min · Final Module</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Project <em className="italic text-id8-orange">Memory</em>
          </h1>

          <Deck className="mt-6">
            Make Claude remember your projects across sessions. Create persistent context so you never have to re-explain your work.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 9' },
              { label: '45 min' },
            ]}
          />

          <p className="mt-6 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            Open Claude — we&apos;re creating your first project memory file.
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
          <SectionHead title="The Fresh Start Problem" className="mb-8" />
          <Prose>
            <p>
              Every time you start a new Claude session, it&apos;s like meeting a new colleague who knows nothing about your work. You have to explain your project, your goals, your preferences — every single time.
            </p>
          </Prose>

          <div className="my-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Sound familiar?</p>
            <p className="text-[var(--body)]">
              &quot;Okay so I&apos;m working on a newsletter called [X], and I write in a conversational tone, and my audience is [Y], and I&apos;m currently working on a series about [Z], and the last post was about...&quot;
            </p>
            <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--muted)] mt-3">— You, at the start of every session</p>
          </div>

          <Prose>
            <p>
              What if Claude could <strong>remember all of this automatically?</strong> What if starting a new session felt like picking up where you left off with someone who already knows your work?
            </p>
          </Prose>

          <MentorNote>
            This is the single biggest upgrade to how I work with Claude. Creating project memory files transformed Claude from a tool I use into a partner who understands my work.
          </MentorNote>
        </Container>
      </section>

      {/* What is CLAUDE.md */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What is a Project Memory File?" className="mb-8" />
          <Prose>
            <p>
              A project memory file (called <code className={ic}>CLAUDE.md</code>) is a simple text file that Claude reads automatically at the start of every session when you&apos;re working in that folder.
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">It Contains</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                {contains.map((c, i) => <li key={i} className="flex gap-2"><span className="text-[var(--muted)]">—</span>{c}</li>)}
              </ul>
            </div>
            <div className="bg-[var(--paper)] p-4 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">It Enables</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                {enables.map((e, i) => <li key={i} className="flex gap-2"><span className="text-id8-orange">→</span>{e}</li>)}
              </ul>
            </div>
          </div>

          <div className="border border-[var(--hair)] p-4">
            <p className="text-sm text-[var(--body)]">
              <strong className="text-[var(--ink)]">How it works:</strong> When you open Claude in a folder that contains a <code className={ic}>CLAUDE.md</code> file, Claude reads it automatically. No commands needed — it just knows.
            </p>
          </div>
        </Container>
      </section>

      {/* Watch Me First */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Watch Me First: My Newsletter Project Memory" className="mb-8" />
          <Prose>
            <p>
              Let me show you my actual project memory file for my newsletter. This is what Claude reads every time I work on content:
            </p>
          </Prose>
          <div className="mt-6">
            <CopyableCode
              label="My real CLAUDE.md for newsletter work:"
              code={`# Newsletter Project Memory

## What This Is
Weekly newsletter about AI tools for knowledge workers. ~2000 subscribers. Published every Tuesday.

## My Voice
- Conversational, like explaining to a smart friend
- Use "you" and "I" freely
- Short paragraphs (2-3 sentences max)
- Include real examples from my own work
- Avoid jargon unless I explain it immediately
- Okay to be opinionated

## Current Series
Working on a 4-part series about "delegation mindset" — treating AI as a colleague, not a search engine.
- Part 1: Published (The Mental Model Shift)
- Part 2: In progress (Your First Delegation)
- Part 3: Not started (When Delegation Fails)
- Part 4: Not started (Building Habits)

## File Structure
- /drafts/ — Current drafts in progress
- /published/ — Final versions that went out
- /ideas/ — Raw ideas and notes for future issues
- /templates/ — My standard formats (intro, main, CTA)

## Key Decisions
- No affiliate links (for now)
- Always include one actionable takeaway
- Subject lines: curiosity + benefit format
- Never more than 800 words

## Audience
Writers, consultants, small business owners who are AI-curious but not technical. They want practical, not theoretical.`}
            />
          </div>
          <MentorNote>
            Notice it&apos;s not a rigid template — it&apos;s just everything I&apos;d tell a new collaborator about this project. Write it like you&apos;re onboarding someone.
          </MentorNote>
        </Container>
      </section>

      {/* Try This Now: Create Your First */}
      <section className="pb-14">
        <Container narrow>
          <TryThisNow title="Create Your First Project Memory File">
            <p className="text-[var(--body)] mb-4">
              Pick a project you&apos;re currently working on — could be a writing project, a research project, a business initiative, anything. Let&apos;s create a memory file for it.
            </p>
            <p className="text-[var(--body)] mb-4">Ask Claude to help you create it:</p>
            <CopyableCode
              code={`Help me create a CLAUDE.md file for my project.

The project is: [DESCRIBE YOUR PROJECT IN 1-2 SENTENCES]

Ask me questions about:
1. What this project is and its goals
2. My voice/style preferences
3. Current status and what I'm working on
4. File structure (where things are)
5. Key decisions I've made
6. Who the audience is (if applicable)

Then create a CLAUDE.md file I can save to my project folder.`}
            />
            <p className="text-[var(--body)] mt-4 mb-4">
              Claude will interview you, then generate a complete project memory file. Save it as <code className={ic}>CLAUDE.md</code> in your project&apos;s root folder.
            </p>
            <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-1">Success looks like</p>
              <p className="text-sm text-[var(--body)]">
                Next time you open Claude in that folder, it already knows your project. Try asking &quot;What am I working on?&quot; — it should know.
              </p>
            </div>
          </TryThisNow>
        </Container>
      </section>

      {/* What to Include */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What to Include in Your Project Memory" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Not every project needs every section. Here&apos;s a menu — pick what&apos;s relevant:</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {includeSections.map((s) => (
              <div key={s.title} className="bg-[var(--paper)] p-4">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-medium text-[var(--ink)]">{s.title}</p>
                  <span className={`font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.15em] ${s.accent ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>{s.tag}</span>
                </div>
                <p className="text-sm text-[var(--body)]">{s.body}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            Start simple. You can always add more later. A 10-line CLAUDE.md is better than no CLAUDE.md. You&apos;ll naturally discover what context helps most as you work.
          </MentorNote>
        </Container>
      </section>

      {/* Multiple Memory Files */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Building Your Memory System" className="mb-8" />
          <Prose>
            <p>You&apos;re not limited to one file. Here&apos;s how a complete memory system looks:</p>
          </Prose>

          <div className="my-6 border border-[var(--hair-hard)] bg-[var(--paper-mid)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">Your folder structure</p>
            <pre className="font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] whitespace-pre-wrap">
{`~/.claude/
└── CLAUDE.md          ← Global: your voice, preferences, how you work

~/Projects/
├── Newsletter/
│   └── CLAUDE.md      ← Project-specific: newsletter details
├── Client-ABC/
│   └── CLAUDE.md      ← Project-specific: client context
└── Research-AI/
    └── CLAUDE.md      ← Project-specific: research focus`}
            </pre>
          </div>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">Global Memory (~/.claude/CLAUDE.md)</p>
              <p className="text-sm text-[var(--body)]">Your general preferences, voice, and working style. Loaded for every session, everywhere.</p>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">Project Memory (in each project folder)</p>
              <p className="text-sm text-[var(--body)]">Specific context for that project. Only loaded when you&apos;re working in that folder.</p>
            </div>
          </div>

          <TryThisNow title="Create Your Global Memory">
            <p className="text-[var(--body)] mb-4">Let&apos;s create a global memory file with your general preferences. This will apply to all your sessions:</p>
            <CopyableCode
              code={`Help me create a global CLAUDE.md file for ~/.claude/

This should contain my general preferences that apply to all projects:
- My communication style preferences
- How I like outputs formatted
- Common tasks I do
- Things you should always/never do when working with me

Interview me to understand my preferences, then create the file.`}
            />
            <p className="text-[var(--body)] mt-4">
              Save the output to <code className={ic}>~/.claude/CLAUDE.md</code>
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* Keeping It Updated */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Keeping Your Memory Fresh" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">A memory file isn&apos;t &quot;set and forget.&quot; Here&apos;s how to keep it useful:</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {updating.map((u) => (
              <div key={u.title} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">{u.title}</p>
                <p className="text-sm text-[var(--body)]">{u.body}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            Think of it like onboarding documentation. If you hired someone new, you&apos;d update their docs when things change. Same idea here — Claude is your persistent collaborator, and this is their briefing doc.
          </MentorNote>
        </Container>
      </section>

      {/* Real Examples */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Templates for Common Project Types" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Here are starter templates for different kinds of work. Copy and customize:</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {templates.map((t) => (
              <div key={t.title} className="bg-[var(--paper)] p-6">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-4">{t.title}</h3>
                <CopyableCode code={t.code} />
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

      {/* Course Completion */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center mb-8">
            <Kicker dot className="justify-center">Course Complete</Kicker>
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
              You&apos;ve Completed the <em className="italic text-id8-orange">Course</em>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              You now have the complete toolkit for working with Claude as a knowledge worker.
            </p>
          </div>

          <div className="border border-[var(--hair)] p-6 mb-8">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">What you&apos;ve learned</p>
            <ul className="space-y-2">
              {courseRecap.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--body)]">
                  <span className="text-id8-orange flex-shrink-0">&rarr;</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)] mb-6">
              You&apos;re no longer someone who &quot;uses ChatGPT.&quot; You&apos;re someone who has a genuine AI collaborator — one that knows your work, matches your style, and amplifies what you can do.
            </p>
            <p className="font-[family-name:var(--font-serif)] italic text-xl text-id8-orange mb-8">
              Welcome to the future of knowledge work.
            </p>
            <div className="flex justify-center">
              <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
                Back to Course Overview &rarr;
              </EditorialButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="claude-for-knowledge-workers"
            moduleSlug="module-9"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-8" variant="ghost">
              &larr; Previous: Managing Long Sessions
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
              Course Overview &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
