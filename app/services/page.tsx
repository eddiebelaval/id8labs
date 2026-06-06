'use client'

import { useState, useEffect, type FormEvent } from 'react'
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
const inputClassName =
  'w-full bg-[var(--paper)] border border-[var(--hair)] px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-id8-orange transition-colors'
const labelClassName =
  'block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2'
const selectClassName = `${inputClassName} pr-10 appearance-none bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat`
const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a5a5a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`

// ─── Icon Components ────────────────────────────────────────
const CheckIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    title: 'Runs on your infrastructure',
    desc: 'Your Mac Mini or VPS. Your data stays on your hardware. No third-party cloud you don\'t control.',
  },
  {
    title: 'Plugs into your real tools',
    desc: 'Email, calendar, Slack, CRM, file systems, databases — connected on day one.',
  },
  {
    title: 'Custom skills for your workflow',
    desc: 'We map your actual workflow and build skills that automate it. Not templates.',
  },
  {
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
    <div className="min-h-screen bg-[var(--paper)]">

      {/* ── 1. HERO ───────────────────────────────────── */}
      <section className="border-b border-[var(--hair)]">
        <Container>
          <div className="max-w-4xl pt-28 pb-16 md:pt-36 md:pb-20">
            <Kicker dot className="mb-5">
              AI Implementation Services
            </Kicker>
            <h1 className="mb-7 font-[family-name:var(--font-display)] font-normal leading-[0.98] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.75rem,6.2vw,5.5rem)]">
              Your AI team, <em className="italic font-normal text-id8-orange">deployed and running this week.</em>
            </h1>
            <Deck className="mb-9 max-w-2xl">
              We design primitive chain architectures with human gates and deploy them inside your business. Your hardware, your tools, your domain. White-glove service that eats the drudgery before the work, so you reach scale tools alone cannot deliver.
            </Deck>
            <div className="mb-10 flex flex-col gap-3.5 sm:flex-row">
              <EditorialButton onClick={scrollToForm}>
                Apply for a Setup
                <ArrowRightIcon />
              </EditorialButton>
              <button
                data-cal-link="id8labs/15min"
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 border border-[var(--hair)] bg-transparent px-6 py-3.5 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition-colors duration-150 hover:border-[var(--ink)]"
              >
                Book a Call
              </button>
            </div>
            <Rule className="mb-6" />
            <MetaRow
              items={[
                { value: '24h', label: 'to first deploy' },
                { value: '14–60', label: 'days of hypercare' },
                { value: '0', label: 'config you touch' },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ── 2. THE PROBLEM ─────────────────────────────── */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>You know AI should be saving you time. <em className="italic">It isn&apos;t.</em></>}
            meta="The problem"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((card, i) => (
              <EditorialCard key={i}>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg font-normal leading-snug tracking-[-0.01em] text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--body)]">{card.desc}</p>
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. MEET OPENCLAW ───────────────────────────── */}
      <section id="openclaw" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>OpenClaw: agents that <em className="italic">actually do the work</em></>}
            meta="The engine"
          />

          <div className="mt-12 max-w-3xl">
            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] underline decoration-[var(--hair)] underline-offset-2 transition-colors hover:decoration-id8-orange">OpenClaw</a> is an open-source agent framework. It runs on your hardware, connects to your real tools, and executes tasks autonomously. Email, calendar, Slack, CRM, file management — whatever your operation runs on, OpenClaw plugs into it.
            </p>
            <p className="mb-9 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              The difference between an AI tool and an AI agent is simple:{' '}
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--ink)]">tools wait for you to type. Agents do the work while you focus on something else.</span>
            </p>

            <div className="mb-12 border border-[var(--hair)] border-l-2 border-l-id8-orange bg-[var(--paper-shadow)] p-7">
              <p className="mb-3.5 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
                How it works under the hood
              </p>
              <p className="mb-3.5 text-[15px] leading-relaxed text-[var(--body)]">
                OpenClaw is free and open source — the framework costs nothing. Agents run on AI models (Claude, GPT, etc.), and you bring your own API key or subscription. Think of it like email: the protocol is free, but you pay your provider for the service.
              </p>
              <p className="text-[15px] leading-relaxed text-[var(--body)]">
                Our setup service covers deployment, custom skills, integrations, and hypercare. Token costs for the AI models are yours — typically $20-100/month depending on usage. We help you pick the right model and optimize costs during hypercare.
              </p>
            </div>
          </div>

          <div className="grid max-w-4xl gap-px border border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-2">
            {openclawCapabilities.map((item, i) => (
              <div key={i} className="bg-[var(--paper)] p-7">
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-[1.0625rem] font-normal tracking-[-0.01em] text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--body)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. THE BRIDGE ──────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="mb-8 font-[family-name:var(--font-display)] font-normal leading-none tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,4vw,2.75rem)]">
              Free to use. <em className="italic text-id8-orange">Hard to deploy right.</em>
            </h2>
            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              You could install OpenClaw yourself. Read the docs, write the plugins, configure the integrations, harden the security, debug it when something breaks at 2 AM.
            </p>
            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              Or you could be running by tomorrow.
            </p>
            <p className="mb-12 font-[family-name:var(--font-serif)] text-xl italic leading-[1.5] text-[var(--ink)]">
              We do the entire build for you. Your workflow, your tools, your hardware — we deploy OpenClaw, build the custom skills, wire the integrations, and stay on for hypercare until the system is genuinely saving you time.
            </p>

            <div className="grid grid-cols-3 gap-px border border-[var(--hair)] bg-[var(--hair)]">
              {[
                { number: '24h', label: 'To first deploy' },
                { number: '14-60', label: 'Days of hypercare' },
                { number: '0', label: 'Config you touch' },
              ].map((stat, i) => (
                <div key={i} className="bg-[var(--paper)] p-6 text-center">
                  <p className="mb-1.5 font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.02em] text-id8-orange md:text-4xl">{stat.number}</p>
                  <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. HOW WE DEPLOY IT ────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead
            title={<>Three steps. One week. <em className="italic">Running.</em></>}
            meta="The engagement"
          />

          <div className="mt-12 mb-12">
            <Pipeline
              title="Service engagement"
              steps={[
                { label: 'Kickoff call', human: true },
                { label: 'Workflow mapping', human: true },
                { label: 'Deploy + build skills' },
                { label: 'Integrate + harden' },
                { label: 'Hypercare tuning', human: true },
                { label: 'Running' },
              ]}
            />
          </div>

          <div className="max-w-3xl">
            {steps.map((item, i) => (
              <div key={i} className="flex gap-6 border-b border-[var(--hair)] py-8 last:border-b-0 md:gap-8">
                <span className="shrink-0 font-[family-name:var(--font-display)] text-4xl font-normal leading-none tracking-[-0.04em] text-id8-orange md:text-5xl">
                  {item.step}
                </span>
                <div>
                  <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">{item.title}</h3>
                  <p className="text-[1.0625rem] leading-[1.65] text-[var(--body)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. PRICING ─────────────────────────────────── */}
      <section id="pricing" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead title={<>Choose your <em className="italic">level</em></>} meta="Pricing" />
          <Deck className="mt-6 max-w-2xl">
            From a 2-hour workshop to a full automation suite. Transparent pricing, no surprises.
          </Deck>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <EditorialCard key={tier.name} featured={tier.featured} className="flex flex-col">
                {tier.featured && (
                  <span className="mb-4 inline-block self-start bg-id8-orange px-2.5 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--paper)]">
                    Most Popular
                  </span>
                )}
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.01em] text-[var(--ink)]">{tier.name}</h3>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.02em] text-[var(--ink)]">{tier.price}</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{tier.priceNote}</span>
                </div>
                <ul className="mb-8 flex-grow space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14px] leading-snug">
                      <span className="mt-0.5 shrink-0 text-id8-orange">
                        <CheckIcon />
                      </span>
                      <span className="text-[var(--body)]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-5 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--muted)]">
                  Best for: {tier.bestFor}
                </p>
                {tier.cta === 'booking' ? (
                  <button
                    data-cal-link="id8labs/workshop"
                    data-cal-config='{"layout":"month_view"}'
                    className="w-full cursor-pointer border border-[var(--hair)] bg-transparent px-6 py-3 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition-colors duration-150 hover:border-[var(--ink)]"
                  >
                    Book Session
                  </button>
                ) : (
                  <button
                    onClick={scrollToForm}
                    className={`w-full cursor-pointer border px-6 py-3 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
                      tier.featured
                        ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:border-id8-orange hover:bg-id8-orange'
                        : 'border-[var(--hair)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]'
                    }`}
                  >
                    Apply Now
                  </button>
                )}
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. WHO THIS IS FOR / ISN'T FOR ─────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <div className="grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-7 flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--ink)]">
                <span className="h-2 w-2 rounded-full bg-id8-orange" />
                Built for operators
              </h2>
              <div>
                {audiences.map((profile, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-[var(--hair)] py-4 last:border-b-0">
                    <span className="mt-0.5 shrink-0 text-id8-orange">
                      <CheckIcon />
                    </span>
                    <p className="text-[15px] text-[var(--body)]">{profile}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-7 flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--hair-hard)]" />
                Not for everyone
              </h2>
              <div>
                {notFor.map((profile, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-[var(--hair)] py-4 last:border-b-0">
                    <span className="mt-1 shrink-0 text-[var(--muted)]">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </span>
                    <p className="text-[15px] text-[var(--muted)]">{profile}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 8. CREDIBILITY ─────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <div className="grid max-w-5xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 font-[family-name:var(--font-display)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--ink)] text-[clamp(1.875rem,3.5vw,2.5rem)]">
                Built by someone who&apos;s been <em className="italic text-id8-orange">in the trenches</em>
              </h2>
              <p className="mb-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
                I&apos;m not an AI researcher. I&apos;m a producer who figured out that the leverage was not in the tools, it was in the architecture between them.
              </p>
              <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)]">
                20+ years in film and TV production taught me one thing: systems beat hustle. Now I design primitive chains with human gates for operators who need to reach scale tools alone cannot deliver.
              </p>
            </div>
            <div>
              {credentials.map((cred, i) => (
                <div key={i} className="border-b border-[var(--hair)] py-4 font-[family-name:var(--font-mono)] text-sm last:border-b-0">
                  <span className="font-medium text-[var(--ink)]">
                    {cred.highlight}
                  </span>{' '}
                  <span className="text-[var(--muted)]">
                    {cred.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 9. SOCIAL PROOF ────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead title={<>From the <em className="italic">field</em></>} meta="Testimonials" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <EditorialCard key={i} className="flex flex-col">
                <p className="mb-6 flex-grow font-[family-name:var(--font-serif)] text-lg italic leading-[1.5] text-[var(--body)]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[var(--hair)] pt-4">
                  <p className="font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.15em] text-[var(--ink)]">{t.name}</p>
                  <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{t.role}</p>
                </div>
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 10. FAQ ────────────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container>
          <SectionHead title={<>Common <em className="italic">questions</em></>} meta="FAQ" />
          <div className="mx-auto mt-12 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--hair)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="pr-8 font-[family-name:var(--font-display)] text-lg font-normal tracking-[-0.01em] text-[var(--ink)]">{faq.q}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
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
                      <p className="text-[15px] leading-relaxed text-[var(--body)]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 11. APPLICATION FORM ────────────────────────── */}
      <section id="apply-form" className="border-t border-[var(--hair)] py-20 md:py-24">
        <Container narrow>
          <div className="mb-12 text-center">
            <Kicker dot className="mb-5 justify-center">
              Apply
            </Kicker>
            <h2 className="mb-5 font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)]">
              Apply for a <em className="italic text-id8-orange">Setup</em>
            </h2>
            <p className="mx-auto max-w-md text-[1.0625rem] leading-[1.6] text-[var(--body)]">
              We take on a limited number of setups each month. Tell us what&apos;s eating your time.
            </p>
          </div>

          {formState === 'success' ? (
            <div className="border border-[var(--hair)] border-t-2 border-t-id8-orange bg-[var(--paper-shadow)] py-16 text-center">
              <p className="mb-2 font-[family-name:var(--font-display)] text-2xl font-normal text-[var(--ink)]">You&apos;re in.</p>
              <p className="text-[var(--body)]">We&apos;ll review your application and reach out within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 border border-[var(--hair)] bg-[var(--paper-shadow)] p-7 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClassName}>Name</label>
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
                  <label htmlFor="email" className={labelClassName}>Email</label>
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

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="company" className={labelClassName}>Company / Studio</label>
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
                  <label htmlFor="teamType" className={labelClassName}>What does your team do?</label>
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

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="teamSize" className={labelClassName}>Team size</label>
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
                  <label htmlFor="tier" className={labelClassName}>Which tier interests you?</label>
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
                <label htmlFor="timeDrain" className={labelClassName}>
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
                <label htmlFor="timeline" className={labelClassName}>When do you want to be up and running?</label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className={selectClassName}
                  style={{ backgroundImage: selectChevron }}
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
                className="w-full cursor-pointer border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--paper)] transition-colors duration-150 hover:border-id8-orange hover:bg-id8-orange disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formState === 'submitting' ? 'Submitting...' : 'Apply Now'}
              </button>

              <p className="text-center font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--muted)]">
                No commitment. We&apos;ll review your application and tell you which tier fits — or if this isn&apos;t right for you.
              </p>

              {formState === 'error' && (
                <p className="text-center text-sm text-id8-orange">
                  Something went wrong. Try again or email us directly at eb@id8labs.tech
                </p>
              )}
            </form>
          )}
        </Container>
      </section>

    </div>
  )
}
