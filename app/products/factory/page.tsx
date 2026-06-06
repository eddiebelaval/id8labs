import type { Metadata } from 'next'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
  Pipeline,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Factory - ID8Labs',
  description: 'AI creative production pipeline. Orchestrates Midjourney, Grok, Gemini and other AI tools into a single tracked workflow. The AI handles logistics, you handle taste.',
  alternates: { canonical: '/products/factory' },
  openGraph: {
    title: 'Factory | id8Labs',
    description: 'AI creative production pipeline. Orchestrates Midjourney, Grok, Gemini and other AI tools into a single tracked workflow.',
    url: 'https://id8labs.app/products/factory',
  },
}

const pipelineSteps = [
  {
    name: 'Research',
    description: 'Pulls brand guidelines, analyzes competitors, builds a moodboard',
  },
  {
    name: 'Brief',
    description: 'Synthesizes direction into platform-specific prompts',
  },
  {
    name: 'Generate',
    description: 'Automates browsers, runs prompts across multiple AI platforms',
  },
  {
    name: 'Iterate',
    description: 'Tracks what worked, suggests variations',
  },
  {
    name: 'Deploy',
    description: 'Packages assets with full metadata, pushes to GitHub',
  },
]

const platforms = [
  { name: 'Midjourney', strength: 'Stylized hero images' },
  { name: 'Grok', strength: 'Fast generation, surprises' },
  { name: 'Gemini', strength: 'Photorealism, product shots' },
]

const humanGates = [
  { stage: 'After the brief', question: 'Does this creative direction match what you want?' },
  { stage: 'After generation', question: 'Which images should we iterate on?' },
  { stage: 'Before deploy', question: 'Ready to push to production?' },
]

export default function FactoryPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Creative Pipeline · Field Testing</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            The AI handles logistics. <em className="italic text-id8-orange">You handle taste.</em>
          </h1>
          <Deck className="max-w-2xl mb-9">
            An AI creative production pipeline that orchestrates Midjourney, Grok, Gemini and
            other tools into a single tracked workflow.
          </Deck>
          <EditorialButton href="/writing/id8factory-missing-orchestration-layer" variant="ghost">
            Read the full essay
          </EditorialButton>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: '5', label: 'pipeline stages' },
              { value: '3', label: 'platforms' },
              { value: '3', label: 'human gates' },
              { value: 'Field testing', label: 'status' },
            ]}
          />
        </header>

        {/* Problem */}
        <section className="py-16 max-w-2xl">
          <div className="space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              Every campaign needs visuals, and every visual needs iterations. That means logging into
              Midjourney, writing a prompt, waiting three minutes, downloading, then doing the same in
              Grok, then Gemini, then organizing everything into folders you&apos;ll never find again.
            </p>
            <p>I was spending more time on logistics than creativity.</p>
            <p>
              So I built the orchestration layer that was missing. Not another AI image generator&mdash;the
              system that makes the existing ones usable at scale.
            </p>
          </div>
        </section>

        <Rule />

        {/* Pipeline */}
        <section className="py-16">
          <SectionHead title={<>The <em className="italic text-id8-orange">pipeline</em></>} meta="5 stages" />
          <div className="mt-10 mb-10">
            <Pipeline
              title="Idea to deployed asset"
              steps={pipelineSteps.map((s) => ({ label: s.name }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {pipelineSteps.map((step, index) => (
              <div key={step.name} className="bg-[var(--paper)] p-7">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-id8-orange">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                    {step.name}
                  </h3>
                </div>
                <p className="text-[var(--body)] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Browser Automation */}
        <section className="py-16">
          <SectionHead title="The browser automation problem" meta="Under the hood" />
          <div className="mt-10 max-w-2xl space-y-5 text-[var(--body)] leading-relaxed">
            <p>
              Most people don&apos;t realize: these AI image platforms don&apos;t have APIs. Or the APIs are
              limited, expensive, or waitlisted.
            </p>
            <p>
              So Factory automates the browser. It navigates to Midjourney&apos;s web interface, finds the
              prompt box, types your prompt, waits for generation, clicks upscale, downloads with
              metadata tracking which prompt produced what.
            </p>
            <p>
              The trick is using accessibility snapshots instead of CSS selectors. &quot;Find the textbox
              labeled &lsquo;What will you imagine?&rsquo;&quot; survives UI updates. CSS selectors don&apos;t.
            </p>
          </div>
        </section>

        <Rule />

        {/* Platforms */}
        <section className="py-16">
          <SectionHead title="Platform support" meta="3 engines" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {platforms.map((platform) => (
              <div key={platform.name} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-1">
                  {platform.name}
                </h3>
                <p className="text-sm text-[var(--muted)]">{platform.strength}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Human Gates */}
        <section className="py-16">
          <SectionHead title={<>Human <em className="italic text-id8-orange">gates</em></>} meta="Stop points" />
          <p className="mt-8 mb-8 max-w-2xl text-lg text-[var(--muted)]">
            Not everything should be automated. Factory has explicit decision points where the AI
            stops and waits.
          </p>
          <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {humanGates.map((gate) => (
              <div key={gate.stage} className="py-6 grid md:grid-cols-[240px_1fr] gap-2 md:gap-8">
                <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange">
                  {gate.stage}
                </span>
                <p className="font-[family-name:var(--font-serif)] italic text-[var(--body)]">{gate.question}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Results */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-6">First real test · DeepStack campaign</Kicker>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-[family-name:var(--font-display)] font-normal text-5xl text-[var(--ink)] mb-1">5</div>
                <p className="text-sm text-[var(--muted)]">Production-ready images</p>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] font-normal text-5xl text-[var(--ink)] mb-1">&lt;10 min</div>
                <p className="text-sm text-[var(--muted)]">Human attention required</p>
              </div>
            </div>
          </EditorialCard>
        </section>

        <Rule />

        {/* State Tracking */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="State tracking" />
          <div className="mt-8 space-y-5 text-[var(--body)] leading-relaxed">
            <p>
              A week later, I needed to know exactly which prompt produced the image we used. It was
              all there&mdash;prompt, platform, timestamp, generation time, file path.
            </p>
            <p className="font-[family-name:var(--font-serif)] italic text-lg text-[var(--ink)]">
              You will forget what made what. The system won&apos;t.
            </p>
          </div>
        </section>

        <Rule />

        {/* Status */}
        <section className="pt-16 space-y-3">
          <MetaRow
            items={[
              { value: 'Field testing', label: 'at ID8Labs' },
              { value: 'Claude Code', label: '+ Playwright / Perplexity / Firecrawl MCP' },
            ]}
          />
          <div className="pt-4">
            <EditorialButton href="/writing/id8factory-missing-orchestration-layer" variant="ghost">
              Read the full essay
            </EditorialButton>
          </div>
        </section>
      </Container>
    </div>
  )
}
