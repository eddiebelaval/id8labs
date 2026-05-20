'use client'

import { useState, useEffect, type FormEvent } from 'react'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

// ─── Cal.com Script Loader ──────────────────────────────────
function useCalScript() {
  useEffect(() => {
    const win = window as unknown as { Cal?: CallableFunction & { loaded?: boolean; q?: unknown[]; ns?: Record<string, unknown> } }
    if (win.Cal?.loaded) return

    ;(function (C: Window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) { a.q.push(ar) }
      const d = C.document
      const w = C as unknown as { Cal: CallableFunction & { loaded?: boolean; q: unknown[]; ns: Record<string, CallableFunction & { q: unknown[] }> } }
      w.Cal = w.Cal || function (...args: unknown[]) {
        const cal = w.Cal as CallableFunction & { loaded?: boolean; q: unknown[]; ns: Record<string, CallableFunction & { q: unknown[] }> }
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (args[0] === L) {
          const api = function (...apiArgs: unknown[]) { p(api as unknown as { q: unknown[] }, apiArgs) } as unknown as CallableFunction & { q: unknown[] }
          const namespace = args[1]
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], args)
            p(cal as { q: unknown[] }, ['initNamespace', namespace])
          } else {
            p(cal as { q: unknown[] }, args)
          }
          return
        }
        p(cal as { q: unknown[] }, args)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    const Cal = win.Cal
    if (Cal) {
      Cal('init', { origin: 'https://cal.com' })
      Cal('ui', {
        styles: { branding: { brandColor: '#FF6B35' } },
        hideEventTypeDetails: false,
      })
    }
  }, [])
}

// ─── Shared Styles ──────────────────────────────────────────
const inputClassName = 'w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--id8-orange)] transition-colors'
const selectClassName = 'w-full px-4 py-3 pr-10 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--id8-orange)] transition-colors appearance-none bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat'
const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`

// ─── Section Header ─────────────────────────────────────────
function SectionHeader({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <ScrollReveal>
      <div className="mb-16">
        {label && (
          <p className="text-sm font-mono uppercase tracking-widest text-[var(--id8-orange)] mb-4">
            {label}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">{subtitle}</p>
        )}
        <div className="w-12 h-1 bg-[var(--id8-orange)] rounded-full mt-6" />
      </div>
    </ScrollReveal>
  )
}

// ─── Icon Components ────────────────────────────────────────
const ServerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
)

const LinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const WrenchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

// ─── Data ───────────────────────────────────────────────────

const problems = [
  {
    title: "You're still doing the work manually.",
    desc: "Scheduling, follow-ups, client intake, reporting. You know AI could handle this. But you don't have 40 hours to figure out how to set it up.",
  },
  {
    title: "ChatGPT is a chat window, not a worker.",
    desc: "It can answer questions. It can't send emails, update your CRM, process intake forms, or run while you sleep. You need an agent, not a chatbot.",
  },
  {
    title: "Generic AI tools don't know your workflow.",
    desc: "Every business runs differently. Off-the-shelf AI is built for the average user. Your edge cases need custom skills, not templates.",
  },
]

const openclawCapabilities = [
  {
    icon: <ServerIcon />,
    title: 'Runs on your infrastructure',
    desc: 'Your Mac Mini or VPS. Your data stays on your hardware. No third-party cloud you don\'t control.',
  },
  {
    icon: <LinkIcon />,
    title: 'Plugs into your real tools',
    desc: 'Email, calendar, Slack, CRM, file systems, databases — connected on day one.',
  },
  {
    icon: <WrenchIcon />,
    title: 'Custom skills for your workflow',
    desc: 'We map your actual workflow and build skills that automate it. Not templates.',
  },
  {
    icon: <LockIcon />,
    title: 'Security hardened from day one',
    desc: 'Locked down before it goes live. Permissions scoped. Access controlled.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Kickoff call — we map your pain',
    desc: 'What\'s eating your hours? We identify the highest-leverage automations and spec the agents you need. If we can\'t scope a meaningful improvement, we\'ll tell you — no charge.',
  },
  {
    step: '02',
    title: 'Build + deploy — your agents go live',
    desc: 'We deploy OpenClaw on your hardware, build custom skills for your tools, wire integrations, and harden security. You don\'t touch a terminal.',
  },
  {
    step: '03',
    title: 'White-glove hypercare — we stay until it works',
    desc: 'Not "call us if you have issues." We actively monitor, tune, and adjust your agents until they\'re saving you real time. If they\'re not delivering by the end of hypercare, we extend until they do.',
  },
]

const tiers = [
  {
    name: 'Workshop',
    price: '$297',
    priceNote: 'one-time',
    features: [
      '2-hour live session',
      'Custom AI applications for your work',
      '20 prompt templates (PDF)',
      '30 days follow-up support',
    ],
    bestFor: 'Solo operators who want to learn what\'s possible before committing',
    featured: false,
    cta: 'booking' as const,
  },
  {
    name: 'Starter',
    price: '$1,497',
    priceNote: 'one-time',
    features: [
      '1 OpenClaw agent deployed on your hardware',
      'Core integrations (email, calendar, Slack)',
      '14-day white-glove hypercare',
      'Async support throughout',
    ],
    bestFor: 'Solo founders, indie operators',
    featured: false,
    cta: 'apply' as const,
  },
  {
    name: 'Studio',
    price: '$3,497',
    priceNote: 'one-time',
    features: [
      'Up to 3 OpenClaw agents with custom skills',
      'Full workflow mapping + automation build',
      '30-day white-glove hypercare',
      'Async support throughout',
    ],
    bestFor: 'Small teams, agencies',
    featured: true,
    cta: 'apply' as const,
  },
  {
    name: 'Operator',
    price: '$6,997',
    priceNote: 'one-time',
    features: [
      'Up to 6 OpenClaw agents — full automation suite',
      'Multi-agent coordination + routing logic',
      '60-day white-glove hypercare',
      'Retainer option available',
    ],
    bestFor: 'Studios, media companies, exec teams',
    featured: false,
    cta: 'apply' as const,
  },
]

const audiences = [
  'Creative agencies drowning in admin',
  'Founders who ship but can\'t scale ops',
  'Media companies with production overhead',
  'Anyone whose time is worth more than their tools',
]

const notFor = [
  'Teams who want to tinker themselves — OpenClaw is free, docs are public',
  'Enterprises needing 6-month procurement cycles',
  'Anyone looking for a chatbot widget on their website',
]

const credentials = [
  { highlight: '90 Day Fiance', role: '— Story Production' },
  { highlight: 'The First 48', role: '— Director of Photography' },
  { highlight: 'High on the Hog (Netflix)', role: '— Cinematography' },
  { highlight: 'Teen Mom', role: '— Camera & Production' },
  { highlight: '3+ years', role: 'daily AI workflow integration' },
  { highlight: 'id8Labs', role: '— Founder, primitive chain architecture for AI-era operators' },
]

const testimonials = [
  {
    quote: "We went from spending 3 hours a day on scheduling and client intake to basically zero. The agent just handles it now.",
    name: 'Marcus T.',
    role: 'Founder, boutique video production company',
  },
  {
    quote: "I was skeptical about another AI tool. But this isn't a tool — it's a deployed system running on my Mac Mini. It works whether I'm looking at it or not.",
    name: 'Sarah K.',
    role: 'Creative Director, brand agency',
  },
  {
    quote: "The white-glove part is real. They tuned the agents for weeks until they actually matched how we work.",
    name: 'James R.',
    role: 'COO, indie media studio',
  },
]

const faqs = [
  {
    q: 'Is OpenClaw really free?',
    a: 'Yes — the framework is open source and free. You bring your own AI API key or subscription (Claude, GPT, etc.), which typically runs $20-100/month depending on usage. What you\'re paying for with our services is the deployment, customization, integration, security hardening, and ongoing hypercare — the work that turns a free tool into a running system.',
  },
  {
    q: 'What if I want to self-deploy?',
    a: 'Go for it. The docs are public. Our services exist for people who\'d rather be running their business than configuring agents at 2 AM.',
  },
  {
    q: 'What happens after hypercare ends?',
    a: 'Your agents keep running — they\'re deployed on your hardware, not ours. If you want ongoing support, the Operator tier includes a retainer option. Otherwise, you own the system.',
  },
  {
    q: 'How fast can I be up and running?',
    a: 'First agent deployed within 24 hours of kickoff. Full setup depends on complexity — most Starter deployments are fully tuned within a week. Studio and Operator take 2-3 weeks for full automation suites.',
  },
  {
    q: 'What\'s the difference between the Workshop and the deployment tiers?',
    a: 'The Workshop is a 2-hour learning session — you leave with knowledge and templates. The deployment tiers (Starter, Studio, Operator) mean we build and deploy actual running agents on your infrastructure. One is education, the other is execution.',
  },
  {
    q: 'What if the agents aren\'t saving me time?',
    a: 'If your agents aren\'t delivering measurable value by the end of hypercare, we extend until they do. We don\'t disappear after deploy — the whole point of hypercare is making sure this actually works for your workflow.',
  },
]

// ─── Main Page Component ────────────────────────────────────

export default function ServicesPage() {
  useCalScript()

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamType: '',
    teamSize: '',
    timeDrain: '',
    tier: '',
    timeline: '',
  })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_AI_SETUP_ID
      if (!formspreeId) {
        console.error('Missing NEXT_PUBLIC_FORMSPREE_AI_SETUP_ID env var')
        setFormState('error')
        return
      }

      const { timeDrain, ...rest } = formData
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rest, message: timeDrain }),
      })

      // TODO: replace with OpenClaw inbound webhook URL
      // fetch('https://your-telegram-webhook-url.com', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, source: 'services-unified' }),
      // }).catch(() => {})

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', company: '', teamType: '', teamSize: '', timeDrain: '', tier: '', timeline: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className="min-h-screen">

      {/* ── 1. HERO ───────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="container">
          <div className="max-w-3xl">
            <ScrollReveal immediate>
              <p className="text-sm font-mono uppercase tracking-wider text-[var(--id8-orange)] mb-6">
                AI Implementation Services
              </p>
            </ScrollReveal>
            <ScrollReveal immediate delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8">
                Your AI team,{' '}
                <span className="text-[var(--id8-orange)]">deployed and running this week.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal immediate delay={0.2}>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
                We design primitive chain architectures with human gates and deploy them inside your business. Your hardware, your tools, your domain. White-glove service that eats the drudgery before the work, so you reach scale tools alone cannot deliver.
              </p>
            </ScrollReveal>
            <ScrollReveal immediate delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="btn btn-primary text-lg px-8 py-4 group inline-flex items-center justify-center gap-3"
                >
                  Apply for a Setup
                  <ArrowRightIcon />
                </button>
                <button
                  data-cal-link="id8labs/15min"
                  data-cal-config='{"layout":"month_view"}'
                  className="btn text-lg px-8 py-4 border border-[var(--border)] hover:border-[var(--id8-orange)] transition-colors"
                >
                  Book a Call
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ─────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader
            title="You know AI should be saving you time. It isn't."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {problems.map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MEET OPENCLAW ───────────────────────────── */}
      <section id="openclaw" className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader
            label="The Engine"
            title="OpenClaw: agents that actually do the work"
          />

          <div className="max-w-3xl mb-16">
            <ScrollReveal>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                <Link href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--id8-orange)] hover:underline">OpenClaw</Link> is an open-source agent framework. It runs on your hardware, connects to your real tools, and executes tasks autonomously. Email, calendar, Slack, CRM, file management — whatever your operation runs on, OpenClaw plugs into it.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                The difference between an AI tool and an AI agent is simple:{' '}
                <span className="text-[var(--text-primary)] font-semibold">tools wait for you to type. Agents do the work while you focus on something else.</span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-6 border border-[var(--border)] border-l-2 border-l-[var(--id8-orange)] rounded-lg bg-[var(--bg-secondary)] max-w-3xl">
                <h3 className="font-bold mb-3 text-xs font-mono uppercase tracking-widest text-[var(--id8-orange)]">How it works under the hood</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
                  OpenClaw is free and open source — the framework costs nothing. Agents run on AI models (Claude, GPT, etc.), and you bring your own API key or subscription. Think of it like email: the protocol is free, but you pay your provider for the service.
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Our setup service covers deployment, custom skills, integrations, and hypercare. Token costs for the AI models are yours — typically $20-100/month depending on usage. We help you pick the right model and optimize costs during hypercare.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {openclawCapabilities.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-5 p-6 border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all duration-300">
                  <div className="text-[var(--id8-orange)] shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. THE BRIDGE ──────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
                Free to use.{' '}
                <span className="text-[var(--id8-orange)]">Hard to deploy right.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                You could install OpenClaw yourself. Read the docs, write the plugins, configure the integrations, harden the security, debug it when something breaks at 2 AM.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Or you could be running by tomorrow.
              </p>
              <p className="text-lg text-[var(--text-primary)] leading-relaxed font-semibold mb-12">
                We do the entire build for you. Your workflow, your tools, your hardware — we deploy OpenClaw, build the custom skills, wire the integrations, and stay on for hypercare until the system is genuinely saving you time.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-3 gap-6">
              {[
                { number: '24h', label: 'To first deploy' },
                { number: '14-60', label: 'Days of hypercare' },
                { number: '0', label: 'Config you touch' },
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="text-center p-6 border border-[var(--border)] rounded-lg">
                    <p className="text-3xl md:text-4xl font-bold text-[var(--id8-orange)] mb-2">{stat.number}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW WE DEPLOY IT ────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="Three steps. One week. Running." />
          <div className="max-w-3xl space-y-0">
            {steps.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-6 md:gap-8 py-8 border-b border-[var(--border)] last:border-b-0">
                  <span className="text-4xl md:text-5xl font-bold text-[var(--id8-orange)] shrink-0 leading-none">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRICING ─────────────────────────────────── */}
      <section id="pricing" className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader
            title="Choose your level"
            subtitle="From a 2-hour workshop to a full automation suite. Transparent pricing, no surprises."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 h-full ${
                    tier.featured
                      ? 'border-2 border-[var(--id8-orange)] bg-[var(--bg-secondary)] hover:-translate-y-1 hover:shadow-[var(--glow-orange)]'
                      : 'border-[var(--border)] hover:border-[var(--id8-orange)] hover:-translate-y-1'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[var(--id8-orange)] text-white rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-[var(--text-secondary)] ml-2 text-sm">{tier.priceNote}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <span className="text-[var(--id8-orange)] shrink-0 mt-0.5">
                          <CheckIcon />
                        </span>
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-[var(--text-tertiary)] mb-4">
                    Best for: {tier.bestFor}
                  </p>
                  {tier.cta === 'booking' ? (
                    <button
                      data-cal-link="id8labs/workshop"
                      data-cal-config='{"layout":"month_view"}'
                      className="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--id8-orange)] hover:text-[var(--id8-orange)]"
                    >
                      Book Session
                    </button>
                  ) : (
                    <button
                      onClick={scrollToForm}
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        tier.featured
                          ? 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)]'
                          : 'border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--id8-orange)] hover:text-[var(--id8-orange)]'
                      }`}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHO THIS IS FOR / ISN'T FOR ─────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl">
            <div className="p-8 border border-[var(--border)] rounded-xl">
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--id8-orange)]" />
                  Built for operators
                </h2>
              </ScrollReveal>
              <div className="space-y-0">
                {audiences.map((profile, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-3 py-4 border-b border-[var(--border)] last:border-b-0">
                      <span className="text-[var(--id8-orange)] shrink-0 mt-0.5">
                        <CheckIcon />
                      </span>
                      <p className="text-[var(--text-primary)] text-sm">{profile}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-xl">
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6 tracking-tight text-[var(--text-tertiary)] flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]" />
                  Not for everyone
                </h2>
              </ScrollReveal>
              <div className="space-y-0">
                {notFor.map((profile, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-3 py-4 border-b border-[var(--border)] last:border-b-0">
                      <span className="text-[var(--text-tertiary)] shrink-0 mt-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </span>
                      <p className="text-[var(--text-tertiary)] text-sm">{profile}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CREDIBILITY ─────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  Built by someone who&apos;s been{' '}
                  <span className="text-[var(--id8-orange)]">in the trenches</span>
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                  I&apos;m not an AI researcher. I&apos;m a producer who figured out that the leverage was not in the tools, it was in the architecture between them.
                </p>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  20+ years in film and TV production taught me one thing: systems beat hustle. Now I design primitive chains with human gates for operators who need to reach scale tools alone cannot deliver.
                </p>
              </ScrollReveal>
            </div>
            <div>
              {credentials.map((cred, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="py-4 border-b border-[var(--border)] last:border-b-0 font-mono text-sm">
                    <span className="text-[var(--text-primary)] font-semibold">
                      {cred.highlight}
                    </span>{' '}
                    <span className="text-[var(--text-tertiary)]">
                      {cred.role}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. SOCIAL PROOF ────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="From the field" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-[var(--border)] rounded-lg flex flex-col h-full">
                  <p className="text-[var(--text-secondary)] mb-6 flex-grow leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="Common questions" />
          <div className="max-w-3xl space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-b border-[var(--border)]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left"
                  >
                    <span className="font-semibold pr-8">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 ${
                        openFaq === i ? 'rotate-45' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6">
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. APPLICATION FORM ────────────────────────── */}
      <section id="apply-form" className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Apply for a Setup
                </h2>
                <p className="text-[var(--text-secondary)]">
                  We take on a limited number of setups each month. Tell us what&apos;s eating your time.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              {formState === 'success' ? (
                <div className="text-center py-16 border border-[var(--id8-orange)] rounded-xl bg-[var(--bg-secondary)]">
                  <p className="text-2xl font-bold mb-2">You&apos;re in.</p>
                  <p className="text-[var(--text-secondary)]">We&apos;ll review your application and reach out within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-8 md:p-10 border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)]">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClassName}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClassName}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">Company / Studio</label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={inputClassName}
                        placeholder="Your company or studio"
                      />
                    </div>
                    <div>
                      <label htmlFor="teamType" className="block text-sm font-medium mb-2">What does your team do?</label>
                      <select
                        id="teamType"
                        value={formData.teamType}
                        onChange={(e) => setFormData({ ...formData, teamType: e.target.value })}
                        className={selectClassName}
                        style={{ backgroundImage: selectChevron }}
                      >
                        <option value="">Select...</option>
                        <option value="creative-agency">Creative agency</option>
                        <option value="indie-founder">Indie founder / solo operator</option>
                        <option value="media-company">Media / production company</option>
                        <option value="exec-team">Exec team / small business</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium mb-2">Team size</label>
                      <select
                        id="teamSize"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className={selectClassName}
                        style={{ backgroundImage: selectChevron }}
                      >
                        <option value="">Select...</option>
                        <option value="1-3">1-3 people</option>
                        <option value="4-10">4-10 people</option>
                        <option value="11-25">11-25 people</option>
                        <option value="25+">25+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tier" className="block text-sm font-medium mb-2">Which tier interests you?</label>
                      <select
                        id="tier"
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className={selectClassName}
                        style={{ backgroundImage: selectChevron }}
                      >
                        <option value="">Not sure yet</option>
                        <option value="workshop">Workshop — $297</option>
                        <option value="starter">Starter — $1,497</option>
                        <option value="studio">Studio — $3,497</option>
                        <option value="operator">Operator — $6,997</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeDrain" className="block text-sm font-medium mb-2">
                      What&apos;s your biggest time drain right now?
                    </label>
                    <textarea
                      id="timeDrain"
                      required
                      rows={3}
                      value={formData.timeDrain}
                      onChange={(e) => setFormData({ ...formData, timeDrain: e.target.value })}
                      className={`${inputClassName} resize-none`}
                      placeholder="E.g., I spend 2 hours a day on client scheduling and follow-ups..."
                    />
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">When do you want to be up and running?</label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className={selectClassName}
                    >
                      <option value="">Select...</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-month">Within a month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'Submitting...' : 'Apply Now'}
                  </button>

                  <p className="text-center text-xs text-[var(--text-tertiary)]">
                    No commitment. We&apos;ll review your application and tell you which tier fits — or if this isn&apos;t right for you.
                  </p>

                  {formState === 'error' && (
                    <p className="text-center text-sm text-red-400">
                      Something went wrong. Try again or email us directly at eb@id8labs.tech
                    </p>
                  )}
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  )
}
