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
  "Turn research questions into actionable briefings using the Research Briefing Workflow",
  "Conduct competitive analysis — company deep dives and landscape overviews",
  "Perform market research — trends, customer profiles, sentiment analysis",
  "Synthesize long documents — contracts, reports, meeting notes",
  "Chain research into action — recommendations, comparisons, draft communications",
  "Verify and fact-check information with confidence levels",
]

const researchCapabilities = [
  { category: "Claude Does Well", items: ["Finding current information on companies, people, topics", "Comparing products, services, or approaches", "Gathering data from multiple sources into one place", "Fact-checking and verification", "Tracking down specific information you vaguely remember"] },
  { category: "Claude Struggles With", items: ["Paywalled content (can't log into your subscriptions)", "Very recent news (there can be delays)", "Proprietary databases or internal company information", "Information that simply doesn't exist online"] },
]

const researchPatterns = [
  { type: "Research Briefing", pattern: '"Research [topic/company/person]. I want to understand: [specific aspects]. Create a briefing covering: [sections]. Include sources for key claims. Save to ~/Documents/Research/[filename].md"' },
  { type: "Competitive Analysis", pattern: '"Research [competitor company]. I want to understand: their product/service offering, pricing (if public), target customer, key differentiators, recent news. Create a one-page briefing with sources."' },
  { type: "Market Landscape", pattern: '"Research top players in [market]. For each: what they offer, size/funding, target customer, positioning. Then analyze: gaps, patterns, underserved areas."' },
  { type: "Trend Report", pattern: '"Research current trends in [industry/topic]. What\'s changing, emerging, declining, predicted. Focus on last 12 months. Include specific examples and sources."' },
]

const documentPatterns = [
  {
    type: "Contract Review",
    delegation: '"Read this contract at [file path]. Extract: key obligations for each party, important dates and deadlines, termination conditions, liability clauses, anything unusual or concerning. Present as a summary I can review quickly."',
  },
  {
    type: "Report Digest",
    delegation: '"Read this 50-page report at [file path]. Give me: the main conclusions, the key data points, the recommendations, and anything surprising or controversial. Keep it under 2 pages."',
  },
  {
    type: "Meeting Notes Synthesis",
    delegation: '"Read all files in ~/Documents/MeetingNotes/ProjectX/. Synthesize into: key decisions made, action items (and who owns them), open questions, and current project status."',
  },
]

const actionPatterns = [
  { type: "Research → Recommendations", pattern: '"Research [topic]. Based on what you find, give me 3-5 specific recommendations for how I should [action]. Explain your reasoning for each."' },
  { type: "Research → Comparison", pattern: '"Research these 5 options: [list]. Compare them across these criteria: [list]. Create a comparison table. Give me your recommendation and why."' },
  { type: "Research → Outreach", pattern: '"Research [company/person]. Based on what you learn, draft an outreach email that references something specific about them and explains why [my offer] is relevant."' },
]

const takeaways = [
  { num: 1, text: "Claude researches and synthesizes. Not just finding information — turning it into actionable briefings. The shift is from \"help me search\" to \"research this and tell me what I need to know.\"" },
  { num: 2, text: "Competitive analysis in minutes. Company deep dives, landscape overviews, market positioning — work that used to take days now takes minutes." },
  { num: 3, text: "Your files are a research database. Semantic search across your own documents. Meeting notes, contracts, past work — all searchable by meaning." },
  { num: 4, text: "Research → Action. Don't stop at information. Ask for recommendations, comparisons, or draft communications based on what Claude finds." },
  { num: 5, text: "Verification matters. Claude can be wrong. Sources can be outdated. Build verification into your workflow for anything important." },
]

const patternList = (items: { type: string; pattern?: string; delegation?: string }[]) => (
  <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
    {items.map((p, i) => (
      <div key={i} className="bg-[var(--paper)] p-4">
        <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">{p.type}</p>
        <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
          {p.pattern ?? p.delegation}
        </code>
      </div>
    ))}
  </div>
)

const eddie = (label: string, body: string) => (
  <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
    <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">{label}</p>
    <p className="text-[var(--body)]">{body}</p>
  </div>
)

export default function Module4Page() {
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

          <Kicker dot>Module 4 · 60 min</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Research &amp; <em className="italic text-id8-orange">Analysis</em>
          </h1>

          <Deck className="mt-6">
            From dozens of browser tabs to actionable insights. Claude doesn&apos;t just help you search — it helps you synthesize. The shift is from &quot;help me search&quot; to &quot;research this and tell me what I need to know.&quot;
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 4' },
              { label: '60 min' },
            ]}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <EditorialButton
              href="/courses/module-4/module-4-research-and-analysis.pdf"
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
              src="/courses/module-4/media/module-4-research-and-analysis.mp4"
              title="Research & Analysis (Video)"
              downloadName="Module-4-Research-And-Analysis.mp4"
            />
            <MiniAudioPlayer
              src="/courses/module-4/media/module-4-research-and-analysis.m4a"
              title="Research & Analysis (Podcast)"
              downloadName="Module-4-Research-And-Analysis.m4a"
            />
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="pb-14">
        <Container narrow>
          <Prose>
            <p>
              You&apos;ve learned to process files at scale in Module 2 and write with Claude as a partner in Module 3. You can organize invoices, turn voice notes into drafts, and edit with precision.
            </p>
            <p>Now we&apos;re tackling research — one of the most time-consuming parts of knowledge work.</p>
            <p>
              Think about how you research today. You open a dozen browser tabs. You skim articles, copy quotes into notes, lose track of where you found things. You spend hours gathering information, then more hours trying to make sense of it all. <strong>Claude Code changes this fundamentally.</strong>
            </p>
          </Prose>
        </Container>
      </section>

      {/* What Claude Can Research */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What Claude Can Research" className="mb-8" />
          <Prose>
            <p>
              Claude Code can search the web, read websites, and synthesize information from multiple sources. When connected to tools like Perplexity or Firecrawl, it becomes even more powerful.
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            {researchCapabilities.map((section, index) => {
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

          {eddie('Document Research', "Claude can also research across your own files — something we touched on in Module 2's semantic search section. This is powerful for finding relevant past work, synthesizing notes from multiple meetings, extracting insights from interview transcripts, and reviewing contracts for specific terms.")}
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

      {/* Research Briefing Workflow */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Research Briefing Workflow" className="mb-8" />
          <Prose>
            <p>
              This is the core research workflow: turning a question into an actionable briefing. The delegation formula still applies: Context + Outcome + Location.
            </p>
          </Prose>
          <div className="my-6">{patternList(researchPatterns)}</div>

          {eddie("Eddie's Real Example: Cast Research", "\"I produce reality television. Before filming, I need to understand each cast member — their background, their social media presence, any public controversies, their relationships. Used to take a researcher half a day per person. Now I give Claude their names and basic info: 'Research these 10 cast members. For each one, find: social media presence and follower counts, any news coverage, relationship history if public, potential storylines, and red flags we should know about.' Ten detailed briefings in 15 minutes. My team reviews and adds context, but the grunt work is done.\"")}

          <TryThisNow title="Create Your First Research Briefing">
            <p className="text-[var(--body)] mb-4">
              Pick something you&apos;re genuinely curious about — a competitor, a potential partner, a market trend, or a person you&apos;ll be meeting with. Use this template:
            </p>
            <CopyableCode
              code={`Research [company/person/topic]. I want to understand:
- [Specific aspect 1]
- [Specific aspect 2]
- [Specific aspect 3]

Create a briefing covering: background, key facts, recent developments, and anything surprising. Include sources for key claims. Save to ~/Documents/Research/briefing.md`}
              label="Research briefing delegation template"
            />
            <p className="text-sm text-[var(--muted)] mt-3">
              Start small — one topic, 3-5 aspects. You can always ask follow-up questions to go deeper.
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* Competitive Analysis */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Competitive Analysis" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            One of the highest-value research applications: understanding your competition.
          </p>

          {eddie("Eddie's Competitive Analysis Story", "\"When I was building ID8Labs, I needed to understand the AI tools landscape. Not just the big players — the niche tools, the emerging competitors, the ones targeting similar customers. I told Claude: 'Research AI tools for non-technical knowledge workers. Focus on writing assistants, research tools, and automation platforms. For each one, tell me: what it does, who it's for, pricing, and what makes it different. Organize by category. Note any patterns you see.' Took 20 minutes. Saved me a week of browsing and note-taking. The analysis wasn't perfect — I had to verify some details — but the structure was there. I could think strategically instead of drowning in tabs.\"")}

          <div className="mt-6 border border-[var(--hair)] bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Pro Tip</p>
            <p className="text-sm text-[var(--body)]">
              Ask for gaps and patterns: &quot;What&apos;s everyone doing the same? What&apos;s underserved? Where are the opportunities?&quot; This turns raw research into strategic insight.
            </p>
          </div>
        </Container>
      </section>

      {/* Synthesizing Documents */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Synthesizing Long Documents" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Claude excels at turning long, complex documents into actionable summaries.
          </p>
          <div className="mb-6">{patternList(documentPatterns)}</div>
          {eddie("Eddie's Document Tip", "\"I get a lot of industry reports. PDFs, 50-100 pages each. Used to sit unread in my Downloads folder. Now I tell Claude: 'Read this report. Give me the 10 things I need to know, and tell me if there's anything that directly affects my business.' Takes 2 minutes. I actually read reports now.\"")}
        </Container>
      </section>

      {/* Research + Action */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Research → Action" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Research is only valuable if it leads to action. Here&apos;s how to chain research into next steps.
          </p>
          {patternList(actionPatterns)}
        </Container>
      </section>

      {/* Verification */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Verification and Fact-Checking" className="mb-4" />
          <p className="mt-6 mb-6 text-[var(--body)]">Claude can make mistakes. Sources can be wrong. Verification matters.</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] mb-6">
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">Fact-Check Request</p>
              <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                &quot;Here&apos;s a claim I found: [claim]. Verify this. Find multiple sources that confirm or contradict it. Tell me how confident I should be in this information.&quot;
              </code>
            </div>
            <div className="bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">Source Check</p>
              <code className="block font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] border border-[var(--hair)] bg-[var(--paper-mid)] p-3">
                &quot;I&apos;m using this statistic in a presentation: [statistic]. Find the original source. Check if it&apos;s still current. Find any contradicting data.&quot;
              </code>
            </div>
          </div>

          {eddie("Eddie's Verification Rule", "\"I never publish research without verification on key claims. My rule: if a number or fact is going to influence a decision, I tell Claude: 'Find me a second source for this.' If it can't, I'm more cautious. This has saved me from embarrassing mistakes multiple times.\"")}
        </Container>
      </section>

      {/* Challenge */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Your Challenge: The Competitive Briefing" className="mb-8" />
          <Prose>
            <p>This week, complete a real research project:</p>
          </Prose>

          <div className="mt-6 border border-[var(--hair)] p-4 mb-6">
            <ol className="text-sm text-[var(--body)] space-y-3">
              <li><strong className="text-[var(--ink)]">1.</strong> Pick a research target — a competitor, a potential partner, a market you&apos;re curious about, or a trend in your industry</li>
              <li><strong className="text-[var(--ink)]">2.</strong> Craft your delegation:
                <code className="block mt-2 p-3 border border-[var(--hair)] bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-[var(--ink)]">
                  &quot;Research [target]. I want to understand: [list 3-5 specific aspects]. Create a briefing that&apos;s actionable — tell me what I need to know and what I should do with this information. Include sources for key claims. Save to ~/Documents/Research/[filename].md&quot;
                </code>
              </li>
              <li><strong className="text-[var(--ink)]">3.</strong> Review the output — What&apos;s useful? What needs verification? What&apos;s missing?</li>
              <li><strong className="text-[var(--ink)]">4.</strong> Add a follow-up — Ask Claude to go deeper on one aspect, or to turn the research into a specific action item</li>
            </ol>
          </div>

          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Success looks like</p>
            <ul className="text-sm text-[var(--body)] space-y-1">
              <li>You have a structured briefing on something relevant to your work</li>
              <li>You saved hours compared to manual research</li>
              <li>You know which claims need verification</li>
              <li>You can actually use this information</li>
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
            Research is where Claude Code truly shines for knowledge workers. You&apos;ve likely spent entire days doing what now takes 15 minutes. The key shift: stop thinking of Claude as a search engine. Think of it as a research analyst who can synthesize multiple sources into exactly what you need.
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
              src="/courses/module-4/media/module-4-mindmap.webp"
              alt="Module 4 Mindmap - Research & Analysis"
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
            moduleSlug="module-4"
            nextModulePath="/courses/claude-for-knowledge-workers/module-5"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-3" variant="ghost">
              &larr; Previous: Writing With Claude
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
              Next: Building Workflows &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
