'use client'

/**
 * Shared editorial helpers for the "Claude for Knowledge Workers" module
 * reading pages. Built on the @/components/editorial kit — warm paper, ink,
 * hairline rules, Fraunces display, Archivo Narrow kickers, JetBrains Mono.
 *
 * Co-located (underscore-prefixed, not a route) so all module pages share one
 * presentation pattern. Page-local only — not part of the shared kit.
 */

import { useState, type ReactNode } from 'react'

const CopyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const CheckIconSmall = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/** Copyable code block — editorial paper-mid chip, mono, sharp. */
export function CopyableCode({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {label && (
        <div className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-id8-orange mb-2">
          {label}
        </div>
      )}
      <div className="border border-[var(--hair-hard)] bg-[var(--paper-mid)] p-4 font-[family-name:var(--font-mono)] text-sm overflow-x-auto">
        <pre className="text-[var(--ink)] whitespace-pre-wrap">{code}</pre>
      </div>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2 right-2 p-2 border border-[var(--hair)] bg-[var(--paper)] text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity hover:border-id8-orange hover:text-id8-orange"
      >
        {copied ? <CheckIconSmall /> : <CopyIcon />}
      </button>
    </div>
  )
}

/** Hands-on exercise callout — orange left rule on paper-shadow. */
export function TryThisNow({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="my-8 border-l-2 border-id8-orange bg-[var(--paper-shadow)] p-6">
      <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange">
        Hands-On Exercise
      </span>
      <h3 className="mt-1 mb-4 font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">
        {title}
      </h3>
      {children}
    </div>
  )
}

/** Mentor aside — italic serif on paper-shadow with hairline rule. */
export function MentorNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 border-l-2 border-[var(--hair-hard)] bg-[var(--paper-shadow)] p-4">
      <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
        Mentor Note
      </p>
      <div className="font-[family-name:var(--font-serif)] italic text-[var(--muted)]">{children}</div>
    </div>
  )
}
