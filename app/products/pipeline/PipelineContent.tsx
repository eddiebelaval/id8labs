import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  Pipeline,
} from '@/components/editorial'

const skills = [
  {
    name: 'Tracker',
    purpose: 'Pipeline Heartbeat',
    description: 'Tracks all projects through lifecycle states, enforces quality gates, calculates decay, generates dashboards',
  },
  {
    name: 'Scout',
    purpose: 'Market Validation',
    description: 'TAM/SAM/SOM analysis, competitive teardowns, community signal mining. Delivers BUILD/PIVOT/KILL verdicts',
  },
  {
    name: 'Architect',
    purpose: 'Technical Design',
    description: 'System architecture, stack selection, database patterns, API design. Outputs build roadmaps in phases',
  },
  {
    name: 'Launch',
    purpose: 'Go-to-Market',
    description: 'Positioning, pricing, messaging, launch sequencing. Platform playbooks for Product Hunt, HN, Reddit',
  },
  {
    name: 'Growth',
    purpose: 'Scale Engine',
    description: 'Growth loops, analytics frameworks, acquisition channels, retention optimization, A/B testing',
  },
  {
    name: 'Ops',
    purpose: 'Operations Systems',
    description: 'SOP creation, delegation frameworks, customer success, team building. If twice, document. If ten times, automate',
  },
  {
    name: 'Exit',
    purpose: 'Exit Preparation',
    description: 'Valuation methods, due diligence prep, data room checklists, term sheet analysis',
  },
  {
    name: 'Today',
    purpose: 'Daily Operations',
    description: '14 productivity methods with context-aware suggestions. Manages tasks across projects, TV production, and life',
  },
]

const lifecycleStates = [
  { state: 'CAPTURED', decay: '14 days', description: 'Raw idea logged' },
  { state: 'VALIDATING', decay: '7 days', description: 'Scout running research' },
  { state: 'VALIDATED', decay: '14 days', description: 'Ready for architecture' },
  { state: 'ARCHITECTING', decay: '14 days', description: 'Technical design' },
  { state: 'BUILDING', decay: '90 days', description: 'Active development' },
  { state: 'LAUNCHING', decay: '30 days', description: 'Go-to-market' },
  { state: 'GROWING', decay: '180 days', description: 'Scale and optimize' },
  { state: 'OPERATING', decay: '365 days', description: 'Generating revenue' },
  { state: 'EXITING', decay: '180 days', description: 'Exit in progress' },
  { state: 'EXITED', decay: '∞', description: 'Successfully sold' },
]

const methods = [
  'Eisenhower Matrix',
  'GTD',
  'Pomodoro',
  'Eat the Frog',
  'Time Blocking',
  'Ivy Lee',
  '1-3-5 Rule',
  'Must-Should-Could',
  'Energy Mapping',
  'Weekly Themes',
  'Personal Kanban',
  'Two-Minute Rule',
  'Batching',
  'Hybrid Recipes',
]

const gates = [
  { from: 'CAPTURED → VALIDATING', req: 'Scout must be invoked with clear problem statement' },
  { from: 'VALIDATING → VALIDATED', req: 'Scout must return BUILD verdict (not PIVOT or KILL)' },
  { from: 'VALIDATED → ARCHITECTING', req: 'Architect must be invoked with validation report' },
  { from: 'ARCHITECTING → BUILDING', req: 'Architecture doc and build roadmap must exist' },
  { from: 'BUILDING → LAUNCHING', req: 'Product must be deployed and functional' },
]

const philosophy = [
  { label: 'Decay mechanics', body: 'Ideas that don\'t move forward decay and freeze. This is a feature, not a bug.' },
  { label: 'Stage gates', body: 'Quality checkpoints prevent premature advancement. You can\'t launch what isn\'t built.' },
  { label: 'Calibration', body: 'All estimates assume AI-augmented solo builder, not enterprise dev teams with 10 meetings per feature.' },
  { label: 'Review rituals', body: 'Daily pulse (2 min), weekly review (15 min), monthly strategy (30 min). Sustainable discipline.' },
  { label: 'Skill chaining', body: 'Outputs from one phase feed naturally into the next. Scout\'s validation report becomes Architect\'s requirements.' },
]

const flowSteps = [
  { label: 'Idea' },
  { label: 'Scout' },
  { label: 'Architect' },
  { label: 'Build' },
  { label: 'Launch', human: true },
  { label: 'Growth' },
  { label: 'Ops' },
  { label: 'Exit' },
]

const stats = [
  { value: '8', label: 'AI Skills' },
  { value: '14', label: 'Productivity Methods' },
  { value: '10', label: 'Lifecycle States' },
  { value: '83', label: 'Framework Files' },
]

export default function PipelineContent() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Internal Tooling</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Structure creates <em className="italic text-id8-orange">momentum</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            Complete idea-to-exit lifecycle management for solo builders. Eight interconnected AI
            agents with decay mechanics and stage gates. Every stage has a clear exit.
          </Deck>
          <MetaRow
            className="border-t border-[var(--hair)] pt-6"
            items={[
              { value: '8', label: 'AI skills' },
              { value: '10', label: 'lifecycle states' },
              { value: '14', label: 'productivity methods' },
              { value: 'Internal', label: 'tooling' },
            ]}
          />
        </header>

        {/* Overview */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="Overview" />
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--body)]">
            <p>
              I kept starting projects that never shipped. Great ideas would decay into guilt.
              Some projects moved too fast and launched half-baked. Others got stuck in endless
              &quot;research&quot; that was really just procrastination.
            </p>
            <p>The problem wasn&apos;t motivation. It was systems.</p>
            <p>
              So I built the operating system for building products. Not project management
              software&mdash;a thinking framework implemented as AI agents that know what questions
              to ask at each stage, what gates to enforce, and when to push back.
            </p>
          </div>
        </section>

        <Rule />

        {/* The 8 Skills */}
        <section className="py-16">
          <SectionHead title={<>The <em className="italic text-id8-orange">8</em> skills</>} meta="The team" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {skills.map((skill, index) => (
              <div key={skill.name} className="py-5 grid md:grid-cols-[48px_1fr] gap-3 md:gap-6">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{skill.name}</h3>
                    <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{skill.purpose}</span>
                  </div>
                  <p className="text-[var(--muted)]">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Decay Mechanics */}
        <section className="py-16">
          <SectionHead title="Decay mechanics" meta="Forcing functions" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Ideas that don&apos;t move forward decay. Each lifecycle state has a decay window. At 50%,
            you get a warning. At 100%, the project freezes to ICE status. This isn&apos;t punishment&mdash;it&apos;s
            forcing functions. If a project keeps decaying, maybe it shouldn&apos;t exist.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {lifecycleStates.map((item) => (
              <div key={item.state} className="bg-[var(--paper)] p-4 text-center">
                <p className="font-[family-name:var(--font-mono)] text-xs font-medium text-id8-orange">{item.state}</p>
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)] mt-1">{item.decay}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Stage Gates */}
        <section className="py-16">
          <SectionHead title="Stage gates" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            You can&apos;t skip ahead. Each transition has requirements that must be met.
          </p>
          <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {gates.map((gate) => (
              <div key={gate.from} className="py-5 grid md:grid-cols-[300px_1fr] gap-2 md:gap-8">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">{gate.from}</span>
                <span className="text-[var(--body)]">{gate.req}</span>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Daily Operations */}
        <section className="py-16">
          <SectionHead title="Daily operations" meta="14 methods" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Today manages tasks across three domains&mdash;projects, TV production, and life admin.
            It suggests the right productivity method based on your current context: energy level,
            task volume, and resistance patterns.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {methods.map((method) => (
              <div key={method} className="bg-[var(--paper)] p-4 text-center text-sm text-[var(--body)]">
                {method}
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Pipeline Flow */}
        <section className="py-16">
          <SectionHead title="The pipeline flow" />
          <div className="mt-10">
            <Pipeline title="Idea to exit" steps={flowSteps} />
            <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              Tracker monitors all &middot; Today manages daily execution
            </p>
          </div>
        </section>

        <Rule />

        {/* Philosophy */}
        <section className="py-16">
          <SectionHead title="Philosophy" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {philosophy.map((p) => (
              <div key={p.label} className="py-5 grid md:grid-cols-[220px_1fr] gap-2 md:gap-8">
                <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]">{p.label}</span>
                <p className="text-[var(--body)]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Stats */}
        <section className="py-16">
          <SectionHead title="By the numbers" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--paper)] p-7 text-center">
                <p className="font-[family-name:var(--font-display)] font-normal text-4xl text-[var(--ink)]">{stat.value}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Status */}
        <section className="pt-16 space-y-3">
          <MetaRow
            items={[
              { value: 'Internal tooling', label: 'at ID8Labs — dogfooded on every product' },
              { value: 'Claude Code skills', label: '+ Memory / Perplexity / Firecrawl / Supabase / GitHub MCP' },
            ]}
          />
          <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)] pt-4">
            The goal: Make building repeatable, teachable, and finishable.
          </p>
        </section>
      </Container>
    </div>
  )
}
