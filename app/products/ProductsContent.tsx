import Link from 'next/link'
import Image from 'next/image'
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

// ============================================
// FLAGSHIP PRODUCTS - Full feature showcase
// ============================================

interface FlagshipProduct {
  name: string
  tagline: string
  description: string
  version: string
  status: 'live' | 'beta'
  link: string
  external?: boolean
  image: string
  features: string[]
  specs: { label: string; value: string }[]
}

const flagshipProducts: FlagshipProduct[] = [
  {
    name: 'Composer',
    tagline: 'AI Writing Partner with Memory',
    description: 'AI writing partner that actually remembers your story world. Built in the field when production teams needed persistent context across sessions. Knowledge bases, canvas mode, and persistent story memory.',
    version: 'v1.8161',
    status: 'live',
    link: 'https://id8composer.app',
    external: true,
    image: '/images/composer-preview.webp',
    features: [
      'Persistent knowledge bases',
      'Canvas mode for visual writing',
      'Story bible integration',
      'Character relationship tracking',
      'Context that survives sessions',
      'Export to multiple formats',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude' },
      { label: 'Price', value: 'Free' },
    ],
  },
  {
    name: 'Parallax',
    tagline: 'Someone to talk to',
    description: 'Meet Ava — the Attuned Voice Advocate. She listens, remembers, and helps you understand what\'s really going on. 19 analytical lenses, a 22-article Academy across 8 sections, and a safety system validated through 1,010 tests. Telegram integration for mobile access. Free. Private. No waitlist.',
    version: 'Live',
    status: 'live' as const,
    link: '/products/parallax',
    external: false,
    image: '/images/parallax-preview.webp',
    features: [
      '19 analytical lenses',
      'Academy of Self (22 articles, 8 sections)',
      'Behavioral profiles over time',
      'Telegram integration for mobile',
      'Auto-remediation safety system',
      'Solo + mediation modes',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude Opus' },
      { label: 'Price', value: 'Free + Pro' },
    ],
  },
  {
    name: 'Rune',
    tagline: 'Speak Your Book Into Existence',
    description: 'Meet Sam — your scribe. A voice-first book writer that listens, organizes, and helps you turn conversation into manuscript. Import existing writing. Three stages: Workshop, Study, Press. Open source.',
    version: 'Beta',
    status: 'beta' as const,
    link: '/products/rune',
    external: false,
    image: '/images/rune-preview.webp',
    features: [
      'Voice-first writing with Sam',
      'Import existing writing (txt/md/docx)',
      'Guided oral interviews by book type',
      'KB version history with restore',
      'Session synthesis summary cards',
      'Three-tier model routing (Opus/Sonnet/Haiku)',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude (3 tiers)' },
      { label: 'License', value: 'MIT' },
    ],
  },
  {
    name: 'HOMER',
    tagline: 'Deal & Negotiation Automation',
    description: 'Real estate deal automation from contract to close. Batch import MLS data, manage deal state machines with 22 auto-generated deadlines per deal, coordinate multi-party workflows. Built for Florida agents.',
    version: 'v1.0 Free',
    status: 'live',
    link: 'https://tryhomer.vip',
    external: true,
    image: '/products/homer/homer-dashboard.png',
    features: [
      'Batch MLS data import pipeline',
      '22 auto-generated deadlines per deal',
      'Deal state machine (draft to closing)',
      'Multi-party workflow coordination',
      'AI-powered contract analysis',
      'Unlimited deal storage (Pro)',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude' },
      { label: 'Price', value: 'Free + Pro' },
    ],
  },
  {
    name: 'DeepStack',
    tagline: 'Trading Research with Claude',
    description: '30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades. Built to protect you from yourself while making better decisions.',
    version: 'v2.5.0',
    status: 'live',
    link: 'https://deepstack.trade',
    external: true,
    image: '/images/deepstack-preview.webp',
    features: [
      '30+ analysis tools',
      'Thesis tracking & validation',
      'Emotion-aware journaling',
      'Revenge trade blocking',
      'Process integrity scoring',
      'Pattern recognition',
    ],
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'AI Model', value: 'Claude' },
      { label: 'Price', value: 'Free' },
    ],
  },
  {
    name: 'MILO',
    tagline: 'Signal-to-Noise Task Manager',
    description: 'Jobs/Musk-level signal filtering with Claude Code integration. 17 MCP tools for natural language task management. Open source and free.',
    version: 'v1.0',
    status: 'live',
    link: '/products/milo',
    external: false,
    image: '/products/milo/milo-dashboard.png',
    features: [
      'Signal/noise filtering',
      'Natural language task creation',
      '17 MCP tools included',
      'Claude Code integration',
      'Project-based organization',
      'Focus mode with timers',
    ],
    specs: [
      { label: 'Platform', value: 'CLI + Web' },
      { label: 'Integration', value: 'Claude Code' },
      { label: 'Price', value: 'Open Source' },
    ],
  },
]

// ============================================
// IN DEVELOPMENT - Coming soon products
// ============================================

interface ComingSoonProduct {
  name: string
  tagline: string
  description: string
  status: 'development' | 'exploration'
  link?: string
}

const comingSoonProducts: ComingSoonProduct[] = [
  {
    name: 'Lexicon',
    tagline: 'Story bible as knowledge graph',
    description: 'Characters, relationships, timelines—100 episodes deep, instantly searchable.',
    status: 'development',
    link: '/products/lexicon',
  },
  {
    name: 'aiPlaces',
    tagline: 'r/place meets X',
    description: 'Shared pixel canvas, cooldown timers, real-time chaos. Live at aiplaces.art.',
    status: 'development' as const,
    link: 'https://aiplaces.art',
  },
]

// ============================================
// COMPONENTS
// ============================================

function FlagshipCard({ product, index }: { product: FlagshipProduct; index: number }) {
  const isEven = index % 2 === 0
  const Wrapper = product.external ? 'a' : Link
  const wrapperProps = product.external
    ? { href: product.link, target: '_blank', rel: 'noopener noreferrer' }
    : { href: product.link }

  return (
    <article className="border border-[var(--hair)] transition-colors duration-200 hover:border-[var(--hair-hard)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content */}
        <div className={`p-8 md:p-10 ${!isEven ? 'lg:order-2' : ''}`}>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <Kicker dot>
              {product.status === 'beta' ? product.version : `${product.version} · Live`}
            </Kicker>
          </div>

          <h3 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-3xl md:text-4xl text-[var(--ink)] mb-1">
            {product.name}
          </h3>
          <p className="font-[family-name:var(--font-serif)] italic text-lg text-[var(--muted)] mb-5">
            {product.tagline}
          </p>

          <p className="text-[var(--body)] leading-relaxed mb-6">{product.description}</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-6">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-baseline gap-2 text-sm text-[var(--body)]">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                {feature}
              </li>
            ))}
          </ul>

          <MetaRow
            className="mb-7"
            items={product.specs.map((spec) => ({ value: spec.value, label: spec.label.toLowerCase() }))}
          />

          <Wrapper
            {...wrapperProps}
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange no-underline"
          >
            {product.external ? 'Launch App' : 'Learn More'} &rarr;
          </Wrapper>
        </div>

        {/* Image */}
        <div className={`relative min-h-[16rem] lg:min-h-0 border-t lg:border-t-0 ${isEven ? 'lg:border-l' : 'lg:border-r lg:order-1'} border-[var(--hair)]`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </article>
  )
}

function ComingSoonCard({ product }: { product: ComingSoonProduct }) {
  const label = product.status === 'development' ? 'In Development' : 'Exploring'
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">
          {product.name}
        </h3>
        <span className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
          {label}
        </span>
      </div>
      <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--muted)] mb-2">{product.tagline}</p>
      <p className="text-sm text-[var(--body)] leading-relaxed">{product.description}</p>
    </>
  )

  if (product.link) {
    return <EditorialCard href={product.link} className="h-full">{inner}</EditorialCard>
  }
  return <EditorialCard className="h-full">{inner}</EditorialCard>
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProductsContent() {
  return (
    <main className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">The Lab · Products</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Primitive chains, <em className="italic text-id8-orange">shipped</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            Each product is the architecture applied to a specific domain. Everything battle-tested
            in production.
          </Deck>
          <EditorialButton href="/" variant="ghost">
            Back to home
          </EditorialButton>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: '6', label: 'flagship products' },
              { value: '2', label: 'in development' },
              { value: '383', label: 'free skills & agents' },
            ]}
          />
        </header>

        {/* Flagship Products */}
        <section className="py-16">
          <SectionHead title={<>Flagship <em className="italic text-id8-orange">products</em></>} meta="Live now" />
          <div className="mt-10 space-y-8">
            {flagshipProducts.map((product, index) => (
              <FlagshipCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </section>

        <Rule />

        {/* StackShack */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-3">StackShack</Kicker>
            <h2 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-3xl md:text-4xl text-[var(--ink)] mb-2">
              Free skills &amp; agents for Claude
            </h2>
            <p className="font-[family-name:var(--font-serif)] italic text-lg text-[var(--muted)] mb-7 max-w-2xl">
              Everything you need to build your AI workflow stack. No paywalls, no subscriptions&mdash;just
              tools that work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)] mb-8">
              {[
                { value: '383', label: 'skills & agents — all 100% free' },
                { value: '10', label: 'starter packs — curated for common workflows' },
                { value: '∞', label: 'autonomous agents — ready in Claude Code' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[var(--paper)] p-6">
                  <div className="font-[family-name:var(--font-display)] font-normal text-4xl text-[var(--ink)] mb-1">{stat.value}</div>
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <EditorialButton href="/stackshack">Browse StackShack</EditorialButton>
              <EditorialButton href="/stackshack/starter-kits" variant="secondary">
                View Starter Kits
              </EditorialButton>
            </div>
          </EditorialCard>
        </section>

        <Rule />

        {/* In Development */}
        <section className="py-16">
          <SectionHead title="In development" meta="Building in public" />
          <p className="mt-8 mb-10 text-lg text-[var(--muted)]">What&apos;s cooking in the lab.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {comingSoonProducts.map((product) => (
              <ComingSoonCard key={product.name} product={product} />
            ))}
          </div>
        </section>

        <Rule />

        {/* Custom Builds CTA */}
        <section className="py-16 text-center">
          <SectionHead title={<>Need something <em className="italic text-id8-orange">custom</em>?</>} className="border-0 pb-0 justify-center" />
          <p className="mt-7 mb-9 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Every tool here started as a real problem I faced. If you&apos;ve got a workflow that&apos;s
            held together by duct tape and browser tabs, I can probably build something better.
          </p>
          <EditorialButton href="/contact">Let&apos;s Talk</EditorialButton>
        </section>
      </Container>
    </main>
  )
}
