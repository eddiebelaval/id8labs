import Link from 'next/link'
import BrandName from './BrandName'
import { Container } from '@/components/editorial'
import { studioNavigation } from '@/lib/studio'

const label = 'mb-5 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]'
const link = 'py-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] bg-[var(--paper)]">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="id8Labs home"><BrandName className="h-10" /></Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--muted)]">Independent software studio.<br />Good questions. Useful software.<br />Built in Miami, shared in public.</p>
          </div>
          <nav aria-label="Studio links" className="flex flex-col items-start">
            <h2 className={label}>The studio</h2>
            {studioNavigation.map((item) => <Link key={item.href} href={item.href} className={link}>{item.label}</Link>)}
            <Link href="/eddie" className={link}>About Eddie</Link>
          </nav>
          <nav aria-label="Resources" className="flex flex-col items-start">
            <h2 className={label}>From the lab</h2>
            <Link href="/shipped" className={link}>Shipped. magazine</Link>
            <Link href="/stackshack" className={link}>StackShack</Link>
            <Link href="/newsletter" className={link}>Newsletter</Link>
            <Link href="/brand" className={link}>The identity</Link>
          </nav>
          <nav aria-label="Connect" className="flex flex-col items-start">
            <h2 className={label}>Say hello</h2>
            <Link href="/contact" className={link}>Contact</Link>
            <a href="https://github.com/eddiebelaval" className={link} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://x.com/eddiebe" className={link} target="_blank" rel="noopener noreferrer">X</a>
            <p className="mt-5 max-w-[210px] text-xs leading-relaxed text-[var(--muted)]">For commissioned systems, visit <a href="https://hamato.systems" className="underline underline-offset-4 transition-colors hover:text-[var(--ink)]">Hamato</a>.</p>
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--hair)] pt-6 font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
          <p>© {new Date().getFullYear()} id8Labs · Miami, FL</p>
          <div className="flex gap-6"><Link href="/privacy" className="hover:text-[var(--ink)]">Privacy</Link><Link href="/terms" className="hover:text-[var(--ink)]">Terms</Link></div>
        </div>
      </Container>
    </footer>
  )
}
