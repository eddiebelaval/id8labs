'use client'

import { useState } from 'react'
import { m, AnimatePresence } from '@/components/motion'

function AttractorPlacard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="absolute bottom-8 left-8 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs tracking-wide text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
        aria-label="About this visualization"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="hidden sm:inline">What is this?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-10 left-0 w-[340px] bg-zone-glass rounded-xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Lorenz Strange Attractor
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              A deterministic chaotic system with two lobes of activity connected
              by a crossover zone. One lobe represents human dynamics, the other
              technical architecture. Insight happens where trajectories cross between them.
            </p>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              Born from a question asked to Claude: <em>&quot;What would the shape
              of my mind be?&quot;</em> The answer mapped cross-domain thinking to
              this mathematical form.
            </p>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] pt-1">
              &sigma;=10 &nbsp; &rho;=28 &nbsp; &beta;=8/3
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScrollIndicator() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-tertiary)]">Scroll</span>
      <m.svg
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[var(--text-tertiary)]"
      >
        <polyline points="6 9 12 15 18 9" />
      </m.svg>
    </m.div>
  )
}

export default function Hero() {
  return (
    <>
      {/* Act 1: The Canvas — pure attractor, no text, no UI */}
      <section
        id="hero"
        className="relative h-screen bg-zone-full"
      >
        <AttractorPlacard />
        <ScrollIndicator />
      </section>

      {/* Act 2: The Reveal — brand identity emerges */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-zone-full">
        <div className="container relative z-10">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto text-center space-y-8 attractor-text-bg"
          >
            <h1 className="text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] font-extrabold tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
              <span className="block mb-2">
                <span className="text-gradient-orange">id8</span>Labs
              </span>
              <span className="block text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)]">
                Architecture, not tools.
              </span>
              <span className="block text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)]">
                Primitive chains for AI-era operators.
              </span>
            </h1>

            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-medium leading-relaxed"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              Robust primitive chains with human gates, designed domain-deep. They eat the drudgery before the work, so companies reach scale they could not have reached otherwise.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/services"
                className="btn btn-primary hover-lift group"
              >
                Work with us
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#products"
                className="btn border border-[var(--border)] hover:border-[var(--id8-orange)] transition-colors"
              >
                See what we&apos;ve shipped
              </a>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-12 text-sm text-[var(--text-tertiary)]"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
                <span>Composer v1.8161</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-[var(--border)] rounded-full" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
                <span>DeepStack v2.5.0</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-[var(--border)] rounded-full" />
              <div className="hidden sm:flex items-center gap-2">
                <span>Built in Miami</span>
              </div>
            </m.div>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>
    </>
  )
}
