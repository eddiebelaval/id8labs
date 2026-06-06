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
    title: "What AI Actually Does",
    duration: "45 min",
    description: "Cut through the hype. Understand what AI can and can't do — in terms a leader can use.",
    deliverable: "AI Capability Assessment",
    href: "/academy/ai-for-leaders/module-1",
  },
  {
    number: "2",
    title: "Finding the Opportunities",
    duration: "60 min",
    description: "Map where AI creates value in your specific context. Not generic advice — your situation.",
    deliverable: "Opportunity Map",
    href: "/academy/ai-for-leaders/module-2",
  },
  {
    number: "3",
    title: "The Build/Buy/Partner Decision",
    duration: "60 min",
    description: "When to build in-house, buy off-the-shelf, or partner with specialists. A framework that actually helps.",
    deliverable: "Decision framework",
    href: "/academy/ai-for-leaders/module-3",
  },
  {
    number: "4",
    title: "Assembling Your Team",
    duration: "45 min",
    description: "What roles and skills you need at each stage. Avoid the expensive mistakes.",
    deliverable: "Team structure plan",
    href: "/academy/ai-for-leaders/module-4",
  },
  {
    number: "5",
    title: "Evaluating AI Vendors",
    duration: "60 min",
    description: "There are 500+ AI tools. Here's how to choose without getting burned.",
    deliverable: "Vendor evaluation scorecard",
    href: "/academy/ai-for-leaders/module-5",
  },
  {
    number: "6",
    title: "Managing AI Risk",
    duration: "60 min",
    description: "What could go wrong? Privacy, bias, hallucination, dependency. How to manage each.",
    deliverable: "Risk register",
    href: "/academy/ai-for-leaders/module-6",
  },
  {
    number: "7",
    title: "Measuring AI ROI",
    duration: "45 min",
    description: "How do you know if AI is working? Metrics that actually matter for your business.",
    deliverable: "ROI framework",
    href: "/academy/ai-for-leaders/module-7",
  },
  {
    number: "8",
    title: "Leading the Change",
    duration: "60 min",
    description: "Your team is skeptical, scared, or over-hyped. How to bring everyone along.",
    deliverable: "Change management playbook",
    href: "/academy/ai-for-leaders/module-8",
  },
]

const audiences = [
  { title: "Founders", description: "Making build/buy/partner decisions for startups" },
  { title: "Executives", description: "Setting AI strategy for organizations" },
  { title: "Managers", description: "Evaluating how AI fits into team workflows" },
  { title: "Board Members", description: "Need to ask the right questions" },
  { title: "Consultants", description: "Advising clients on AI adoption" },
  { title: "Directors", description: "Leading digital transformation initiatives" },
]

const deliverables = [
  "AI Capability Assessment — What AI can actually do for your org",
  "Opportunity Map — Where AI creates value in your context",
  "Build/Buy/Partner Framework — How to evaluate your options",
  "Team Structure Plan — What roles and skills you need",
  "Vendor Evaluation Scorecard — Choose among 500+ AI tools",
  "Risk Register — What could go wrong and how to manage it",
  "ROI Framework — How to measure if AI is working",
  "Change Management Playbook — How to bring your team along",
]

export default function AIForLeadersPage() {
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
              <Kicker>Course 5 of 7</Kicker>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">Free · id8Labs Academy</span>
            </div>

            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.5rem,7vw,4.5rem)]">
              AI for <em className="italic text-id8-orange">Leaders</em>
            </h1>

            <Deck className="mt-6 max-w-2xl">
              How do I make AI decisions for my team or organization?
            </Deck>

            <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              You don&apos;t need to become a technologist. You need to become a better questioner. Get the frameworks to evaluate, decide, and lead.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <EditorialButton href="/academy/ai-for-leaders/module-1" variant="primary">
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
                { value: '~8', label: 'hours' },
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
              Everyone&apos;s talking about AI. <em className="italic text-id8-orange">Nobody&apos;s making sense.</em>
            </h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                Vendors promise transformation. Your team is experimenting without strategy. Your competitors claim they&apos;re &ldquo;AI-first&rdquo; (whatever that means).
              </p>
              <p>
                And you&apos;re supposed to make decisions about <strong className="text-[var(--ink)]">budgets, hires, and direction</strong> — without a technical background.
              </p>
              <p className="text-[var(--ink)]">This course gives you the frameworks to decide with confidence.</p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Meet Marcus */}
        <section className="py-16">
          <Container narrow>
            <Kicker>Your Guide</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)]">Meet Marcus Williams</h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                Marcus is a partner at a 50-person management consulting firm. He&apos;s built a successful practice over 15 years, but he&apos;s watching the landscape shift.
              </p>
              <p>
                His competitors are talking about &ldquo;AI-powered insights.&rdquo; His analysts spend 40% of their time on research and report writing. His clients are asking if his firm uses AI.
              </p>
              <p className="text-[var(--ink)]">
                Marcus isn&apos;t technical. He&apos;s never written code. But he&apos;s a sharp strategic thinker who&apos;s built and led teams. He needs frameworks, not tutorials.
              </p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
                His journey through this course mirrors yours.
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Who This Is For */}
        <section className="py-16">
          <Container>
            <SectionHead title="If you make AI decisions without implementing them" meta="Who this is for" />
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
          </Container>
        </section>

        <Rule />

        {/* Curriculum */}
        <section className="py-16" id="curriculum">
          <Container>
            <SectionHead title="Curriculum" meta="8 modules · ~8 hours" />
            <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              Every module answers a version of the same question: &ldquo;What should I do about AI — and how do I know if it&apos;s working?&rdquo;
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
              <EditorialButton href="/academy/ai-for-leaders/module-1" variant="primary">
                Start Module 1
              </EditorialButton>
            </div>
          </Container>
        </section>

        <Rule />

        {/* What You'll Build */}
        <section className="py-16">
          <Container>
            <SectionHead title="Decision tools, not theory" meta="What you'll build" />
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

        {/* Service CTA */}
        <section className="py-16">
          <Container narrow>
            <div className="text-center">
              <Kicker className="justify-center" dot>Want strategic support?</Kicker>
              <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-tight text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
                Implement with expert guidance
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                This course teaches the frameworks. Our Sprint gives you 4 weeks of hands-on implementation with an AI strategist who&apos;s done this before.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <EditorialButton href="/services" variant="primary">Explore Services</EditorialButton>
                <EditorialButton href="/academy" variant="secondary">Browse All Courses</EditorialButton>
              </div>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Course Navigation */}
        <section className="py-12">
          <Container>
            <div className="grid gap-4 md:grid-cols-2">
              <EditorialCard href="/academy/ai-partner-mastery">
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  &larr; Previous Course
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  AI Partner Mastery
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  Learn to work WITH AI, not just use it.
                </p>
              </EditorialCard>
              <EditorialCard href="/academy/private-ai">
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Next Course &rarr;
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  Private AI for Sensitive Work
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  Use AI when privacy and compliance matter.
                </p>
              </EditorialCard>
            </div>
          </Container>
        </section>
      </div>
    </FoundationGate>
  )
}
