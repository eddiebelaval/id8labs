'use client'

import Link from 'next/link'
import { FoundationGate } from '@/components/progress'
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

// Data
const modules = [
  {
    number: "1",
    title: "From You to Your Team",
    duration: "45 min",
    description: "Why what works for one person doesn't automatically work for ten. Diagnosing resistance and designing adoption.",
    deliverable: "Team AI adoption plan",
    href: "/academy/ai-at-scale/module-1",
  },
  {
    number: "2",
    title: "The Cost Reality",
    duration: "45 min",
    description: "What AI actually costs at scale. Tokens, seats, compute — build a realistic budget before you commit.",
    deliverable: "AI budget model",
    href: "/academy/ai-at-scale/module-2",
  },
  {
    number: "3",
    title: "Quality at Scale",
    duration: "45 min",
    description: "You can't review everything when ten people are using AI. Build systems that ensure consistency.",
    deliverable: "Quality framework",
    href: "/academy/ai-at-scale/module-3",
  },
  {
    number: "4",
    title: "Teaching Others",
    duration: "45 min",
    description: "How to train people who aren't as excited about AI as you are. Meet them where they are.",
    deliverable: "Training curriculum",
    href: "/academy/ai-at-scale/module-4",
  },
  {
    number: "5",
    title: "Building AI Services",
    duration: "45 min",
    description: "Offer AI-enhanced services to clients. Package your expertise with AI amplification.",
    deliverable: "Service design document",
    href: "/academy/ai-at-scale/module-5",
  },
  {
    number: "6",
    title: "Managing AI Workflows",
    duration: "45 min",
    description: "Track and improve AI use across multiple people. Version control for prompts and processes.",
    deliverable: "Workflow documentation system",
    href: "/academy/ai-at-scale/module-6",
  },
  {
    number: "7",
    title: "When AI Fails",
    duration: "45 min",
    description: "Errors happen at scale. Build escalation paths and recovery procedures before you need them.",
    deliverable: "Error handling plan",
    href: "/academy/ai-at-scale/module-7",
  },
  {
    number: "8",
    title: "Evolving Your System",
    duration: "30 min",
    description: "AI changes fast. Keep your systems current without constant rewrites.",
    deliverable: "Evolution process",
    href: "/academy/ai-at-scale/module-8",
  },
]

const audiences = [
  { title: "Team Leads", description: "Rolling out AI to their teams" },
  { title: "Entrepreneurs", description: "Building AI into products and services" },
  { title: "Consultants", description: "Offering AI-augmented services to clients" },
  { title: "Educators", description: "Teaching others to use AI effectively" },
  { title: "Managers", description: "Responsible for AI adoption in their org" },
  { title: "Content Creators", description: "Building AI-enhanced offerings" },
]

const deliverables = [
  "Team Adoption Plan — How to bring your team along without resistance",
  "AI Budget Model — What AI actually costs at scale",
  "Quality Framework — Ensure consistency when you're not checking everything",
  "Training Curriculum — Teach people who aren't naturally excited",
  "Service Design Document — Offer AI-enhanced services to clients",
  "Workflow Documentation System — Track and improve AI use across people",
  "Error Handling Plan — What to do when AI fails at scale",
  "Evolution Process — Keep your systems current as AI changes",
]

export default function AIAtScalePage() {
  return (
    <FoundationGate>
      <div className="min-h-screen bg-[var(--paper)]">
        {/* Hero */}
        <section className="pt-16 pb-12">
          <Container>
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-id8-orange"
            >
              &larr; Back to Academy
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Kicker>Course 6 of 7</Kicker>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">Free · id8Labs Academy</span>
            </div>

            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.5rem,7vw,4.5rem)]">
              AI at <em className="italic text-id8-orange">Scale</em>
            </h1>

            <Deck className="mt-6 max-w-2xl">
              How do I go from &ldquo;this works for me&rdquo; to &ldquo;this works for everyone&rdquo;?
            </Deck>

            <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              You&apos;ve cracked the code for yourself. Now everyone wants what you have. Learn to multiply your AI success through teams, clients, and organizations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <EditorialButton href="/academy/ai-at-scale/module-1" variant="primary">
                Start Module 1
              </EditorialButton>
              <EditorialButton href="#curriculum" variant="ghost">
                View Curriculum
              </EditorialButton>
            </div>

            <MetaRow
              className="mt-10"
              items={[
                { value: '8', label: 'modules' },
                { value: '~6', label: 'hours' },
                { label: 'Completely free' },
              ]}
            />
          </Container>
        </section>

        <Rule />

        {/* The Problem */}
        <section className="py-16">
          <Container narrow>
            <Kicker>The Problem</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-tight text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
              What works for one doesn&apos;t <em className="italic text-id8-orange">work for ten</em>.
            </h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                You&apos;ve 3x&apos;d your output with AI. You&apos;re faster, more consistent, and getting better results than ever.
              </p>
              <p>
                Now everyone wants what you have. Your team is watching. Your clients are asking. Your boss wants the whole department to &ldquo;use AI.&rdquo;
              </p>
              <p>
                But when you tried to teach others, they struggled in ways you didn&apos;t expect. When you tried to scale your workflows, things broke. When you tried to measure ROI, you realized you had no idea how.
              </p>
              <p className="text-[var(--ink)]">
                Going from &ldquo;this works for me&rdquo; to &ldquo;this works for everyone&rdquo; is a different skill entirely. This course teaches you that skill.
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Meet David */}
        <section className="py-16">
          <Container narrow>
            <Kicker>Your Guide</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)]">Meet David Chen</h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                David is a content marketing director at a growing agency. He&apos;s been using AI personally for a year and has 3x&apos;d his output. Now his agency has 15 people, and leadership wants him to &ldquo;scale&rdquo; his AI success across the team.
              </p>
              <p>
                But David&apos;s team is mixed. Some are excited about AI. Some are skeptical. Some think it&apos;s cheating. Some are afraid for their jobs. And a few just don&apos;t see the point.
              </p>
              <p className="text-[var(--ink)]">
                David tried sharing his prompts, but people used them wrong. He tried running a training session, but it didn&apos;t stick. He tried mandating AI use, but that backfired.
              </p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
                He realized: personal AI success and scalable AI success require different skills. His journey through this course mirrors yours.
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* The Core Question */}
        <section className="py-16">
          <Container narrow>
            <div className="text-center">
              <Kicker className="justify-center" dot>The Core Question</Kicker>
              <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-serif)] text-2xl italic leading-snug text-[var(--ink)]">
                &ldquo;How do I take what works for me and make it work for everyone?&rdquo;
              </p>
              <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                This isn&apos;t about forcing AI on people. It&apos;s about creating systems that let others succeed with AI the way you have.
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Who This Is For */}
        <section className="py-16">
          <Container>
            <SectionHead title="If you want to multiply your AI success" meta="Who this is for" />
            <div className="mt-10 grid gap-px bg-[var(--hair)] md:grid-cols-2 lg:grid-cols-3">
              {audiences.map((audience, index) => (
                <div key={index} className="bg-[var(--paper)] p-6">
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                    {audience.title}
                  </h3>
                  <p className="mt-1.5 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                    {audience.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-5">
              <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                <strong className="text-[var(--ink)]">Prerequisite:</strong> This course assumes you&apos;ve completed Course 1 (AI Partner Mastery) or have equivalent personal AI experience. If you&apos;re still figuring out personal AI use,{' '}
                <Link href="/academy/ai-partner-mastery" className="border-b border-[var(--hair)] text-[var(--ink)] transition-colors hover:border-id8-orange">start there</Link>.
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Curriculum */}
        <section className="py-16" id="curriculum">
          <Container>
            <SectionHead title="Curriculum" meta="8 modules · ~6 hours" />
            <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              From diagnosing resistance to building systems that scale. Everything you need to multiply your AI success.
            </p>

            <div className="mt-8">
              {modules.map((module) => (
                <Link
                  key={module.number}
                  href={module.href}
                  className="group grid grid-cols-[44px_1fr_auto] items-start gap-5 border-b border-[var(--hair)] py-6 transition-colors hover:bg-[var(--paper-shadow)]"
                >
                  <span className="font-[family-name:var(--font-display)] text-3xl leading-none text-[var(--ink)]">
                    {module.number}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] transition-colors group-hover:text-id8-orange">
                      {module.title}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                      {module.description}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-id8-orange">
                      You&apos;ll build: {module.deliverable}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] whitespace-nowrap">
                    {module.duration}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <EditorialButton href="/academy/ai-at-scale/module-1" variant="primary">
                Start Module 1
              </EditorialButton>
            </div>
          </Container>
        </section>

        <Rule />

        {/* What You'll Build */}
        <section className="py-16">
          <Container>
            <SectionHead title="Scalable systems, not just skills" meta="What you'll build" />
            <ul className="mt-10 grid gap-px bg-[var(--hair)] md:grid-cols-2">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-[var(--paper)] p-5 font-[family-name:var(--font-sans)] text-[var(--body)]">
                  <span className="text-id8-orange">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <Rule />

        {/* Course Navigation */}
        <section className="py-12">
          <Container>
            <div className="grid gap-4 md:grid-cols-2">
              <EditorialCard href="/academy/private-ai">
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  &larr; Previous Course
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  Private AI for Sensitive Work
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  Use AI when privacy and compliance matter.
                </p>
              </EditorialCard>
              <EditorialCard href="/academy">
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Completed the Academy?
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  Explore All Courses
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  Browse the full id8Labs Academy curriculum.
                </p>
              </EditorialCard>
            </div>
          </Container>
        </section>
      </div>
    </FoundationGate>
  )
}
