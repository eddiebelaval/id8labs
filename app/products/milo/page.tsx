'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

/**
 * MILO - Mission Intelligence Life Operator
 * Signal-to-Noise life planner. Editorial spread.
 */

const features = [
  {
    title: 'Signal Queue',
    description: 'What matters. Now. Wake up to your priorities, not your inbox.',
  },
  {
    title: 'Awareness',
    description: 'Know where you are. Green means go. Red means stop. Before you burn out, MILO tells you.',
  },
  {
    title: 'Reflection',
    description: 'Learn from today. Did you do what mattered? Every evening, the answer is waiting.',
  },
]

const problems = [
  '"Another day. Gone."',
  '"Another list. Ignored."',
  '"Another app. Another promise."',
]

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error')
      return
    }
    setState('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setState('success')
      setEmail('')
      setTimeout(() => setState('idle'), 3000)
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <p className="font-[family-name:var(--font-serif)] italic text-lg" style={{ color: 'var(--teal)' }}>
        Signal received. You&apos;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (state === 'error') setState('idle')
        }}
        placeholder="you@domain.com"
        aria-label="Email address"
        disabled={state === 'loading'}
        className="flex-1 min-w-[220px] border border-[var(--ink)] bg-[var(--paper)] px-5 py-3.5 font-[family-name:var(--font-sans)] text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-id8-orange placeholder:text-[var(--muted)] disabled:opacity-50"
      />
      <EditorialButton type="submit">
        {state === 'loading' ? 'Processing…' : state === 'error' ? 'Try Again' : 'Join Waitlist'}
      </EditorialButton>
    </form>
  )
}

export default function MILOLandingPage() {
  return (
    <main className="bg-[var(--paper)] py-20 md:py-28">
      <Container>
        {/* Hero */}
        <header className="border-b border-[var(--hair)] pb-14">
          <Kicker dot className="mb-5">Task Manager · Free · Open Source</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.03em] leading-[1.02] text-[var(--ink)] text-[clamp(2.75rem,6vw,5rem)] max-w-3xl mb-7">
            Your day has a signal. <em className="italic text-id8-orange">Tune in.</em>
          </h1>
          <Deck className="max-w-2xl mb-9">
            Signal-to-noise task management with Claude integration. MILO filters the noise so you
            hear what matters&mdash;and does the work while you watch.
          </Deck>
          <div className="flex flex-wrap gap-3.5">
            <EditorialButton href="https://github.com/eddiebelaval/milo/releases/latest" external>
              Download for Mac
            </EditorialButton>
            <EditorialButton href="#waitlist" variant="ghost">
              Get App Store Release
            </EditorialButton>
          </div>
          <MetaRow
            className="mt-12 border-t border-[var(--hair)] pt-6"
            items={[
              { value: 'macOS', label: 'platform' },
              { value: 'Claude API', label: 'requires key' },
              { value: 'MIT', label: 'license' },
              { value: 'Free', label: 'price' },
            ]}
          />
        </header>

        {/* Problem */}
        <section className="py-16">
          <div className="max-w-2xl space-y-3">
            {problems.map((p) => (
              <p key={p} className="font-[family-name:var(--font-serif)] italic text-xl md:text-2xl text-[var(--muted)]">
                {p}
              </p>
            ))}
            <p className="font-[family-name:var(--font-serif)] italic text-2xl md:text-3xl text-[var(--ink)] pt-4">
              What if you only saw <em className="text-id8-orange">what matters</em>?
            </p>
          </div>
        </section>

        <Rule />

        {/* Product Demo */}
        <section className="py-16">
          <SectionHead title={<>MILO filters the noise. So you hear the <em className="italic text-id8-orange">signal</em>.</>} />
          <div className="mt-10 max-w-2xl text-[var(--body)] leading-relaxed mb-10">
            <p>
              You don&apos;t need another inbox. You need clarity. MILO shows you the one thing
              that matters most. Right now. Every day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            <div className="bg-[var(--paper)] p-6 flex justify-center">
              <Image
                src="/products/milo/milo-welcome.png"
                alt="MILO Welcome Screen"
                width={600}
                height={500}
                className="w-auto h-auto max-w-full"
                priority
              />
            </div>
            <div className="bg-[var(--paper)] p-6 flex justify-center">
              <Image
                src="/products/milo/milo-dashboard.png"
                alt="MILO Dashboard"
                width={800}
                height={600}
                className="w-full h-auto max-w-3xl"
              />
            </div>
          </div>
        </section>

        <Rule />

        {/* Claude Integration */}
        <section className="py-16">
          <SectionHead title="Intelligence built in" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="border border-[var(--hair)] p-4 bg-[var(--paper)]">
              <Image
                src="/products/milo/milo-api-settings.png"
                alt="MILO Claude API Settings"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-4 text-[var(--body)] leading-relaxed">
              <p>
                Connect once. Every morning, MILO reads your priorities and tells you where
                to aim. Every evening, it shows you what you actually accomplished.
                No setup. No prompts. Just insight.
              </p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
                Your data stays local. Runs on your Mac.
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="pb-16">
          <SectionHead title="Your projects. Organized." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-[var(--body)] leading-relaxed md:order-1">
              <p>
                Inbox for capture. Projects for focus. MILO auto-discovers your local
                development projects and surfaces tasks where they belong. No manual
                filing. No lost context.
              </p>
            </div>
            <div className="border border-[var(--hair)] p-4 bg-[var(--paper)] md:order-2">
              <Image
                src="/products/milo/milo-projects.png"
                alt="MILO Projects View"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* One Button Done */}
        <section className="pb-16">
          <SectionHead title={<>One button. <em className="italic text-id8-orange">Done.</em></>} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="border border-[var(--hair)] p-4 bg-[var(--paper)] flex justify-center">
              <Image
                src="/products/milo/milo-one-shot.png"
                alt="MILO Execute Task - One Shot Done"
                width={600}
                height={500}
                className="w-auto h-auto max-w-full"
              />
            </div>
            <div className="space-y-4 text-[var(--body)] leading-relaxed">
              <p>
                See a task. Hit Start. Watch it happen. The AI thinks through the work,
                breaks it down, and does it &mdash; while you watch. You decide what matters.
                The machine does the rest.
              </p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">
                Not a chatbot. A worker. You point. It builds.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* Features */}
        <section className="py-16">
          <SectionHead title="Signal. Awareness. Reflection." meta="3 systems" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)]">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--paper)] p-7">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-2">{feature.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* For Developers */}
        <section className="py-16">
          <SectionHead title={<>For developers. <em className="italic text-id8-orange">Zero setup.</em></>} />
          <p className="mt-8 mb-8 max-w-2xl text-lg text-[var(--muted)]">
            Don&apos;t want to download? No problem. One command in Claude Code and MILO is running from source.
          </p>
          <div className="font-[family-name:var(--font-mono)] text-sm bg-[var(--paper-shadow)] p-6 border border-[var(--hair)] space-y-4 overflow-x-auto">
            <div className="text-[var(--ink)]">
              $ bash &lt;(curl -s https://raw.githubusercontent.com/eddiebelaval/milo/main/scripts/setup-claude.sh) YOUR_API_KEY
            </div>
            <div className="text-[var(--muted)] text-xs space-y-1.5 pt-2">
              <div>• Clones the repo</div>
              <div>• Installs dependencies</div>
              <div>• Configures your API key</div>
              <div>• Launches MILO in dev mode</div>
              <div>• Opens in your browser</div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4">
            <p className="text-[var(--body)]">
              Or just ask Claude Code naturally:{' '}
              <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                &quot;Set up and run MILO with my Claude API key&quot;
              </span>
            </p>
            <EditorialButton
              href="https://github.com/eddiebelaval/milo/blob/main/CLAUDE.md"
              external
              variant="ghost"
            >
              Full Integration Guide
            </EditorialButton>
          </div>
        </section>

        <Rule />

        {/* Close / Waitlist */}
        <section id="waitlist" className="py-16 text-center scroll-mt-24">
          <EditorialCard featured>
            <SectionHead
              title={<>The goal is not to do more. It&apos;s to do <em className="italic text-id8-orange">what matters</em>.</>}
              className="border-0 pb-0 justify-center"
            />
            <p className="mt-7 mb-9 text-lg text-[var(--muted)] max-w-xl mx-auto">
              Available now on GitHub. Want the one-click App Store install?
            </p>
            <WaitlistForm />
            <p className="mt-7 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
              For people who are tired of being busy.
            </p>
          </EditorialCard>
        </section>

        <Rule />

        {/* Footer meta */}
        <section className="pt-16 flex flex-wrap items-center justify-between gap-5">
          <MetaRow
            items={[
              { value: 'macOS', label: 'requires Claude API key' },
              { value: 'MIT', label: 'license' },
            ]}
          />
          <div className="flex gap-6 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Link href="https://github.com/eddiebelaval/milo" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] transition-colors hover:text-id8-orange">GitHub</Link>
            <Link href="/privacy" className="text-[var(--muted)] transition-colors hover:text-id8-orange">Privacy</Link>
          </div>
        </section>
      </Container>
    </main>
  )
}
