'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FoundationGate } from '@/components/progress'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  SectionHead,
  EditorialButton,
  IssueCard,
} from '@/components/editorial'

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6"/>
  </svg>
)

// Data
const misconceptions = [
  { wrong: "It's for developers", right: "It's for anyone with files and information to process" },
  { wrong: "You need to write code", right: "You describe what you want in plain English" },
  { wrong: "It's just a better chatbot", right: "It's an agent that can actually DO the work" },
]

const modules = [
  {
    number: "0",
    title: "The Mental Model Shift",
    duration: "30 min",
    description: "Installation + your first delegation (Downloads cleanup). The mindset shift from chatbot to agent.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-0",
  },
  {
    number: "1",
    title: "Your First Delegation",
    duration: "45 min",
    description: "10 Quick Wins to build confidence. Low-risk, high-value delegations you can undo in 30 seconds.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-1",
  },
  {
    number: "2",
    title: "Working With Your Files",
    duration: "60 min",
    description: "Document processing, invoice organization, semantic search. Find anything by meaning.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-2",
  },
  {
    number: "3",
    title: "Writing With Claude",
    duration: "60 min",
    description: "Voice notes → drafts, editing workflows, finding and preserving your voice.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-3",
  },
  {
    number: "4",
    title: "Research & Analysis",
    duration: "60 min",
    description: "Web research, competitive analysis, synthesizing sources into actionable insights.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-4",
  },
  {
    number: "5",
    title: "Building Workflows",
    duration: "60 min",
    description: "Recurring tasks, reusable prompts, automation. Your personal operating system.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-5",
  },
  {
    number: "6",
    title: "Custom Commands",
    duration: "45 min",
    description: "Save your best prompts as reusable commands. Type one word, get consistent results every time.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-6",
    isNew: true,
  },
  {
    number: "7",
    title: "Connecting Your Tools",
    duration: "50 min",
    description: "Let Claude read your Notion, browse the web, access files. Claude becomes part of your workflow.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-7",
    isNew: true,
  },
  {
    number: "8",
    title: "Managing Long Sessions",
    duration: "40 min",
    description: "Keep Claude sharp during complex projects. Reset, rewind, and recover from messy contexts.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-8",
    isNew: true,
  },
  {
    number: "9",
    title: "Project Memory",
    duration: "45 min",
    description: "Make Claude remember your projects across sessions. Persistent context that survives restarts.",
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-9",
    isNew: true,
  },
]

const audiences = [
  {
    title: "Writers",
    description: "Voice memos to organized outlines to polished drafts. Research synthesis. Multi-platform content repurposing.",
  },
  {
    title: "Researchers",
    description: "Competitive analysis. Interview transcript synthesis. Pattern recognition across hundreds of documents.",
  },
  {
    title: "Operators",
    description: "File organization. Invoice processing. Recurring workflows. The operational grunt work that eats your day.",
  },
  {
    title: "Producers",
    description: "Complex projects with lots of moving pieces, documents, and logistics. From chaos to structure.",
  },
]

const notFor = [
  "Developers (you have plenty of resources)",
  "Complete beginners who've never used AI",
  "People who want to build software",
]

const faqs = [
  {
    question: "Do I need programming experience?",
    answer: "No. This course is specifically designed for non-developers. You'll describe what you want in plain English, and Claude will do the technical work. If you can write an email, you can use Claude Code."
  },
  {
    question: "What if I get stuck?",
    answer: "Email support@id8labs.io and we'll help you troubleshoot. Most students find the step-by-step video walkthroughs answer 95% of questions."
  },
  {
    question: "Why is this course free?",
    answer: "Education shouldn't be gated. We believe the best way to help people adopt AI is to remove barriers. All ID8Labs Academy courses are free — no paywalls, no upsells."
  },
  {
    question: "What's the difference from Claude's official tutorials?",
    answer: "Anthropic's tutorials are great—but they're written for developers. This course assumes zero coding background and focuses on real-world knowledge work: file processing, writing workflows, research synthesis, and recurring tasks. We speak your language, not code."
  }
]

export default function ClaudeForKnowledgeWorkersPage() {
  return (
    <FoundationGate>
      <div className="min-h-screen bg-[var(--paper)]">
        {/* Hero */}
        <section className="pt-20 pb-12">
          <Container>
            <Kicker dot>10-Module Course · ~7 Hours</Kicker>

            <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.5rem,6.5vw,4.5rem)]">
              Claude Code for <em className="italic text-id8-orange">Knowledge Workers</em>
            </h1>

            <Deck className="mt-7 max-w-2xl">From Chatbot to Operating System</Deck>

            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              Stop asking questions. Start delegating tasks. A structured course for writers, researchers, and operators who want to use Claude Code without writing code.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <EditorialButton href="/courses/claude-for-knowledge-workers/module-0" variant="primary">
                Start Course &rarr;
              </EditorialButton>
              <EditorialButton href="#curriculum" variant="secondary">
                View Curriculum
              </EditorialButton>
            </div>

            <p className="mt-4 font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">
              <span className="text-[var(--teal)] font-medium">100% Free</span> — All 10 modules. No credit card required.
            </p>

            <MetaRow
              className="mt-8"
              items={[
                { value: '10', label: 'modules' },
                { value: '~7', label: 'hours' },
                { value: '0', label: 'code required' },
              ]}
            />

            <div className="mt-8 pt-6 border-t border-[var(--hair)]">
              <p className="text-sm text-[var(--body)]">
                New to AI conversations?{' '}
                <Link
                  href="/courses/ai-conversation-fundamentals"
                  className="inline-flex items-center gap-2 text-[var(--ink)] border-b border-[var(--hair)] hover:border-id8-orange transition-colors"
                >
                  <span className="font-[family-name:var(--font-narrow)] text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--teal)]">Free</span>
                  Start with AI Fundamentals &rarr;
                </Link>
              </p>
            </div>

            <Rule className="mt-10" />
          </Container>
        </section>

        {/* Split Tab Feature Callout */}
        <section className="py-6 border-b border-[var(--hair)] bg-[var(--paper-shadow)]">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <p className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                  Pro Tip: Use Split Tab for Side-by-Side Learning
                </p>
                <p className="text-sm text-[var(--body)]">
                  Open Claude Code in one tab, this course in another. New Split Tab feature lets you work alongside the lessons in real-time.
                </p>
              </div>
              <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange whitespace-nowrap">
                New Feature
              </span>
            </div>
          </Container>
        </section>

        {/* The Problem Section */}
        <section className="py-16 border-t border-[var(--rule)]">
          <Container>
            <SectionHead
              title={<>&quot;Claude Code&quot; scares away the people <em className="italic text-id8-orange">who need it most</em></>}
              meta="The Naming Problem"
              className="mb-8"
            />
            <p className="mt-6 mb-8 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              Most people hear &quot;Code&quot; and assume it&apos;s for developers. They&apos;re wrong. Here&apos;s what Claude Code actually is — and isn&apos;t:
            </p>

            <div className="max-w-3xl space-y-px bg-[var(--hair)] border border-[var(--hair)]">
              {misconceptions.map((item, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-px bg-[var(--hair)]">
                  <div className="flex items-center gap-3 px-5 py-4 bg-[var(--paper)]">
                    <span className="text-[var(--muted)] flex-shrink-0">&times;</span>
                    <span className="text-[var(--muted)] line-through">{item.wrong}</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-4 bg-[var(--paper-shadow)] border-l-2 border-id8-orange">
                    <span className="text-id8-orange flex-shrink-0">&rarr;</span>
                    <span className="text-[var(--ink)]">{item.right}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mt-10">
              <p className="text-xl text-[var(--ink)]">
                The shift is from <span className="text-[var(--muted)]">assistance</span> to{' '}
                <span className="text-id8-orange">delegation</span>.
              </p>
              <p className="mt-4 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
                &quot;Help me write interview questions&quot; → &quot;Here are the cast files. Generate interview questions for each person based on their background. Save them to the prep folder.&quot;
              </p>
            </div>
          </Container>
        </section>

        {/* Who This Is For */}
        <section className="py-16 border-t border-[var(--rule)]">
          <Container>
            <SectionHead title="Not another developer tutorial" meta="Who This Is For" className="mb-8" />
            <p className="mt-6 mb-10 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              This course is specifically designed for knowledge workers who process information daily.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--hair)] border border-[var(--hair)] mb-12">
              {audiences.map((audience, index) => (
                <div key={index} className="bg-[var(--paper)] p-6">
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">{audience.title}</h3>
                  <p className="text-sm text-[var(--body)] leading-[1.6]">{audience.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-2xl">
              <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] mb-4">
                Not for
              </p>
              <div className="flex flex-wrap gap-3">
                {notFor.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[var(--paper-mid)] font-[family-name:var(--font-narrow)] text-xs uppercase tracking-[0.12em] text-[var(--muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Curriculum */}
        <section className="py-16 border-t border-[var(--rule)]" id="curriculum">
          <Container>
            <SectionHead
              title={<>10 modules. ~7 hours. <em className="italic text-id8-orange">Zero code required.</em></>}
              meta="Curriculum"
              className="mb-4"
            />
            <p className="mt-6 mb-2 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              Each module builds on the last. By the end, you&apos;ll have a personal operating system that handles the work you used to do manually.
            </p>

            <div className="mt-6">
              {modules.map((module) => (
                <IssueCard
                  key={module.number}
                  number={module.number}
                  title={
                    <span className="inline-flex items-center gap-3 flex-wrap">
                      {module.title}
                      {(module as typeof module & { isNew?: boolean }).isNew && (
                        <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">New</span>
                      )}
                    </span>
                  }
                  deck={module.description}
                  date={module.duration}
                  href={module.href}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Instructor */}
        <section className="py-16 border-t border-[var(--rule)]">
          <Container>
            <SectionHead title="Built by someone who uses this daily" meta="Your Instructor" className="mb-8" />
            <div className="max-w-3xl border border-[var(--hair)] p-7">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-lg text-[var(--ink)]">
                  EB
                </div>
                <div>
                  <h3 className="mb-2 font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">Eddie Belaval</h3>
                  <p className="mb-4 text-[var(--body)] leading-[1.7]">
                    I run two businesses — one produces reality television (90 Day Fiancé, Teen Mom), the other builds AI tools for developers. Neither requires me to write code daily. But Claude Code has become the most important tool in both.
                  </p>
                  <p className="text-[var(--body)] leading-[1.7]">
                    I use Claude Code to generate interview questions, grind through logistics, run web searches with Perplexity and Firecrawl, manage my LLC with AI agents, and build media pipelines. What took days now takes hours.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[var(--hair)]">
                    <Link
                      href="/writing/claude-code-isnt-for-coders"
                      className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-id8-orange hover:underline"
                    >
                      Read the full story &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[var(--rule)]">
          <Container narrow>
            <div className="text-center">
              <Kicker dot className="justify-center">100% Free</Kicker>
              <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
                Stop asking. <em className="italic text-id8-orange">Start delegating.</em>
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
                All 10 modules. ~7 hours of content. No credit card required.
              </p>
              <div className="mt-8 flex justify-center">
                <EditorialButton href="/courses/claude-for-knowledge-workers/module-0" variant="primary">
                  Start Course &rarr;
                </EditorialButton>
              </div>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Begin with Module 0: The Mental Model Shift
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t border-[var(--rule)]">
          <Container>
            <SectionHead title="Common questions" meta="FAQ" className="mb-8" />
            <div className="max-w-3xl border-t border-[var(--hair)]">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </Container>
        </section>
      </div>
    </FoundationGate>
  )
}

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-[var(--hair)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-id8-orange"
      >
        <span className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] pr-4">{question}</span>
        <span className="text-id8-orange flex-shrink-0">
          <ChevronDownIcon open={isOpen} />
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 text-[var(--body)] leading-[1.7]">{answer}</div>
      )}
    </div>
  )
}
