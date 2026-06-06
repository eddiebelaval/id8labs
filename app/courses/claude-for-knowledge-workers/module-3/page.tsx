'use client'

import Image from 'next/image'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'
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

const outcomes = [
  "Understand the writing partnership model — Claude as collaborator, not replacement",
  "Turn voice notes into structured drafts using the voice-to-draft workflow",
  "Run targeted editing passes: clarity, audience, tone, and structure",
  "Train Claude on your voice using a voice profile document",
  "Beat blank page syndrome with brainstorming and ugly first drafts",
  "Master email workflows: replies, difficult messages, and batch processing",
]

const writingPartnership = [
  { category: "Claude Does Well", items: ["Expanding rough notes into full drafts", "Editing for clarity and flow", "Matching your existing voice (when given examples)", "Brainstorming and ideation", "Overcoming blank page syndrome"] },
  { category: "Claude Does Poorly", items: ["Original insights (Claude recombines; breakthroughs are yours)", "Personal stories (only you know what happened)", "Your unique perspective (your worldview is yours)", "Emotional authenticity (if it needs to feel personal, it is personal)"] },
]

const editingPatterns = [
  { type: "Clarity Pass", pattern: '"Edit for clarity: simplify complex sentences, cut unnecessary words, make the structure more logical. Preserve my voice. Show me what you changed and why."' },
  { type: "Audience Shift", pattern: '"Rewrite this for [new audience]. Same information, different framing. Keep it under [X] words."' },
  { type: "Tone Adjustment", pattern: '"Adjust the tone to be more [conversational/professional/direct/warm]. Keep the same message."' },
  { type: "Structure Fix", pattern: '"Reorganize into clear sections with headers. Put the most important information first. Cut any repetition."' },
]

const emailPatterns = [
  {
    type: "Reply Assist",
    delegation: '"Here\'s an email I received: [paste email]. Draft a reply that: [your key points]. Tone should be [professional/friendly/firm]. Keep it under [X] sentences."',
  },
  {
    type: "Difficult Email",
    delegation: '"I need to email [person/role] about [situation]. This is uncomfortable because [why]. Help me write something that is [direct but kind/firm but fair/apologetic but not groveling]. The key message is [what]."',
  },
  {
    type: "Batch Processing",
    delegation: '"Here are 5 emails I need to respond to: [paste all]. For each one, draft a brief reply. Consistent professional tone. I\'ll review and send."',
  },
]

const takeaways = [
  { num: 1, text: "Claude is a writing partner, not a replacement. Your ideas, your voice, your stories — Claude helps shape them, not generate them." },
  { num: 2, text: "Voice notes beat blank pages. Record yourself rambling, then let Claude organize. Your thinking, their structure." },
  { num: 3, text: "Train Claude on your voice. Feed it examples of your writing. Create a voice profile. Use it for consistency." },
  { num: 4, text: "Specific editing requests get specific results. Don't say 'make it better.' Say exactly what's wrong." },
  { num: 5, text: "Email is a perfect use case. Drafts, replies, difficult messages — Claude handles the structure, you add the humanity." },
]

const inlineCode = 'block mt-2 p-3 border border-[var(--hair)] bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]'

export default function Module3Page() {
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

          <Kicker dot>Module 3 · 60 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Writing With <em className="italic text-id8-orange">Claude</em>
          </h1>

          <Deck className="mt-6">
            From rambling voice notes to polished drafts. From blank page paralysis to words on the page. Claude becomes your writing partner — accelerating your thinking, not replacing it.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 3' },
              { label: '60 min' },
            ]}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <EditorialButton
              href="/courses/module-3/module-3-writing-with-claude.pdf"
              variant="primary"
              external
            >
              Download Guide (PDF)
            </EditorialButton>
            <EditorialButton href="#media" variant="ghost">
              Watch or Listen
            </EditorialButton>
          </div>

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* Split Tab Callout */}
      <section className="py-4 border-b border-[var(--hair)] bg-[var(--paper-shadow)]">
        <Container narrow>
          <p className="text-sm text-[var(--body)]">
            <span className="font-medium text-[var(--ink)]">Pro tip:</span> Open Claude Code in a split tab alongside this lesson. Practice each delegation as you learn it — the patterns stick better when you try them immediately.
          </p>
        </Container>
      </section>

      {/* Media */}
      <section id="media" className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="Watch or Listen" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Choose your format — same content, different experience.</p>
          <div className="space-y-6">
            <MiniVideoPlayer
              src="/courses/module-3/media/module-3-writing-with-claude.mp4"
              title="Writing With Claude (Video)"
              downloadName="Module-3-Writing-With-Claude.mp4"
            />
            <MiniAudioPlayer
              src="/courses/module-3/media/module-3-writing-with-claude.m4a"
              title="Writing With Claude (Podcast)"
              downloadName="Module-3-Writing-With-Claude.m4a"
            />
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="pb-14">
        <Container narrow>
          <Prose>
            <p>
              You&apos;ve mastered file processing in Module 2. You can organize invoices, extract data from documents, and search your files by meaning. Claude is saving you hours on tedious work.
            </p>
            <p>Now we&apos;re entering different territory. This module is about writing — and it requires a mindset shift.</p>
            <p>
              When Claude processes files, you&apos;re delegating mechanical work. When Claude helps you write, you&apos;re entering a <strong>collaboration</strong>. The goal isn&apos;t to have Claude write FOR you. It&apos;s to write WITH Claude — using AI to accelerate your thinking, not replace it.
            </p>
          </Prose>
        </Container>
      </section>

      {/* The Writing Partnership Model */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Writing Partnership Model" className="mb-8" />
          <Prose>
            <p>
              Think about how you&apos;d work with a great editor or writing assistant. You wouldn&apos;t say &quot;write me a blog post about productivity.&quot; You&apos;d have a conversation. You&apos;d share your rough ideas. They&apos;d push back, ask questions, help you find clarity.
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            {writingPartnership.map((section, index) => {
              const well = section.category === "Claude Does Well"
              return (
                <div key={index} className={`bg-[var(--paper)] p-4 ${well ? '' : 'border-t-2 md:border-t-0 md:border-l-2 border-[var(--hair-hard)]'}`}>
                  <p className={`font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 ${well ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>
                    {section.category}
                  </p>
                  <ul className="text-sm text-[var(--body)] space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className={`flex-shrink-0 ${well ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>{well ? '→' : '—'}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Philosophy</p>
            <p className="text-[var(--body)]">
              &quot;I use Claude like I used to use voice notes to myself. I ramble my ideas, then ask Claude to organize them. The thinking is mine. The structure comes from the collaboration. That&apos;s the sweet spot.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* What You'll Learn */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What You&apos;ll Learn" className="mb-8" />
          <ol className="space-y-4">
            {outcomes.map((outcome, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[var(--body)] flex-1">{outcome}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Voice Notes to Drafts */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="From Voice Notes to Drafts" className="mb-8" />
          <Prose>
            <p>This is one of the highest-leverage writing workflows: turning your spoken thoughts into written drafts.</p>
          </Prose>

          <div className="mt-6 border border-[var(--hair)] p-4 mb-6">
            <ol className="text-sm text-[var(--body)] space-y-4">
              <li><strong className="text-[var(--ink)]">1. Record yourself rambling</strong> — Use Voice Memos. Don&apos;t try to be articulate. Just talk through your idea as if explaining it to a friend.</li>
              <li><strong className="text-[var(--ink)]">2. Get it transcribed</strong> — Use your phone&apos;s transcription, or a service like Otter.ai, or Claude itself.</li>
              <li><strong className="text-[var(--ink)]">3. Delegate the transformation:</strong>
                <code className={inlineCode}>
                  &quot;Here&apos;s a rough voice transcription of my thoughts on [topic]. Turn this into a clear, structured [blog post/email/memo]. Keep my voice and examples. Organize my rambling into logical sections. The audience is [who]. Target length: [word count]. Save to ~/Documents/Drafts/[filename].md&quot;
                </code>
              </li>
            </ol>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Real Example</p>
            <p className="text-[var(--body)]">
              &quot;I was stuck on this course&apos;s Module 0 script. Spent an hour staring at the blank page. Finally, I just opened Voice Memos and talked for 8 minutes about what I wanted people to understand. Rambling, tangents, half-sentences. Transcribed it. Told Claude: &lsquo;Turn this into a video script. Keep my conversational tone. Target 5 minutes spoken. Make it flow.&rsquo; First draft in 90 seconds. I edited for 20 minutes. Done. The whole thing took less time than staring at the blank page.&quot;
            </p>
          </div>

          <TryThisNow title="Try Voice-to-Draft Now">
            <p className="text-[var(--body)] mb-4">
              Got something you need to write? Open Voice Memos on your phone, ramble for 2-3 minutes about your idea, then transcribe it and use this delegation:
            </p>
            <CopyableCode
              code={`Here's a rough voice transcription of my thoughts on [topic]:

[Paste your transcription here]

Turn this into a clear, structured [blog post/email/memo]. Keep my voice and examples. Organize my rambling into logical sections. The audience is [who]. Target length: [word count]. Save to ~/Documents/Drafts/[filename].md`}
              label="Voice-to-draft delegation template"
            />
            <p className="text-sm text-[var(--muted)] mt-3">
              Notice how much faster it is to talk through an idea than to write it from scratch.
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* Editing Workflows */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Editing Workflows" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Sometimes you&apos;ve already written something, but it needs work. Claude excels at different types of editing passes.
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {editingPatterns.map((pattern, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">{pattern.type}</p>
                <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  {pattern.pattern}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Editing Tip</p>
            <p className="text-[var(--body)]">
              &quot;I don&apos;t ask Claude to &lsquo;make it better.&rsquo; That&apos;s too vague. I tell it exactly what&apos;s wrong: &lsquo;The opening is too long.&rsquo; &lsquo;This paragraph is confusing.&rsquo; &lsquo;The ending trails off.&rsquo; Specific problems get specific solutions.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Finding Your Voice */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Finding Your Voice (With Claude&apos;s Help)" className="mb-4" />
          <p className="mt-6 mb-6 text-[var(--body)]">
            Here&apos;s the fear: &quot;If I use AI, my writing won&apos;t sound like me.&quot; Here&apos;s the reality: Claude can learn your voice — if you teach it.
          </p>

          <div className="border border-[var(--hair)] p-4 mb-6">
            <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-3">The Voice Training Approach</p>
            <ol className="text-sm text-[var(--body)] space-y-3">
              <li><strong className="text-[var(--ink)]">1. Gather your best writing</strong> — Find 3-5 pieces you&apos;ve written that sound like YOU.</li>
              <li><strong className="text-[var(--ink)]">2. Feed Claude your voice:</strong>
                <code className={inlineCode}>
                  &quot;Read these 4 samples of my writing. Analyze my writing style: sentence length, vocabulary, tone, how I structure arguments, my typical openings and closings, any verbal tics or patterns. Create a &lsquo;voice profile&rsquo; for me. Save it to ~/Documents/my-writing-voice.md&quot;
                </code>
              </li>
              <li><strong className="text-[var(--ink)]">3. Use the profile for future writing:</strong>
                <code className={inlineCode}>
                  &quot;Read my voice profile at ~/Documents/my-writing-voice.md. Then help me write [whatever] in my natural voice.&quot;
                </code>
              </li>
            </ol>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Experience</p>
            <p className="text-[var(--body)]">
              &quot;I write casually. Short sentences. Lots of &lsquo;you&rsquo; and &lsquo;I.&rsquo; Sentence fragments. Questions to the reader. When I first used Claude, it gave me this polished, formal prose that sounded nothing like me. I was about to give up. Then I fed it 5 of my essays. Now it nails my voice. It still needs editing — the rhythm isn&apos;t always right — but it&apos;s 80% there. That last 20% is my job anyway.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Email Workflows */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Email Workflows" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Email is where most knowledge workers spend their writing time. Claude can dramatically speed up the tedious parts.
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {emailPatterns.map((pattern, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">{pattern.type}</p>
                <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  {pattern.delegation}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Email Confession</p>
            <p className="text-[var(--body)]">
              &quot;I used to spend 20 minutes on emails that didn&apos;t deserve 20 minutes. Now I tell Claude: &lsquo;Reply to this. Be brief. Be professional. Three sentences max.&rsquo; Then I read it, tweak one word, and send. Same result, 18 minutes saved.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Challenge */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Your Challenge: The Voice Note Draft" className="mb-8" />
          <Prose>
            <p>This week, create one piece of writing using the voice-to-draft workflow:</p>
          </Prose>

          <div className="mt-6 border border-[var(--hair)] p-4 mb-6">
            <ol className="text-sm text-[var(--body)] space-y-3">
              <li><strong className="text-[var(--ink)]">1.</strong> Pick something you need to write — an email, a report section, a blog post, anything</li>
              <li><strong className="text-[var(--ink)]">2.</strong> Record yourself talking about it for 3-5 minutes (phone voice memo is fine)</li>
              <li><strong className="text-[var(--ink)]">3.</strong> Transcribe it (use any method you prefer)</li>
              <li><strong className="text-[var(--ink)]">4.</strong> Delegate the transformation:
                <code className={inlineCode}>
                  &quot;Here&apos;s a rough voice transcription of my thoughts. Turn this into a clear, well-structured [type of writing]. Keep my voice and examples. Target length: [X words]. Save to ~/Documents/Drafts/&quot;
                </code>
              </li>
              <li><strong className="text-[var(--ink)]">5.</strong> Edit the result — What needs your human touch? What did Claude nail?</li>
            </ol>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Success looks like</p>
            <ul className="text-sm text-[var(--body)] space-y-1">
              <li>You bypassed blank page syndrome</li>
              <li>The draft contains your authentic ideas and examples</li>
              <li>You spent more time thinking than typing</li>
              <li>The final piece sounds like you (after your edits)</li>
            </ul>
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
          <MentorNote>
            The writing skills you build here compound. Once you have a voice profile and a few go-to delegation patterns, you&apos;ll find yourself writing 3x faster with the same (or better) quality. The key is starting — record one voice note today and see how it feels.
          </MentorNote>
        </Container>
      </section>

      {/* Mindmap */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Module Overview" className="mb-4" />
          <p className="mt-6 mb-6 text-[var(--body)]">Visual map of everything covered in this module.</p>
          <div className="overflow-hidden border border-[var(--hair)]">
            <Image
              src="/courses/module-3/media/module-3-mindmap.webp"
              alt="Module 3 Mindmap - Writing With Claude"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="claude-for-knowledge-workers"
            moduleSlug="module-3"
            nextModulePath="/courses/claude-for-knowledge-workers/module-4"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-2" variant="ghost">
              &larr; Previous: Working With Your Files
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
              Next: Research & Analysis &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
