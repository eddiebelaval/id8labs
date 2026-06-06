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
  "Build confidence through low-stakes practice delegations",
  "Master the Delegation Formula: Context + Outcome + Location",
  "Access 10 Quick Wins you can run this week",
  "Handle common issues like permissions and unexpected results",
  "Develop the delegation mindset that separates daily users from one-timers",
]

const delegationFormula = [
  { component: "Context", description: "What Claude can see or needs to know", example: '"Look at my Desktop" or "These are screenshots from last month"' },
  { component: "Outcome", description: 'What "done" looks like — be specific!', example: '"Group by file type. Create folders. Move files. List anything uncategorized."' },
  { component: "Location", description: "Where the result should go", example: '"Save to ~/Documents/Organized/" or "Create report in cleanup-log.txt"' },
]

const quickWins = [
  { number: 1, name: "Desktop Triage", risk: "None (report)", description: "Count files, group by type, show what's taking space. Don't move anything yet." },
  { number: 2, name: "Screenshot Archaeology", risk: "None (report)", description: "Find all screenshots on your computer. Show count, locations, and space used by year." },
  { number: 3, name: "Duplicate Hunt", risk: "None (report)", description: "Find duplicate files in Downloads. List them and calculate space savings." },
  { number: 4, name: "Rename Batch", risk: "Low (reversible)", description: "Rename files in a folder to YYYY-MM-DD_descriptive-name pattern." },
  { number: 5, name: "Space Audit", risk: "None (report)", description: "Show 10 largest files and 5 largest folders. Format as table." },
  { number: 6, name: "Old File Report", risk: "None (report)", description: "Find files untouched for 2+ years. Group by type. Show total size." },
  { number: 7, name: "Extension Sort", risk: "None (report)", description: "Count files by type (.pdf, .jpg, .dmg, etc.). Format as sorted table." },
  { number: 8, name: "Project Inventory", risk: "None (report)", description: "List all folders with last modified date, file count, and size." },
  { number: 9, name: "Empty Folder Sweep", risk: "Low (with confirmation)", description: "Find empty folders. List them. Ask before deleting." },
  { number: 10, name: "Temp File Purge Report", risk: "None (report)", description: "Find .tmp files, .dmg installers, extracted .zips. Calculate reclaimable space." },
]

const troubleshooting = [
  { situation: "Claude asks for clarification", claudeSays: '"Should I organize by date created or date modified?"', whatToDo: "Answer specifically: \"Use date modified. Format as YYYY-MM-DD.\"", why: "Your delegation was slightly ambiguous. Now you know to specify next time." },
  { situation: "Claude asks for permission", claudeSays: '"I\'m about to move 200 files. Should I proceed?"', whatToDo: "This is good! Say \"yes\" or \"show me the list first.\"", why: "Claude has safety rails. Large operations trigger confirmation." },
  { situation: "Unexpected result", claudeSays: "[Folder structure isn't what you imagined]", whatToDo: "Say \"Undo that\" or \"Move everything back.\" Then re-delegate with clearer outcome.", why: "\"Organize\" means different things. Be more specific next time." },
  { situation: "Permission denied", claudeSays: '"I don\'t have permission to access that folder."', whatToDo: "Check System Preferences (Mac) or Security settings (Windows).", why: "Your OS protects certain folders. Work within Documents, Downloads, Desktop." },
]

const takeaways = [
  { num: 1, text: "Volume beats perfection. Your first 10 delegations should be low-stakes practice." },
  { num: 2, text: "The formula is Context + Outcome + Location. Skip any piece and you'll end up in a conversation." },
  { num: 3, text: "\"Organize\" is not an outcome. Specify HOW: by date, by type, by project, by size." },
  { num: 4, text: "Mistakes are cheap. \"Undo that\" and re-delegate. Nothing is permanent." },
  { num: 5, text: "Build the reflex. Before manual work, ask: \"Is this delegation-able?\"" },
]

export default function Module1Page() {
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

          <Kicker dot>Module 1 · 45 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Your First <em className="italic text-id8-orange">Delegation</em>
          </h1>

          <Deck className="mt-6">
            Build confidence through practice. 10 quick wins to master the delegation formula and develop the reflex that separates daily users from one-timers.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 1' },
              { label: '45 min' },
            ]}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <EditorialButton
              href="/courses/module-1/module-1-your-first-delegation.pdf"
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
              src="/courses/module-1/media/module-1-your-first-delegation.mp4"
              title="Your First Delegation (Video)"
              downloadName="Module-1-Your-First-Delegation.mp4"
            />
            <MiniAudioPlayer
              src="/courses/module-1/media/module-1-your-first-delegation.m4a"
              title="Your First Delegation (Podcast)"
              downloadName="Module-1-Your-First-Delegation.m4a"
            />
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="pb-14">
        <Container narrow>
          <Prose>
            <p>
              Welcome back. If you completed Module 0, you&apos;ve already installed Claude Code and cleaned up your Downloads folder. You felt that first &quot;holy shit&quot; moment when Claude did in seconds what would&apos;ve taken you 20 minutes.
            </p>
            <p>
              Now we&apos;re going to build on that. This module gives you a menu of quick wins — different delegation targets to practice with — and deepens your understanding of why the delegation formula works. By the end, you&apos;ll have the confidence to delegate anything.
            </p>
          </Prose>
        </Container>
      </section>

      {/* The Confidence Problem */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Confidence Problem" className="mb-8" />
          <Prose>
            <p>
              You cleaned up your Downloads folder in Module 0. That felt good. But here&apos;s what happens next for most people: they freeze. They don&apos;t know what else to try. Days pass. Claude Code sits unused.
            </p>
          </Prose>
          <div className="mt-6 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Rule</p>
            <p className="text-lg text-[var(--ink)]">
              &quot;Your first 10 delegations should be things you could undo in 30 seconds.&quot;
            </p>
            <p className="text-sm text-[var(--body)] mt-3">
              Fear kills learning. When you&apos;re scared of breaking something, you don&apos;t experiment. The goal of this module is reps — building the muscle memory of delegation.
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
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[var(--body)] flex-1">{outcome}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* The Delegation Formula */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Delegation Formula: Going Deeper" className="mb-8" />
          <Prose>
            <p>You learned this in Module 0. Now let&apos;s make it intuitive.</p>
          </Prose>

          <div className="mt-6 mb-8 border border-[var(--hair)] bg-[var(--paper-shadow)] p-6">
            <p className="font-[family-name:var(--font-mono)] text-xl text-center text-[var(--ink)]">
              <span className="text-id8-orange">Context</span>
              {' + '}
              <span className="text-id8-orange">Outcome</span>
              {' + '}
              <span className="text-id8-orange">Location</span>
            </p>
          </div>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {delegationFormula.map((item, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{item.component}</span>
                  <span className="text-sm text-[var(--body)]">{item.description}</span>
                </div>
                <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                  {item.example}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-4">
            <p className="text-sm text-[var(--body)]">
              <strong className="text-[var(--ink)]">Common mistake:</strong> People skip Location. They say &quot;organize my files&quot; and Claude asks &quot;where should I put them?&quot; Now you&apos;re having a conversation instead of delegating work.
            </p>
          </div>

          <TryThisNow title="Practice the Formula">
            <p className="text-[var(--body)] mb-4">
              Try this delegation right now. Copy and paste it into Claude Code:
            </p>
            <CopyableCode
              code={`Look at my Desktop. Count files by type (images, documents, etc). Show me a table with file counts and total sizes. Don't move anything — just report.`}
              label="Your practice delegation"
            />
            <p className="text-sm text-[var(--muted)] mt-4">
              Notice: Context (Desktop) + Outcome (count and table) + Location (just report, no changes). All three pieces.
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* Quick Wins Menu */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Quick Wins Menu" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            10 delegations you can run this week. None will break anything. Pick the ones that spark an &quot;oh, I&apos;ve been meaning to do that&quot; feeling.
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {quickWins.map((win) => (
              <div key={win.number} className="bg-[var(--paper)] p-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange pt-0.5">{String(win.number).padStart(2, '0')}</span>
                  <div>
                    <p className="font-medium text-[var(--ink)]">{win.name}</p>
                    <p className="text-sm text-[var(--body)]">{win.description}</p>
                  </div>
                </div>
                <span className={`font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap pt-1 ${win.risk.includes('None') ? 'text-[var(--teal)]' : 'text-[var(--muted)]'}`}>
                  {win.risk}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Eddie&apos;s Recommendation</p>
            <p className="text-sm text-[var(--body)]">
              &quot;Start with #1 (Desktop Triage) or #5 (Space Audit). They&apos;re pure information — Claude looks and reports, nothing moves. Then try #4 (Rename Batch) on a folder you don&apos;t care about. By your third delegation, you&apos;ll be ready to let Claude actually move files.&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Troubleshooting */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="When Things Go Wrong" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Claude will ask questions sometimes. It will ask permission. Sometimes it misunderstands. This isn&apos;t failure — it&apos;s collaboration.
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {troubleshooting.map((item, index) => (
              <div key={index} className="bg-[var(--paper)] p-4">
                <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">{item.situation}</p>
                <div className="mb-3 border border-[var(--hair)] bg-[var(--paper-shadow)] p-2 text-sm">
                  <span className="text-[var(--muted)]">Claude says: </span>
                  <span className="text-[var(--ink)]">{item.claudeSays}</span>
                </div>
                <p className="text-sm text-[var(--body)] mb-1"><strong className="text-[var(--ink)]">What to do:</strong> {item.whatToDo}</p>
                <p className="text-sm text-[var(--body)]"><strong className="text-[var(--ink)]">Why:</strong> {item.why}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            Every &quot;problem&quot; is actually a learning opportunity. When Claude asks for clarification, it&apos;s teaching you to be more specific. When it asks permission, it&apos;s showing you its safety rails. Embrace these moments — they make your next delegation sharper.
          </MentorNote>
        </Container>
      </section>

      {/* The Delegation Mindset */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Delegation Mindset" className="mb-8" />
          <Prose>
            <p>
              The shift happens when you stop asking &quot;Can Claude do this?&quot; and start asking &quot;Why am I doing this myself?&quot;
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Old Mindset</p>
              <ul className="text-sm text-[var(--body)] space-y-2">
                <li>&quot;I need to organize my files&quot; → Open Finder, start clicking</li>
                <li>&quot;I should clean up my Desktop&quot; → Drag things manually</li>
                <li>&quot;What&apos;s taking up space?&quot; → Right-click, check sizes one by one</li>
              </ul>
            </div>
            <div className="bg-[var(--paper)] p-4 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">New Mindset</p>
              <ul className="text-sm text-[var(--ink)] space-y-2">
                <li>&quot;I need to organize my files&quot; → Context + Outcome + Location?</li>
                <li>&quot;I should clean up my Desktop&quot; → Let me delegate that</li>
                <li>&quot;What&apos;s taking up space?&quot; → Claude can tell me in 10 seconds</li>
              </ul>
            </div>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="text-sm text-[var(--body)]">
              The goal isn&apos;t to use Claude for everything. The goal is to <strong className="text-[var(--ink)]">PAUSE</strong> before manual work and ask: &quot;Is this delegation-able?&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Challenge */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Your Challenge: The Confidence Builder" className="mb-8" />
          <Prose>
            <p>
              This week, run <strong>three delegations</strong> from the Quick Wins Menu.
            </p>
          </Prose>
          <div className="mt-6 border border-[var(--hair)] p-4 mb-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Recommended path</p>
            <ol className="text-sm text-[var(--body)] space-y-2">
              <li><strong className="text-[var(--ink)]">1.</strong> Start with a report (#1, #5, or #6) — Claude looks and tells you what it sees</li>
              <li><strong className="text-[var(--ink)]">2.</strong> Try a batch operation (#4) — Claude makes changes you could reverse</li>
              <li><strong className="text-[var(--ink)]">3.</strong> Finish with a hunt (#2 or #3) — Claude searches across your system</li>
            </ol>
          </div>
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Success looks like</p>
            <ul className="text-sm text-[var(--body)] space-y-1">
              <li>You ran three delegations without getting stuck</li>
              <li>You handled at least one clarification question from Claude</li>
              <li>You feel less hesitant about what to try next</li>
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
              src="/courses/module-1/media/module-1-mindmap.webp"
              alt="Module 1 Mindmap - Your First Delegation"
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
            moduleSlug="module-1"
            nextModulePath="/courses/claude-for-knowledge-workers/module-2"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-0" variant="ghost">
              &larr; Previous: The Mental Model Shift
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
              Next: Working With Your Files &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
