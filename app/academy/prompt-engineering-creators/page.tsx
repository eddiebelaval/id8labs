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
} from '@/components/editorial'

// Module data with real-world creator examples
const modules = [
  {
    number: 1,
    title: 'The Anatomy of a Great Prompt',
    source: 'Basic Prompt Structure',
    duration: '15 min',
    description: 'What makes prompts work — the building blocks every creator needs.',
    creatorExample: 'Writing a product description vs a blog intro — same product, different prompts.',
    href: '/academy/prompt-engineering-creators/module-1',
  },
  {
    number: 2,
    title: 'Say What You Mean',
    source: 'Being Clear and Direct',
    duration: '15 min',
    description: 'Clarity beats cleverness. How to get exactly what you asked for.',
    creatorExample: 'Getting Claude to match your voice for social posts instead of sounding generic.',
    href: '/academy/prompt-engineering-creators/module-2',
  },
  {
    number: 3,
    title: 'Give Claude a Job Description',
    source: 'Assigning Roles',
    duration: '15 min',
    description: 'Persona-based prompting transforms generic outputs into expert-level work.',
    creatorExample: '"You are my editor who knows my audience" — how role context changes everything.',
    href: '/academy/prompt-engineering-creators/module-3',
  },
  {
    number: 4,
    title: 'Context Without Confusion',
    source: 'Separating Data',
    duration: '15 min',
    description: 'How to feed Claude information without creating a mess.',
    creatorExample: 'Giving Claude your brand guidelines + the task — structured context that works.',
    href: '/academy/prompt-engineering-creators/module-4',
  },
  {
    number: 5,
    title: 'Get the Format You Need',
    source: 'Formatting Output',
    duration: '15 min',
    description: 'Markdown, lists, tables, scripts — get exactly the structure you need.',
    creatorExample: 'Getting script formats, outline structures, and Twitter thread formats.',
    href: '/academy/prompt-engineering-creators/module-5',
  },
  {
    number: 6,
    title: 'Help Claude Think',
    source: 'Chain of Thought',
    duration: '15 min',
    description: 'Step-by-step reasoning for complex tasks that require nuance.',
    creatorExample: 'Research synthesis that doesn\'t miss the nuance — making Claude show its work.',
    href: '/academy/prompt-engineering-creators/module-6',
  },
  {
    number: 7,
    title: 'Show, Don\'t Just Tell',
    source: 'Few-shot Learning',
    duration: '15 min',
    description: 'Examples are the secret weapon. Teach Claude by showing.',
    creatorExample: 'Teaching Claude your newsletter style by showing 3 past examples.',
    href: '/academy/prompt-engineering-creators/module-7',
  },
  {
    number: 8,
    title: 'Keep Claude Honest',
    source: 'Avoiding Hallucinations',
    duration: '15 min',
    description: 'Accuracy techniques for content you\'ll actually publish.',
    creatorExample: 'Fact-checking claims, citing sources, and knowing when Claude doesn\'t know.',
    href: '/academy/prompt-engineering-creators/module-8',
  },
  {
    number: 9,
    title: 'Build Your Prompt Library',
    source: 'Complex Prompts',
    duration: '20 min',
    description: 'Templates and systems for recurring creative work.',
    creatorExample: 'Your personal system prompts for research, writing, and operations.',
    href: '/academy/prompt-engineering-creators/module-9',
  },
]

// What you'll learn
const learningOutcomes = [
  'Write prompts that get exactly what you need on the first try',
  'Make Claude match your voice and style',
  'Structure complex research and analysis tasks',
  'Build reusable templates for your recurring work',
  'Know when Claude is confident vs. guessing',
  'Create a personal prompt library for your workflows',
]

// Who this is for
const targetAudience = [
  {
    title: 'Newsletter writers',
    description: 'Draft, edit, and research faster without losing your voice.',
  },
  {
    title: 'Content creators',
    description: 'Scripts, outlines, and research for YouTube, podcasts, and more.',
  },
  {
    title: 'Indie makers',
    description: 'Product copy, documentation, and customer communication.',
  },
  {
    title: 'Freelancers & consultants',
    description: 'Proposals, reports, and client deliverables.',
  },
]

export default function PromptEngineeringCreatorsPage() {
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
              <Kicker>New · Free</Kicker>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">id8Labs Academy</span>
            </div>

            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.5rem,7vw,4.5rem)]">
              Prompt Engineering <em className="italic text-id8-orange">for Creators</em>
            </h1>

            <Deck className="mt-6 max-w-2xl">
              Learn the 9 techniques that make every AI conversation more effective — through real examples from writers, content creators, and indie makers.
            </Deck>

            <p className="mt-5 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              Based on Anthropic&apos;s official tutorial. Translated for non-technical creators.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <EditorialButton href="/academy/prompt-engineering-creators/module-1" variant="primary">
                Start Module 1
              </EditorialButton>
              <EditorialButton href="#modules" variant="ghost">
                View All 9 Modules
              </EditorialButton>
            </div>

            <MetaRow
              className="mt-10"
              items={[
                { value: '9', label: 'modules' },
                { value: '~2.5', label: 'hours' },
                { label: 'Completely free' },
              ]}
            />
          </Container>
        </section>

        <Rule />

        {/* What Makes This Different */}
        <section className="py-16">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Kicker>The id8Labs Approach</Kicker>
                <h2 className="mt-4 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-tight text-[var(--ink)] text-[clamp(1.75rem,4vw,2.5rem)]">
                  Real examples, <em className="italic text-id8-orange">not abstract concepts</em>.
                </h2>
                <p className="mt-6 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                  Anthropic&apos;s tutorial teaches the techniques. We show you how a newsletter writer, a YouTuber, or an indie maker actually uses them.
                </p>
                <p className="mt-4 font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                  Every module includes before/after prompt comparisons and practice exercises with your own content.
                </p>
              </div>

              <ul className="space-y-3 self-center">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3 border-b border-[var(--hair)] pb-3 font-[family-name:var(--font-sans)] text-[1.0625rem] text-[var(--body)]">
                    <span className="text-id8-orange">—</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <Rule />

        {/* Modules */}
        <section className="py-16" id="modules">
          <Container>
            <SectionHead title="The complete curriculum" meta="9 modules · ~2.5 hours" />
            <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
              Each module takes 15-20 minutes. Finish the whole course in under 3 hours.
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
                      Creator example: {module.creatorExample}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] whitespace-nowrap">
                    {module.duration}
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <Rule />

        {/* Who This Is For */}
        <section className="py-16">
          <Container>
            <SectionHead title="Built for creators who make things" meta="Who this is for" />
            <div className="mt-10 grid gap-px bg-[var(--hair)] md:grid-cols-2 lg:grid-cols-4">
              {targetAudience.map((audience, index) => (
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

        {/* Source Attribution */}
        <section className="py-12">
          <Container narrow>
            <div className="text-center">
              <Tag>Source</Tag>
              <p className="mt-4 font-[family-name:var(--font-serif)] text-lg italic text-[var(--ink)]">
                Anthropic&apos;s Prompt Engineering Tutorial
              </p>
              <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Adapted and expanded with real-world creator examples by id8Labs
              </p>
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
                Ready to level up your <em className="italic text-id8-orange">prompts</em>?
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--body)]">
                Start with Module 1 and work through at your own pace. Each module builds on the last.
              </p>
              <div className="mt-9 flex justify-center">
                <EditorialButton href="/academy/prompt-engineering-creators/module-1" variant="primary">
                  Start Module 1
                </EditorialButton>
              </div>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Free. 9 modules. ~2.5 hours total.
              </p>
            </div>
          </Container>
        </section>
      </div>
    </FoundationGate>
  )
}
