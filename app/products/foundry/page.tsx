import type { Metadata } from 'next'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'ID8Foundry - ID8Labs',
  description: 'The system that builds systems. A self-improving development framework that captures patterns, decisions, and failures across projects.',
  alternates: { canonical: '/products/foundry' },
  openGraph: {
    title: 'ID8Foundry | id8Labs',
    description: 'The system that builds systems. A self-improving development framework that captures patterns, decisions, and failures across projects.',
    url: 'https://id8labs.app/products/foundry',
  },
}

// Pipeline files structure
const foundryFiles = [
  { name: 'SYSTEM.md', description: 'Sr Dev operating instructions, decision frameworks' },
  { name: 'CONTEXT.md', description: 'Who you are, how you work, current priorities' },
  { name: 'HANDOFF.md', description: 'Session continuity — where we left off' },
  { name: 'STACK.md', description: 'Default technology choices (Next.js, Supabase, Vercel)' },
  { name: 'LEARNINGS.md', description: 'Captured insights from every project' },
]

// Framework files
const frameworks = [
  { name: 'DECISIONS.md', description: 'How to make technical decisions with tradeoffs' },
  { name: 'SCOPING.md', description: 'Ruthless scoping discipline — cut to ship' },
  { name: 'FAILURE_PATTERNS.md', description: 'What breaks and why — so you never fail the same way twice' },
]

// Pattern files
const patterns = [
  { name: 'ARCHITECTURE.md', description: 'Reusable structural patterns' },
  { name: 'COMPONENTS.md', description: 'Code patterns that work' },
  { name: 'ANTI_PATTERNS.md', description: 'What to avoid' },
]

const commands = [
  { cmd: 'pipeline status', desc: 'Report current project, phase, and next checkpoint' },
  { cmd: 'new project [name]', desc: 'Create fresh project file from template' },
  { cmd: 'sync project [name]', desc: 'Import existing repo into Foundry' },
  { cmd: 'log learning', desc: 'Add entry to LEARNINGS.md' },
  { cmd: 'extract pattern', desc: 'Move learning → pattern file' },
  { cmd: 'update handoff', desc: 'Update session state' },
]

function FileTable({ files, title }: { files: { name: string; description: string }[]; title: string }) {
  return (
    <div>
      <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
        {title}
      </h3>
      <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
        {files.map((file) => (
          <div key={file.name} className="py-4 grid md:grid-cols-[220px_1fr] gap-1.5 md:gap-8">
            <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{file.name}</span>
            <span className="text-[var(--body)]">{file.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FoundryPage() {
  return (
    <main className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Internal Framework</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            The system that <em className="italic text-id8-orange">builds systems</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            A self-improving development framework that captures patterns, decisions, and failures
            across projects. Every build makes the next one faster.
          </Deck>
          <MetaRow
            className="border-t border-[var(--hair)] pt-6"
            items={[
              { value: 'In production', label: 'at ID8Labs' },
              { value: '~/.claude/pipeline/', label: 'location' },
              { value: 'Claude Code', label: 'integrated with' },
            ]}
          />
        </header>

        {/* Philosophy */}
        <section className="py-16">
          <SectionHead title={<>The <em className="italic text-id8-orange">philosophy</em></>} />
          <blockquote className="mt-10 font-[family-name:var(--font-serif)] italic text-2xl md:text-[1.75rem] leading-[1.4] text-[var(--ink)] max-w-3xl border-l-2 border-id8-orange pl-7">
            &ldquo;Like mycelium &mdash; the visible output (shipped code) is just the fruiting body.
            The real intelligence is the network underneath.&rdquo;
          </blockquote>
          <div className="mt-10 max-w-2xl space-y-3 text-lg text-[var(--body)]">
            <p>Every project that passes through the Foundry:</p>
            <ul className="space-y-2">
              {[
                'Benefits from patterns learned in previous projects',
                'Contributes new patterns back to the system',
                'Compounds your ability to ship faster and cleaner',
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Rule />

        {/* Pipeline vs Foundry */}
        <section className="py-16">
          <SectionHead title="How it works" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-id8-orange mb-3">ID8Pipeline</h3>
              <p className="text-[var(--body)] mb-4 leading-relaxed">
                The 11-stage build process. Concept Lock &rarr; Ship &rarr; Listen &amp; Iterate.
              </p>
              <p className="text-sm text-[var(--muted)]">
                Defines <strong className="text-[var(--ink)]">what stages</strong> a project goes through.
              </p>
            </div>
            <div className="bg-[var(--paper-shadow)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">ID8Foundry</h3>
              <p className="text-[var(--body)] mb-4 leading-relaxed">
                The accumulated knowledge. Patterns, decisions, failures, learnings.
              </p>
              <p className="text-sm text-[var(--muted)]">
                Provides <strong className="text-[var(--ink)]">the knowledge</strong> accumulated from all projects.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* Structure */}
        <section className="py-16">
          <SectionHead title="The structure" meta="Filesystem" />
          <div className="mt-10 font-[family-name:var(--font-mono)] text-sm bg-[var(--paper-shadow)] p-6 border border-[var(--hair)] mb-12 overflow-x-auto">
            <pre className="text-[var(--body)]">{`~/.claude/pipeline/
├── SYSTEM.md           # Operating instructions
├── CONTEXT.md          # Who you are, current priorities
├── HANDOFF.md          # Session continuity
├── STACK.md            # Default tech choices
├── frameworks/
│   ├── DECISIONS.md    # Decision framework
│   ├── SCOPING.md      # Scoping discipline
│   └── FAILURE_PATTERNS.md
├── patterns/
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   └── ANTI_PATTERNS.md
├── projects/
│   ├── _TEMPLATE.md
│   └── [project].md    # Active project files
└── logs/
    └── LEARNINGS.md    # Captured insights`}</pre>
          </div>

          <div className="space-y-12">
            <FileTable files={foundryFiles} title="Core Files" />
            <FileTable files={frameworks} title="Frameworks" />
            <FileTable files={patterns} title="Patterns" />
          </div>
        </section>

        <Rule />

        {/* Session Startup */}
        <section className="py-16">
          <SectionHead title="Session startup" />
          <div className="mt-10 max-w-2xl">
            <p className="text-lg text-[var(--muted)] mb-6">Every session, before diving into work:</p>
            <ol className="space-y-3 text-lg text-[var(--body)]">
              <li className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-id8-orange text-sm">01</span>
                <span>Read <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">HANDOFF.md</span> &mdash; Where we left off</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-id8-orange text-sm">02</span>
                <span>Check active project file &mdash; Current phase, blockers, decisions</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-id8-orange text-sm">03</span>
                <span>Ask: <em className="font-[family-name:var(--font-serif)] italic">&quot;What&apos;s the highest-leverage thing we can do today?&quot;</em></span>
              </li>
            </ol>
          </div>
        </section>

        <Rule />

        {/* Commands */}
        <section className="py-16">
          <SectionHead title="Commands" meta="6 verbs" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {commands.map((item) => (
              <div key={item.cmd} className="py-4 grid md:grid-cols-[220px_1fr] gap-1.5 md:gap-8">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{item.cmd}</span>
                <span className="text-[var(--body)]">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Footer */}
        <section className="pt-16">
          <MetaRow
            items={[
              { value: 'In production', label: 'at ID8Labs' },
              { value: '~/.claude/pipeline/', label: 'location' },
              { value: 'Claude Code', label: '+ ID8Pipeline stages' },
            ]}
          />
        </section>
      </Container>
    </main>
  )
}
