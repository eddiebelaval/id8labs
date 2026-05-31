'use client'

import Link from 'next/link'
import { m } from '@/components/motion'

const steps = [
  {
    step: '01',
    title: 'Map your pain',
    desc: 'A kickoff call to find what is eating your hours. We spec the agents and the human gates worth building. If we cannot scope a meaningful win, we say so — no charge.',
  },
  {
    step: '02',
    title: 'Build & deploy',
    desc: 'Agents go live on your hardware, wired to your real tools — email, calendar, CRM, files. Custom skills for your workflow, security hardened from day one. You never touch a terminal.',
  },
  {
    step: '03',
    title: 'White-glove hypercare',
    desc: 'We stay on, monitoring and tuning until the system is genuinely saving you time. If it is not delivering by the end of hypercare, we extend until it does.',
  },
]

const stats = [
  { number: '24h', label: 'To first deploy' },
  { number: '14–60', label: 'Days of hypercare' },
  { number: '0', label: 'Config you touch' },
]

export default function ForwardDeployment() {
  return (
    <section id="deploy" className="section-spacing bg-zone-text scroll-mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left - Sticky Header */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-[var(--id8-orange)] mb-4">
              Forward Deployment
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              We deploy it
              <br />
              <span className="text-gradient-orange">inside your business</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent mb-6" />
            <p className="text-xl text-[var(--text-secondary)]">
              Not a tool you have to learn. A working architecture, built and run for you.
            </p>
          </m.div>

          {/* Right - Content */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Lead */}
            <div className="space-y-6 text-lg md:text-xl leading-relaxed">
              <p>
                id8Labs designs <span className="text-[var(--id8-orange)] font-semibold">primitive chain architectures with human gates</span> and
                deploys them inside your business. Your hardware, your tools, your domain.
              </p>
              <p className="text-[var(--text-secondary)]">
                The difference between an AI tool and an AI agent is simple: tools wait for you to type.
                Agents do the work while you focus on something else. We build the chain that eats the
                drudgery before the work — so you reach scale tools alone cannot deliver.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-0">
              {steps.map((item, i) => (
                <m.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 md:gap-8 py-8 border-b border-[var(--border)] first:pt-0"
                >
                  <span className="text-4xl md:text-5xl font-bold text-[var(--id8-orange)] shrink-0 leading-none">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                </m.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center p-6 border border-[var(--border)] rounded-lg"
                >
                  <p className="text-3xl md:text-4xl font-bold text-[var(--id8-orange)] mb-2">
                    {stat.number}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </m.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/services" className="btn btn-primary hover-lift group">
                See how deployment works
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/services#apply-form"
                className="btn border border-[var(--border)] hover:border-[var(--id8-orange)] transition-colors"
              >
                Apply for a setup
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
