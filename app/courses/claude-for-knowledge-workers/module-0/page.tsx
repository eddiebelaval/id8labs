'use client'

import Link from 'next/link'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'
import EmailCapture from '@/components/EmailCapture'
import Image from 'next/image'
import { useState } from 'react'
import { ModuleComplete } from '@/components/progress'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  SectionHead,
  Prose,
  EditorialButton,
} from '@/components/editorial'

const CopyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)

const CheckIconSmall = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// Copyable code block — editorial
function CopyableCode({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {label && (
        <div className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">{label}</div>
      )}
      <div className="border border-[var(--hair-hard)] bg-[var(--paper-mid)] p-4 font-[family-name:var(--font-mono)] text-sm overflow-x-auto">
        <pre className="text-[var(--ink)] whitespace-pre-wrap">{code}</pre>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 border border-[var(--hair)] bg-[var(--paper)] text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity hover:border-id8-orange hover:text-id8-orange"
      >
        {copied ? <CheckIconSmall /> : <CopyIcon />}
      </button>
    </div>
  )
}

// "Try This Now" interactive section — editorial
function TryThisNow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="my-8 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
      <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">Hands-On Exercise</span>
      <h3 className="mt-1 mb-4 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{title}</h3>
      {children}
    </div>
  )
}

// Mentor aside component — editorial
function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-4">
      <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Mentor Note</p>
      <div className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">{children}</div>
    </div>
  )
}

const outcomes = [
  "Understand what Claude Code actually is (hint: not for developers)",
  "Install Claude Code on your computer in under 2 minutes",
  "Complete your first real delegation task",
  "Shift from 'assistance' thinking to 'delegation' thinking",
]

const quickStart = [
  { step: "1", code: "curl -fsSL https://claude.ai/install.sh | bash", description: "Install Claude Code" },
  { step: "2", code: "claude", description: "Start a session" },
  { step: "3", code: "cd ~/Downloads", description: "Navigate to a folder" },
  { step: "4", code: '"Organize this folder by file type"', description: "Your first delegation" },
]

const tryThisSteps = [
  'Scans your Downloads folder',
  'Creates subfolders (PDFs, Images, Documents, etc.)',
  'Moves files into the right places',
  'Reports back what it did',
]

export default function Module0Page() {
  return (
    <article className="min-h-screen bg-[var(--paper)]">
      {/* Masthead */}
      <section className="pt-16 pb-10">
        <Container narrow>
          <div className="mb-8">
            <EditorialButton href="/courses/claude-for-knowledge-workers" variant="ghost">
              &larr; Back to Course
            </EditorialButton>
          </div>

          <Kicker dot>Module 0 · Free</Kicker>

          <h1 className="mt-5 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.02] text-[var(--ink)] text-[clamp(2.25rem,5.5vw,3.5rem)]">
            The Mental <em className="italic text-id8-orange">Model Shift</em>
          </h1>

          <Deck className="mt-6">
            15 minutes to understand what Claude Code actually is — and complete your first real delegation.
          </Deck>

          <MetaRow
            className="mt-8"
            items={[
              { label: 'Module 0' },
              { label: '~15 min' },
            ]}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <EditorialButton
              href="/courses/module-0/module-0-the-mental-model-shift.pdf"
              variant="primary"
              external
            >
              Download Guide (PDF)
            </EditorialButton>
            <EditorialButton href="#media" variant="ghost">
              Watch or Listen
            </EditorialButton>
          </div>

          <Rule className="mt-8" />
        </Container>
      </section>

      {/* Split Tab Callout */}
      <section className="py-4 border-b border-[var(--hair)] bg-[var(--paper-shadow)]">
        <Container narrow>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--body)]">
              <span className="font-medium text-[var(--ink)]">Pro Tip:</span> Use your browser&apos;s Split Tab feature to follow along side-by-side with Claude Code open.
            </p>
            <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange whitespace-nowrap">
              New
            </span>
          </div>
        </Container>
      </section>

      {/* Media */}
      <section id="media" className="pb-14 pt-14">
        <Container narrow>
          <SectionHead title="Watch or Listen" className="mb-4" />
          <p className="mt-6 mb-8 text-[var(--body)]">
            Choose your format — same content, different experience.
          </p>

          <div className="space-y-6">
            <MiniVideoPlayer
              src="/courses/module-0/media/module-0-the-mental-model-shift.mp4"
              title="The Mental Model Shift (Video)"
              downloadName="Module-0-The-Mental-Model-Shift.mp4"
            />
            <MiniAudioPlayer
              src="/courses/module-0/media/module-0-the-mental-model-shift.m4a"
              title="The Mental Model Shift (Podcast)"
              downloadName="Module-0-The-Mental-Model-Shift.m4a"
            />
            <div className="border border-[var(--hair)] p-4">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] mb-3">Module Mindmap</h3>
              <a
                href="/courses/module-0/media/module-0-mindmap.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src="/courses/module-0/media/module-0-mindmap.webp"
                  alt="Module 0 Mindmap - The Mental Model Shift"
                  width={800}
                  height={600}
                  className="w-full border border-[var(--hair)] hover:border-id8-orange transition-colors cursor-pointer"
                />
              </a>
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mt-2">Click to view full size</p>
            </div>
          </div>
        </Container>
      </section>

      {/* What You'll Learn */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="What You&apos;ll Learn" className="mb-8" />
          <ol className="space-y-4">
            {outcomes.map((outcome, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[var(--body)] flex-1">{outcome}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Quick Start */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="Quick Start" className="mb-8" />

          <MentorNote>
            Don&apos;t just read these commands — actually run them. The mental shift happens when you experience it firsthand.
          </MentorNote>

          <div className="space-y-6">
            {quickStart.map((item) => (
              <div key={item.step}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-id8-orange flex-shrink-0">
                    {String(item.step).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[var(--muted)]">{item.description}</p>
                </div>
                <CopyableCode code={item.code} />
              </div>
            ))}
          </div>

          <TryThisNow title="Complete Your First Delegation">
            <p className="text-[var(--body)] mb-4">
              Right now, open your terminal and try this exact sequence. Watch as Claude Code:
            </p>
            <ul className="space-y-2 mb-4">
              {tryThisSteps.map((s, i) => (
                <li key={i} className="flex gap-3 text-[var(--body)]">
                  <span className="text-id8-orange flex-shrink-0">&rarr;</span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="font-[family-name:var(--font-serif)] italic text-sm text-[var(--muted)]">
              This is delegation. You stated a goal. Claude Code delivered a result.
            </p>
          </TryThisNow>
        </Container>
      </section>

      {/* The Key Insight */}
      <section className="pb-14">
        <Container narrow>
          <SectionHead title="The Key Insight" className="mb-8" />
          <div className="border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
            <p className="text-xl text-[var(--ink)] mb-4">
              The shift is from <span className="text-[var(--muted)]">assistance</span> to{' '}
              <span className="text-id8-orange">delegation</span>.
            </p>
            <div className="grid md:grid-cols-2 gap-px bg-[var(--hair)] border border-[var(--hair)] mt-6">
              <div className="bg-[var(--paper)] p-4">
                <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">Old Way</p>
                <p className="text-[var(--body)]">&quot;Help me write interview questions&quot;</p>
              </div>
              <div className="bg-[var(--paper)] p-4 border-t-2 md:border-t-0 md:border-l-2 border-id8-orange">
                <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">New Way</p>
                <p className="text-[var(--ink)]">&quot;Generate 15 interview questions based on this guest&apos;s bio. Save to /Prep/[Name].md&quot;</p>
              </div>
            </div>
            <p className="text-[var(--body)] mt-6">
              One gives you <strong>suggestions</strong>. The other gives you <strong>deliverables</strong>.
            </p>
          </div>

          <MentorNote>
            This isn&apos;t about Claude being &quot;smarter.&quot; It&apos;s about you thinking differently. When you delegate instead of ask, you get outcomes instead of options. That&apos;s the mental model shift.
          </MentorNote>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-14">
        <Container narrow>
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] font-normal text-3xl text-[var(--ink)] mb-4">Ready for More?</h2>
            <p className="text-[1.0625rem] leading-[1.7] text-[var(--body)] mb-8">
              Module 0 is just the beginning. The full course covers file organization, writing workflows, research automation, and building your personal operating system.
            </p>
            <div className="flex justify-center mb-12">
              <EditorialButton href="/courses/claude-for-knowledge-workers" variant="primary">
                View Full Course &rarr;
              </EditorialButton>
            </div>
            <div className="pt-8 border-t border-[var(--hair)]">
              <EmailCapture
                source="module-0-cta"
                title="Get notified about new modules and tips"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Module Complete */}
      <section className="border-t border-[var(--rule)] py-12">
        <Container narrow>
          <ModuleComplete
            courseSlug="claude-for-knowledge-workers"
            moduleSlug="module-0"
            nextModulePath="/courses/claude-for-knowledge-workers/module-1"
          />
        </Container>
      </section>
    </article>
  )
}
