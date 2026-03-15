'use client'

import { useState, type FormEvent } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const inputClassName = 'w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--id8-orange)] transition-colors'

function SectionHeader({ title }: { title: string }) {
  return (
    <ScrollReveal>
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <div className="w-12 h-1 bg-[var(--id8-orange)] rounded-full" />
      </div>
    </ScrollReveal>
  )
}

const tiers = [
  {
    name: 'Starter',
    price: '$1,497',
    description: 'one-time',
    features: [
      '1 agent',
      'Core integrations (email, calendar, Slack)',
      '14-day hypercare + async support',
    ],
    bestFor: 'Solo founders, indie operators',
    featured: false,
  },
  {
    name: 'Studio',
    price: '$3,497',
    description: 'one-time',
    features: [
      'Up to 3 agents',
      'Custom skills built for your workflow',
      '30-day hypercare + async support',
    ],
    bestFor: 'Small teams, agencies',
    featured: true,
  },
  {
    name: 'Operator',
    price: '$6,997',
    description: 'one-time',
    features: [
      'Up to 6 agents',
      'Full workflow automation suite',
      '60-day hypercare',
      'Retainer option available',
    ],
    bestFor: 'Studios, media companies, exec teams',
    featured: false,
  },
]

const testimonials = [
  {
    quote: "We went from spending 3 hours a day on scheduling and client intake to basically zero. The agent just handles it now.",
    name: 'Marcus T.',
    role: 'Founder, boutique video production company',
  },
  {
    quote: "I was skeptical about another AI tool, but this isn't a tool — it's a deployed system. It runs whether I'm looking at it or not.",
    name: 'Sarah K.',
    role: 'Creative Director, brand agency',
  },
  {
    quote: "The hypercare period is what sold me. They didn't just set it up and leave. They tuned it until it actually matched how we work.",
    name: 'James R.',
    role: 'COO, indie media studio',
  },
]

export default function AISetupPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeDrain: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      // Formspree submission
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
      // Fire Telegram webhook (non-blocking)
      // fetch('https://your-telegram-webhook-url.com', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, source: 'ai-setup-landing' }),
      // }).catch(() => {})

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', company: '', timeDrain: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="container">
          <div className="max-w-3xl">
            <ScrollReveal immediate>
              <p className="text-sm font-mono uppercase tracking-wider text-[var(--id8-orange)] mb-6">
                AI Setup by id8Labs
              </p>
            </ScrollReveal>
            <ScrollReveal immediate delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8">
                Your AI assistant, built and running in{' '}
                <span className="text-[var(--id8-orange)]">24 hours</span>.
              </h1>
            </ScrollReveal>
            <ScrollReveal immediate delay={0.2}>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
                We deploy, harden, and customize your AI agent — then keep it running while you focus on the work.
              </p>
            </ScrollReveal>
            <ScrollReveal immediate delay={0.3}>
              <button
                onClick={scrollToForm}
                className="btn btn-primary text-lg px-8 py-4"
              >
                Apply for a Setup
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ───────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="Why generic AI isn't working for you" />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'ChatGPT is a chat window, not an agent.',
                desc: "It can't take action in your tools, workflows, or systems.",
              },
              {
                title: 'Self-install has security gaps.',
                desc: "Without hardening, you're exposing your stack to risk.",
              },
              {
                title: "Generic agents don't know your workflow.",
                desc: "They're built for the average user. You're not average.",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all duration-300">
                  <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                  <p className="text-[var(--text-secondary)]">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ──────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="What's included in every setup" />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                ),
                title: 'Deployed on your hardware',
                desc: 'Mac Mini or VPS, your choice.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                ),
                title: 'Integrated with your tools',
                desc: 'Email, calendar, Slack, CRM, and more.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                ),
                title: 'Custom skills built for you',
                desc: 'We map and automate your actual workflow.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: 'Security hardened from day one',
                desc: 'Locked down before it ever goes live.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: '14-60 day hypercare',
                desc: 'We stay in the loop until it\'s actually working.',
              },
            ].map((item, i) => (
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

      {/* ── WHO IT'S FOR ──────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="Built for builders, not enterprises" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Creative agencies & studios',
              'Indie founders & small exec teams',
              'Media companies & production houses',
              'Anyone whose time is worth more than their tools',
            ].map((profile, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="p-6 border border-[var(--border)] rounded-lg text-center hover:border-[var(--id8-orange)] transition-all duration-300">
                  <p className="text-sm font-medium">{profile}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="Three steps. One week. Running." />

          <div className="max-w-3xl space-y-0">
            {[
              {
                step: '01',
                title: 'Kickoff call',
                desc: 'We map your workflow, identify your highest-leverage automations.',
              },
              {
                step: '02',
                title: 'Deploy + customize',
                desc: 'Agent goes live. Integrations connected. Custom skills built.',
              },
              {
                step: '03',
                title: 'Hypercare',
                desc: 'We tune it until it\'s actually working. Async support throughout.',
              },
            ].map((item, i) => (
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

      {/* ── PRICING ───────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <SectionHeader title="Simple pricing. No surprises." />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 h-full ${
                    tier.featured
                      ? 'border-2 border-[var(--id8-orange)]'
                      : 'border-[var(--border)] hover:border-[var(--id8-orange)]'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[var(--id8-orange)] text-white rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-[var(--text-secondary)] ml-2 text-sm">{tier.description}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <svg className="w-4 h-4 text-[var(--id8-orange)] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-[var(--text-tertiary)] mb-4">
                    Best for: {tier.bestFor}
                  </p>
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────── */}
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

      {/* ── APPLY FORM ────────────────────────────────── */}
      <section id="apply-form" className="py-24 border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Apply for a Setup
                </h2>
                <p className="text-[var(--text-secondary)]">
                  We take on a limited number of setups each month. Tell us about your workflow.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              {formState === 'success' ? (
                <div className="text-center py-16 border border-[var(--id8-orange)] rounded-xl">
                  <p className="text-2xl font-bold mb-2">You&apos;re in.</p>
                  <p className="text-[var(--text-secondary)]">We&apos;ll reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
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
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
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

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company / Studio
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClassName}
                      placeholder="Your company or studio name"
                    />
                  </div>

                  <div>
                    <label htmlFor="timeDrain" className="block text-sm font-medium mb-2">
                      What&apos;s your biggest time drain right now?
                    </label>
                    <textarea
                      id="timeDrain"
                      required
                      rows={4}
                      value={formData.timeDrain}
                      onChange={(e) => setFormData({ ...formData, timeDrain: e.target.value })}
                      className={`${inputClassName} resize-none`}
                      placeholder="E.g., I spend 2 hours a day on client scheduling and follow-ups..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'Submitting...' : 'Apply Now'}
                  </button>

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
