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
  "Transform one-off delegations into reusable templates with blanks to fill",
  "Build chains — multiple delegations connected together",
  "Create context files that reduce explaining",
  "Design and implement six essential workflows every knowledge worker needs",
  "Master advanced patterns: context stacks, quality loops, escalation paths",
  "Build your personal operating system that compounds over time",
]

const buildingBlocks = [
  { name: "Templates", description: "Reusable delegation patterns with blanks to fill in. Same structure every time, different inputs." },
  { name: "Triggers", description: "What starts a workflow — time-based, event-based, or manual habits." },
  { name: "Chains", description: "Multiple delegations connected together. Output of one becomes input of the next." },
  { name: "Context Files", description: "Persistent information Claude can reference. Your voice, your business, your preferences." },
]

const essentialWorkflows = [
  { name: "Weekly Review", frequency: "Every Friday", pattern: '"Run my weekly review. Read all files created/modified this week. Create summary: what I accomplished, what\'s in progress, what\'s blocked, focus for next week. Save to ~/Documents/Reviews/weekly-[DATE].md"' },
  { name: "Meeting Prep", frequency: "Before meetings", pattern: '"Prepare me for meeting with [PERSON] about [TOPIC]. Find relevant notes and previous meetings. Create prep doc: background, key points, questions to ask, my goals. Save to ~/Documents/Meetings/prep-[DATE].md"' },
  { name: "Email Batch", frequency: "Twice daily", pattern: '"Here are emails I need to respond to: [paste]. For each: identify if needs response, action, or archive. Draft replies for those needing responses. Keep tone professional but warm."' },
  { name: "Content Repurposing", frequency: "After publishing", pattern: '"Read content at [FILE]. Create repurposing package: Twitter thread, LinkedIn post, newsletter version, 3 quote graphics, shorter blog version. Save all to ~/Documents/Content/[NAME]-repurposed/"' },
  { name: "Project Status", frequency: "Weekly", pattern: '"Generate status update for [PROJECT]. Read all files in project folder. Create: overall status, accomplishments, blockers, next milestones, help needed. Keep under 1 page."' },
  { name: "End-of-Day Capture", frequency: "Daily", pattern: '"Run end-of-day capture. Read files created/modified today. Create daily log: what I worked on, what\'s finished, what\'s open, tomorrow\'s priorities. Save to ~/Documents/DailyLogs/[DATE].md"' },
]

const advancedPatterns = [
  { name: "The Context Stack", description: "Layer multiple context files for complex tasks", example: '"Read these context files first: ~/Context/my-business.md, ~/Context/my-voice.md, ~/Context/current-project.md. Now, given this context, [complex delegation]"' },
  { name: "The Quality Loop", description: "Build verification into your workflows", example: '"[Do main task]. Now review your output: check for claims needing sources, identify uncertainties, note assumptions. Add confidence notes section. Flag anything I should verify."' },
  { name: "The Escalation Path", description: "Build in decision points for different scenarios", example: '"Process these emails. Simple questions: draft response. Needs account access: create ticket. Complaints: flag for my review with briefing. Compliments: add to testimonials. Only show me complaints."' },
  { name: "The Learning Loop", description: "Workflows that improve themselves over time", example: '"Read my previous 5 weekly reviews. Identify patterns: recurring blockers, consistent accomplishments, things I say but don\'t do. Add patterns section with insights."' },
]

const osLayers = [
  { name: "Context Layer", desc: "Files that define who you are, what you do, how you work" },
  { name: "Workflow Library", desc: "Your collection of reusable templates (daily, weekly, monthly, situational)" },
  { name: "Trigger Schedule", desc: "When each workflow runs — calendar reminders and habit triggers" },
  { name: "Output Structure", desc: "Consistent folder structure and naming conventions" },
]

const challengeWorkflows = [
  { name: "Workflow 1: Something You Do Weekly", desc: "Examples: Weekly review, report generation, email batch processing, project status update" },
  { name: "Workflow 2: Something You Do Monthly", desc: "Examples: Invoice processing, performance review, goal progress check, content calendar planning" },
  { name: "Workflow 3: Something You Do Situationally", desc: "Examples: Meeting prep (before meetings), content repurposing (after publishing), outreach (when prospecting)" },
]

const takeaways = [
  { num: 1, text: "Templates beat prompts. Stop crafting new delegations each time. Build reusable templates with blanks to fill in." },
  { num: 2, text: "Chains multiply power. Connect delegations together. The output of one becomes the input of the next." },
  { num: 3, text: "Context files reduce explaining. Put persistent information in files Claude can reference. Your voice, your business, your preferences." },
  { num: 4, text: "Habits are triggers. Even without automation, building consistent habits (\"Every Friday at 4pm\") makes workflows reliable." },
  { num: 5, text: "Systems compound. A connected operating system gets smarter over time. Past outputs inform future inputs. That's the real magic." },
]

export default function Module5Page() {
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

          <Kicker dot>Module 5 · 60 min · Final Module</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Building <em className="italic text-id8-orange">Workflows</em>
          </h1>

          <Deck className="mt-6">
            From one-off delegations to a personal operating system. Build reusable templates, chain delegations together, and create systems that compound over time. This is where everything comes together.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 5' },
              { label: '60 min' },
            ]}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <EditorialButton
              href="/courses/module-5/module-5-building-workflows.pdf"
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
              src="/courses/module-5/media/module-5-building-workflows.mp4"
              title="Building Workflows (Video)"
              downloadName="Module-5-Building-Workflows.mp4"
            />
            <MiniAudioPlayer
              src="/courses/module-5/media/module-5-building-workflows.m4a"
              title="Building Workflows (Podcast)"
              downloadName="Module-5-Building-Workflows.m4a"
            />
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="pb-14">
        <Container narrow>
          <Prose>
            <p>Welcome to the final module. You&apos;ve come a long way.</p>
            <p>
              In Module 0, you learned the mental model — delegation, not conversation. In Module 1, you built confidence with quick wins. Module 2 taught you file processing at scale. Module 3 turned you into a writing collaborator. Module 4 made you a research machine.
            </p>
            <p>
              Now we tie it all together. This module is about <strong>systems</strong>. Not one-off delegations, but repeatable workflows. The goal: build your personal operating system with Claude — a set of patterns, templates, and habits that compound over time.
            </p>
          </Prose>
        </Container>
      </section>

      {/* The Problem */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Problem With One-Off Delegations" className="mb-8" />
          <Prose>
            <p>
              Every time you delegate, you&apos;re crafting a new prompt. Remembering the formula. Thinking about context, outcome, location. That&apos;s fine for occasional tasks. But for things you do regularly? It&apos;s inefficient.
            </p>
          </Prose>
          <div className="my-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Realization</p>
            <p className="text-[var(--body)]">
              &quot;I was delegating the same tasks repeatedly, slightly differently each time. Monday: &lsquo;Summarize these meeting notes.&rsquo; Wednesday: &lsquo;Summarize these other meeting notes.&rsquo; Friday: &lsquo;Summarize these meeting notes too.&rsquo; Same pattern, different inputs. I was wasting time re-explaining what I wanted. That&apos;s when I realized: I need templates, not just delegations.&quot;
            </p>
          </div>
          <Prose>
            <p>
              The shift in this module is from <strong>&quot;I can delegate tasks&quot;</strong> to <strong>&quot;I have systems that run automatically.&quot;</strong>
            </p>
          </Prose>
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

      {/* Workflow Building Blocks */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Workflow Building Blocks" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Before we build workflows, understand the four components.</p>
          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {buildingBlocks.map((block, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{block.name}</h3>
                <p className="text-sm text-[var(--body)]">{block.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Six Essential Workflows */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Six Workflows Every Knowledge Worker Needs" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">High-value workflows to build and customize for your situation.</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {essentialWorkflows.map((workflow, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="font-medium text-[var(--ink)]">{workflow.name}</p>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange whitespace-nowrap">{workflow.frequency}</span>
                </div>
                <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  {workflow.pattern}
                </code>
              </div>
            ))}
          </div>

          <TryThisNow title="Build Your First Workflow Template">
            <p className="text-[var(--body)] mb-4">
              Pick one of the six workflows above (Weekly Review is a great start) and customize it for your situation. Create your own template file:
            </p>
            <CopyableCode
              code={`Create a workflow template for me. The workflow is: Weekly Review

When I run this workflow, I want you to:
1. Read all files created or modified this week in ~/Documents/
2. Summarize what I accomplished
3. List what's still in progress
4. Note any blockers or stuck items
5. Suggest focus areas for next week

Save the template to ~/Workflows/weekly-review.md so I can reference it every Friday.`}
              label="Your first workflow template"
            />
            <p className="text-sm text-[var(--muted)] mt-3">
              Once saved, you can run it every week with: &quot;Run my weekly review workflow from ~/Workflows/weekly-review.md&quot;
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* Advanced Patterns */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Advanced Workflow Patterns" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Once you&apos;re comfortable with basic workflows, try these advanced patterns.</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {advancedPatterns.map((pattern, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-1">{pattern.name}</p>
                <p className="text-sm text-[var(--body)] mb-3">{pattern.description}</p>
                <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  {pattern.example}
                </code>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Personal Operating System */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Building Your Personal Operating System" className="mb-8" />
          <Prose>
            <p>
              Individual workflows are useful. A connected system is powerful. Here&apos;s what a complete system looks like:
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-6">
            {osLayers.map((item, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-1">{item.name}</p>
                <p className="text-sm text-[var(--body)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s System</p>
            <p className="text-[var(--body)]">
              &quot;My personal operating system has about 15 workflows. Monday morning: weekly planning. Friday afternoon: weekly review. First of the month: invoice processing and LLC admin. Before any major meeting: meeting prep. After any content: repurposing. What used to be 20 hours of monthly admin is now about 3 hours — and most of that is review, not creation. The real magic? Because everything is saved consistently, Claude gets better at understanding my context over time. It compounds.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Challenge */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Your Challenge: Build Three Workflows" className="mb-8" />
          <Prose>
            <p>Create your personal operating system foundation:</p>
          </Prose>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] my-6">
            {challengeWorkflows.map((wf, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">{wf.name}</p>
                <p className="text-sm text-[var(--body)]">{wf.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Success looks like</p>
            <ul className="text-sm text-[var(--body)] space-y-1">
              <li>You have 3 documented, tested workflows</li>
              <li>Each one saves you at least 30 minutes per occurrence</li>
              <li>You know when to run each one</li>
              <li>Claude produces consistently useful output</li>
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
            <strong>From one builder to another:</strong> Workflows are where everything clicks. When I stopped thinking of Claude as a chatbot and started treating it like a systems-level assistant, my entire approach changed. Now I have templates for research, content, production prep — each one built from patterns that actually worked. Start small. One workflow for one recurring task. Get it working, then expand. You&apos;ve got everything you need now. Go build something.
          </MentorNote>
        </Container>
      </section>

      {/* Course Completion */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">Course Complete</Kicker>
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
              Congratulations
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              You&apos;ve completed <strong>Claude Code for Knowledge Workers</strong>.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              You started as someone who chatted with AI. Now you&apos;re someone who delegates to an agent. You can process files, write collaboratively, research like a team, and build systems that run your operations. The goal was never to learn Claude Code — it was to reclaim your time for the work that matters.
            </p>
            <p className="mt-6 font-[family-name:var(--font-serif)] italic text-xl text-id8-orange">
              Welcome to the delegation economy.
            </p>
          </div>
        </Container>
      </section>

      {/* Mindmap */}
      <section className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="Module Overview" className="mb-4" />
          <p className="mt-6 mb-6 text-[var(--body)]">Visual map of everything covered in this module.</p>
          <div className="overflow-hidden border border-[var(--hair)]">
            <Image
              src="/courses/module-5/media/module-5-mindmap.webp"
              alt="Module 5 Mindmap - Building Workflows"
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
            moduleSlug="module-5"
            nextModulePath="/courses/claude-for-knowledge-workers/module-6"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-4" variant="ghost">
              &larr; Previous: Research & Analysis
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
              Back to Course Overview &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
