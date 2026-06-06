'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { AuthLoadingFallback } from '@/components/auth/AuthLoadingFallback'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthErrorMessage } from '@/components/auth/AuthErrorMessage'
import { MagicLinkSuccess } from '@/components/auth/MagicLinkSuccess'

type AuthMethod = 'magic-link' | 'password'
type ContextMessage = { title: string; subtitle: string }

function getContextMessage(redirect: string | null): ContextMessage | null {
  if (!redirect) return null

  if (redirect.startsWith('/courses/claude-for-knowledge-workers/module-')) {
    const moduleNum = redirect.match(/module-(\d+)/)?.[1] ?? ''
    return {
      title: `Module ${moduleNum} requires sign-in`,
      subtitle: 'Sign in to access paid course content and track your progress.',
    }
  }

  if (redirect.startsWith('/courses/')) {
    return {
      title: 'Sign in to continue',
      subtitle: 'Create a free account to save your progress and access course materials.',
    }
  }

  return null
}

function SignInForm(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [authMethod, setAuthMethod] = useState<AuthMethod>('magic-link')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const redirectTo = searchParams.get('redirect') || '/courses/claude-for-knowledge-workers'
  const contextMessage = getContextMessage(searchParams.get('redirect'))

  function buildRedirectUrl(path: string): string {
    return `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(path)}`
  }

  async function handleGoogleSignIn(): Promise<void> {
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: buildRedirectUrl(redirectTo) },
    })

    if (authError) {
      setError(authError.message)
    }
    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: buildRedirectUrl(redirectTo) },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setMagicLinkSent(true)
    setLoading(false)
  }

  async function handlePasswordSignIn(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  if (magicLinkSent) {
    return <MagicLinkSuccess email={email} onReset={() => setMagicLinkSent(false)} variant="sign-in" />
  }

  const title = contextMessage ? 'Sign in to continue' : 'Welcome back'
  const subtitle = contextMessage
    ? 'Your progress will be saved automatically.'
    : 'Sign in to continue your learning journey'

  const inputClass =
    'w-full px-4 py-3 border border-[var(--hair)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)] transition-colors duration-150'
  const labelClass =
    'block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2'
  const submitClass =
    'w-full px-6 py-3.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 disabled:opacity-50'

  return (
    <div className="bg-[var(--paper)] border border-[var(--hair)] p-8">
      {contextMessage && (
        <div className="mb-8 p-4 border-l-2 border-id8-orange bg-[var(--paper-shadow)]">
          <p className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange mb-1.5">
            {contextMessage.title}
          </p>
          <p className="text-sm text-[var(--body)] leading-[1.6]">
            {contextMessage.subtitle}
          </p>
        </div>
      )}

      <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.02em] text-[var(--ink)] mb-2">{title}</h1>
      <p className="text-[var(--muted)] mb-8">{subtitle}</p>

      <GoogleAuthButton onClick={handleGoogleSignIn} disabled={loading} />
      <AuthDivider />

      {/* Auth Method Toggle */}
      <div className="flex border border-[var(--hair)] mb-6">
        <button
          type="button"
          onClick={() => setAuthMethod('magic-link')}
          className={`flex-1 px-4 py-2.5 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
            authMethod === 'magic-link'
              ? 'bg-[var(--ink)] text-[var(--paper)]'
              : 'bg-transparent text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          Magic Link
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('password')}
          className={`flex-1 px-4 py-2.5 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
            authMethod === 'password'
              ? 'bg-[var(--ink)] text-[var(--paper)]'
              : 'bg-transparent text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          Password
        </button>
      </div>

      {authMethod === 'magic-link' ? (
        <form onSubmit={handleMagicLink} className="space-y-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
            <p className="mt-2 text-xs text-[var(--muted)]">
              We'll email you a magic link for password-free sign in.
            </p>
          </div>

          <AuthErrorMessage error={error} />

          <button type="submit" disabled={loading} className={submitClass}>
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSignIn} className="space-y-6">
          <div>
            <label htmlFor="email-password" className={labelClass}>
              Email
            </label>
            <input
              id="email-password"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="************"
            />
          </div>

          <AuthErrorMessage error={error} />

          <button type="submit" disabled={loading} className={submitClass}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-[var(--muted)]">
        Don't have an account?{' '}
        <Link
          href="/sign-up"
          className="text-id8-orange hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default function SignInPage(): React.ReactElement {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <SignInForm />
    </Suspense>
  )
}
