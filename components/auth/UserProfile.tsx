import { getCurrentUser } from '@/lib/auth/helpers'
import { SignOutButton } from './SignOutButton'
import Link from 'next/link'

export async function UserProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="px-4 py-2 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] hover:text-id8-orange transition-colors duration-150"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150"
        >
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-[family-name:var(--font-mono)] text-[var(--ink)]">
          {user.email}
        </p>
      </div>
      <SignOutButton className="px-4 py-2 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-150">
        Sign out
      </SignOutButton>
    </div>
  )
}
