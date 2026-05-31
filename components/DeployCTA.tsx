'use client'

import Link from 'next/link'
import { m } from '@/components/motion'

/**
 * DeployCTA
 * Closing call-to-action before the footer. Drives toward the
 * forward-deployment offering — the lab's core business.
 */
export default function DeployCTA() {
  return (
    <section className="section-spacing bg-zone-nav border-t border-[var(--border)]">
      <div className="container">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Your AI team,
            <br />
            <span className="text-gradient-orange">deployed and running this week.</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            We take on a limited number of setups each month. Tell us what is eating your time,
            and we will tell you which agents to build — or if this is not right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/services#apply-form" className="btn btn-primary hover-lift group">
              Apply for a setup
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="btn border border-[var(--border)] hover:border-[var(--id8-orange)] transition-colors"
            >
              See the offering
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  )
}
