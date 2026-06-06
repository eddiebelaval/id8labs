'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { AuthLoadingFallback } from '@/components/auth/AuthLoadingFallback'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthErrorMessage } from '@/components/auth/AuthErrorMessage'
import { MagicLinkSuccess } from '@/components/auth/MagicLinkSuccess'

function SignUpForm(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams()
  const supabase = createClient()

  const redirectTo = searchParams.get('redirect') || '/courses/claude-for-knowledge-workers'

  function buildRedirectUrl(path: string): string {
    return `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(path)}`
  }

  async function handleGoogleSignUp(): Promise<void> {
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

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return <MagicLinkSuccess email={email} onReset={() => setSuccess(false)} variant="sign-up" />
  }

  return (
    <div className="bg-[var(--paper)] border border-[var(--hair)] p-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.02em] text-[var(--ink)] mb-2">
        Create your account
      </h1>
      <p className="text-[var(--muted)] mb-8">
        Start learning with id8Labs
      </p>

      <GoogleAuthButton onClick={handleGoogleSignUp} disabled={loading} />
      <AuthDivider />

      <form onSubmit={handleMagicLink} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-[var(--hair)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)] transition-colors duration-150"
            placeholder="you@example.com"
          />
          <p className="mt-2 text-xs text-[var(--muted)]">
            We'll email you a magic link - no password required.
          </p>
        </div>

        <AuthErrorMessage error={error} />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="text-id8-orange hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default function SignUpPage(): React.ReactElement {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <SignUpForm />
    </Suspense>
  )
}
