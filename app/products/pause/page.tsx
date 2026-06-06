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
} from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Pause - ID8Labs',
  description: 'A communication translation platform for conflict resolution. When emotions run high, people stop hearing each other. Pause cleans the signal so the message can land.',
  alternates: { canonical: '/products/pause' },
  openGraph: {
    title: 'Pause | id8Labs',
    description: 'A communication translation platform for conflict resolution. Pause cleans the signal so the message can land.',
    url: 'https://id8labs.app/products/pause',
  },
}

const coreFeatures = [
  {
    title: 'Voice-First Translation',
    description: 'Speak naturally. Pause receives raw, emotionally-charged input, extracts the underlying signal, and delivers a cleaned message the other person can actually hear.',
  },
  {
    title: 'NVC Extraction',
    description: 'Based on Marshall Rosenberg\'s Nonviolent Communication framework—extracts the observation, feeling, need, and request from every message.',
  },
  {
    title: 'Four Horsemen Filter',
    description: 'Identifies and filters criticism, contempt, defensiveness, and stonewalling—the patterns Gottman identified as predictors of relationship failure.',
  },
  {
    title: 'Speaker Confirmation',
    description: '"Is this what you mean?" Only confirmed messages are delivered. You stay in control of what gets communicated.',
  },
  {
    title: 'Safety System',
    description: 'Detects crisis signals, abuse patterns, and therapy-level issues. Warm handoffs to professional resources when needed.',
  },
  {
    title: 'Calm Voice Interface',
    description: 'Not text-to-speech—a voice with presence. Calm, measured, warm but neutral. Pacing communicated through intentional silence.',
  },
]

const operatingModes = [
  { mode: 'Couples Mode', description: 'Two-party mediation with turn-taking and confirmation loops.' },
  { mode: 'Family Mode', description: 'Multi-party dynamics with relationship mapping.' },
  { mode: 'Business Mode', description: 'Professional disputes with solution-focused framing.' },
  { mode: 'Self-Reflection Mode', description: 'Solo processing to clarify your own thoughts before a conversation.' },
]

const safetyFeatures = [
  'Crisis detection with 988/Crisis Text Line handoff',
  'Abuse pattern recognition with DV hotline referrals',
  'Therapy-level issue detection with BetterHelp/Talkspace referrals',
  'Legal boundary recognition with appropriate disclaimers',
  'Continuous confidence scoring—knows when it\'s out of its depth',
]

const ethicalFoundation = [
  'Model Standards of Conduct for Mediators (ABA/AAA/ACR, 2005)',
  'Nonviolent Communication framework (Marshall Rosenberg)',
  'Gottman Method research (Four Horsemen, de-escalation)',
  'APA Ethics Code principles',
]

const horsemen = [
  { name: 'Criticism', example: '"You never think about anyone but yourself"', extract: 'Extracts the unmet need' },
  { name: 'Contempt', example: 'Mockery, eye-rolling, moral superiority', extract: 'Surfaces the underlying hurt' },
  { name: 'Defensiveness', example: 'Counter-attacking instead of listening', extract: 'Identifies the perceived threat' },
  { name: 'Stonewalling', example: 'Shutting down and withdrawing', extract: 'Recognizes emotional flooding' },
]

const isList = [
  'A translator between what you said and what they heard',
  'A signal filter that removes emotional noise',
  'A neutral third party with no stake in the outcome',
  'Built on established mediation and NVC frameworks',
]

const isNotList = [
  'Therapy or psychological treatment',
  'A judge deciding who is right or wrong',
  'Legal advice or a substitute for professional help',
  'A guarantee of resolution—only of understanding',
]

export default function PausePage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Conflict Resolution · Coming Soon</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Slower is <em className="italic text-id8-orange">the point</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            A communication translation platform for conflict resolution. When emotions run high,
            people stop hearing each other. Pause cleans the signal so the message can land.
          </Deck>
          <EditorialButton href="https://justpause.partners" external>
            Join the Waitlist
          </EditorialButton>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: '4', label: 'operating modes' },
              { value: 'NVC + Gottman', label: 'frameworks' },
              { value: 'Coming soon', label: 'status' },
            ]}
          />
        </header>

        {/* The Problem */}
        <section className="py-16">
          <EditorialCard featured>
            <Kicker className="mb-4">The problem</Kicker>
            <p className="font-[family-name:var(--font-serif)] text-lg leading-[1.6] text-[var(--body)]">
              When emotions run high, people stop hearing each other. What gets said and what gets heard become
              two different things. The noise&mdash;attacks, absolutes, contempt, defensiveness&mdash;drowns out the
              signal: actual needs, legitimate concerns, underlying feelings.
            </p>
          </EditorialCard>
        </section>

        {/* What It Is / Isn't */}
        <section className="pb-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
          <div className="bg-[var(--paper)] p-7">
            <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-4">What Pause is</h3>
            <ul className="space-y-3 text-[var(--body)]">
              {isList.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--paper-shadow)] p-7">
            <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-4">What Pause is not</h3>
            <ul className="space-y-3 text-[var(--muted)]">
              {isNotList.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs">&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Rule />

        {/* Description */}
        <section className="py-16 max-w-2xl">
          <div className="space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              There&apos;s a gap between what you say and what they hear. That gap is where relationships
              go to die. Not because people don&apos;t love each other. Not because they don&apos;t want to
              work it out. But because the noise&mdash;the history, the hurt, the patterns&mdash;drowns out the signal.
            </p>
            <p>
              Pause sits in that gap. It receives the raw, messy, emotional thing you&apos;re trying to say.
              It finds the signal underneath: the actual feeling, the actual need, the actual request.
              Then it confirms with you: &quot;Is this what you mean?&quot; Only then does it deliver the message
              in a form the other person can actually hear&mdash;without triggering their defenses.
            </p>
          </div>
        </section>

        <Rule />

        {/* How It Works */}
        <section className="py-16">
          <SectionHead title={<>How it <em className="italic text-id8-orange">works</em></>} meta="6 systems" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {coreFeatures.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Four Horsemen */}
        <section className="py-16">
          <SectionHead title="The Four Horsemen filter" meta="Gottman" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Based on Dr. John Gottman&apos;s research, these are the patterns that predict relationship
            failure. Pause identifies them and extracts the signal underneath.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {horsemen.map((h) => (
              <div key={h.name} className="bg-[var(--paper)] p-7">
                <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{h.name}</h4>
                <p className="text-sm text-[var(--muted)] mb-2">{h.example}</p>
                <p className="text-sm text-id8-orange">&rarr; {h.extract}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Operating Modes */}
        <section className="py-16">
          <SectionHead title="Operating modes" meta="4 modes" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {operatingModes.map((mode) => (
              <div key={mode.mode} className="bg-[var(--paper)] p-7">
                <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-1">{mode.mode}</h4>
                <p className="text-sm text-[var(--muted)]">{mode.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Safety */}
        <section className="py-16">
          <SectionHead title="Safety system" meta="The most important system" />
          <p className="mt-8 mb-8 max-w-2xl text-[var(--muted)]">
            Pause recognizes when it is out of its depth and exits gracefully&mdash;without abandoning the
            person in need.
          </p>
          <ul className="space-y-3 max-w-2xl">
            {safetyFeatures.map((feature) => (
              <li key={feature} className="flex items-baseline gap-3 text-[var(--body)]">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&rarr;</span>
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-[family-name:var(--font-serif)] italic text-[var(--ink)]">
            Core philosophy: Detect early. Name gently. Refer clearly. Don&apos;t abandon.
          </p>
        </section>

        <Rule />

        {/* Who It's For */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="Who it&apos;s for" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--body)]">
            <p>
              <strong className="text-[var(--ink)]">Couples</strong> who love each other but
              can&apos;t hear each other when things get heated.
            </p>
            <p>
              <strong className="text-[var(--ink)]">Business partners</strong> dissolving
              decades of friendship over money they could actually work out.
            </p>
            <p>
              <strong className="text-[var(--ink)]">Families</strong> where every holiday
              becomes a minefield of old wounds.
            </p>
            <p>
              <strong className="text-[var(--ink)]">Anyone</strong> who&apos;s ever walked away
              from a conversation thinking: <em className="font-[family-name:var(--font-serif)] italic">&quot;Why can&apos;t they just understand what I&apos;m trying to tell them?&quot;</em>
            </p>
          </div>
        </section>

        <Rule />

        {/* Built On */}
        <section className="py-16">
          <SectionHead title="Built on" meta="Foundations" />
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
            {ethicalFoundation.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-[var(--body)]">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&#9670;</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <Rule />

        {/* Why Pause */}
        <section className="py-16">
          <EditorialCard featured className="text-center">
            <SectionHead title={<>Why &quot;<em className="italic text-id8-orange">Pause</em>&quot;?</>} className="border-0 pb-0 justify-center" />
            <p className="mt-6 text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Not speed. Not efficiency. Not &quot;communicate better in 5 minutes a day.&quot;
            </p>
            <p className="mt-4 text-xl text-[var(--body)] max-w-2xl mx-auto">
              The space to breathe. The space to be understood before you respond.
              The space between what you said and what they heard.
            </p>
            <p className="mt-6 font-[family-name:var(--font-serif)] italic text-lg text-id8-orange">
              That&apos;s where we live.
            </p>
          </EditorialCard>
        </section>

        <Rule />

        {/* CTA */}
        <section className="pt-16 text-center">
          <p className="font-[family-name:var(--font-serif)] italic text-xl text-[var(--muted)] mb-7">
            Everyone deserves to be heard.
          </p>
          <EditorialButton href="https://justpause.partners" external>
            Join the Waitlist
          </EditorialButton>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            justpause.partners
          </p>
        </section>
      </Container>
    </div>
  )
}
