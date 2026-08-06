'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LearningRoadmap, AcademyProgressBar, ResumeButton } from '@/components/progress'
import { createClient } from '@/lib/supabase/client'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  Hairline,
  SectionHead,
  MetaRow,
  Tag,
  EditorialButton,
  EditorialCard,
} from '@/components/editorial'

// Full course catalog with all details
const coursesCatalog = [
  {
    id: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    subtitle: 'Foundation Course',
    description: 'Start here. Learn how to think about AI conversations before touching any tools. The mental models that make every AI interaction more effective.',
    modules: 6,
    duration: '45 min',
    href: '/courses/ai-conversation-fundamentals',
    isFoundation: true,
    features: [
      'How to think about AI conversations',
      'Context, clarity, and iteration',
      'Self-paced video lessons',
      'Required to unlock other courses',
    ]
  },
  {
    id: 'ai-partner-mastery',
    title: 'AI Partner Mastery',
    subtitle: 'Work WITH AI',
    description: 'Go beyond prompts. Learn to work with AI as a partner in your daily workflow. Real collaboration techniques for knowledge workers.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/ai-partner-mastery',
    isFoundation: false,
    features: [
      'Day-to-day AI collaboration',
      'Task delegation frameworks',
      'Quality control techniques',
      'Build your AI partnership system',
    ]
  },
  {
    id: 'prompt-engineering-creators',
    title: 'Prompt Engineering for Creators',
    subtitle: 'Better Prompts & Outputs',
    description: 'Learn the 9 techniques that make every AI conversation more effective - through real examples from writers, content creators, and indie makers.',
    modules: 9,
    duration: '9 modules',
    href: '/academy/prompt-engineering-creators',
    isFoundation: false,
    isNew: true,
    features: [
      'Real-world examples, not theory',
      '9 modules from Anthropic, translated for creators',
      'Before/after prompt comparisons',
      'Build your own prompt library',
    ]
  },
  {
    id: 'claude-for-knowledge-workers',
    title: 'Claude Code for Knowledge Workers',
    subtitle: 'Deep Dive Course',
    description: 'Complete 10-module course teaching non-programmers how to use Claude Code. No coding required - just delegation. From file processing to building your operating system.',
    modules: 10,
    duration: '10 modules',
    href: '/courses/claude-for-knowledge-workers',
    isFoundation: false,
    features: [
      'Full 10-module course',
      'File processing & document workflows',
      'Research & analysis automation',
      'Build your operating system',
    ]
  },
  {
    id: 'ai-for-leaders',
    title: 'AI for Leaders',
    subtitle: 'Organizational Strategy',
    description: 'Strategic decision-making for leaders adopting AI. From vision to execution, governance to change management.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/ai-for-leaders',
    isFoundation: false,
    features: [
      'Strategic AI vision and roadmaps',
      'Decision frameworks for AI adoption',
      'Change management and culture',
      'Risk and governance',
    ]
  },
  {
    id: 'ai-at-scale',
    title: 'AI at Scale',
    subtitle: 'Team Adoption',
    description: 'Scale AI across your organization. Processes, standards, measurement, and sustainable team adoption.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/ai-at-scale',
    isFoundation: false,
    features: [
      'Team adoption frameworks',
      'Process standardization',
      'Measurement and ROI',
      'Sustainable scaling practices',
    ]
  },
  {
    id: 'private-ai',
    title: 'Private AI',
    subtitle: 'Security & Compliance',
    description: 'Data privacy, security, and compliance for AI adoption. Protect your data while leveraging AI capabilities.',
    modules: 8,
    duration: '8 modules',
    href: '/academy/private-ai',
    isFoundation: false,
    features: [
      'Data privacy best practices',
      'Security frameworks',
      'Compliance requirements',
      'Private deployment options',
    ]
  }
]

// Curated Anthropic Academy courses
const anthropicCourses = [
  {
    id: 'claude-101',
    title: 'Claude 101',
    track: 'AI Fluency',
    description: 'Official intro to Claude — core features, effective prompting, and real-world use cases.',
    duration: 'Self-paced',
    href: '/academy/anthropic/claude-101',
    externalUrl: 'https://anthropic.skilljar.com/claude-101',
  },
  {
    id: 'building-with-claude-api',
    title: 'Building with the Claude API',
    track: 'Developer',
    description: 'Full API course — authentication, tool use, streaming, and production architecture patterns.',
    duration: 'Self-paced',
    href: '/academy/anthropic/building-with-claude-api',
    externalUrl: 'https://anthropic.skilljar.com/claude-with-the-anthropic-api',
  },
  {
    id: 'claude-code-in-action',
    title: 'Claude Code in Action',
    track: 'Developer',
    description: 'Integrate Claude Code into your dev workflow — code generation, debugging, and multi-file editing.',
    duration: '30 min video',
    href: '/academy/anthropic/claude-code-in-action',
    externalUrl: 'https://anthropic.skilljar.com/claude-code-in-action',
  },
  {
    id: 'claude-code-skills',
    title: 'Claude Code Skills',
    track: 'Developer',
    description: 'Build reusable Skills — markdown instructions that Claude applies automatically to the right tasks.',
    duration: 'Self-paced',
    href: '/academy/anthropic/claude-code-skills',
    externalUrl: 'https://anthropic.skilljar.com/claude-code-skills',
  },
  {
    id: 'introduction-to-mcp',
    title: 'Introduction to MCP',
    track: 'Developer',
    description: 'Model Context Protocol fundamentals — build MCP servers and clients, connect Claude to external services.',
    duration: 'Self-paced',
    href: '/academy/anthropic/introduction-to-mcp',
    externalUrl: 'https://anthropic.skilljar.com/introduction-to-model-context-protocol',
  },
  {
    id: 'introduction-to-agent-skills',
    title: 'Introduction to Agent Skills',
    track: 'Developer',
    description: 'Build autonomous AI agents — tool use, multi-step reasoning, and agentic workflow patterns.',
    duration: '30 min video',
    href: '/academy/anthropic/introduction-to-agent-skills',
    externalUrl: 'https://anthropic.skilljar.com/introduction-to-agent-skills',
  },
]

// Why id8Labs differentiators
const differentiators = [
  {
    title: 'Real examples, not abstract concepts',
    description: 'Every technique is taught through actual creator scenarios - writing, research, content, operations.',
  },
  {
    title: 'Built by a creator, for creators',
    description: '20+ years in film production taught me systems. Now I translate AI into practical workflows.',
  },
  {
    title: 'No paywalls, no upsells',
    description: 'All 57 modules across 7 courses. No gated content. Learn at your own pace.',
  },
  {
    title: 'Pathways, not random courses',
    description: 'Clear progression from foundations to mastery. Know exactly what to learn next.',
  },
]

export default function AcademyPage() {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsSignedIn(!!user)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session?.user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const foundation = coursesCatalog[0]

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-24 pb-16">
        <Container>
          <Kicker dot>id8Labs Academy</Kicker>
          <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.5rem,7vw,4.5rem)]">
            Learn AI through <em className="italic text-id8-orange">real examples</em>.
          </h1>
          <Deck className="mt-6 max-w-2xl">
            Not another abstract tutorial. Learn prompt engineering and AI workflows through real scenarios from writers, content creators, and indie makers. All courses free.
          </Deck>

          <div className="mt-8 max-w-md">
            <AcademyProgressBar />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ResumeButton />
            <EditorialButton href="#curriculum" variant="ghost">
              View Full Curriculum
            </EditorialButton>
          </div>

          <MetaRow
            className="mt-10"
            items={[
              { value: '7', label: 'original courses' },
              { value: '57', label: 'modules' },
              { value: '6', label: 'Anthropic courses' },
              { label: 'All free' },
            ]}
          />
        </Container>
      </section>

      <Rule />

      {/* Learning Roadmap */}
      <section className="py-16">
        <Container>
          <div className="mb-10 max-w-2xl">
            <Kicker>Your Learning Journey</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-tight text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
              One foundation unlocks six specializations
            </h2>
            <p className="mt-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              Complete AI Conversation Fundamentals to unlock all advanced courses. Choose your own path based on your goals.
            </p>
          </div>

          <LearningRoadmap />
        </Container>
      </section>

      {/* Sign In Benefits - only when not signed in */}
      {isSignedIn === false && (
        <>
          <Rule />
          <section className="py-16">
            <Container>
              <EditorialCard featured className="md:flex md:items-center md:gap-12">
                <div className="flex-1">
                  <Kicker>Your Account</Kicker>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)]">
                    Sign in to track your progress
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-sans)] text-[var(--body)]">
                    Create an account to unlock the full learning experience.
                  </p>

                  <ul className="mt-6 space-y-2.5 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                    <li><strong className="text-[var(--ink)]">Save your place</strong> — resume exactly where you left off</li>
                    <li><strong className="text-[var(--ink)]">Add notes</strong> — capture insights as you learn</li>
                    <li><strong className="text-[var(--ink)]">Earn certificates</strong> — showcase your completion</li>
                    <li><strong className="text-[var(--ink)]">Track completion</strong> — see your progress across all courses</li>
                  </ul>
                </div>

                <div className="mt-8 flex w-full flex-col gap-3 md:mt-0 md:w-auto">
                  <EditorialButton href="/sign-in?redirect=/academy" variant="primary">
                    Sign In
                  </EditorialButton>
                  <EditorialButton href="/sign-up?redirect=/academy" variant="secondary">
                    Create Account
                  </EditorialButton>
                  <p className="text-center font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                    No credit card required
                  </p>
                </div>
              </EditorialCard>
            </Container>
          </section>
        </>
      )}

      <Rule />

      {/* Full Course Catalog */}
      <section className="py-16" id="curriculum">
        <Container>
          <SectionHead
            title={<>Complete <em className="italic text-id8-orange">Curriculum</em></>}
            meta="7 courses · 57 modules"
          />
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
            7 original courses with 57 modules, plus 6 curated courses from Anthropic Academy.
          </p>

          {/* Foundation course - featured */}
          <div className="mt-10">
            <EditorialCard href={foundation.href} featured>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Tag>{foundation.subtitle}</Tag>
                <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.2em] text-id8-orange">
                  Start Here
                </span>
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-display)] font-normal leading-tight tracking-[-0.015em] text-[var(--ink)] text-[clamp(1.5rem,3.5vw,2.25rem)]">
                {foundation.title}
              </h3>
              <p className="mt-4 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                {foundation.description}
              </p>
              <ul className="mt-6 grid gap-2 font-[family-name:var(--font-sans)] text-sm text-[var(--body)] sm:grid-cols-2">
                {foundation.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-id8-orange">—</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <MetaRow
                className="mt-7"
                items={[
                  { value: foundation.modules, label: 'modules' },
                  { label: foundation.duration },
                  { label: 'Unlocks everything' },
                ]}
              />
            </EditorialCard>
          </div>

          {/* Advanced courses */}
          <div className="mt-12 mb-7 flex items-center gap-4">
            <Hairline className="flex-1" />
            <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Then choose your path
            </span>
            <Hairline className="flex-1" />
          </div>

          <div className="grid gap-px bg-[var(--hair)] md:grid-cols-2 lg:grid-cols-3">
            {coursesCatalog.slice(1).map((course) => (
              <EditorialCard key={course.id} href={course.href} className="flex h-full flex-col bg-[var(--paper)]">
                <div className="flex items-center justify-between gap-2">
                  <Tag>{course.subtitle}</Tag>
                  {course.isNew && (
                    <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange">
                      New
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-normal text-xl leading-tight text-[var(--ink)]">
                  {course.title}
                </h3>
                <MetaRow
                  className="mt-3"
                  items={[
                    { value: course.modules, label: 'modules' },
                    { label: course.duration },
                  ]}
                />
                <p className="mt-4 flex-grow font-[family-name:var(--font-sans)] text-[0.9375rem] leading-relaxed text-[var(--body)]">
                  {course.description}
                </p>
                <ul className="mt-5 space-y-1.5 font-[family-name:var(--font-sans)] text-sm text-[var(--body)]">
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="text-id8-orange">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
                  Start course &rarr;
                </span>
              </EditorialCard>
            ))}
          </div>
        </Container>
      </section>

      <Rule />

      {/* Anthropic Academy Courses */}
      <section className="py-16" id="anthropic-courses">
        <Container>
          <SectionHead
            title={<>From the team that built <em className="italic text-id8-orange">Claude</em></>}
            meta="Official Anthropic courses"
          />
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
            Complement your id8Labs learning with Anthropic&apos;s official free courses. Earn certificates. All hosted on Anthropic Academy.
          </p>

          <div className="mt-10 grid gap-px bg-[var(--hair)] md:grid-cols-2 lg:grid-cols-3">
            {anthropicCourses.map((course) => (
              <EditorialCard key={course.id} href={course.href} className="flex h-full flex-col bg-[var(--paper)]">
                <div className="flex items-center justify-between gap-2">
                  <Tag>{course.track}</Tag>
                  <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Anthropic
                  </span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-normal text-xl leading-tight text-[var(--ink)]">
                  {course.title}
                </h3>
                <MetaRow
                  className="mt-3"
                  items={[
                    { label: course.duration },
                    { label: 'Free + Certificate' },
                  ]}
                />
                <p className="mt-4 flex-grow font-[family-name:var(--font-sans)] text-[0.9375rem] leading-relaxed text-[var(--body)]">
                  {course.description}
                </p>
                <span className="mt-6 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange">
                  Learn more &rarr;
                </span>
              </EditorialCard>
            ))}
          </div>

          <p className="mt-8 font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
            All Anthropic Academy courses are free and include official certification.{' '}
            <a
              href="https://anthropic.skilljar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[var(--hair)] text-[var(--ink)] transition-colors hover:border-id8-orange"
            >
              Browse full catalog on Anthropic Academy
            </a>
          </p>
        </Container>
      </section>

      <Rule />

      {/* Why id8Labs */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Kicker>Why id8Labs Academy</Kicker>
              <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-tight text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
                Learn through doing, <em className="italic text-id8-orange">not watching</em>.
              </h2>
              <p className="mt-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                Most AI courses teach abstract concepts. We show you exactly how a newsletter writer, a YouTuber, or an indie maker actually uses these techniques — then you try it yourself.
              </p>
            </div>

            <div className="grid gap-px self-start bg-[var(--hair)] sm:grid-cols-2">
              {differentiators.map((diff, index) => (
                <div key={index} className="bg-[var(--paper)] p-6">
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
                    {diff.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[var(--body)]">
                    {diff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Rule />

      {/* CTA */}
      <section className="py-24">
        <Container narrow>
          <div className="text-center">
            <Kicker className="justify-center" dot>Start here</Kicker>
            <h2 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-tight text-[var(--ink)] text-[clamp(2rem,5vw,3rem)]">
              Start with <em className="italic text-id8-orange">foundations</em>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              The best way to learn AI is to use it. Get the mental models first, then practice with your own work.
            </p>
            <div className="mt-9 flex justify-center">
              <EditorialButton href="/courses/ai-conversation-fundamentals" variant="primary">
                Start Foundation Course
              </EditorialButton>
            </div>
            <p className="mt-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              6 modules. 45 minutes. Unlocks everything.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
