import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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

export const metadata: Metadata = {
  title: 'DeepStack - ID8Labs',
  description: 'AI-powered trading research platform. Claude-powered analysis, professional charts, thesis tracking, trade journaling, prediction markets, and an emotional firewall. Research only—we never execute trades.',
  alternates: { canonical: '/products/deepstack' },
  openGraph: {
    title: 'DeepStack | id8Labs',
    description: 'AI-powered trading research platform. Claude-powered analysis, professional charts, thesis tracking, and an emotional firewall.',
    url: 'https://id8labs.app/products/deepstack',
  },
}

const features: { title: string; description: string }[] = [
  {
    title: 'AI Research Chat',
    description: 'Claude-powered analysis with 30+ tools for market research, thesis development, and strategy backtesting. Extended thinking mode for deep reasoning.',
  },
  {
    title: 'Professional Charts',
    description: 'TradingView-style charts with 30+ indicators, drawing tools, and multi-timeframe analysis. Real-time data streaming.',
  },
  {
    title: 'Thesis Engine',
    description: 'Develop, track, and validate trading hypotheses with live monitoring and validation scores. Connect theses to prediction markets.',
  },
  {
    title: 'Trade Journal',
    description: 'Log trades with emotion tracking, P&L calculation, screenshot capture, and rich text notes. AI discovers behavioral patterns.',
  },
  {
    title: 'Prediction Markets',
    description: 'Live odds from Kalshi & Polymarket with thesis linking. Event-based betting and probability tracking.',
  },
  {
    title: 'Deep Research Hub',
    description: 'Perplexity AI integration for earnings analysis, SEC filings, company profiles, and market summaries.',
  },
  {
    title: 'Emotional Firewall',
    description: 'Real-time cognitive state detection. Blocks revenge trading, overtrading patterns, and emotional exhaustion.',
  },
  {
    title: 'Options Suite',
    description: 'Full options chains, Greeks analysis, multi-leg strategy builder with visual payoff diagrams.',
  },
]

const additionalFeatures = [
  'Stock Screener with natural language queries',
  'Paper trading with full position tracking',
  'Politicians tracker for congressional trades',
  'Command palette (Cmd/Ctrl+K)',
  '40+ customizable dashboard widgets',
  'Mobile-optimized with PWA support',
]

const freeTier = [
  '10 AI queries per 12 hours',
  '15-minute delayed data',
  'Basic charts with indicators',
  '5 watchlist symbols',
  '1 active Thesis',
  'Unlimited journal entries',
  'Basic Emotional Firewall',
]

const proTier = [
  'Unlimited AI queries',
  'Real-time market data',
  'Advanced charts + drawing tools',
  'Unlimited watchlists',
  'Full Options Suite',
  'Deep Research Hub',
  'Prediction Markets integration',
  'AI Pattern Learning',
]

const techStack = [
  { name: 'Next.js 15', role: 'Frontend' },
  { name: 'Claude AI', role: 'Analysis' },
  { name: 'Alpaca', role: 'Market Data' },
  { name: 'Supabase', role: 'Database' },
]

const disclaimers: { label: string; body: ReactNode }[] = [
  { label: 'No Trade Execution', body: 'This platform does NOT execute trades on your behalf.' },
  { label: 'Risk Warning', body: 'Trading in financial markets involves significant risk. You may lose some or all of your investment. Past performance does not guarantee future results.' },
  { label: 'Not a Recommendation', body: 'Nothing on this platform constitutes a recommendation to buy, sell, or hold any security.' },
  { label: 'AI Limitations', body: 'AI can hallucinate. Verify all data independently.' },
]

export default function DeepStackPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Trading Research · Live · v2.5.0</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            A research analyst <em className="italic text-id8-orange">in your pocket</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            AI-powered trading research that helps you develop, test, and track your trading ideas
            with discipline. Research only&mdash;we never execute trades.
          </Deck>
          <div className="flex flex-wrap gap-3.5">
            <EditorialButton href="https://deepstack.trade" external>
              Launch DeepStack
            </EditorialButton>
            <EditorialButton href="/products" variant="ghost">
              Back to products
            </EditorialButton>
          </div>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: 'Web App', label: 'platform' },
              { value: 'Claude', label: 'ai model' },
              { value: 'Free', label: 'price' },
              { value: 'v2.5.0', label: 'version' },
            ]}
          />
        </header>

        {/* Disclaimer Banner */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-3">Research only · Not financial advice</Kicker>
            <p className="text-[var(--body)] leading-relaxed">
              DeepStack is a research and analysis platform. It does NOT execute trades on your behalf.
              Trading involves significant risk. AI can hallucinate&mdash;verify all data independently.
            </p>
          </EditorialCard>
        </section>

        {/* Description */}
        <section className="pb-16 max-w-2xl">
          <div className="space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              Think of DeepStack as having a research analyst in your pocket. It combines conversational AI
              with professional-grade market tools&mdash;helping you develop, test, and track your trading ideas
              with discipline.
            </p>
            <p>
              Built for traders who want to think more clearly about markets. The Emotional Firewall
              detects revenge trading and overtrading patterns in real-time. The Thesis Engine forces
              you to articulate your hypothesis before entering a position. The Journal tracks not just
              P&amp;L but your emotional state&mdash;because the data shows your losses cluster around specific
              cognitive patterns.
            </p>
          </div>
        </section>

        <Rule />

        {/* Core Features */}
        <section className="py-16">
          <SectionHead title={<>Core <em className="italic text-id8-orange">features</em></>} meta="8 systems" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Also Included */}
        <section className="py-16">
          <SectionHead title="Also included" meta="6 more" />
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
            {additionalFeatures.map((feature) => (
              <li key={feature} className="flex items-baseline gap-3 text-[var(--body)]">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <Rule />

        {/* Pricing */}
        <section className="py-16">
          <SectionHead title={<>Pricing</>} meta="Two tiers" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-1">Free</h3>
              <p className="text-sm text-[var(--muted)] mb-6">Learn the platform</p>
              <ul className="space-y-2.5 text-[var(--body)]">
                {freeTier.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="text-[var(--muted)] font-[family-name:var(--font-mono)] text-xs">&middot;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--paper-shadow)] p-7 relative before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-2xl text-id8-orange mb-1">Pro</h3>
              <p className="text-sm text-[var(--muted)] mb-6">For serious researchers</p>
              <ul className="space-y-2.5 text-[var(--body)]">
                {proTier.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Rule />

        {/* Tech Stack */}
        <section className="py-16">
          <SectionHead title="Built with" meta="Stack" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {techStack.map((item) => (
              <div key={item.name} className="bg-[var(--paper)] p-7 text-center">
                <p className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{item.name}</p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mt-1">{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Risk Disclaimer */}
        <section className="py-16">
          <SectionHead title="Risk disclaimer" meta="Read first" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {disclaimers.map((d) => (
              <div key={d.label} className="py-6 grid md:grid-cols-[220px_1fr] gap-2 md:gap-8">
                <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]">
                  {d.label}
                </span>
                <p className="text-[var(--body)] leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            The developers of DeepStack are not responsible for any financial losses incurred through
            the use of this software.
          </p>
        </section>

        <Rule />

        {/* CTA */}
        <section className="pt-16">
          <EditorialCard featured className="text-center">
            <p className="font-[family-name:var(--font-serif)] italic text-xl text-[var(--muted)] mb-7 max-w-xl mx-auto">
              Better decisions start with clearer thinking.
            </p>
            <EditorialButton href="https://deepstack.trade" external>
              Try DeepStack Free
            </EditorialButton>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              No credit card required
            </p>
          </EditorialCard>
        </section>
      </Container>
    </div>
  )
}
