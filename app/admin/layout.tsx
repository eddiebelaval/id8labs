import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin | ID8Labs',
  description: 'ID8Labs Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

const navItems = [
  {
    label: 'Newsletter',
    href: '/admin/newsletter',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Finance',
    href: '/admin/finance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--paper)] border-r border-[var(--hair)] flex flex-col">
        <div className="p-6 border-b border-[var(--hair)]">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-display)] text-xl font-normal tracking-[-0.02em]">
              <span className="text-[var(--ink)]">id8</span>
              <span className="text-[var(--ink)]">Labs</span>
            </span>
            <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 border border-[var(--hair)] text-[var(--muted)]">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-shadow)] transition-colors duration-150"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-[var(--hair)]">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
