'use client'

import { m } from '@/components/motion'

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
                Tools for creators.
              </span>
              <span className="block text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)]">
                Infrastructure for builders.
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
              AI as an auxiliary layer of the brain. Handle the repetitive work so there's bandwidth for real thinking.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6"
            >
              <a
                href="/lab"
                className="btn btn-primary hover-lift group"
              >
                Read the Lab Story
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
