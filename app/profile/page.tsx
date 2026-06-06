import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, Plus } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/helpers'
import { UserStacksList } from '@/components/profile/UserStacksList'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in?redirect=/profile')
  }

  return (
    <div className="relative">
      <section className="py-16 border-b border-[var(--rule)]">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-4xl font-normal tracking-[-0.02em] mb-2 text-[var(--ink)]">My Stacks</h1>
                <p className="font-[family-name:var(--font-mono)] text-base text-[var(--muted)]">{user.email}</p>
              </div>
              <Link
                href="/stackshack"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150"
              >
                <Plus className="w-5 h-5" />
                Create New Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <UserStacksList userId={user.id} />
          </div>
        </div>
      </section>
    </div>
  )
}
