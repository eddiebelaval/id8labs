import { Container } from '@/components/editorial'

// Data
const superpowers = [
  {
    title: 'File System Access',
    description: 'Web Claude only sees what you paste. Claude Code sees your entire computer.',
    example: '"Organize my Downloads folder" • "Find all invoices from 2024"',
  },
  {
    title: 'Long-Running Sessions',
    description: 'Web Claude forgets when you close the tab. Claude Code remembers across sessions.',
    example: 'Complex projects • Workflows that build on previous work',
  },
  {
    title: 'Tool Installation',
    description: 'Web Claude is sandboxed. Claude Code installs external tools: web search, databases, APIs.',
    example: 'Perplexity search • Browser automation • Database connections',
  },
]

const misconceptions = [
  { wrong: "It's for developers", right: "It's for anyone with files to process" },
  { wrong: "You need to write code", right: "You describe what you want in English" },
  { wrong: "It's just a better chatbot", right: "It's an agent that does the work" },
]

const quickStart = [
  { step: '1', command: 'curl -fsSL https://claude.ai/install.sh | bash', description: 'Install' },
  { step: '2', command: 'claude', description: 'Start' },
  { step: '3', command: 'cd ~/Downloads', description: 'Navigate' },
  { step: '4', command: '"Organize this folder by file type"', description: 'Delegate' },
]

const delegationExamples = [
  {
    category: 'File Organization',
    prompt: '"Go through my Downloads folder. Move PDFs to Documents/PDFs, images to Pictures, and delete anything older than 6 months that I haven\'t opened."',
  },
  {
    category: 'Research',
    prompt: '"Search the web for the top 5 competitors to [Company]. For each one, find their pricing, key features, and target market. Save a comparison table to Research/Competitors.md"',
  },
  {
    category: 'Writing',
    prompt: '"Here are my voice memo transcripts from this week. Find the 3 strongest ideas for blog posts. For each, write a one-paragraph outline. Save to Writing/Ideas/[Date].md"',
  },
]

const fullCourse = [
  'Your First Delegation',
  'Working With Your Files',
  "The Writer's Workflow",
  'Research & Analysis',
  'Personal Operations',
  'Power User Patterns',
]

const sectionKicker = 'font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange mb-3'
const sectionTitle = 'font-[family-name:var(--font-display)] font-normal tracking-[-0.01em] text-[var(--ink)] text-2xl md:text-3xl'

export default function Module0PrintPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] print:min-h-0">
      {/* Masthead */}
      <section className="py-12 border-b border-[var(--rule)]">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 font-[family-name:var(--font-mono)] text-xs">
              <span className="text-id8-orange uppercase tracking-[0.2em]">Module 0</span>
              <span className="text-[var(--muted)]">Free · 15 min</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,5vw,3.5rem)] mb-6">
              The Mental <em className="italic text-id8-orange">Model Shift</em>
            </h1>
            <p className="font-[family-name:var(--font-serif)] italic text-xl text-[var(--muted)] max-w-2xl leading-[1.45]">
              From Chatbot to Operating System: Install Claude Code and complete your first real delegation in 15 minutes.
            </p>
          </div>
        </Container>
      </section>

      {/* The Name Problem */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={sectionKicker}>The Problem</p>
              <h2 className={sectionTitle}>&quot;Claude Code&quot; Is a Terrible Name</h2>
            </div>
            <p className="text-[var(--body)] mb-8 max-w-2xl">
              When you hear &quot;Code&quot; you think developers, programming, not for me. Here&apos;s what it actually is:
            </p>

            <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
              {misconceptions.map((item, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-px bg-[var(--hair)]">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[var(--paper)]">
                    <span className="text-[var(--muted)] flex-shrink-0">&times;</span>
                    <span className="text-[var(--muted)] line-through">{item.wrong}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[var(--paper-shadow)] border-l-2 border-id8-orange">
                    <span className="text-id8-orange flex-shrink-0">&rarr;</span>
                    <span className="text-[var(--ink)]">{item.right}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-4">
              <p className="text-lg text-[var(--ink)]">
                Think of it as: <span className="text-id8-orange">Claude Local</span> or{' '}
                <span className="text-id8-orange">Claude Agent</span> or{' '}
                <span className="text-id8-orange">Claude with File Access</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The 3 Superpowers */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="text-center mb-10">
            <p className={sectionKicker}>What You Get</p>
            <h2 className={sectionTitle}>The 3 Superpowers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)] max-w-5xl mx-auto">
            {superpowers.map((power, index) => (
              <div key={index} className="bg-[var(--paper)] p-5">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{power.title}</h3>
                </div>
                <p className="text-sm text-[var(--body)] mb-4">{power.description}</p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] p-2 bg-[var(--paper-mid)]">{power.example}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Mental Model Shift */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={sectionKicker}>The Key Insight</p>
              <h2 className={sectionTitle}>The Shift From Assistance to Delegation</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] mb-8">
              <div className="bg-[var(--paper)] p-5">
                <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Old Way (Assistance)</p>
                <p className="font-[family-name:var(--font-serif)] italic text-[var(--body)]">&quot;Help me write interview questions&quot;</p>
                <p className="text-sm text-[var(--muted)] mt-3">
                  &rarr; Claude gives suggestions. You copy. You edit. You format. You save.
                </p>
              </div>
              <div className="bg-[var(--paper-shadow)] p-5 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
                <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">New Way (Delegation)</p>
                <p className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">&quot;Generate 15 interview questions based on this guest&apos;s bio. Save to /Prep/[Name].md&quot;</p>
                <p className="text-sm text-id8-orange mt-3">
                  &rarr; Claude does all of it. You review the output.
                </p>
              </div>
            </div>

            <p className="text-xl text-[var(--ink)]">
              One gives you <span className="text-[var(--muted)]">suggestions</span>. The other gives you <span className="text-id8-orange">deliverables</span>.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Start */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={sectionKicker}>Hands-On</p>
              <h2 className={sectionTitle}>Quick Start</h2>
            </div>
            <div className="space-y-4">
              {quickStart.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-3">{String(item.step).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <code className="block px-4 py-3 border border-[var(--hair-hard)] bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]">
                      {item.command}
                    </code>
                    <p className="text-sm text-[var(--muted)] mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Your First Delegation */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={sectionKicker}>5 min challenge</p>
              <h2 className={sectionTitle}>Your First Delegation</h2>
            </div>
            <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
              <p className="text-lg text-[var(--body)] leading-[1.7] mb-6">
                Navigate to your Downloads folder (or any messy folder). Tell Claude:
              </p>
              <div className="p-4 border border-[var(--hair-hard)] bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] mb-6">
                &quot;Show me what&apos;s in this folder. Group files by type. Tell me which ones are duplicates. Create a summary of what&apos;s taking up the most space.&quot;
              </div>
              <p className="text-[var(--body)]">
                Watch it scan, analyze, and report back. <strong>You didn&apos;t write any code.</strong> You just asked for what you wanted.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Delegation Examples */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={sectionKicker}>Example Delegations</p>
              <h2 className={sectionTitle}>The Delegation Formula</h2>
            </div>
            <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)]">
              {delegationExamples.map((example, index) => (
                <div key={index} className="bg-[var(--paper)] p-5">
                  <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.22em] text-id8-orange mb-2">{example.category}</p>
                  <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--body)]">{example.prompt}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border border-[var(--hair)] p-4">
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">The Pattern</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--body)]">
                <li>Give context (what files, what folder, what you&apos;re trying to do)</li>
                <li>State the outcome you want (not the steps to get there)</li>
                <li>Specify where to save the result</li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* What's Next */}
      <section className="py-12 border-b border-[var(--hair)] print:py-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={sectionKicker}>The Full Course</p>
              <h2 className={sectionTitle}>What&apos;s Next</h2>
            </div>
            <p className="text-[var(--body)] mb-8">
              Module 0 is your proof of concept. The full course covers:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
              {fullCourse.map((module, index) => (
                <div key={index} className="bg-[var(--paper)] p-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{String(index + 1).padStart(2, '0')}</span>{' '}
                  <span className="text-sm text-[var(--body)]">{module}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <section className="py-8 print:py-4">
        <Container>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">
              Stop asking. <em className="italic text-id8-orange">Start delegating.</em>
            </p>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              id8labs.app/courses/claude-for-knowledge-workers
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
