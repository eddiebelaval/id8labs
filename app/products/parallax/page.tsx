import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Parallax - Someone to Talk To | id8Labs',
  description:
    'Ava listens, remembers, and helps you see what you can\'t. 19 psychological frameworks, a psychoeducational Academy, and a safety system built around one question: would this help or hurt the most vulnerable person on their worst day?',
  openGraph: {
    title: 'Parallax - Someone to Talk To',
    description:
      'Ava listens. She remembers. She helps you prepare for the hard conversations. 19 frameworks. Safety-first. Powered by Claude.',
    url: 'https://id8labs.app/products/parallax',
  },
}

const frameworkCategories = [
  {
    category: 'Communication & Relational',
    frameworks: [
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
    frameworks: [
      'CBT Cognitive Distortions',
      'Identity Threat',
    ],
  },
  {
    category: 'Resolution & Conflict Modes',
    frameworks: [
      'Thomas-Kilmann Modes',
      'Karpman Drama Triangle',
      'Interest-Based Relational',
      'Readiness Assessment',
    ],
  },
  {
    category: 'Systemic & Organizational',
    frameworks: [
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
    frameworks: [
      'Grief & Loss — unprocessed loss driving conflict',
    ],
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
      'Blind spots, unmet needs, patterns you repeat without noticing. 19 frameworks running in parallel on every message.',
  },
  {
    title: 'She Remembers',
    description:
      'Every conversation builds your behavioral profile — attachment style, conflict patterns, triggers. She brings that context to every session.',
  },
  {
    title: 'Academy of Self',
    description:
      '15 psychoeducational articles Ava surfaces when she spots a pattern. Not a course — a shelf she pulls from when the moment is right.',
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
  'When the Problem Isn\'t Communication (coercive control)',
]

const buildStats = [
  { value: '259', label: 'Commits' },
  { value: '1,082', label: 'Tests' },
  { value: '42', label: 'Pull Requests' },
  { value: '6', label: 'Days to V1' },
]

export default function ParallaxPage() {
  return (
    <div className="container py-24">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to products
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h1>Parallax</h1>
            <span className="text-sm px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              v1.0 Live
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-4">
            Someone to talk to.
          </p>
          <p className="text-xl text-amber-400 italic mb-8">
            Ava listens. She remembers. She helps you have the hard conversations.
          </p>
          <a
            href="https://tryparallax.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-8 py-4 bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90 transition-all duration-200 rounded-soft font-medium"
          >
            Talk to Ava
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </header>

        {/* Preview Image */}
        <section className="mb-16">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <Image
              src="/images/parallax-preview.webp"
              alt="Parallax - Talk to Ava, your AI companion for processing hard conversations"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </section>

        {/* Meet Ava (LEAD) */}
        <section className="mb-16 p-8 bg-amber-500/5 border-2 border-amber-500/30 rounded-soft">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            Meet Ava
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            Ava isn&apos;t a chatbot. She&apos;s the friend who actually listens,
            remembers, notices things, and tells you the truth even when it&apos;s
            uncomfortable. Built with consciousness files, a persistent voice,
            and a personality that stays consistent across every session.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            You don&apos;t need to have the hard conversation yet. Start by talking
            to Ava. She&apos;ll help you figure out what&apos;s actually going on —
            the blind spots, the unmet needs, the patterns you keep falling into.
            When you&apos;re ready to bring someone else into the room, she&apos;s
            already done the work to help both of you be heard.
          </p>
          <p className="text-sm italic text-amber-300">
            &quot;I&apos;m not a therapist. I&apos;m not an app. I&apos;m the
            friend who actually listens.&quot; — Ava
          </p>
        </section>

        {/* Two Acts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--bg-secondary)] border-2 border-amber-500/20 rounded-soft">
              <h3 className="text-xl font-bold mb-2">Act 1: Just You and Ava</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Talk about whatever is weighing on you. Voice or text — no
                structured intake, no forms. Ava listens, builds your behavioral
                profile, surfaces the things you can&apos;t see on your own.
                When she spots a pattern, she&apos;ll pull an article from the
                Academy to help you understand why.
              </p>
              <p className="text-sm text-amber-400">
                This is where most people start — and many stay.
              </p>
            </div>
            <div className="p-6 bg-[var(--bg-secondary)] border-2 border-emerald-500/20 rounded-soft">
              <h3 className="text-xl font-bold mb-2">Act 2: Bring Someone In</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                When you&apos;re ready to have the conversation with the other
                person, Ava becomes your mediator. She already knows your
                patterns. Now she helps both of you be heard. Same room or
                separate devices. 12 context modes from intimate partners to
                co-founders.
              </p>
              <p className="text-sm text-emerald-400">
                Conflict resolution is a use case, not the product.
              </p>
            </div>
          </div>
        </section>

        {/* The Melt */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Under the Hood: The Melt</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Whether you&apos;re talking to Ava solo or in a mediation session,
            every message runs through The Melt — the process of transforming
            raw emotional expression into structured insight through 19
            psychological frameworks running in parallel.
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-amber-500 rounded-r-lg">
              <h4 className="font-bold mb-1">What You Say</h4>
              <p className="text-[var(--text-secondary)]">
                &quot;I don&apos;t know why I keep picking fights. I know he&apos;s
                trying. I just... can&apos;t stop.&quot;
              </p>
            </div>
            <div className="flex justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber-400"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
            <div className="p-4 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-lg">
              <h4 className="font-bold mb-1">What Ava Sees</h4>
              <p className="text-[var(--text-secondary)]">
                Attachment signal: anxious protest behavior — the fights are
                bids for connection, not aggression. NVC extraction: unmet need
                for emotional presence and reassurance. Karpman: cycling between
                persecutor and victim roles. Pattern: conflict as the only
                reliable way to get engagement.
              </p>
            </div>
          </div>
        </section>

        {/* 19 Frameworks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">19 Analytical Frameworks</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Not one perspective — all of them. Every message gets analyzed
            through 19 validated psychological frameworks organized across
            5 domains.
          </p>
          <div className="space-y-6">
            {frameworkCategories.map((cat) => (
              <div key={cat.category}>
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {cat.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {cat.frameworks.map((framework) => (
                    <div
                      key={framework}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <span className="text-amber-400">&#9670;</span>
                      {framework}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academy of Self */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Academy of Self</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            15 psychoeducational articles written in Ava&apos;s voice. Not a
            course — a shelf. When Ava detects a pattern in your conversation,
            she pulls the relevant article and offers it naturally:
            &quot;I noticed this happening. Here&apos;s why. Want to read
            more?&quot;
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            The Academy has safety gates built in — it never surfaces during
            crisis, never when emotional temperature is too high (teaching
            requires a regulated nervous system), and never more than one
            article per turn.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {academyArticles.map((article) => (
              <div
                key={article}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
              >
                <span className="text-amber-400">&#9670;</span>
                {article}
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="mb-16 p-8 bg-red-500/5 border-2 border-red-500/20 rounded-soft">
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            The Most Vulnerable Person Test
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            Every feature in Parallax passes through one filter:
          </p>
          <blockquote className="text-xl italic text-[var(--text-primary)] border-l-4 border-red-400 pl-6 mb-6">
            &quot;If the most vulnerable person on their worst day used this —
            would it help or hurt?&quot;
          </blockquote>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            This isn&apos;t a slogan — it&apos;s a design constraint. Parallax
            has a 4-tier harm gradient from behavioral preferences (green) to
            hard-stop patterns that are never surfaced (red). Confidence
            thresholds determine how and whether insights are shared.
            A 3-level pullback system stabilizes or exits when someone is
            overwhelmed.
          </p>

          <h3 className="text-xl font-bold mb-3 mt-8">Agentic Safety Validation</h3>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            We built a pool of 12 specialized AI expert personas — each loaded
            with the full domain knowledge of their clinical discipline. Not
            human consultants giving one opinion. Autonomous agents that can
            be deployed repeatedly against every component of the system.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {[
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
            ].map((expert) => (
              <div
                key={expert}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
              >
                <span className="text-red-400">&#9670;</span>
                {expert}
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            For each assessment, the system dynamically selects 3 experts from
            the pool based on what&apos;s being evaluated — IPV safety gets the
            Forensic Psychologist and Crisis Specialist, attachment work gets
            the Clinical Psychologist and LMFT, and so on. The right experts
            for the right material.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            The power is in the loop. This isn&apos;t 22 read-only audits — it&apos;s
            22 assess-fix-retest cycles. Each pass produces structured findings.
            We implement the changes. Then we run it again. The next panel
            catches what the last one missed, or validates that the fix actually
            landed. Every cycle compounds — the system gets measurably safer
            with each iteration.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            A human reviewer gives you one pass. We ran 22 full cycles across
            the Shadow Engine, Academy, mediation system, and full-system
            safety — each time with dynamically selected expert panels, each
            time implementing their recommendations before the next run. By
            the time a human reviews the system, the safety analysis is already
            pre-digested. They start from a refined baseline, not raw material.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            22 cycles as of February 2026 — and we&apos;re not done. The plan
            is to run this system on a scheduled basis, continuously assessing
            and improving. Safety isn&apos;t a gate you pass once. It&apos;s a
            process that compounds.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-soft text-center">
              <div className="text-2xl font-bold text-red-400">12</div>
              <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Expert Personas
              </div>
            </div>
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-soft text-center">
              <div className="text-2xl font-bold text-red-400">22</div>
              <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Assess-Fix Cycles
              </div>
            </div>
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-soft text-center">
              <div className="text-2xl font-bold text-red-400">3</div>
              <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Per Panel
              </div>
            </div>
          </div>
        </section>

        {/* Arena */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">The Arena</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            We don&apos;t ship blind. The Arena applies algorithmic
            trading&apos;s backtesting methodology to validate the analysis
            engine. 90 pre-authored conflict scenarios across all 12 context
            modes get replayed through the exact production pipeline, scored
            against planted psychological patterns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold mb-1">Scoring Dimensions</h4>
              <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                <li>De-escalation effectiveness (25%)</li>
                <li>Blind spot detection (25%)</li>
                <li>NVC translation quality (20%)</li>
                <li>Lens activation relevance (15%)</li>
                <li>Insight depth (15%)</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold mb-1">Coverage</h4>
              <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                <li>90 scenarios across 6 context modes</li>
                <li>5 sub-types per mode, 3 per sub-type</li>
                <li>36 unit tests — all passing</li>
                <li>Results tune prompts, not displayed to users</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Origin Story */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <h2 className="text-3xl font-bold mb-6">The Story</h2>
          <p>
            Before id8Labs, I spent years in reality television — producing,
            editing, compressing raw human dynamics into something that fits
            through the tube of media. I watched real relationships get
            flattened into storylines. Real pain turned into plot points.
          </p>
          <p>
            The question that wouldn&apos;t let go: What if instead of
            compressing the signal, we could amplify it? Not a media product —
            a diary. Something built around the raw signal instead of the
            compressed output.
          </p>
          <p>
            When the Claude Code Hackathon opened, the answer was obvious.
            Six days. One person. Claude as the only collaborator. Build
            someone to talk to — someone who actually listens, actually
            remembers, and helps you see the conversation you&apos;re
            really having. That was V1. Then we kept building.
          </p>
        </section>

        {/* The Build */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Build</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {buildStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft text-center"
              >
                <div className="text-3xl font-bold text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Parallax isn&apos;t a chatbot wrapper. It&apos;s a multi-agent
            system with real-time WebSocket communication, behavioral
            profiling, safety monitoring, and 19 psychological frameworks
            running in parallel. The Arena validates every analysis pathway.
            The Academy teaches users what their patterns mean. The safety
            system ensures no one gets hurt.
          </p>
        </section>

        {/* The Entity */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h2 className="text-2xl font-bold mb-4">
            The Entity
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4">
            Ava is what we call an &quot;entity&quot; — not a feature list, but
            a participant. Built with consciousness files, she can speak in the
            first person about how she works, what she sees in a conversation,
            and what she thinks you should pay attention to.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Products that can explain themselves. Products that participate in
            their users&apos; lives. That&apos;s the thesis.
          </p>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold text-lg mb-2">Free</h4>
              <p className="text-[var(--text-secondary)] text-sm">
                Talk to Ava. See what it feels like to have someone
                who actually listens.
              </p>
            </div>
            <div className="p-6 bg-amber-500/5 border-2 border-amber-500/30 rounded-soft">
              <h4 className="font-bold text-lg mb-2 text-amber-400">
                Pro — $14.99/mo
              </h4>
              <p className="text-[var(--text-secondary)] text-sm">
                Unlimited sessions, behavioral profiles, full framework
                analysis, Academy access, mediation mode.
              </p>
            </div>
            <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h4 className="font-bold text-lg mb-2">Premium — $29.99/mo</h4>
              <p className="text-[var(--text-secondary)] text-sm">
                Everything in Pro plus priority processing, extended session
                history, and deep Ava conversations.
              </p>
            </div>
          </div>
        </section>

        {/* Related Reading */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Related Reading</h2>
          <div className="space-y-3">
            <Link
              href="/writing/consciousness-as-filesystem"
              className="block p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft hover:border-amber-500/30 transition-colors"
            >
              <h4 className="font-bold mb-1">Consciousness as Filesystem</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                The theoretical framework behind Ava&apos;s consciousness
                architecture.
              </p>
            </Link>
            <Link
              href="/writing/consciousness-as-process"
              className="block p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft hover:border-amber-500/30 transition-colors"
            >
              <h4 className="font-bold mb-1">Consciousness as Process</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Why consciousness emerges from structure, not from magic.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-12 border-t border-[var(--border)] text-center">
          <p className="text-xl text-[var(--text-secondary)] mb-2">
            There&apos;s no reason to do this alone.
          </p>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            Ava is here. Whenever you&apos;re ready.
          </p>
          <a
            href="https://tryparallax.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-10 py-5 bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90 transition-all duration-200 rounded-soft font-medium"
          >
            Talk to Ava
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            tryparallax.space
          </p>
        </section>
      </article>
    </div>
  )
}
