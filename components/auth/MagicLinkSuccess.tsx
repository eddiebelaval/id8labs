interface MagicLinkSuccessProps {
  email: string
  onReset: () => void
  variant?: 'sign-in' | 'sign-up'
}

export function MagicLinkSuccess({ email, onReset, variant = 'sign-in' }: MagicLinkSuccessProps): React.ReactElement {
  const bgColor = 'bg-[var(--paper-shadow)]'
  const iconColor = 'text-id8-orange'
  const description = variant === 'sign-up'
    ? 'Click the link to create your account and sign in. No password needed.'
    : 'Click the link in the email to sign in. No password needed.'

  const icon = variant === 'sign-up' ? (
    <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )

  return (
    <div className="bg-[var(--paper)] border border-[var(--hair)] p-8">
      <div className="text-center">
        <div className={`mx-auto w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-[-0.02em] text-[var(--ink)] mb-2">
          Check your email
        </h1>
        <p className="text-[var(--muted)] mb-6">
          We sent a magic link to <strong className="text-[var(--ink)]">{email}</strong>
        </p>
        <p className="text-sm text-[var(--muted)]">
          {description}
        </p>
        <button
          onClick={onReset}
          className="mt-6 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange hover:underline"
        >
          Use a different email
        </button>
      </div>
    </div>
  )
}
