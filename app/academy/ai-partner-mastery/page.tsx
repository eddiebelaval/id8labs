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
  Tag,
  EditorialButton,
  EditorialCard,
} from '@/components/editorial'

// Data
const modules = [
  {
    number: "1",
    title: "Your First Real Conversation",
    duration: "45 min",
    description: "The 4D Framework — a repeatable approach that turns every AI interaction from hit-or-miss to predictable.",
    deliverable: "Proposal draft",
    href: "/academy/ai-partner-mastery/module-1",
  },
  {
    number: "2",
    title: "The Art of Context",
    duration: "60 min",
    description: "Why AI doesn't know you yet — and how to fix that permanently with a personal context document.",
    deliverable: "Personal context document",
    href: "/academy/ai-partner-mastery/module-2",
  },
  {
    number: "3",
    title: "Thinking Out Loud",
    duration: "60 min",
    description: "Use AI as a thinking partner, not just a writing tool. Structure your reasoning through conversation.",
    deliverable: "Decision analysis",
    href: "/academy/ai-partner-mastery/module-3",
  },
  {
    number: "4",
    title: "Your Second Brain",
    duration: "60 min",
    description: "Turn scattered notes, highlights, and ideas into structured insights you can actually use.",
    deliverable: "Knowledge synthesis workflow",
    href: "/academy/ai-partner-mastery/module-4",
  },
  {
    number: "5",
    title: "The Editing Partner",
    duration: "45 min",
    description: "Get AI to improve your writing without stealing your voice. The revision dance that preserves you.",
    deliverable: "Voice-preserving editing prompt",
    href: "/academy/ai-partner-mastery/module-5",
  },
  {
    number: "6",
    title: "Research Mode",
    duration: "60 min",
    description: "Go from 'tell me about X' to deep, nuanced understanding. Research that actually teaches you.",
    deliverable: "Research brief",
    href: "/academy/ai-partner-mastery/module-6",
  },
  {
    number: "7",
    title: "The Strategy Session",
    duration: "60 min",
    description: "Think through real problems with an AI that challenges your assumptions and finds blind spots.",
    deliverable: "Strategy document",
    href: "/academy/ai-partner-mastery/module-7",
  },
  {
    number: "8",
    title: "Building Your System",
    duration: "60 min",
    description: "Combine everything into a personal AI workflow playbook you can rely on day after day.",
    deliverable: "Personal AI workflow playbook",
    href: "/academy/ai-partner-mastery/module-8",
  },
]

const audiences = [
  { title: "Writers", description: "Want a thought partner for drafts, edits, and ideas" },
  { title: "Consultants", description: "Need to synthesize information faster" },
  { title: "Marketers", description: "Create content, campaigns, and strategy" },
  { title: "Coaches", description: "Prepare materials and session notes" },
  { title: "Entrepreneurs", description: "Wear 10 hats and need leverage on all of them" },
  { title: "Educators", description: "Develop curriculum and learning materials" },
]

const deliverables = [
  "The 4D Framework — A repeatable approach for any AI task",
  "Personal Context Document — So AI knows you and your work",
  "Decision Analysis — Using AI to think through real choices",
  "Knowledge Synthesis Workflow — Turning scattered notes into insights",
  "Voice-Preserving Editing Prompt — AI that improves without stealing your voice",
  "Research Brief — Deep understanding of a topic, fast",
  "Strategy Document — AI-assisted thinking on real problems",
  "Your AI Workflow Playbook — A personal system you can rely on",
]

const framework = [
  { step: "Define", description: "What's the real task? Not 'write something' — the actual goal." },
  { step: "Describe", description: "What context does AI need to help?" },
  { step: "Direct", description: "What specifically should AI do?" },
  { step: "Develop", description: "How do we iterate together?" },
]

export default function AIPartnerMasteryPage() {
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
              <Kicker>Course 2 of 7</Kicker>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">Free · id8Labs Academy</span>
            </div>

            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.5rem,7vw,4.5rem)]">
              AI Partner <em className="italic text-id8-orange">Mastery</em>
            </h1>

            <Deck className="mt-6 max-w-2xl">
              How do I work WITH AI, not just use it?
            </Deck>

            <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              Stop getting inconsistent results. Build a repeatable system with the 4D Framework — the foundation everything else builds on.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <EditorialButton href="/academy/ai-partner-mastery/module-1" variant="primary">
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
              You&apos;ve tried AI. It&apos;s <em className="italic text-id8-orange">inconsistent</em>.
            </h2>
            <div className="mt-6 space-y-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              <p>
                Sometimes magic, sometimes garbage. You don&apos;t have a <strong className="text-[var(--ink)]">system</strong>. Every conversation starts from scratch.
              </p>
              <p>
                You&apos;re not really sure what you&apos;re doing differently on the good days vs. the bad days.
              </p>
              <p className="text-[var(--ink)]">This course changes that.</p>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Who This Is For */}
        <section className="py-16">
          <Container>
            <SectionHead title="If you think for a living" meta="Who this is for" />
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

        {/* The 4D Framework */}
        <section className="py-16">
          <Container>
            <SectionHead title={<>The <em className="italic text-id8-orange">4D</em> Framework</>} meta="The core framework" />
            <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              A repeatable approach for any AI task. Learn it in Module 1, apply it everywhere else.
            </p>
            <div className="mt-10 grid gap-px bg-[var(--hair)] md:grid-cols-2 lg:grid-cols-4">
              {framework.map((item, index) => (
                <div key={index} className="bg-[var(--paper)] p-6">
                  <span className="font-[family-name:var(--font-display)] text-4xl text-id8-orange">
                    {item.step.charAt(0)}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                    {item.step}
                  </h3>
                  <p className="mt-1.5 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                    {item.description}
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
              Each module builds on the last. By the end, you&apos;ll have a personal AI workflow playbook you can rely on.
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
              <EditorialButton href="/academy/ai-partner-mastery/module-1" variant="primary">
                Start Module 1
              </EditorialButton>
            </div>
          </Container>
        </section>

        <Rule />

        {/* What You'll Build */}
        <section className="py-16">
          <Container>
            <SectionHead title="Real deliverables, not just knowledge" meta="What you'll build" />
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

        {/* Next Course */}
        <section className="py-12">
          <Container>
            <EditorialCard href="/academy/ai-for-leaders" className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <Tag>Up next</Tag>
                <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">
                  AI for Leaders
                </h3>
                <p className="mt-1 font-[family-name:var(--font-sans)] text-[var(--body)]">
                  Make informed AI decisions for your team or organization.
                </p>
              </div>
              <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange whitespace-nowrap">
                Preview Course &rarr;
              </span>
            </EditorialCard>
          </Container>
        </section>
      </div>
    </FoundationGate>
  )
}
