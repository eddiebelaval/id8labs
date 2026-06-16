import Link from 'next/link'
import BrandName from './BrandName'

const colHead =
  'mb-3 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]'

const link =
  'text-[var(--muted)] hover:text-id8-orange transition-colors'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--rule)] bg-[var(--paper)]">
      <div className="container relative py-12">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-8">
          {/* Colophon */}
          <div className="col-span-2 md:col-span-1">
            <p className="mb-2 text-sm">
              <BrandName /> <span className="font-[family-name:var(--font-mono)] text-[var(--muted)]">© 2026</span>
            </p>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">Miami, FL</p>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">EST (UTC-5)</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={colHead}>Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className={link}>Home</Link>
              <Link href="/products" className={link}>Products</Link>
              <Link href="/services" className={link}>Services</Link>
              <Link href="/writing" className={link}>Writing</Link>
              <Link href="/writing?filter=magazine" className={link}>Shipped.</Link>
              <Link href="/lab" className={link}>Lab</Link>
              <div className="mt-1 flex gap-3">
                <Link href="/privacy" className={`${link} text-xs`}>Privacy</Link>
                <Link href="/terms" className={`${link} text-xs`}>Terms</Link>
              </div>
            </nav>
          </div>

          {/* Products */}
          <div>
            <h3 className={colHead}>Products</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="https://id8composer.app" target="_blank" rel="noopener noreferrer" className={link}>Composer</a>
              <a href="https://deepstack.trade" target="_blank" rel="noopener noreferrer" className={link}>DeepStack</a>
              <Link href="/products/pipeline" className={link}>Pipeline</Link>
              <Link href="/products/llc-ops" className={link}>LLC Ops</Link>
              <Link href="/products/milo" className={link}>MILO</Link>
            </nav>
          </div>

          {/* Academy */}
          <div>
            <h3 className={colHead}>Academy</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/academy" className={link}>All Courses</Link>
              <Link href="/academy/prompt-engineering-creators" className={`${link} flex items-center gap-1.5`}>
                <span className="bg-[var(--teal)] px-1 py-0.5 font-[family-name:var(--font-narrow)] text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--paper)]">New</span>
                Prompt Engineering
              </Link>
              <Link href="/courses/ai-conversation-fundamentals" className={`${link} flex items-center gap-1.5`}>
                <span className="bg-[var(--teal)] px-1 py-0.5 font-[family-name:var(--font-narrow)] text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--paper)]">Free</span>
                AI Fundamentals
              </Link>
              <Link href="/courses/claude-for-knowledge-workers" className={link}>Claude Code Course</Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className={colHead}>Connect</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/contact" className={link}>Start a Conversation</Link>
              <a href="https://x.com/eddiebe" target="_blank" rel="noopener noreferrer" className={link}>X @eddiebe</a>
              <a href="https://github.com/eddiebelaval" target="_blank" rel="noopener noreferrer" className={link}>GitHub</a>
              <a href="https://linkedin.com/in/eddiebelaval" target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--hair)] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--teal)]" />
              <span>Currently taking projects</span>
            </div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              Built with Next.js + Vercel + Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
