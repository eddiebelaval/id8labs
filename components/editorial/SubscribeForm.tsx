'use client'

import { useState } from 'react'

/**
 * Editorial subscribe form — ink submit button, hairline input, mono note.
 * Posts to /api/newsletter/subscribe and swaps to a success line on 200.
 */
export function SubscribeForm({
  source = 'editorial',
  placeholder = 'you@domain.com',
  buttonLabel = 'Subscribe',
  successText = 'Got it. First issue arrives Friday 9 AM ET.',
  note,
}: {
  source?: string
  placeholder?: string
  buttonLabel?: string
  successText?: string
  note?: React.ReactNode
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!value) return
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Could not subscribe right now. Try again in a moment.')
        setStatus('idle')
      }
    } catch {
      setError('Could not subscribe right now. Try again in a moment.')
      setStatus('idle')
    }
  }

  if (status === 'done') {
    return (
      <p className="font-[family-name:var(--font-serif)] italic text-lg text-[var(--teal)]">
        {successText}
      </p>
    )
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-wrap justify-center gap-2"
      >
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className="min-w-0 flex-1 basis-[260px] border border-[var(--ink)] bg-[var(--paper)] px-5 py-4 font-[family-name:var(--font-sans)] text-[15px] text-[var(--ink)] outline-none focus:border-id8-orange"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-id8-orange hover:border-id8-orange disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing…' : buttonLabel}
        </button>
      </form>
      {error && (
        <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-id8-orange">
          {error}
        </p>
      )}
      {note && (
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
          {note}
        </p>
      )}
    </>
  )
}
