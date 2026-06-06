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

const tools = [
  { name: 'Web Browsing', description: 'Claude can visit URLs and read web pages. Research without the tab-switching.', status: 'available' as const },
  { name: 'File System', description: 'Read and write files on your computer. Process documents, save outputs, organize folders.', status: 'available' as const },
  { name: 'Notion', description: 'Read your Notion pages and databases. Query your knowledge base without leaving Claude.', status: 'available' as const },
  { name: 'Google Drive', description: 'Access your Google Docs, Sheets, and files. Work with cloud documents directly.', status: 'available' as const },
  { name: 'GitHub', description: "Read repositories, create issues, manage code. Even if you're not a developer, great for documentation.", status: 'available' as const },
]

const setupSteps = [
  { title: 'Step 1: Find the connection you want', body: <>Connections are called &quot;MCP servers.&quot; You can find them at <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] border-b border-[var(--hair)] hover:border-id8-orange transition-colors">github.com/modelcontextprotocol/servers</a> or by searching &quot;MCP server [tool name]&quot;.</> },
  { title: 'Step 2: Add it to your Claude config', body: <>Each connection has instructions. Usually you add a few lines to a config file. Claude walks you through this.</> },
  { title: 'Step 3: Restart Claude and test', body: <>After adding the connection, restart Claude. Then try using it — &quot;Read my Notion page at [URL]&quot; for example.</> },
]

const workflows = [
  { title: 'Research Synthesis', sub: 'Instead of reading 5 articles and taking notes, Claude does the first pass.', code: `I'm researching [TOPIC]. Read these sources:
- [URL 1]
- [URL 2]
- [URL 3]

Create a research brief:
1. Key facts (with source attribution)
2. Conflicting information
3. Gaps - what's not covered
4. Questions I should investigate further

Save to ~/Documents/Research/[topic]-brief.md` },
  { title: 'Notion → Status Update', sub: 'Pull project info from Notion, create a formatted update.', code: `Read my project page in Notion: [NOTION URL]

Create a status update email for my stakeholders:
- What's completed this week
- What's in progress
- Any blockers or risks
- Next week's priorities

Keep it under 200 words. Professional but friendly tone.` },
  { title: 'Competitive Research', sub: 'Analyze competitor websites and summarize findings.', code: `Visit these competitor websites:
- [Competitor 1 URL]
- [Competitor 2 URL]
- [Competitor 3 URL]

For each, identify:
1. Their main value proposition
2. Pricing model (if visible)
3. Key features they highlight
4. Target audience signals

Then: How do we compare? What are they doing that we're not?` },
  { title: 'Content Research', sub: "Pull information for an article or post you're writing.", code: `I'm writing about [TOPIC].

Research phase:
1. Visit the top 3 Google results for "[SEARCH QUERY]"
2. Find relevant statistics and data points
3. Identify common angles and unique angles
4. Note any experts or sources I should cite

Compile into a research document I can use while writing.` },
]

const hiccups = [
  { q: '"Claude says it can\'t access that URL"', items: ['Some sites block automated access — try a different source', "Paywalled content won't work unless you provide the text", 'Very dynamic sites (heavy JavaScript) may not load fully'] },
  { q: '"The Notion connection isn\'t working"', items: ["Make sure your API key has access to the specific pages you're requesting", 'The page must be shared with your integration in Notion settings', 'Try restarting Claude after config changes'] },
  { q: '"This is too technical for me"', items: ["That's okay! Start with just web browsing (no setup required)", 'Ask Claude to walk you through any setup step by step', "You don't need every connection — pick one that would help most"] },
]

const takeaways = [
  { num: 1, text: "Claude can connect to external tools — web, Notion, files, and more. No more copy-paste workflows." },
  { num: 2, text: "Connections are set up once. After that, Claude can access them whenever you need." },
  { num: 3, text: "Start with web browsing (usually works out of the box) before adding other tools." },
  { num: 4, text: "Claude can help you set up connections. Just ask it to walk you through the process." },
  { num: 5, text: "Only connect tools you're comfortable with. You control what Claude can access." },
]

function ToolRow({ name, description, status }: { name: string; description: string; status: 'available' | 'coming-soon' }) {
  return (
    <div className="bg-[var(--paper)] p-4">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{name}</h3>
        <span className={`font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap ${status === 'available' ? 'text-[var(--teal)]' : 'text-[var(--muted)]'}`}>
          {status === 'available' ? 'Available' : 'Coming Soon'}
        </span>
      </div>
      <p className="text-sm text-[var(--body)]">{description}</p>
    </div>
  )
}

const beforeAfter = (label: string, body: ReactNode, accent: boolean) => (
  <div className={`bg-[var(--paper)] p-4 ${accent ? 'border-t-2 md:border-t-0 md:border-l-2 border-id8-orange' : ''}`}>
    <p className={`font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 ${accent ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>{label}</p>
    <p className={`text-sm ${accent ? 'text-[var(--ink)]' : 'text-[var(--body)]'}`}>{body}</p>
  </div>
)

export default function Module7Page() {
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

          <Kicker dot>Module 7 · 50 min · Hands-On</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Connecting <em className="italic text-id8-orange">Your Tools</em>
          </h1>

          <Deck className="mt-6">
            Let Claude read your Notion pages, browse the web, access your files, and more. This is where Claude stops being just a chat and becomes part of your workflow.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 7' },
              { label: '50 min' },
            ]}
          />

          <p className="mt-6 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            Open Claude in another window — we&apos;re connecting tools together.
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

      {/* The Big Idea */}
      <section className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="The Big Idea: Claude Can Use Tools" className="mb-8" />
          <Prose>
            <p>
              Until now, Claude could only see what you pasted into the chat or what files you pointed it to. But here&apos;s what most people don&apos;t realize: <strong>Claude can connect to other apps.</strong>
            </p>
          </Prose>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            {beforeAfter('Before: The Copy-Paste Workflow', '"Let me open Notion... find that page... copy the content... paste it into Claude... get the output... copy it back... paste it into Notion..."', false)}
            {beforeAfter('After: Direct Access', '"Hey Claude, read my project notes in Notion and create a status update." Claude reads Notion directly — no copying, no pasting.', true)}
          </div>

          <MentorNote>
            This feature is called MCP (Model Context Protocol) — but you don&apos;t need to know that. Just know that Claude can plug into your other tools like a universal adapter. We&apos;ll call them &quot;connections&quot; to keep it simple.
          </MentorNote>
        </Container>
      </section>

      {/* What Can Claude Connect To */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What Can Claude Connect To?" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            The list is growing, but here are the connections most useful for knowledge workers:
          </p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {tools.map((t) => (
              <ToolRow key={t.name} {...t} />
            ))}
          </div>

          <div className="mt-6 border border-[var(--hair)] p-4">
            <p className="text-sm text-[var(--body)]">
              <strong className="text-[var(--ink)]">More connections are being added constantly.</strong> The technical community is building new ones every week. By the time you read this, there may be connections for Slack, Airtable, Todoist, and more.
            </p>
          </div>
        </Container>
      </section>

      {/* Watch Me First */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Watch Me First: Using the Web Connection" className="mb-8" />
          <Prose>
            <p>
              Let&apos;s start with the simplest connection: web browsing. Claude can visit URLs and read their content. Here&apos;s how I use it:
            </p>
          </Prose>

          <div className="my-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-4">
            <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange mb-2">My workflow: Research without tab hell</p>
            <p className="text-[var(--body)]">
              Instead of opening 10 tabs and skimming articles, I give Claude a list of URLs and ask it to extract what I need. It reads them all, synthesizes the information, and gives me a summary.
            </p>
          </div>

          <CopyableCode
            label="Example prompt I use:"
            code={`Read these articles about [TOPIC]:
- [URL 1]
- [URL 2]
- [URL 3]

For each article:
1. Main argument in one sentence
2. Key evidence or data points
3. What's missing or questionable

Then synthesize: What's the consensus? Where do they disagree? What should I look into further?`}
          />

          <TryThisNow title="Test Web Browsing">
            <p className="text-[var(--body)] mb-4">Let&apos;s see if web browsing works in your Claude setup. Paste this:</p>
            <CopyableCode
              code={`Visit this URL and tell me what the page is about:
https://en.wikipedia.org/wiki/Prompt_engineering

Give me a 2-sentence summary.`}
            />
            <p className="text-[var(--body)] mt-4 mb-4">
              If Claude reads the page and gives you a summary, web browsing is working! If it says it can&apos;t access URLs, we&apos;ll troubleshoot that.
            </p>
            <div className="border border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">If it didn&apos;t work</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                <li>Web browsing may need to be enabled in your Claude settings</li>
                <li>Some Claude interfaces have browsing, others don&apos;t</li>
                <li>Claude Code (terminal) always has file access but web varies by setup</li>
              </ul>
            </div>
          </TryThisNow>
        </Container>
      </section>

      {/* Setting Up Connections */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Setting Up Connections (MCP Servers)" className="mb-8" />
          <Prose>
            <p>
              Here&apos;s the honest truth: setting up new connections requires a bit of technical setup. But once it&apos;s done, it&apos;s done forever. Let me walk you through the process.
            </p>
          </Prose>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] my-8">
            {setupSteps.map((s, i) => (
              <div key={i} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">{s.title}</p>
                <p className="text-sm text-[var(--body)]">{s.body}</p>
              </div>
            ))}
          </div>

          <MentorNote>
            Don&apos;t worry if this sounds technical. In the next exercise, you&apos;ll ask Claude to help you set up a connection. Claude is really good at walking you through this kind of thing — it knows its own configuration.
          </MentorNote>
        </Container>
      </section>

      {/* Try This Now: Set Up Notion */}
      <section className="pb-14">
        <Container narrow>
          <TryThisNow title="Set Up the Notion Connection (Optional but Powerful)">
            <p className="text-[var(--body)] mb-4">If you use Notion, this is a game-changer. Ask Claude to help you set it up:</p>
            <CopyableCode
              code={`I want to connect you to my Notion workspace so you can read my pages.

Help me set up the Notion MCP server. Walk me through:
1. What I need to install
2. How to get my Notion API key
3. Where to add the configuration
4. How to test that it works

Go step by step and wait for me to confirm each step before continuing.`}
            />
            <p className="text-[var(--body)] mt-4 mb-4">
              Claude will guide you through the setup. It typically takes 5-10 minutes the first time.
            </p>
            <div className="border border-[var(--hair)] bg-[var(--paper)] p-4">
              <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">Once connected, you can</p>
              <ul className="text-sm text-[var(--body)] space-y-1">
                <li>&quot;Read my project notes in Notion and summarize them&quot;</li>
                <li>&quot;Find all my meeting notes from last week&quot;</li>
                <li>&quot;What tasks are marked as in-progress in my task database?&quot;</li>
              </ul>
            </div>
          </TryThisNow>
        </Container>
      </section>

      {/* Practical Workflows */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Practical Workflows With Connected Tools" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">Here&apos;s how I actually use these connections in my daily work:</p>

          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {workflows.map((w) => (
              <div key={w.title} className="bg-[var(--paper)] p-6">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{w.title}</h3>
                <p className="text-sm text-[var(--body)] mb-4">{w.sub}</p>
                <CopyableCode code={w.code} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Security Note */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="A Note on Security and Privacy" className="mb-8" />
          <div className="border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-6 mb-6">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Important to understand</p>
            <ul className="text-sm text-[var(--body)] space-y-2">
              <li>When Claude connects to a tool, it can only do what you&apos;ve authorized</li>
              <li>Notion connections use API keys that YOU create and can revoke anytime</li>
              <li>Claude doesn&apos;t store your tool credentials — they live in your local config</li>
              <li>You can see what Claude is doing (it tells you when it&apos;s reading/writing)</li>
            </ul>
          </div>
          <MentorNote>
            I only connect Claude to tools where I&apos;m comfortable with it seeing the data. My Notion workspace? Yes. My personal journal? No. Use the same judgment you&apos;d use giving a new employee access to systems.
          </MentorNote>
        </Container>
      </section>

      {/* Common Hiccups */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Common Hiccups (And How to Fix Them)" className="mb-8" />
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
            {hiccups.map((h, i) => (
              <div key={i} className="bg-[var(--paper)] p-4">
                <p className="font-medium text-[var(--ink)] mb-2">{h.q}</p>
                <ul className="text-sm text-[var(--body)] space-y-1">
                  {h.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
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
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4">
              Managing Long Sessions
            </h2>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)] mb-4">
              Now Claude can access your tools. But what happens during long, complex sessions when context gets cluttered? How do you keep Claude focused when you&apos;ve been working together for an hour?
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--ink)]">
              In <strong>Module 8: Managing Long Sessions</strong>, we&apos;ll learn how to keep Claude sharp, reset context when needed, and handle the inevitable &quot;Claude seems confused&quot; moments.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="claude-for-knowledge-workers"
            moduleSlug="module-7"
            nextModulePath="/courses/claude-for-knowledge-workers/module-8"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-6" variant="ghost">
              &larr; Previous: Custom Commands
            </EditorialButton>
            <EditorialButton href="/courses/claude-for-knowledge-workers/module-8" variant="primary">
              Next: Managing Long Sessions &rarr;
            </EditorialButton>
          </div>
        </Container>
      </section>
    </article>
  )
}
