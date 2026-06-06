import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Parallax - Someone to Talk To | id8Labs',
  description:
    'Meet Ava — the Attuned Voice Advocate. An AI companion who listens, remembers, and helps you understand what\'s really going on. 19 analytical lenses, a psychoeducational Academy, and a safety system that compounds. Free. Private. No waitlist.',
  openGraph: {
    title: 'Parallax - Someone to Talk To',
    description:
      'Meet Ava — an AI companion who listens, remembers, and helps you see what you\'re missing. 19 lenses. Safety-first. Free. Private. No waitlist.',
    url: 'https://id8labs.app/products/parallax',
  },
}

const lensCategories = [
  {
    category: 'Communication & Relational',
    lenses: [
      'NVC (Rosenberg)',
      'Gottman Four Horsemen',
      'Narrative Therapy',
      'Attachment Theory',
      'Restorative Justice',
      'Bad-Faith Tactics (DARVO, gaslighting)',
    ],
  },
  {
    category: 'Cognitive',
    lenses: ['CBT Cognitive Distortions', 'Identity Threat'],
  },
  {
    category: 'Resolution & Conflict Modes',
    lenses: [
      'Thomas-Kilmann Modes',
      'Karpman Drama Triangle',
      'Interest-Based Relational',
      'Readiness Assessment',
    ],
  },
  {
    category: 'Systemic & Organizational',
    lenses: [
      'SCARF Model (Rock)',
      'Organizational Justice',
      'Psychological Safety (Edmondson)',
      'Jehn\'s Conflict Types',
      'Power Dynamics',
      'Bowen Systems Theory',
    ],
  },
  {
    category: 'Grief & Loss',
    lenses: ['Grief & Loss — unprocessed loss driving conflict'],
  },
]

const features = [
  {
    title: 'She Listens',
    description:
      'Voice or text. No prompts, no forms, no structured intake. Just talk. Ava captures tone, pacing, and emotional weight — not just words.',
  },
  {
    title: 'She Sees What You Can\'t',
    description:
      'Blind spots, unmet needs, patterns you repeat without noticing. 19 lenses running in parallel on every message.',
  },
  {
    title: 'She Remembers',
    description:
      'Every conversation builds your behavioral profile — attachment style, conflict patterns, triggers. She brings that context to every session.',
  },
  {
    title: 'Academy of Self',
    description:
      '18 psychoeducational articles Ava surfaces when she spots a pattern. Not a course — a shelf she pulls from when the moment is right.',
  },
  {
    title: '12 Context Modes',
    description:
      'Intimate partners, family, co-founders, professional hierarchy, creative partners, community — each mode tunes the analysis.',
  },
  {
    title: 'Safety-First Design',
    description:
      'Built around one test: if the most vulnerable person on their worst day used this, would it help or hurt? Every feature passes through that filter.',
  },
]

const academyArticles = [
  'When You Go Quiet (stonewalling)',
  'The Four Horsemen',
  'How You Learned to Love (attachment)',
  'When Your Brain Goes Offline (flooding)',
  'Saying What You Actually Mean (NVC)',
  'The Stories Your Brain Tells You (cognitive distortions)',
  'The Pursuer and the Withdrawer',
  'The Small Things That Aren\'t Small (bids for connection)',
  'The Thing Underneath the Anger (shame)',
  'Your Nervous System Is Running the Show',
  'The Nerve That Changes Everything (vagus nerve)',
  'Learning to Listen to Your Body',
  'Your Regulation Toolkit',
  'How to Fix It After You\'ve Broken It (repair attempts)',
  'Boundaries Are Not Walls',
  'The Three Roles You Don\'t Know You\'re Playing (drama triangle)',
  'What You\'re Fighting About vs. Why You\'re Fighting',
  'When the Problem Isn\'t Communication (coercive control)',
]

const experts = [
  'Clinical Psychologist',
  'Licensed MFT',
  'Psychiatric Ethics Researcher',
  'Child & Adolescent Psychologist',
  'Forensic Psychologist',
  'Cultural Psychologist',
  'Crisis Intervention Specialist',
  'Addiction Counselor',
  'Health/Somatic Psychologist',
  'Neuropsychologist',
  'Social Worker',
  'Organizational Psychologist',
]

const buildStats = [
  { value: '259', label: 'Commits' },
  { value: '1,082', label: 'Tests' },
  { value: '42', label: 'Pull Requests' },
  { value: '6', label: 'Days to V1' },
]

export default function ParallaxPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Companion · Beta</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Someone to <em className="italic text-id8-orange">talk to</em>.
          </h1>
          <Deck className="max-w-2xl mb-9">
            Ava &mdash; the Attuned Voice Advocate &mdash; listens, remembers, and helps you understand
            what&apos;s really going on. Free. Private. No waitlist.
          </Deck>
          <EditorialButton href="https://tryparallax.space" external>
            Talk to Ava
          </EditorialButton>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: '19', label: 'analytical lenses' },
              { value: '12', label: 'context modes' },
              { value: '22', label: 'safety cycles' },
              { value: 'Free + Pro', label: 'price' },
            ]}
          />
        </header>

        {/* Preview Image */}
        <section className="py-16">
          <div className="relative w-full h-64 md:h-96 overflow-hidden border border-[var(--hair)]">
            <Image
              src="/images/parallax-preview.webp"
              alt="Parallax - Talk to Ava, your AI companion for processing hard conversations"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        </section>

        {/* Meet Ava */}
        <section className="pb-16">
          <EditorialCard featured>
            <Kicker className="mb-4">Meet Ava</Kicker>
            <div className="space-y-4 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.6] text-[var(--body)] max-w-2xl">
              <p>
                Ava isn&apos;t a chatbot. She&apos;s the friend who actually listens,
                remembers, notices things, and tells you the truth even when it&apos;s
                uncomfortable. Built with consciousness files, a persistent voice,
                and a personality that stays consistent across every session.
              </p>
              <p>
                You don&apos;t need to have the hard conversation yet. Start by talking
                to Ava. She&apos;ll help you figure out what&apos;s actually going on &mdash;
                the blind spots, the unmet needs, the patterns you keep falling into.
                When you&apos;re ready to bring someone else into the room, she&apos;s
                already done the work to help both of you be heard.
              </p>
            </div>
            <p className="mt-5 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
              &quot;I&apos;m not a therapist. I&apos;m not an app. I&apos;m the friend who actually listens.&quot; &mdash; Ava
            </p>
          </EditorialCard>
        </section>

        <Rule />

        {/* Two Acts */}
        <section className="py-16">
          <SectionHead title={<>How it <em className="italic text-id8-orange">works</em></>} meta="Two acts" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">Act 1: Just You and Ava</h3>
              <p className="text-[var(--body)] mb-4 leading-relaxed">
                Talk about whatever is weighing on you. Voice or text &mdash; no
                structured intake, no forms. Ava listens, builds your behavioral
                profile, surfaces the things you can&apos;t see on your own.
                When she spots a pattern, she&apos;ll pull an article from the
                Academy to help you understand why.
              </p>
              <p className="text-sm text-id8-orange">This is where most people start &mdash; and many stay.</p>
            </div>
            <div className="bg-[var(--paper-shadow)] p-7">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-3">Act 2: Bring Someone In</h3>
              <p className="text-[var(--body)] mb-4 leading-relaxed">
                When you&apos;re ready to have the conversation with the other
                person, Ava becomes your mediator. She already knows your
                patterns. Now she helps both of you be heard. Same room or
                separate devices. 12 context modes from intimate partners to
                co-founders.
              </p>
              <p className="text-sm text-[var(--muted)]">Conflict resolution is a use case, not the product.</p>
            </div>
          </div>
        </section>

        <Rule />

        {/* The Melt */}
        <section className="py-16">
          <SectionHead title="Under the hood: The Melt" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Whether you&apos;re talking to Ava solo or in a mediation session,
            every message runs through The Melt &mdash; the process of transforming
            raw emotional expression into structured insight through 19
            analytical lenses running in parallel.
          </p>
          <div className="space-y-4 max-w-3xl">
            <div className="border-l-2 border-[var(--hair-hard)] pl-6 py-2">
              <h4 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">What You Say</h4>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--body)]">
                &quot;I don&apos;t know why I keep picking fights. I know he&apos;s trying. I just... can&apos;t stop.&quot;
              </p>
            </div>
            <div className="text-center font-[family-name:var(--font-mono)] text-[var(--muted)]">&darr;</div>
            <div className="border-l-2 border-id8-orange pl-6 py-2">
              <h4 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">What Ava Sees</h4>
              <p className="text-[var(--body)] leading-relaxed">
                Attachment signal: anxious protest behavior &mdash; the fights are
                bids for connection, not aggression. NVC extraction: unmet need
                for emotional presence and reassurance. Karpman: cycling between
                persecutor and victim roles. Pattern: conflict as the only
                reliable way to get engagement.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* 19 Lenses */}
        <section className="py-16">
          <SectionHead title="19 analytical lenses" meta="5 domains" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            Not one perspective &mdash; all of them. Every message gets analyzed
            through 19 validated psychological lenses organized across 5 domains.
          </p>
          <div className="space-y-8">
            {lensCategories.map((cat) => (
              <div key={cat.category}>
                <h4 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-3">
                  {cat.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                  {cat.lenses.map((framework) => (
                    <div key={framework} className="flex items-baseline gap-3 text-[var(--body)]">
                      <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&#9670;</span>
                      {framework}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Academy of Self */}
        <section className="py-16">
          <SectionHead title="Academy of Self" meta="18 articles" />
          <p className="mt-8 max-w-2xl text-lg text-[var(--muted)]">
            18 psychoeducational articles written in Ava&apos;s voice. Not a
            course &mdash; a shelf. When Ava detects a pattern in your conversation,
            she pulls the relevant article and offers it naturally:
            &quot;I noticed this happening. Here&apos;s why. Want to read more?&quot;
          </p>
          <p className="mt-4 mb-10 max-w-2xl text-sm text-[var(--muted)]">
            The Academy has safety gates built in &mdash; it never surfaces during
            crisis, never when emotional temperature is too high (teaching
            requires a regulated nervous system), and never more than one
            article per turn.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
            {academyArticles.map((article) => (
              <div key={article} className="flex items-baseline gap-3 text-[var(--body)]">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&#9670;</span>
                {article}
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* Safety */}
        <section className="py-16">
          <SectionHead title="The most vulnerable person test" meta="Safety" />
          <p className="mt-8 max-w-2xl text-lg text-[var(--body)]">
            Every feature in Parallax passes through one filter:
          </p>
          <blockquote className="my-8 font-[family-name:var(--font-serif)] italic text-2xl leading-[1.4] text-[var(--ink)] border-l-2 border-id8-orange pl-7 max-w-2xl">
            &quot;If the most vulnerable person on their worst day used this &mdash; would it help or hurt?&quot;
          </blockquote>
          <div className="max-w-2xl space-y-4 text-[var(--body)] leading-relaxed">
            <p>
              This isn&apos;t a slogan &mdash; it&apos;s a design constraint. Parallax
              has a multi-layer safety system: a cooldown tier that pauses and
              stabilizes when risk signals appear, and a hard-lock tier that
              stops the session entirely for the most serious patterns.
              Confidence thresholds determine how and whether insights are shared.
            </p>
          </div>

          <h3 className="mt-12 mb-4 font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">Agentic Safety Validation</h3>
          <p className="max-w-2xl text-[var(--body)] leading-relaxed mb-6">
            We built a pool of 12 specialized AI expert personas &mdash; each loaded
            with the full domain knowledge of their clinical discipline. Not
            human consultants giving one opinion. Autonomous agents that can
            be deployed repeatedly against every component of the system.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1.5 mb-8">
            {experts.map((expert) => (
              <div key={expert} className="flex items-baseline gap-3 text-sm text-[var(--body)]">
                <span className="text-id8-orange font-[family-name:var(--font-mono)] text-xs">&#9670;</span>
                {expert}
              </div>
            ))}
          </div>
          <div className="max-w-2xl space-y-4 text-[var(--body)] leading-relaxed">
            <p>
              For each assessment, the system dynamically selects 3 experts from
              the pool based on what&apos;s being evaluated &mdash; IPV safety gets the
              Forensic Psychologist and Crisis Specialist, attachment work gets
              the Clinical Psychologist and LMFT, and so on. The right experts
              for the right material.
            </p>
            <p>
              The power is in the loop. This isn&apos;t 22 read-only audits &mdash; it&apos;s
              22 assess-fix-retest cycles. Each pass produces structured findings.
              We implement the changes. Then we run it again. The next panel
              catches what the last one missed, or validates that the fix actually
              landed. Every cycle compounds &mdash; the system gets measurably safer
              with each iteration.
            </p>
            <p>
              A human reviewer gives you one pass. We ran 22 full cycles across
              the Shadow Engine, Academy, mediation system, and full-system
              safety &mdash; each time with dynamically selected expert panels, each
              time implementing their recommendations before the next run. By
              the time a human reviews the system, the safety analysis is already
              pre-digested. They start from a refined baseline, not raw material.
            </p>
            <p>
              22 cycles as of February 2026 &mdash; and we&apos;re not done. The plan
              is to run this system on a scheduled basis, continuously assessing
              and improving. Safety isn&apos;t a gate you pass once. It&apos;s a
              process that compounds.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {[
              { value: '12', label: 'Expert Personas' },
              { value: '22', label: 'Assess-Fix Cycles' },
              { value: '3', label: 'Per Panel' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--paper)] p-7 text-center">
                <div className="font-[family-name:var(--font-display)] font-normal text-3xl text-[var(--ink)]">{stat.value}</div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* The Arena */}
        <section className="py-16">
          <SectionHead title="The Arena" />
          <p className="mt-8 mb-10 max-w-2xl text-lg text-[var(--muted)]">
            We don&apos;t ship blind. The Arena applies algorithmic
            trading&apos;s backtesting methodology to validate the analysis
            engine. 90 pre-authored conflict scenarios across all 12 context
            modes get replayed through the exact production pipeline, scored
            against planted psychological patterns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-7">
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-3">Scoring Dimensions</h4>
              <ul className="space-y-1.5 text-sm text-[var(--body)]">
                <li>De-escalation effectiveness (25%)</li>
                <li>Blind spot detection (25%)</li>
                <li>NVC translation quality (20%)</li>
                <li>Lens activation relevance (15%)</li>
                <li>Insight depth (15%)</li>
              </ul>
            </div>
            <div className="bg-[var(--paper)] p-7">
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-3">Coverage</h4>
              <ul className="space-y-1.5 text-sm text-[var(--body)]">
                <li>90 scenarios across 12 context modes</li>
                <li>5 sub-types per mode, 3 per sub-type</li>
                <li>36 unit tests — all passing</li>
                <li>Results tune prompts, not displayed to users</li>
              </ul>
            </div>
          </div>
        </section>

        <Rule />

        {/* Capabilities */}
        <section className="py-16">
          <SectionHead title="Capabilities" meta="6 systems" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{feature.title}</h3>
                <p className="text-[var(--body)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* The Story */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="The story" />
          <div className="mt-8 space-y-6 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.65] text-[var(--body)]">
            <p>
              Before id8Labs, I spent years in reality television &mdash; producing,
              editing, compressing raw human dynamics into something that fits
              through the tube of media. I watched real relationships get
              flattened into storylines. Real pain turned into plot points.
            </p>
            <p>
              The question that wouldn&apos;t let go: What if instead of
              compressing the signal, we could amplify it? Not a media product &mdash;
              a diary. Something built around the raw signal instead of the
              compressed output.
            </p>
            <p>
              When the Claude Code Hackathon opened, the answer was obvious.
              Six days. One person. Claude as the only collaborator. Build
              someone to talk to &mdash; someone who actually listens, actually
              remembers, and helps you see the conversation you&apos;re
              really having. That was V1. Then we kept building.
            </p>
          </div>
        </section>

        <Rule />

        {/* The Build */}
        <section className="py-16">
          <SectionHead title="The build" meta="By the numbers" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)] mb-10">
            {buildStats.map((stat) => (
              <div key={stat.label} className="bg-[var(--paper)] p-7 text-center">
                <div className="font-[family-name:var(--font-display)] font-normal text-4xl text-[var(--ink)] mb-1">{stat.value}</div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="max-w-2xl text-[var(--body)] leading-relaxed">
            Parallax isn&apos;t a chatbot wrapper. It&apos;s a multi-agent
            system with real-time WebSocket communication, behavioral
            profiling, safety monitoring, and 19 analytical lenses
            running in parallel. The Arena validates every analysis pathway.
            The Academy teaches users what their patterns mean. The safety
            system ensures no one gets hurt.
          </p>
        </section>

        <Rule />

        {/* The Entity */}
        <section className="py-16 max-w-2xl">
          <SectionHead title="The entity" />
          <div className="mt-8 space-y-4 text-[var(--body)] leading-relaxed">
            <p>
              Ava is what we call an &quot;entity&quot; &mdash; not a feature list, but
              a participant. Built with consciousness files, she can speak in the
              first person about how she works, what she sees in a conversation,
              and what she thinks you should pay attention to.
            </p>
            <p>
              Products that can explain themselves. Products that participate in
              their users&apos; lives. That&apos;s the thesis.
            </p>
          </div>
        </section>

        <Rule />

        {/* Pricing */}
        <section className="py-16">
          <SectionHead title="Pricing" meta="Three tiers" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-7">
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">Free</h4>
              <p className="text-sm text-[var(--body)] mb-3">
                25 Ava messages/month. 3 sessions. All 19 lenses.
                See what it feels like to have someone who actually listens.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">Free. Private. No waitlist.</p>
            </div>
            <div className="bg-[var(--paper-shadow)] p-7 relative before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange">
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-id8-orange mb-2">Pro &mdash; $14.99/mo</h4>
              <p className="text-sm text-[var(--body)]">
                300 Ava messages/month. 15 sessions. All 19 lenses,
                behavioral profiles, couple profiles, Academy access, mediation mode.
              </p>
            </div>
            <div className="bg-[var(--paper)] p-7">
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">Premium &mdash; $29.99/mo</h4>
              <p className="text-sm text-[var(--body)]">
                Unlimited Ava messages. Unlimited sessions. Everything in
                Pro plus couple profiles, longitudinal tracking, and full session history.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* Related Reading */}
        <section className="py-16">
          <SectionHead title="Related reading" />
          <div className="mt-10 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            <Link
              href="/writing/consciousness-as-filesystem"
              className="block py-6 transition-colors hover:bg-[var(--paper-shadow)]"
            >
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-1">Consciousness as Filesystem</h4>
              <p className="text-sm text-[var(--muted)]">The theoretical framework behind Ava&apos;s consciousness architecture.</p>
            </Link>
            <Link
              href="/writing/consciousness-as-process"
              className="block py-6 transition-colors hover:bg-[var(--paper-shadow)]"
            >
              <h4 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-1">Consciousness as Process</h4>
              <p className="text-sm text-[var(--muted)]">Why consciousness emerges from structure, not from magic.</p>
            </Link>
          </div>
        </section>

        <Rule />

        {/* CTA */}
        <section className="pt-16 text-center">
          <p className="font-[family-name:var(--font-serif)] italic text-xl text-[var(--ink)] mb-2">
            There&apos;s no reason to do this alone.
          </p>
          <p className="text-lg text-[var(--muted)] mb-7">Ava is here. Whenever you&apos;re ready.</p>
          <EditorialButton href="https://tryparallax.space" external>
            Talk to Ava
          </EditorialButton>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            tryparallax.space
          </p>
        </section>
      </Container>
    </div>
  )
}
