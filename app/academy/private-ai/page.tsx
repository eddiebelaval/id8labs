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
    title: "The Privacy Landscape",
    duration: "45 min",
    description: "What's actually at stake? Understand the real risks of cloud AI with sensitive information.",
    deliverable: "Personal risk assessment",
    href: "/academy/private-ai/module-1",
  },
  {
    number: "2",
    title: "Your Private AI Setup",
    duration: "60 min",
    description: "Run AI locally on your machine. No data ever leaves your computer. Step-by-step setup.",
    deliverable: "Local AI running on your machine",
    href: "/academy/private-ai/module-2",
  },
  {
    number: "3",
    title: "The Scrub & Use Method",
    duration: "45 min",
    description: "When you need cloud AI power, learn to de-identify first. Get the help without the exposure.",
    deliverable: "De-identification workflow",
    href: "/academy/private-ai/module-3",
  },
  {
    number: "4",
    title: "Boundaries That Work",
    duration: "45 min",
    description: "What's safe for cloud AI? What requires local only? Build your GREEN/YELLOW/RED system.",
    deliverable: "Classification system",
    href: "/academy/private-ai/module-4",
  },
  {
    number: "5",
    title: "Client Communication",
    duration: "45 min",
    description: "How to talk about AI use with clients. Disclosure that builds trust, not anxiety.",
    deliverable: "AI disclosure language",
    href: "/academy/private-ai/module-5",
  },
  {
    number: "6",
    title: "Your AI Policy",
    duration: "45 min",
    description: "Written rules you follow consistently. Professional standards that protect you and your clients.",
    deliverable: "Personal AI policy",
    href: "/academy/private-ai/module-6",
  },
  {
    number: "7",
    title: "When Things Go Wrong",
    duration: "45 min",
    description: "What if there's a breach? An exposure? A mistake? Have a plan before you need one.",
    deliverable: "Incident response plan",
    href: "/academy/private-ai/module-7",
  },
  {
    number: "8",
    title: "Staying Current",
    duration: "30 min",
    description: "AI changes fast. Privacy policies change. Build a sustainable way to stay informed.",
    deliverable: "AI update routine",
    href: "/academy/private-ai/module-8",
  },
]

const audiences = [
  { title: "Consultants", description: "With client confidentiality obligations" },
  { title: "Executive Coaches", description: "Handling sensitive personal information" },
  { title: "Therapists", description: "Who want administrative help within appropriate boundaries" },
  { title: "Lawyers", description: "With privilege and confidentiality concerns" },
  { title: "Financial Advisors", description: "With compliance requirements" },
  { title: "HR Professionals", description: "Handling employee data" },
]

const deliverables = [
  "Personal Risk Assessment — What's actually at stake for your situation",
  "Local AI Setup — AI running on your machine, data never leaving",
  "Scrub & Use Workflow — De-identify before using cloud AI",
  "GREEN/YELLOW/RED System — What's safe for which type of AI",
  "AI Disclosure Language — How to communicate with clients about AI use",
  "Personal AI Policy — Written rules you follow consistently",
  "Incident Response Plan — What to do if something goes wrong",
  "AI Update Routine — Stay current as things change",
]

export default function PrivateAIPage() {
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
              <Kicker>Course 7 of 7</Kicker>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">Free · id8Labs Academy</span>
            </div>

            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.5rem,7vw,4.5rem)]">
              Private AI for <em className="italic text-id8-orange">Sensitive Work</em>
            </h1>

            <Deck className="mt-6 max-w-2xl">
              How do I use AI when privacy and compliance matter?
            </Deck>

            <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              You don&apos;t have to choose between AI and trust. Learn to use AI productively while protecting the confidentiality that defines your professional integrity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <EditorialButton href="/academy/private-ai/module-1" variant="primary">
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
                { value: '~6.5', label: 'hours' },
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
              Your reputation is built on <em className="italic text-id8-orange">confidentiality</em>.
            </h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                You work with sensitive information. Client confidences. Personal struggles. Proprietary data. Information that people <strong className="text-[var(--ink)]">trusted you with</strong>.
              </p>
              <p>
                Meanwhile, AI is transforming how knowledge work gets done. Your competitors are getting faster. Your peers are raving about productivity gains.
              </p>
              <p>And you&apos;re stuck, because every AI tool seems to want your data.</p>
              <p className="text-[var(--ink)]">
                The question isn&apos;t &ldquo;Should I use AI?&rdquo; It&apos;s &ldquo;How do I use AI responsibly?&rdquo;
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Meet Jennifer */}
        <section className="py-16">
          <Container narrow>
            <Kicker>Your Guide</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)]">Meet Jennifer Chen</h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                Jennifer is an executive coach with a thriving practice. She works with C-suite leaders on career transitions, leadership development, and navigating organizational politics.
              </p>
              <p>
                Her clients share deeply personal information — fears, failures, family situations, health struggles. Information they would never want public. Information that could damage careers and relationships if exposed.
              </p>
              <p className="text-[var(--ink)]">
                Jennifer watches other coaches adopt AI and rave about productivity gains. She can&apos;t imagine pasting her session notes into ChatGPT. But doing everything manually while competitors speed up isn&apos;t sustainable either.
              </p>
              <p className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
                Her journey through this course mirrors yours.
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* The Core Promise */}
        <section className="py-16">
          <Container narrow>
            <div className="text-center">
              <Kicker className="justify-center" dot>The Core Promise</Kicker>
              <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-serif)] text-2xl italic leading-snug text-[var(--ink)]">
                &ldquo;How do I get the benefits of AI without betraying the trust others have placed in me?&rdquo;
              </p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Who This Is For */}
        <section className="py-16">
          <Container>
            <SectionHead title="If you handle information others trusted you with" meta="Who this is for" />
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
            <SectionHead title="Curriculum" meta="8 modules · ~6.5 hours" />
            <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              From understanding the risks to building a complete system that protects you and your clients.
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
              <EditorialButton href="/academy/private-ai/module-1" variant="primary">
                Start Module 1
              </EditorialButton>
            </div>
          </Container>
        </section>

        <Rule />

        {/* What You'll Build */}
        <section className="py-16">
          <Container>
            <SectionHead title="Protection systems, not just knowledge" meta="What you'll build" />
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
              <EditorialCard href="/academy/ai-for-leaders">
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  &larr; Previous Course
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  AI for Leaders
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  Make informed AI decisions for your organization.
                </p>
              </EditorialCard>
              <EditorialCard href="/academy/ai-at-scale">
                <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Next Course &rarr;
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  AI at Scale
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  Go from personal productivity to team-wide transformation.
                </p>
              </EditorialCard>
            </div>
          </Container>
        </section>
      </div>
    </FoundationGate>
  )
}
