'use client'

import { m } from '@/components/motion'
import Link from 'next/link'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

interface ExternalCoursePageProps {
  title: string
  titleHighlight: string
  subtitle: string
  description: string
  provider: string
  externalUrl: string
  duration?: string
  track: string
  whatYoullLearn: string[]
  whoItsFor: Array<{ title: string; description: string }>
  whyItMatters: {
    heading: string
    body: string
  }
  relatedId8Course?: {
    title: string
    description: string
    href: string
  }
}

export default function ExternalCoursePage({
  title,
  titleHighlight,
  subtitle,
  description,
  provider,
  externalUrl,
  duration,
  track,
  whatYoullLearn,
  whoItsFor,
  whyItMatters,
  relatedId8Course,
}: ExternalCoursePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <m.div variants={fadeUp} className="mb-8">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Academy
              </Link>
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[var(--text-primary)] text-[var(--bg-primary)] rounded">
                {provider}
              </span>
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-green-500 text-white rounded">
                Free + Certificate
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                {track}
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              {title}{' '}
              <span className="text-gradient-orange">{titleHighlight}</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-4"
            >
              {subtitle}
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-lg text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              {description}
            </m.p>

            {/* CTA */}
            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Start on {provider}
                <ExternalLinkIcon />
              </a>
              <a
                href="#what-youll-learn"
                className="btn btn-secondary group inline-flex items-center justify-center gap-2"
              >
                What You&apos;ll Learn
              </a>
            </m.div>

            {duration && (
              <m.p variants={fadeUp} className="mt-4 text-sm text-[var(--text-tertiary)]">
                {duration} • Free • Official Anthropic certification
              </m.p>
            )}
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Why It Matters */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Why This Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {whyItMatters.heading}
            </h2>
            <div className="text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>{whyItMatters.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              This course is built for you if...
            </h2>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {whoItsFor.map((audience, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <span className="text-id8-orange flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{audience.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{audience.description}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-spacing border-t border-[var(--border)]" id="what-youll-learn">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              What You&apos;ll Learn
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Course topics
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {whatYoullLearn.map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
              >
                <span className="text-id8-orange flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <span className="text-[var(--text-primary)]">{item}</span>
              </m.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group inline-flex items-center justify-center gap-2"
            >
              Start Course on {provider}
              <ExternalLinkIcon />
            </a>
            <p className="mt-4 text-sm text-[var(--text-tertiary)]">
              Free course with official certification from Anthropic
            </p>
          </div>
        </div>
      </section>

      {/* Related ID8Labs Course */}
      {relatedId8Course && (
        <section className="section-spacing bg-[var(--bg-secondary)]">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">
                    Related ID8Labs Course
                  </p>
                  <h3 className="text-xl font-bold mb-1">{relatedId8Course.title}</h3>
                  <p className="text-[var(--text-secondary)]">
                    {relatedId8Course.description}
                  </p>
                </div>
                <Link
                  href={relatedId8Course.href}
                  className="btn btn-secondary group inline-flex items-center gap-2 whitespace-nowrap"
                >
                  View Course
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to start?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              This is an official Anthropic course hosted on their learning platform. It&apos;s completely free, and you&apos;ll earn a certificate upon completion.
            </p>
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hover-lift group inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              Start on {provider}
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
