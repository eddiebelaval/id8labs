import type { Metadata } from 'next'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialCard,
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'X-Place - ID8Labs',
  description: 'Collaborative pixel canvas for the X ecosystem. r/place meets Twitter—a 500x500 shared canvas where thousands create pixel art together.',
  alternates: { canonical: '/products/xplace' },
  openGraph: {
    title: 'X-Place | id8Labs',
    description: 'Collaborative pixel canvas for the X ecosystem. r/place meets Twitter.',
    url: 'https://id8labs.app/products/xplace',
  },
}

const features = [
  { name: '500x500 Canvas', description: 'Shared by all users, updated in real-time' },
  { name: '16 Color Palette', description: 'Classic r/place colors for pixel art purity' },
  { name: 'Cooldown Timer', description: 'Place a pixel, then wait—forces collaboration over domination' },
  { name: 'X OAuth Login', description: 'Sign in with your X account, avatar and username pulled automatically' },
  { name: 'Spectator Mode', description: 'Accounts under 30 days old can watch but not place (anti-bot)' },
  { name: 'Real-time Updates', description: 'See every pixel appear instantly via WebSocket' },
]

const techStack = [
  { layer: 'Frontend', tech: 'Next.js 14, React, Tailwind, Zustand' },
  { layer: 'Real-time', tech: 'Custom WebSocket server (ws library)' },
  { layer: 'Database', tech: 'Redis (Upstash) for canvas state + sessions' },
  { layer: 'Auth', tech: 'Supabase with X (Twitter) OAuth 1.0a' },
]

const buildStatus = [
  { component: 'Canvas Renderer', note: '500x500 with pan/zoom' },
  { component: 'Color Palette', note: '16-color r/place palette' },
  { component: 'WebSocket Server', note: 'Real-time pixel updates' },
  { component: 'Redis Integration', note: 'Canvas state persistence' },
  { component: 'X OAuth Login', note: 'Twitter auth via Supabase' },
  { component: 'Session Management', note: 'Redis-backed, 24h TTL' },
  { component: 'Spectator Mode', note: 'New accounts watch-only' },
  { component: 'r/place UI', note: 'Bottom toolbar, minimal chrome' },
]

const whatsNext = [
  { priority: 'High Priority', title: 'Production Deploy', note: 'Vercel + Railway', high: true },
  { priority: 'High Priority', title: 'Canvas Persistence', note: 'Save/load from Redis properly', high: true },
  { priority: 'Medium', title: 'Pixel History', note: 'See who placed each pixel', high: false },
  { priority: 'Medium', title: 'Timelapse', note: 'Watch the canvas evolve', high: false },
]

export default function XPlacePage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Social Experiment · Exploration</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            r/place meets <em className="italic text-id8-orange">Twitter</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            A collaborative pixel canvas for the X ecosystem. One pixel at a time, cooldowns that
            force you to work together&mdash;tied to X accounts instead of Reddit.
          </Deck>
          <MetaRow
            className="border-t border-[var(--hair)] pt-6"
            items={[
              { value: '500×500', label: 'canvas' },
              { value: '16', label: 'colors' },
              { value: 'Exploration', label: 'status' },
            ]}
          />
        </header>

        {/* Concept */}
        <section className="py-16 max-w-2xl">
          <div className="space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              Remember r/place? Reddit&apos;s social experiment where millions of users collaborated (and
              fought) to create pixel art on a shared canvas. One pixel at a time. Cooldowns that
              forced you to work together or get overwhelmed.
            </p>
            <p>
              X-Place is that concept rebuilt for the X/Twitter ecosystem. Same mechanics&mdash;500x500
              canvas, 16 colors, cooldown timers&mdash;but tied to X accounts instead of Reddit.
            </p>
            <p>
              The twist: your X identity travels with you. Potential for factions based on who you
              follow. Verified accounts could get perks. The social graph becomes the game.
            </p>
          </div>
        </section>

        <Rule />

        {/* Core Mechanics */}
        <section className="py-16">
          <SectionHead title={<>Core <em className="italic text-id8-orange">mechanics</em></>} meta="6 features" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.name} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-1">
                  {feature.name}
                </h3>
                <p className="text-sm text-[var(--muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Architecture */}
        <section className="py-16">
          <SectionHead title="Architecture" meta="System" />
          <div className="mt-10 font-[family-name:var(--font-mono)] text-sm overflow-x-auto bg-[var(--paper-shadow)] p-6 border border-[var(--hair)] mb-8">
            <pre className="text-[var(--body)]">{`┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js Web   │────▶│  WebSocket Server │────▶│  Redis (Upstash)│
│   (Frontend)    │◀────│   (Real-time)     │◀────│  (Canvas State) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                                                │
        ▼                                                ▼
┌─────────────────┐                              ┌─────────────────┐
│ Supabase Auth   │                              │ Pub/Sub Channel │
│ (X OAuth)       │                              │ (Scaling)       │
└─────────────────┘                              └─────────────────┘`}</pre>
          </div>
          <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {techStack.map((item) => (
              <div key={item.layer} className="py-4 grid md:grid-cols-[160px_1fr] gap-1.5 md:gap-8">
                <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {item.layer}
                </span>
                <span className="text-[var(--body)] font-[family-name:var(--font-mono)] text-sm">{item.tech}</span>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Build Status */}
        <section className="py-16">
          <SectionHead title="Build status" meta="8 / 8 done" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {buildStatus.map((item) => (
              <div key={item.component} className="py-4 flex items-baseline gap-4">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&#10003;</span>
                <span className="font-medium text-[var(--ink)] flex-grow">{item.component}</span>
                <span className="text-sm text-[var(--muted)] text-right">{item.note}</span>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Vision */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-4">The vision</Kicker>
            <p className="text-[var(--body)] mb-4 leading-relaxed">
              X-Place could become a viral social experiment like the original r/place, but native to
              the X ecosystem. Imagine:
            </p>
            <ul className="space-y-2 text-[var(--body)]">
              {[
                'Trending on X as communities coordinate pixel art',
                'Factions based on who you follow',
                'Verified accounts get special colors or faster cooldowns',
                'Live streams of the canvas embedded in X posts',
                'Timelapse videos that go viral',
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </EditorialCard>
        </section>

        <Rule />

        {/* What's Next */}
        <section className="py-16">
          <SectionHead title="What&apos;s next" meta="Roadmap" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {whatsNext.map((item) => (
              <div key={item.title} className="bg-[var(--paper)] p-7">
                <span className={`font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] ${item.high ? 'text-id8-orange' : 'text-[var(--muted)]'}`}>
                  {item.priority}
                </span>
                <p className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mt-1.5">{item.title}</p>
                <p className="text-sm text-[var(--muted)]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Status */}
        <section className="pt-16">
          <MetaRow
            items={[
              { value: 'Exploration', label: 'core mechanics built, preparing for public test' },
              { value: 'Next.js / WebSockets / Redis / Supabase', label: 'built with' },
            ]}
          />
        </section>
      </Container>
    </div>
  )
}
