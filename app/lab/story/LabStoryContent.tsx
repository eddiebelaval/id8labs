'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { featuredHomeProducts } from '@/lib/home-products'
import { Container, Kicker } from '@/components/editorial'
import { LAB_LOG } from '@/lib/lab-log'

// Section data for navigation
const sections = [
  { id: 'log', title: 'The Log' },
  { id: 'origin', title: 'Where It Started' },
  { id: 'thesis', title: 'The Thesis' },
  { id: 'proof', title: 'What We Shipped' },
  { id: 'system', title: 'The System' },
  { id: 'method', title: 'How I Build' },
  { id: 'ecosystem', title: 'The Ecosystem' },
  { id: 'public', title: 'Working in Public' },
  { id: 'contact', title: 'Get in Touch' },
]

// Section wrapper with sticky, ruled header
function StickySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <div className="sticky top-16 z-10 -mx-4 mb-6 border-b border-[var(--rule)] bg-[var(--paper)] px-4 py-4">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.015em] text-[var(--ink)]">
          {title}
        </h2>
      </div>
      <div className="space-y-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
        {children}
      </div>
    </section>
  )
}

// Side navigation component
function SideNavigation({ activeSection }: { activeSection: string }) {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-20">
      <ul className="space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 text-sm transition-all"
                aria-label={`Jump to ${section.title}`}
              >
                <div
                  className={`h-px transition-all ${
                    isActive
                      ? 'w-12 bg-id8-orange'
                      : 'w-8 bg-[var(--hair-hard)] group-hover:w-10 group-hover:bg-[var(--muted)]'
                  }`}
                />
                <span
                  className={`font-[family-name:var(--font-narrow)] text-[11px] uppercase tracking-[0.18em] transition-all ${
                    isActive
                      ? 'font-semibold text-id8-orange opacity-100'
                      : 'text-[var(--muted)] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Map product names to what they offload
const productOffloads: Record<string, string> = {
  Composer: 'context & continuity',
  HOMER: 'deal lifecycle management',
  DeepStack: 'pattern recognition & emotional guardrails',
  MILO: 'signal-to-noise task management',
}

export default function LabStoryContent() {
  const [activeSection, setActiveSection] = useState('origin')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--paper)] pb-24 pt-16">
      <SideNavigation activeSection={activeSection} />

      <Container narrow>
      <article>
        {/* Back Link */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-id8-orange"
        >
          &larr; Back to home
        </Link>

        {/* Header — the witness frame */}
        <header className="mb-12">
          <Kicker dot>The Lab Log</Kicker>
          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            The Lab
          </h1>
          <div className="mt-8 space-y-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>
              This page is kept in two voices. Up top, a running log written by the AI
              that has been in the room for every build, newest entry first. Below, the
              founder&apos;s origin story, in his own words. The log starts where the lab
              realized the witness was the one who remembered everything.
            </p>
          </div>
        </header>

        {/* The Witness Log — present up top, auto-tended by the lab-log chain */}
        <section id="log" className="mb-20 scroll-mt-32">
          <div className="space-y-12">
            {LAB_LOG.map((entry, i) => (
              <article key={`${entry.date}-${i}`} className="border-t border-[var(--rule)] pt-6">
                <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                    {entry.stamp}
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.015em] text-[var(--ink)]">
                    {entry.title}
                  </h2>
                </div>
                <div className="space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
                  {entry.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            The witness keeps this log on a set cadence. It drafts; the founder approves before an entry posts.
          </p>
        </section>

        {/* The origin — the founder's own voice, preserved */}
        <header className="mb-16 border-t-2 border-[var(--ink)] pt-10">
          <Kicker dot>The origin, in his words</Kicker>
          <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
            The Lab Story
          </h2>
          <div className="mt-8 space-y-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            <p>I started as a cameraman.</p>
            <p>
              First 48. Orange County Choppers. 90 Day Fiance. Twenty years of production
              work — from hands-on camera to story development, cast management, and the invisible
              infrastructure that turns chaos into narrative. Somewhere in there, I stopped
              capturing footage and started architecting systems.
            </p>
            <p>
              That shift is what this lab is about.
            </p>
          </div>
        </header>

        {/* Where It Started */}
        <StickySection id="origin" title="Where It Started">
          <p>
            The hardest part of production was never the work itself. It was the mental overhead.
            Holding a complex project in your head while simultaneously trying to develop it.
            Remembering what you decided three weeks ago so you can focus on what comes next.
          </p>
          <p>
            When AI tools arrived, they promised to help — but every session started the same way.
            Re-uploading documents. Re-explaining context. Rebuilding from scratch. By the third
            revision, the AI had forgotten half the project.
          </p>
          <p className="font-[family-name:var(--font-display)] text-2xl italic text-id8-orange">
            Context rot.
          </p>
          <p>
            That was the named problem. Not that AI forgot — but what that forgetting cost: creative
            bandwidth. Every time I rebuilt context, that was mental energy not available for actual
            creative work. Repetitive cognitive labor masquerading as progress.
          </p>
          <p>
            The question became: <span className="font-bold">what cognitive work should not be done by a human?</span>
          </p>
          <p>
            ID8Composer was the first answer — an AI writing partner that actually remembers your
            story world across sessions. That was product one. The lab kept going.
          </p>
        </StickySection>

        {/* The Thesis */}
        <StickySection id="thesis" title="The Thesis">
          <p className="mb-4 font-[family-name:var(--font-display)] text-2xl italic text-id8-orange">
            Architecture, not tools. Primitive chains with human gates, designed domain-deep.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-2 font-bold text-id8-orange">Chains, not tools.</p>
              <p>
                A tool sits and waits. A chain runs. Primitives wire together into architecture
                the company operates inside.
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-id8-orange">Human gates by design.</p>
              <p>
                Automation carries the drudgery. Humans carry the judgment. The gate is not a bug
                in the automation, it is the protected seat where real work happens.
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-id8-orange">Domain-deep, not generic.</p>
              <p>
                Every chain is shaped to a specific operation. The point is not to add another tool.
                The point is to eat the drudgery a company goes through before the work, so it
                reaches scale tools alone cannot deliver.
              </p>
            </div>
          </div>
          <p className="mt-8">
            What this is <span className="font-bold">not:</span> replacement. Not a content machine.
            Not a chatbot. This is the architecture between the tools, with the humans still in the
            seats where their judgment is doing real work.
          </p>
          <p>
            In 2025, this was a thesis about my own workflow. In 2026, it is a thesis a whole
            portfolio runs on. Four products shipping. An operating system connecting them.
            Forty-nine essays documenting the process. The thesis held up and grew.
          </p>
        </StickySection>

        {/* What We Shipped */}
        <StickySection id="proof" title="What We Shipped">
          <p>
            Every product is a specific answer to: &ldquo;What cognitive work can I offload?&rdquo;
          </p>
          <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] px-6 py-8">
            <div className="grid gap-4">
              {featuredHomeProducts.map((product) => (
                <div key={product.name} className="flex items-start gap-3">
                  <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 bg-id8-orange" />
                  <div>
                    <span className="font-bold text-[var(--ink)]">{product.name}</span>
                    {product.statusLabel && (
                      <span className="ml-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{product.statusLabel}</span>
                    )}
                    <span className="text-[var(--muted)]">
                      {' '}&mdash; Offloads {productOffloads[product.name] || product.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p>
            Composer handles context so you can create. HOMER handles deal complexity so you can
            close. DeepStack handles market analysis so you can decide. MILO handles task noise
            so you can focus. Each one removes a category of cognitive overhead.
          </p>
        </StickySection>

        {/* The System That Runs the Lab */}
        <StickySection id="system" title="The System That Runs the Lab">
          <p>
            The products solve individual problems. HYDRA connects them all.
          </p>
          <p>
            HYDRA is the operating system behind this lab — 23 automated jobs, 4 AI agents (MILO
            as coordinator plus 3 domain specialists), SQLite for local state, and Telegram for
            natural language control. It runs the infrastructure so I can focus on building.
          </p>
          <div className="space-y-4 border-l-2 border-id8-orange pl-6">
            <div>
              <p className="mb-1 font-bold text-id8-orange">Economics</p>
              <p className="text-[var(--muted)]">
                $300/month. 75% cost reduction from traditional multi-agent systems. Premium
                coordination (Claude) plus free execution (open models).
              </p>
            </div>
            <div>
              <p className="mb-1 font-bold text-id8-orange">The recursion</p>
              <p className="text-[var(--muted)]">
                AI as cognitive leverage to build a system that provides cognitive leverage.
                The thesis eating its own tail.
              </p>
            </div>
          </div>
          <p>
            HYDRA isn&apos;t a product for sale. It&apos;s proof-of-thesis — a living demonstration that
            the cognitive leverage model works at the systems level, not just the tool level.
          </p>
          <p>
            The full technical breakdown is in the{' '}
            <Link
              href="/writing/building-ai-human-os-v2"
              className="border-b border-id8-orange text-id8-orange transition-opacity hover:opacity-70"
            >
              HYDRA essay
            </Link>
            .
          </p>
        </StickySection>

        {/* How I Build */}
        <StickySection id="method" title="How I Build">
          <p>
            <span className="font-bold">Problem-first.</span> Every tool starts with friction
            experienced in production. Not &ldquo;wouldn&apos;t it be nice if&rdquo; — but &ldquo;I
            need this right now or this project fails.&rdquo;
          </p>
          <p>
            <span className="font-bold">Ship to learn.</span> The first version teaches what the
            real version needs. Production feedback over planning documents.
          </p>
          <p>
            <span className="font-bold">Cross-domain pattern recognition.</span> Filmmaking and
            mycology have more in common than you&apos;d think — both are about how systems grow, how
            networks form, how small changes cascade. Wildlife biology teaches you to observe
            without interfering. Trading systems teach you to build guardrails against your own
            worst instincts.
          </p>
          <p>
            <span className="font-bold">Working in public.</span> Ship before polished. Let real
            feedback shape the direction.
          </p>
          <p>
            <span className="font-bold">Claude as creative partner.</span> Director/Builder
            pattern — I plan and review, AI executes scoped tasks. It&apos;s the thesis applied to the
            build process itself.
          </p>
        </StickySection>

        {/* The Ecosystem */}
        <StickySection id="ecosystem" title="The Ecosystem">
          <p>
            What started as a workshop has grown into four pillars.
          </p>
          <div className="space-y-6 border-l-2 border-id8-orange pl-6">
            <div>
              <p className="mb-1 font-bold text-id8-orange">Products</p>
              <p className="text-[var(--muted)]">
                Composer, HOMER, DeepStack, MILO, Pipeline, LLC Ops — each targeting a different
                category of cognitive overhead.
              </p>
            </div>
            <div>
              <p className="mb-1 font-bold text-id8-orange">Education</p>
              <p className="text-[var(--muted)]">
                Academy courses on AI workflows and prompt engineering. StackShack with 228+ free
                Claude Code skills. Learn by building, not watching.
              </p>
            </div>
            <div>
              <p className="mb-1 font-bold text-id8-orange">Shipped</p>
              <p className="text-[var(--muted)]">
                A weekly, verified magazine for builders, reading the frontier one layer up and
                logging the lab&apos;s own R&amp;D in public.{' '}
                <Link
                  href="/shipped"
                  className="border-b border-id8-orange text-id8-orange transition-opacity hover:opacity-70"
                >
                  Read the field notes
                </Link>
                .
              </p>
            </div>
            <div>
              <p className="mb-1 font-bold text-id8-orange">Writing</p>
              <p className="text-[var(--muted)]">
                49+ essays on building in public — technical breakdowns, product thinking, and the
                philosophy behind the tools.
              </p>
            </div>
          </div>
        </StickySection>

        {/* Working in Public */}
        <StickySection id="public" title="Working in Public">
          <p>
            Forty-nine essays published. Open source tools (MILO, StackShack skills). Free Academy
            courses. Everything built in the open.
          </p>
          <p>
            The philosophy: ship before ready, iterate on real feedback, document as you go. Trust
            through transparency.
          </p>
          <p>
            The{' '}
            <Link
              href="/writing/building-ai-human-os-v2"
              className="border-b border-id8-orange text-id8-orange transition-opacity hover:opacity-70"
            >
              HYDRA article
            </Link>
            {' '}is a good example — a 4,000-word technical breakdown of the entire AI-Human OS,
            published for anyone to read and learn from. That&apos;s the standard: build something
            real, then show exactly how it works.
          </p>
          <p className="font-bold">
            If you&apos;re here, you&apos;re watching the lab in real time. Stick around. It keeps going.
          </p>
        </StickySection>

        {/* Signature */}
        <section className="mb-16 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--ink)]">Eddie Belaval</p>
          <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">Miami, 2026</p>
        </section>

        {/* Get in Touch */}
        <StickySection id="contact" title="Get in Touch">
          <div className="space-y-6 pt-8">
            <p className="text-[var(--muted)]">
              Questions? Feedback? Want to collaborate?
            </p>
            <p>
              Email me at{' '}
              <a
                href="mailto:eb@id8labs.tech"
                className="border-b border-id8-orange text-id8-orange transition-opacity hover:opacity-70"
              >
                eb@id8labs.tech
              </a>
            </p>
            <p>
              Want to follow the build?{' '}
              <Link
                href="/shipped"
                className="border-b border-id8-orange text-id8-orange transition-opacity hover:opacity-70"
              >
                Read Shipped
              </Link>
            </p>
            <div className="flex items-center gap-6 pt-4 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              <a
                href="https://twitter.com/eddiebe"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-id8-orange"
              >
                X / Twitter
              </a>
              <a
                href="https://github.com/eddiebelaval"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-id8-orange"
              >
                GitHub
              </a>
            </div>
          </div>
        </StickySection>
      </article>
      </Container>
    </div>
  )
}
