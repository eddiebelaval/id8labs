import Link from 'next/link'

const quickLinks = [
  { href: '/shipped', label: 'Shipped.', description: 'The weekly field notes of the build wave' },
  { href: '/products', label: 'Products', description: 'Composer, DeepStack, and more' },
  { href: '/lab', label: 'Lab Story', description: 'How id8Labs started' },
  { href: '/contact', label: 'Contact', description: 'Get in touch' },
]

export default function NotFound() {
  return (
    <div className="container min-h-[70vh] flex items-center justify-center py-20">
      <div className="text-center max-w-2xl">
        <p className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange mb-4">
          404 Error
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-normal tracking-[-0.02em] mb-6 text-[var(--ink)]">Page not found</h1>
        <p className="text-xl mb-12 text-[var(--muted)]">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12 text-left">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-[var(--hair)] hover:border-id8-orange hover:bg-[var(--paper-shadow)] transition-colors duration-150 group"
            >
              <p className="font-[family-name:var(--font-display)] text-base font-normal text-[var(--ink)] group-hover:text-id8-orange transition-colors duration-150">
                {link.label}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {link.description}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  )
}
