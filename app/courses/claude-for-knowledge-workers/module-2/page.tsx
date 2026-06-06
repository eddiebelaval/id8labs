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
  "Understand what Claude can and cannot see on your computer",
  "Process documents at scale — summarize, extract, and organize",
  "Master invoice and receipt organization workflows",
  "Use semantic search to find files by meaning, not just filename",
  "Analyze storage and clean up disk space intelligently",
]

const claudeCanSee = [
  { category: "Can See", items: ["Your entire user folder (Documents, Downloads, Desktop, Pictures)", "Text files, PDFs, Word documents, spreadsheets", "Images (can describe what's in them)", "Code files, config files, markdown files", "Anything in folders you've granted access to"] },
  { category: "Cannot See", items: ["System files (protected by your OS)", "Files in folders you haven't granted permission for", "Content inside apps (like your email inbox or browser tabs)", "Cloud files that aren't synced locally"] },
]

const processingPatterns = [
  { task: "Summarize multiple files", pattern: '"Read all [files] in [folder]. Extract [specific info]. Create summary in [output file]."' },
  { task: "Batch rename with content", pattern: '"Rename files in [folder] using [pattern] based on information inside each file."' },
  { task: "Extract to spreadsheet", pattern: '"Extract [fields] from each file in [folder]. Create [filename].csv with the data."' },
  { task: "Find by meaning", pattern: '"Find files in [folder] related to [topic/project/concept]."' },
]

const realExamples = [
  {
    title: "The Invoice Dump",
    scenario: "47 receipts scattered across email, Downloads, and phone photos",
    delegation: '"Look at ~/Documents/LLC/ToProcess/. These are business expenses. Extract vendor, date, amount, and category (software, equipment, services, travel, meals). Rename each file. Move to ~/Documents/LLC/2024-Expenses/ organized by category. Create an expense-log.csv with all the data."',
    result: "3 minutes. CSV goes straight to the bookkeeper.",
  },
  {
    title: "The Storage Reclaim",
    scenario: "Running low on disk space, didn't want to buy a new drive",
    delegation: '"Audit my entire user folder. Find everything over 500MB that I haven\'t touched in a year. Find all duplicate files. Find any video files outside my Videos folder."',
    result: "90GB of recoverable space identified. Old iOS backups, duplicate downloads, video exports already uploaded elsewhere. 20 minutes to review and delete. Saved $200 on a new drive.",
  },
  {
    title: "Cast Research Briefings",
    scenario: "Producing a reality TV show, need briefings on 10 cast members",
    delegation: '"Research these 10 cast members. For each one, find: social media presence, any news coverage, relationship history, and potential storylines. Create a briefing document for each person, saved to ~/Documents/CastBriefings/."',
    result: "Ten detailed briefings in 15 minutes. Used to be half a day's work.",
  },
]

const takeaways = [
  { num: 1, text: "Claude reads documents. Not just filenames — actual content. PDFs, images, Word docs." },
  { num: 2, text: "Batch processing is the superpower. One delegation can process 50 files. Same formula: Context + Outcome + Location." },
  { num: 3, text: "Semantic search beats keyword search. \"Find anything about the Johnson project\" works better than hoping you named files well." },
  { num: 4, text: "Financial documents are a perfect use case. Receipts, invoices, expense reports — tedious, repetitive, perfect for delegation." },
  { num: 5, text: "Start with reports, then act. \"Show me what's there\" before \"delete everything old.\"" },
]

export default function Module2Page() {
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

          <Kicker dot>Module 2 · 60 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Working With <em className="italic text-id8-orange">Your Files</em>
          </h1>

          <Deck className="mt-6">
            Process files at scale. Summarize 50 PDFs. Extract data from contracts. Organize a year of invoices in minutes. This is where Claude Code stops being a novelty and starts saving you serious hours.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 2' },
              { label: '60 min' },
            ]}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <EditorialButton
              href="/courses/module-2/module-2-working-with-your-files.pdf"
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
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--body)]">
              <span className="font-medium text-[var(--ink)]">Pro Tip:</span> Use your browser&apos;s Split Tab feature to follow along side-by-side with Claude Code open.
            </p>
            <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange whitespace-nowrap">New</span>
          </div>
        </Container>
      </section>

      {/* Media */}
      <section id="media" className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="Watch or Listen" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Choose your format — same content, different experience.</p>
          <div className="space-y-6">
            <MiniVideoPlayer
              src="/courses/module-2/media/module-2-working-with-your-files.mp4"
              title="Working With Your Files (Video)"
              downloadName="Module-2-Working-With-Your-Files.mp4"
            />
            <MiniAudioPlayer
              src="/courses/module-2/media/module-2-working-with-your-files.m4a"
              title="Working With Your Files (Podcast)"
              downloadName="Module-2-Working-With-Your-Files.m4a"
            />
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="pb-14">
        <Container narrow>
          <Prose>
            <p>
              You&apos;ve built confidence with quick wins in Module 1. You&apos;ve run delegations, handled Claude&apos;s questions, and started building the reflex to delegate instead of doing everything manually.
            </p>
            <p>
              Now we&apos;re going deeper. This module is about processing files at scale — the kind of work that used to take hours and now takes minutes.
            </p>
          </Prose>
        </Container>
      </section>

      {/* What Claude Can See */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What Claude Can Actually See" className="mb-8" />
          <Prose>
            <p>
              Before we process files, you need to understand what Claude can access. This affects what you can delegate.
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            {claudeCanSee.map((section, index) => {
              const can = section.category === "Can See"
              return (
                <div key={index} className={`bg-[var(--paper)] p-4 ${can ? '' : 'border-t-2 md:border-t-0 md:border-l-2 border-[var(--hair-hard)]'}`}>
                  <p className={`font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 ${can ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>
                    {section.category}
                  </p>
                  <ul className="text-sm text-[var(--body)] space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className={`flex-shrink-0 ${can ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>{can ? '→' : '—'}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Advice</p>
            <p className="text-[var(--body)]">
              &quot;I keep everything I want Claude to work with in my Documents folder. It&apos;s my &lsquo;Claude workspace.&rsquo; If I download something I want processed, I move it there first. Clean boundaries = fewer permission headaches.&quot;
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

      {/* Document Processing Power */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Document Processing Power" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Claude doesn&apos;t just move files around — it reads them, understands them, and extracts exactly what you need.
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {processingPatterns.map((pattern, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">{pattern.task}</p>
                <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  {pattern.pattern}
                </code>
              </div>
            ))}
          </div>

          <TryThisNow title="Process Your First Batch">
            <p className="text-[var(--body)] mb-4">
              Find a folder with multiple similar files (PDFs, invoices, documents). Try this delegation:
            </p>
            <CopyableCode
              code={`Look at ~/Downloads. Find all PDF files. For each one, extract the title and first paragraph. Create a summary.md file listing each PDF with its extracted info.`}
              label="Your batch processing delegation"
            />
            <p className="text-sm text-[var(--muted)] mt-4">
              Start with read-only operations like this. Once you see Claude accurately extracting information, you&apos;ll trust it to organize and rename.
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* Real Examples */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Real Examples from Eddie&apos;s Workflow" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            These aren&apos;t hypotheticals. These are actual delegations that save hours every week.
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {realExamples.map((example, index) => (
              <div key={index} className="bg-[var(--paper)] p-6">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{example.title}</h3>
                <p className="text-sm text-[var(--body)] mb-4">
                  <strong className="text-[var(--ink)]">Scenario:</strong> {example.scenario}
                </p>
                <div className="mb-4 border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">The Delegation</p>
                  <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] block">{example.delegation}</code>
                </div>
                <p className="text-sm text-id8-orange font-medium">Result: {example.result}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            Notice the pattern: be specific about what you want extracted, where it should go, and what format you need. The more precise your delegation, the less back-and-forth.
          </MentorNote>
        </Container>
      </section>

      {/* Semantic Search */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Finding Things (Semantic Search)" className="mb-8" />
          <Prose>
            <p>
              This is one of Claude&apos;s superpowers that most people don&apos;t realize: you can search your files by <strong>meaning</strong>, not just filename.
            </p>
          </Prose>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">Find forgotten work</p>
              <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                &quot;Look through ~/Documents/. Find any files related to presentations or pitch decks I created in 2023. List them with a one-sentence description of what each one contains.&quot;
              </code>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">The &quot;I know I wrote this somewhere&quot; problem</p>
              <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                &quot;Search my Documents folder for anything where I wrote about pricing strategies or how to price consulting services. Show me the relevant excerpts.&quot;
              </code>
            </div>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Example</p>
            <p className="text-[var(--body)]">
              &quot;I write a lot. Essays, notes, client proposals, scripts. When I start a new project, I often remember &lsquo;I wrote something about this before.&rsquo; Used to mean 30 minutes of searching. Now: &lsquo;Find anything I&apos;ve written about AI tools for non-programmers.&rsquo; Claude surfaces 8 files I&apos;d forgotten about, including a draft that became the foundation for this course.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Challenge */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Your Challenge: The Invoice Cleanup" className="mb-8" />
          <Prose>
            <p>
              This week, process real financial documents. Take <strong>10-20 receipts or invoices</strong> and run this workflow:
            </p>
          </Prose>

          <div className="mt-6 border border-[var(--hair)] p-4 mb-6">
            <ol className="text-sm text-[var(--body)] space-y-3">
              <li><strong className="text-[var(--ink)]">1.</strong> Move them to a processing folder: Create ~/Documents/ExpenseTest/</li>
              <li>
                <strong className="text-[var(--ink)]">2.</strong> Run this delegation:
                <code className="block mt-2 p-3 border border-[var(--hair)] bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-[var(--ink)]">
                  &quot;Look at ~/Documents/ExpenseTest/. These are business expenses. For each file, extract: date, vendor, amount, and category (guess the category based on the vendor—software, travel, meals, services, equipment, or other). Rename each file to YYYY-MM-DD_Vendor_$Amount.pdf. Create an expense-summary.csv with all the data.&quot;
                </code>
              </li>
              <li><strong className="text-[var(--ink)]">3.</strong> Review the results — check that Claude extracted the information correctly</li>
              <li><strong className="text-[var(--ink)]">4.</strong> Refine if needed — if categories are wrong, re-delegate with more specific instructions</li>
            </ol>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Success looks like</p>
            <ul className="text-sm text-[var(--body)] space-y-1">
              <li>Your expenses are renamed consistently</li>
              <li>You have a CSV that could go to a bookkeeper</li>
              <li>You understand how Claude reads and extracts from documents</li>
              <li>You spent minutes instead of an hour</li>
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
        </Container>
      </section>

      {/* Mindmap */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Module Overview" className="mb-4" />
          <p className="mt-6 mb-6 text-[var(--body)]">Visual map of everything covered in this module.</p>
          <div className="overflow-hidden border border-[var(--hair)]">
            <Image
              src="/courses/module-2/media/module-2-mindmap.webp"
              alt="Module 2 Mindmap - Working With Your Files"
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
            moduleSlug="module-2"
            nextModulePath="/courses/claude-for-knowledge-workers/module-3"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-1" variant="ghost">
              &larr; Previous: Your First Delegation
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
              Next: Writing With Claude &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
