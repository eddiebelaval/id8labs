'use client'

import EmailCapture from '@/components/EmailCapture'
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

// Data
const learningPoints = [
  "Why AI output is diagnostic feedback (and how to read it)",
  "The 5 levers that control output quality",
  "When to refine vs. redirect vs. restart",
  "Why more context often makes things worse",
  "Real examples across writing, analysis, research, and creative tasks"
]

const modules = [
  {
    number: "1",
    title: "The Mental Model Shift",
    duration: "~10 min",
    description: "Stop treating AI like a search engine. Start treating it like a conversation with diagnostic feedback.",
    href: "/courses/ai-conversation-fundamentals/module-1",
  },
  {
    number: "2",
    title: "The Core Toolkit",
    duration: "~15 min",
    description: "The 5 levers that control output quality: specificity, context, constraints, format, and iteration.",
    href: "/courses/ai-conversation-fundamentals/module-2",
  },
  {
    number: "3",
    title: "The Iteration Loop",
    duration: "~10 min",
    description: "How to read AI output as feedback. When to refine, when to redirect, when to restart.",
    href: "/courses/ai-conversation-fundamentals/module-3",
  },
  {
    number: "4",
    title: "The Attention Budget",
    duration: "~10 min",
    description: "Why more context often makes things worse. How to feed information strategically.",
    href: "/courses/ai-conversation-fundamentals/module-4",
  },
  {
    number: "5",
    title: "Putting It Together",
    duration: "~10 min",
    description: "Real examples: writing, analysis, research, creative work. See the patterns in action.",
    href: "/courses/ai-conversation-fundamentals/module-5",
  },
  {
    number: "6",
    title: "What's Next",
    duration: "~3 min",
    description: "Where to go from here. Resources, advanced techniques, and next steps.",
    href: "/courses/ai-conversation-fundamentals/module-6",
  },
]

export default function AIConversationFundamentalsPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-20 pb-12">
        <Container>
          <Kicker dot>Free Course · ~45 min</Kicker>

          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.5rem,6.5vw,4.5rem)]">
            AI Conversation <em className="italic text-id8-orange">Fundamentals</em>
          </h1>

          <Deck className="mt-7 max-w-2xl">
            The mental models that separate frustrated users from people who get results every time.
          </Deck>

          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            You&apos;ve used ChatGPT. You&apos;ve tried Claude. Sometimes it&apos;s magic. Sometimes it&apos;s useless. The difference isn&apos;t luck. It&apos;s understanding how to think about the conversation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <EditorialButton href="/courses/ai-conversation-fundamentals/module-1" variant="primary">
              Start the Course &rarr;
            </EditorialButton>
          </div>

          <MetaRow
            className="mt-10"
            items={[
              { value: '6', label: 'modules' },
              { value: '45', label: 'minutes' },
              { value: 'Free', label: 'no signup' },
            ]}
          />

          <Rule className="mt-10" />
        </Container>
      </section>

      {/* What you'll learn */}
      <section className="pb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] mb-6">
              What you&apos;ll learn
            </p>
            <ul className="space-y-3">
              {learningPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-[var(--body)]">
                  <span className="text-id8-orange flex-shrink-0 font-[family-name:var(--font-mono)] text-sm pt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Course Preview */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            title={<>6 modules. 45 minutes. <em className="italic text-id8-orange">Zero fluff.</em></>}
            meta="Course Preview"
            className="mb-4"
          />
          <p className="mt-6 mb-2 max-w-2xl text-[1.0625rem] leading-[1.7] text-[var(--body)]">
            Each module builds a mental model that changes how you approach AI conversations. By the end, you&apos;ll know exactly what to do when you&apos;re not getting the results you want.
          </p>

          <div className="mt-6">
            {modules.map((module) => (
              <IssueCard
                key={module.number}
                number={module.number}
                title={module.title}
                deck={module.description}
                date={module.duration}
                href={module.href}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Email Capture */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container narrow>
          <EmailCapture
            source="ai-conversation-fundamentals-landing"
            title="Get notified when we release new courses"
          />
        </Container>
      </section>

      {/* Instructor */}
      <section className="py-16 border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            title="Built by someone who teaches this daily"
            meta="Your Instructor"
            className="mb-8"
          />
          <div className="max-w-3xl border border-[var(--hair)] p-7">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-lg text-[var(--ink)]">
                EB
              </div>
              <div>
                <h3 className="mb-2 font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">
                  Eddie Belaval
                </h3>
                <p className="mb-4 text-[var(--body)] leading-[1.7]">
                  I&apos;ve spent hundreds of hours teaching people how to use AI tools effectively. The patterns are the same whether you&apos;re writing marketing copy, analyzing research, or processing files.
                </p>
                <p className="text-[var(--body)] leading-[1.7]">
                  This course distills those patterns into 45 minutes. It&apos;s the mental framework I wish I had when I started.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-[var(--rule)]">
        <Container narrow>
          <div className="text-center">
            <Kicker dot className="justify-center">Ready when you are</Kicker>
            <h2 className="mt-6 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2rem,4.5vw,3rem)]">
              Ready to understand <em className="italic text-id8-orange">how this actually works?</em>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[var(--body)]">
              45 minutes to change how you think about AI conversations. Forever.
            </p>
            <div className="mt-8 flex justify-center">
              <EditorialButton href="/courses/ai-conversation-fundamentals/module-1" variant="primary">
                Start Module 1 &rarr;
              </EditorialButton>
            </div>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              Completely free. No signup required.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
