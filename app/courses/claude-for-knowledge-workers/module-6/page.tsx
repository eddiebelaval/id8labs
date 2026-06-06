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

const commands = [
  {
    n: 1, title: 'The Daily Digest', sub: 'Summarize any long document in 60 seconds', cmd: '/digest', file: 'digest.md',
    code: `Read the following and give me a digestible summary:

1. **One-sentence summary** - What is this about?
2. **Key points** - 3-5 bullet points of what matters
3. **Action items** - What, if anything, should I do?
4. **Questions raised** - What's unclear or needs follow-up?

Keep it under 200 words total. I'm busy.

$ARGUMENTS`,
  },
  {
    n: 2, title: 'The Meeting Prep', sub: 'Never walk into a meeting unprepared again', cmd: '/prep', file: 'prep.md',
    code: `Help me prepare for this meeting:

Based on what I tell you about the meeting, create a prep doc with:

1. **Context** - What's the background? What led to this meeting?
2. **My goals** - What do I want to accomplish?
3. **Their perspective** - What might they want or be concerned about?
4. **Questions to ask** - 3-5 good questions to guide the conversation
5. **Potential outcomes** - What are the possible results?

Keep each section to 2-3 sentences max.

$ARGUMENTS`,
  },
  {
    n: 3, title: 'The Email Drafter', sub: 'Turn bullet points into polished emails', cmd: '/email', file: 'email.md',
    code: `Draft an email based on my notes below.

Tone: Professional but warm. Not stiff, not casual.
Length: As short as possible while being complete.
Structure:
- Clear subject line
- One main point per paragraph
- Specific ask or next step at the end

My notes:
$ARGUMENTS`,
  },
  {
    n: 4, title: 'The Decision Helper', sub: 'Think through decisions systematically', cmd: '/decide', file: 'decide.md',
    code: `Help me think through this decision:

1. **Clarify the decision** - What exactly am I deciding?
2. **Options** - What are my realistic choices? (at least 3)
3. **Criteria** - What matters most in this decision?
4. **Analysis** - How does each option score on my criteria?
5. **Recommendation** - Based on this analysis, what would you suggest?
6. **Pre-mortem** - If I choose the recommended option and it fails, what's the most likely reason?

Be direct. I want clarity, not hand-holding.

$ARGUMENTS`,
  },
  {
    n: 5, title: 'The Explain It', sub: 'Understand anything complex quickly', cmd: '/explain', file: 'explain.md',
    code: `Explain this to me like I'm smart but unfamiliar with the topic:

1. **What is it?** - One sentence definition
2. **Why does it matter?** - Why should I care?
3. **How does it work?** - The core mechanism in plain language
4. **Example** - A concrete example I can visualize
5. **Common misconceptions** - What do people get wrong about this?

No jargon unless you explain it. Assume I can handle complexity, just not insider language.

$ARGUMENTS`,
  },
]

const makeItYours = [
  { title: '1. Notice your patterns', body: 'What do you ask Claude repeatedly? What prompts do you keep copying? Those are command candidates.' },
  { title: '2. Refine before you save', body: 'Use a prompt several times. Improve it each time. Only save it as a command once it consistently gives you what you want.' },
  { title: '3. Name it for the action', body: null },
  { title: '4. Include $ARGUMENTS', body: null },
]

const takeaways = [
  { num: 1, text: "Custom commands = saved prompts. Your best prompts, available with a single word." },
  { num: 2, text: "Commands live in ~/.claude/commands/ as .md files. The filename becomes the command." },
  { num: 3, text: "Use $ARGUMENTS for input. Whatever you type after the command goes there." },
  { num: 4, text: "Refine before you save. A command is only as good as the prompt inside it." },
  { num: 5, text: "Start small. 3-5 commands you'll actually use beats 50 you'll forget." },
]

export default function Module6Page() {
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

          <Kicker dot>Module 6 · 45 min · Hands-On</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Custom <em className="italic text-id8-orange">Commands</em>
          </h1>

          <Deck className="mt-6">
            Save your best prompts as reusable commands. Type one word, get consistent results every time.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 6' },
              { label: '45 min' },
            ]}
          />

          <p className="mt-6 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            Open Claude in another window — you&apos;ll be building alongside this lesson.
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

      {/* The Setup */}
      <section className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="What We&apos;re Learning (And Why It Matters)" className="mb-8" />
          <Prose>
            <p>
              Remember in Module 5 when we talked about templates? Custom commands are templates that live inside Claude itself. Instead of copying and pasting your best prompts, you save them as commands.
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Before: The Copy-Paste Life</p>
              <p className="text-sm text-[var(--body)]">
                &quot;Where did I save that prompt? Let me search my notes... Found it. Copy. Paste. Fill in the blanks. Hope I got the latest version.&quot;
              </p>
            </div>
            <div className="bg-[var(--paper)] p-4 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">After: One Word</p>
              <p className="text-sm text-[var(--ink)]">
                Type <code className={ic}>/weekly-review</code> and Claude knows exactly what you want. Same great results, every time.
              </p>
            </div>
          </div>

          <MentorNote>
            Here&apos;s something I wish someone told me earlier: the best prompts you&apos;ll ever write are the ones you&apos;ve refined through use. Custom commands let you lock in those refinements so you never lose them.
          </MentorNote>
        </Container>
      </section>

      {/* Watch Me First */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Watch Me First: Creating My Writing Review Command" className="mb-8" />
          <Prose>
            <p>
              Let me show you how I created a command I use every single day. I&apos;ll walk through my actual process so you can see how it works.
            </p>
          </Prose>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] my-6">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">Step 1: I noticed a pattern</p>
              <p className="text-[var(--body)]">
                Every time I finished a draft, I was asking Claude the same thing: &quot;Read this and tell me where it loses momentum, where the argument is weak, and what a skeptical reader would push back on.&quot; Same prompt, different drafts.
              </p>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">Step 2: I refined the prompt through use</p>
              <p className="text-[var(--body)]">
                Over a few weeks, I added things: &quot;Give me specific line numbers.&quot; &quot;Don&apos;t sugarcoat it.&quot; &quot;Prioritize the top 3 issues.&quot; Each draft made the prompt better.
              </p>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">Step 3: I saved it as a command</p>
              <p className="text-[var(--body)]">
                Once the prompt was battle-tested, I created a file called <code className={ic}>review-draft.md</code> in my <code className={ic}>.claude/commands/</code> folder. Now I just type <code className={ic}>/review-draft</code> and it runs my refined prompt.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-3">Here&apos;s my actual command file:</p>
            <CopyableCode
              code={`# Review Draft

You are my tough-but-fair editor. Read the draft I'm about to share and give me honest feedback.

Focus on:
1. **Momentum** - Where does the piece drag? Where might readers stop reading?
2. **Argument strength** - Where am I hand-waving instead of proving?
3. **Skeptic check** - What would a critical reader push back on?

Format your response as:
- Top 3 issues (most important first)
- Specific line-by-line notes
- One thing that's working well (so I don't accidentally cut it)

Don't sugarcoat. I'd rather fix problems now than publish weak work.

$ARGUMENTS`}
            />
          </div>

          <MentorNote>
            See that <code className={ic}>$ARGUMENTS</code> at the end? That&apos;s a placeholder. When I type <code className={ic}>/review-draft my-article.md</code>, Claude replaces $ARGUMENTS with &quot;my-article.md&quot;. Your input goes right where you need it.
          </MentorNote>
        </Container>
      </section>

      {/* Try This Now #1 */}
      <section className="pb-14">
        <Container narrow>
          <TryThisNow title="Create Your Commands Folder">
            <p className="text-[var(--body)] mb-4">
              Let&apos;s set up the folder where your commands will live. Open Claude and paste this:
            </p>
            <CopyableCode
              code={`Create a folder at ~/.claude/commands/ if it doesn't exist.

Then create a simple test command file called hello.md with this content:

---
Say hello and tell me one interesting fact about the current season.
$ARGUMENTS
---

Confirm when done.`}
            />
            <div className="mt-4 border border-[var(--hair)] bg-[var(--paper)] p-4">
              <p className="text-sm text-[var(--body)]">
                <strong className="text-[var(--ink)]">What just happened:</strong> You created the folder where all your custom commands will live. The <code className={ic}>.claude</code> folder is a hidden folder in your home directory — it&apos;s where Claude stores its configuration.
              </p>
            </div>
          </TryThisNow>

          <TryThisNow title="Test Your First Command">
            <p className="text-[var(--body)] mb-4">Now let&apos;s see if it works. In Claude, type this exactly:</p>
            <CopyableCode code={`/hello`} />
            <p className="text-[var(--body)] mt-4 mb-4">
              Claude should greet you and share a seasonal fact. If it worked — congratulations, you just ran your first custom command!
            </p>
            <div className="border border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">If it didn&apos;t work</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                <li>Make sure the folder is exactly <code className={ic}>~/.claude/commands/</code></li>
                <li>Check that the file is named <code className={ic}>hello.md</code> (not hello.txt)</li>
                <li>Try restarting Claude</li>
              </ul>
            </div>
          </TryThisNow>
        </Container>
      </section>

      {/* The Anatomy of a Command */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Anatomy of a Custom Command" className="mb-8" />
          <Prose>
            <p>Every command is just a markdown file with your prompt inside. Here&apos;s the structure:</p>
          </Prose>

          <div className="my-6 border border-[var(--hair)] p-6 space-y-4">
            <div className="flex items-start gap-4">
              <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange flex-shrink-0">File Name</span>
              <div>
                <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]">~/.claude/commands/your-command-name.md</code>
                <p className="text-sm text-[var(--body)] mt-1">The file name becomes the command. <code className={ic}>weekly-review.md</code> → <code className={ic}>/weekly-review</code></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange flex-shrink-0">Contents</span>
              <div>
                <p className="text-[var(--ink)]">Your prompt, written in plain text or markdown</p>
                <p className="text-sm text-[var(--body)] mt-1">Write it exactly as you would paste it into Claude</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange flex-shrink-0">$ARGUMENTS</span>
              <div>
                <p className="text-[var(--ink)]">Placeholder for what you type after the command</p>
                <p className="text-sm text-[var(--body)] mt-1"><code className={ic}>/review draft.md</code> → $ARGUMENTS becomes &quot;draft.md&quot;</p>
              </div>
            </div>
          </div>

          <MentorNote>
            I keep my command files simple. No fancy formatting, no complex logic. Just the prompt I want to run. The power is in consistency, not complexity.
          </MentorNote>
        </Container>
      </section>

      {/* Commands That Will Change Your Workflow */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Five Commands That Will Change Your Workflow" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">These are the commands I use most. Steal them, modify them, make them yours.</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {commands.map((c) => (
              <div key={c.n} className="bg-[var(--paper)] p-6">
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{c.n}. {c.title}</h3>
                    <p className="text-sm text-[var(--body)]">{c.sub}</p>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange whitespace-nowrap">{c.cmd}</span>
                </div>
                <CopyableCode label={c.file} code={c.code} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Try This Now #2 */}
      <section className="pb-14">
        <Container narrow>
          <TryThisNow title="Build Your First Real Command">
            <p className="text-[var(--body)] mb-4">
              Pick ONE command from the list above that you&apos;d actually use. Let&apos;s create it together. Copy this into Claude:
            </p>
            <CopyableCode
              code={`Create a custom command file for me.

Save it to ~/.claude/commands/[command-name].md

Use this content:
[PASTE THE COMMAND CONTENT YOU CHOSE]

Then tell me how to test it.`}
            />
            <p className="text-[var(--body)] mt-4 mb-4">
              After Claude creates the file, test it immediately with real content. For example:
            </p>
            <ul className="text-sm text-[var(--body)] space-y-2 mb-4">
              <li><code className={ic}>/digest</code> + paste a long article</li>
              <li><code className={ic}>/prep</code> + describe an upcoming meeting</li>
              <li><code className={ic}>/email</code> + your messy notes</li>
            </ul>
            <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-1">Success looks like</p>
              <p className="text-sm text-[var(--body)]">
                You type one word, Claude runs your full prompt, and the output is immediately useful.
              </p>
            </div>
          </TryThisNow>
        </Container>
      </section>

      {/* Make It Yours */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Make It Yours: Creating Custom Commands" className="mb-8" />
          <Prose>
            <p>
              The commands I shared are starting points. The real power comes from commands tailored to YOUR work. Here&apos;s how to create them:
            </p>
          </Prose>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">1. Notice your patterns</p>
              <p className="text-sm text-[var(--body)]">What do you ask Claude repeatedly? What prompts do you keep copying? Those are command candidates.</p>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">2. Refine before you save</p>
              <p className="text-sm text-[var(--body)]">Use a prompt several times. Improve it each time. Only save it as a command once it consistently gives you what you want.</p>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">3. Name it for the action</p>
              <p className="text-sm text-[var(--body)]">
                Good names: <code className={ic}>/review</code>, <code className={ic}>/summarize</code>, <code className={ic}>/draft-email</code>. Bad names: <code className={ic}>/thing1</code>, <code className={ic}>/prompt-v2-final</code>
              </p>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">4. Include $ARGUMENTS</p>
              <p className="text-sm text-[var(--body)]">
                Put <code className={ic}>$ARGUMENTS</code> where your input should go. Usually at the end, but it can go anywhere in the prompt.
              </p>
            </div>
          </div>

          <TryThisNow title="Design a Command for YOUR Work">
            <p className="text-[var(--body)] mb-4">Think about something you do at least once a week. Maybe it&apos;s:</p>
            <ul className="text-sm text-[var(--body)] space-y-1 mb-4">
              <li>Reviewing reports from your team</li>
              <li>Writing social media posts</li>
              <li>Summarizing research for a project</li>
              <li>Preparing updates for your boss</li>
              <li>Converting rough notes into documentation</li>
            </ul>
            <p className="text-[var(--body)] mb-4">Now ask Claude to help you create it:</p>
            <CopyableCode
              code={`I want to create a custom command for [YOUR TASK].

Here's what I typically need:
- [What the output should include]
- [The tone or format I prefer]
- [Any specific requirements]

Help me write a command file that I can save to ~/.claude/commands/

Include $ARGUMENTS where my input should go.`}
            />
          </TryThisNow>
        </Container>
      </section>

      {/* Common Hiccups */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Common Hiccups (And How to Fix Them)" className="mb-8" />
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">&quot;My command isn&apos;t showing up&quot;</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                <li>Check the file is in <code className={ic}>~/.claude/commands/</code> (not a subfolder)</li>
                <li>Make sure it&apos;s a .md file</li>
                <li>Try restarting Claude</li>
              </ul>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">&quot;The output isn&apos;t what I expected&quot;</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                <li>Your prompt might need refinement — this is normal!</li>
                <li>Try running it manually first, improve it, then update the file</li>
                <li>Be more specific about format, tone, or length</li>
              </ul>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-medium text-[var(--ink)] mb-2">&quot;I have too many commands and can&apos;t remember them&quot;</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                <li>Start with 3-5 commands you&apos;ll actually use</li>
                <li>Use consistent naming (verb-noun: review-draft, prep-meeting)</li>
                <li>Type <code className={ic}>/</code> in Claude to see available commands</li>
              </ul>
            </div>
          </div>

          <MentorNote>
            Don&apos;t worry about building the perfect command library on day one. Start with one command you&apos;ll use this week. Add another next week. In a month, you&apos;ll have a collection that genuinely fits how you work.
          </MentorNote>
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
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4">
              Connecting Your Tools
            </h2>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)] mb-4">
              Commands are powerful on their own. But what if Claude could access your other tools too? Your notes in Notion, your files in Google Drive, your project boards?
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--ink)]">
              In <strong>Module 7: Connecting Your Tools</strong>, we&apos;ll unlock Claude&apos;s ability to read and write to the apps you already use.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="claude-for-knowledge-workers"
            moduleSlug="module-6"
            nextModulePath="/courses/claude-for-knowledge-workers/module-7"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-5" variant="ghost">
              &larr; Previous: Building Workflows
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-7" variant="primary">
              Next: Connecting Your Tools &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
