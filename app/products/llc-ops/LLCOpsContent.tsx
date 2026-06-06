import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
} from '@/components/editorial'

// Agent data
const agents = [
  {
    name: 'Sentinel',
    role: 'Compliance Radar',
    description: 'Tracks every deadline 90 days out, flags urgency levels, tells you exactly what to do',
  },
  {
    name: 'Ledger',
    role: 'Accounting Strategist',
    description: 'Categorizes expenses for maximum deductions, thinks like a tax manager',
  },
  {
    name: 'Filer',
    role: 'Procedures Expert',
    description: 'Walks through every filing step-by-step with exact URLs, costs, and what to expect',
  },
  {
    name: 'Advisor',
    role: 'Legal/Tax Counsel',
    description: 'Answers LLC questions with confidence levels and clear "when to call a CPA" guidance',
  },
  {
    name: 'Strategist',
    role: 'Tax Optimizer',
    description: 'S-Corp analysis, QBI deductions, retirement accounts, R&D credits—the advanced stuff',
  },
  {
    name: 'Guardian',
    role: 'Risk & Protection',
    description: 'Insurance adequacy, contract risks, asset protection, audit exposure',
  },
  {
    name: 'Comptroller',
    role: 'Financial Officer',
    description: 'Cash flow, reserves, banking optimization, capital allocation',
  },
  {
    name: 'Monitor',
    role: 'Regulatory Tracker',
    description: 'Watches for law changes, new requirements, state-specific updates',
  },
  {
    name: 'Mentor',
    role: 'Teaching Partner',
    description: 'Builds your proficiency over time with a 4-level learning track',
  },
]

// Comparison data
const comparisons = [
  { traditional: 'CPA on retainer: $2-5k/year', llcOps: 'Custom agents: One-time build' },
  { traditional: 'Wait for appointments', llcOps: 'Instant, 24/7' },
  { traditional: "They don't know your business", llcOps: 'Knows entity details, patterns, history' },
  { traditional: 'Reactive (you ask)', llcOps: 'Proactive (surfaces issues)' },
  { traditional: 'Generic advice', llcOps: 'Specific calculations with your numbers' },
]

// Use case data
const useCases = [
  {
    title: 'Solo Founders',
    description: 'Run your LLC without hiring a back office. Get expert guidance on compliance, taxes, and strategy.',
  },
  {
    title: 'Creative Professionals',
    description: 'Freelancers and contractors who need business operations handled so they can focus on their craft.',
  },
  {
    title: 'Side Businesses',
    description: 'Full-time job plus LLC? Agents handle the complexity so you don\'t have to.',
  },
  {
    title: 'Multi-Entity Structures',
    description: 'Holding companies, multiple LLCs, complex structures—agents scale with you.',
  },
]

const whatYouGet = [
  'Custom agent system built for your specific business and state',
  'Deep reference library covering your domain',
  'Notion integration for live operational data',
  'Proactive deadline tracking and compliance monitoring',
  'Teaching system that builds your proficiency over time',
]

export default function LLCOpsContent() {
  return (
    <main className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Custom Agent Framework</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Replace a $50k back office with <em className="italic text-id8-orange">specialized agents</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            Expert AI agent systems for business operations. Nine specialized agents providing
            PhD-level guidance on tax strategy, compliance, asset protection, and financial management.
          </Deck>
          <MetaRow
            className="border-t border-[var(--hair)] pt-6"
            items={[
              { value: '9', label: 'agents' },
              { value: '~128KB', label: 'knowledge base' },
              { value: 'Notion MCP', label: 'integration' },
              { value: 'In production', label: 'status' },
            ]}
          />
        </header>

        {/* Overview */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="Overview" />
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--body)]">
            <p>
              Running an LLC without overhead means no CFO to watch cash flow, no CPA on retainer for
              every question, no compliance team tracking deadlines, no mentor explaining how this all works.
            </p>
            <p>You&apos;re wearing all the hats while also building the business.</p>
            <p>
              We built a 9-agent AI operations team that provides PhD-level guidance across tax strategy,
              compliance, asset protection, and financial management. Then we realized: this framework
              works for any business domain.
            </p>
          </div>
        </section>

        <Rule />

        {/* The 9 Agents */}
        <section className="py-16">
          <SectionHead title={<>The <em className="italic text-id8-orange">9-agent</em> system</>} meta="The team" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {agents.map((agent) => (
              <div key={agent.name} className="bg-[var(--paper)] p-6">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{agent.name}</h3>
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-id8-orange mb-2">{agent.role}</p>
                <p className="text-sm text-[var(--muted)]">{agent.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Architecture */}
        <section className="py-16">
          <SectionHead title="The architecture" />
          <div className="mt-10 max-w-3xl">
            <p className="text-[var(--body)] mb-6 leading-relaxed">
              Each agent is a Claude Code skill&mdash;globally available, contextually aware, and integrated
              with your actual operational data through Notion MCP.
            </p>
            <div className="font-[family-name:var(--font-mono)] text-sm bg-[var(--paper-shadow)] p-6 border border-[var(--hair)] overflow-x-auto">
              <pre className="text-[var(--body)]">{`~/.claude/skills/llc-ops/
├── SKILL.md (25KB)      # Agent definitions, dispatch rules
├── CLAUDE.md (9KB)      # Entity info, operating principles
└── references/          # Deep knowledge base
    ├── compliance.md
    ├── tax-strategy.md
    ├── asset-protection.md
    └── ... (8 reference docs)`}</pre>
            </div>
            <p className="text-[var(--muted)] mt-4 text-sm">
              Total: ~128KB of structured expert knowledge per domain.
            </p>
          </div>
        </section>

        <Rule />

        {/* Comparison */}
        <section className="py-16">
          <SectionHead title="Traditional vs. agent-based" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {comparisons.map((item) => (
              <div key={item.traditional} className="py-5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
                <p className="text-[var(--muted)] line-through decoration-[var(--hair-hard)]">{item.traditional}</p>
                <p className="text-[var(--ink)] flex items-baseline gap-3">
                  <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                  {item.llcOps}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Use Cases */}
        <section className="py-16">
          <SectionHead title="Who this is for" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">{useCase.title}</h3>
                <p className="text-[var(--muted)]">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* What You Get */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-4">What you get</Kicker>
            <ul className="space-y-3 text-lg text-[var(--body)]">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </EditorialCard>
        </section>

        <Rule />

        {/* CTA */}
        <section className="py-16 text-center">
          <SectionHead title={<>Need a <em className="italic text-id8-orange">custom</em> agent system?</>} className="border-0 pb-0 justify-center" />
          <p className="mt-7 mb-9 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            We built LLC Ops for ourselves. The framework works for any domain&mdash;real estate operations,
            creative production, trading research, project management. If you&apos;re wearing too many hats,
            let&apos;s build the agents that take some off.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <EditorialButton href="https://x.com/eddiebe" external>
              Talk to Eddie on X
            </EditorialButton>
            <EditorialButton href="mailto:eb@id8labs.tech?subject=Custom%20Agent%20System%20Inquiry" external variant="secondary">
              Email Us
            </EditorialButton>
          </div>
        </section>

        <Rule />

        {/* Status */}
        <section className="pt-16 space-y-3">
          <MetaRow
            items={[
              { value: 'In production', label: 'framework at ID8Labs' },
              { value: 'Claude Code Skills / Notion MCP', label: 'built with' },
            ]}
          />
          <div className="pt-4">
            <EditorialButton href="/writing/building-llc-ops" variant="ghost">
              Read the full case study
            </EditorialButton>
          </div>
        </section>
      </Container>
    </main>
  )
}
