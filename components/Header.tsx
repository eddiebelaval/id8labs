'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import BrandName from './BrandName'
import { Container } from '@/components/editorial'
import { studioNavigation } from '@/lib/studio'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hair)] bg-[var(--paper)]">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="id8Labs home" onClick={() => setOpen(false)} className="transition-opacity hover:opacity-70">
            <BrandName className="h-9" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
            {studioNavigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined} className="py-3 font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--ink)] aria-[current=page]:text-[var(--ink)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <button ref={toggle} type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} className="rounded-[10px] p-3 text-[var(--ink)] transition-colors hover:bg-[var(--paper-shadow)] md:hidden">
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-[var(--hair)] md:hidden">
          <Container className="pb-7 pt-2">
            {studioNavigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined} onClick={() => setOpen(false)} className="block border-b border-[var(--hair)] py-4">
                <span className="block font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">{item.label}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">{item.description}</span>
              </Link>
            ))}
            <div className="mt-5 flex gap-6 text-sm text-[var(--muted)]">
              <Link href="/stackshack" onClick={() => setOpen(false)}>StackShack</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            </div>
          </Container>
        </nav>
      )}
    </header>
  )
}
