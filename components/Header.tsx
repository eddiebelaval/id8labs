'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import BrandName from './BrandName'
import { StackShackLogo } from './StackShackLogo'

const navLink =
  'font-[family-name:var(--font-narrow)] text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)] hover:text-id8-orange transition-colors'

const dropItem =
  'block px-4 py-2.5 hover:bg-[var(--paper-shadow)] transition-colors'

const dropKicker =
  'px-4 pb-2 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [academyExpanded, setAcademyExpanded] = useState(false)
  const [desktopAcademyOpen, setDesktopAcademyOpen] = useState(false)
  const [labExpanded, setLabExpanded] = useState(false)
  const [desktopLabOpen, setDesktopLabOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!desktopAcademyOpen && !desktopLabOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopAcademyOpen(false)
        setDesktopLabOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [desktopAcademyOpen, desktopLabOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper)]/95 backdrop-blur-sm">
        <div className="container">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            {/* Wordmark */}
            <Link
              href="/"
              className="text-3xl font-medium tracking-tight hover:opacity-70 transition-opacity"
            >
              <BrandName />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex">
              <Link href="/products" className={navLink}>
                Products
              </Link>
              <Link href="/services" className={navLink}>
                Services
              </Link>

              {/* Academy dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDesktopAcademyOpen(true)}
                onMouseLeave={() => setDesktopAcademyOpen(false)}
              >
                <Link href="/academy" className={`${navLink} flex items-center gap-1`}>
                  Academy
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${desktopAcademyOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-150 ${desktopAcademyOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
                >
                  <div className="min-w-[380px] border border-[var(--rule)] bg-[var(--paper)] py-3">
                    <p className={dropKicker}>Start Here</p>
                    <Link
                      href="/courses/ai-conversation-fundamentals"
                      className={`${dropItem} flex items-center gap-3`}
                    >
                      <span className="bg-id8-orange px-1.5 py-0.5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--paper)]">
                        Foundation
                      </span>
                      <span>
                        <span className="block text-sm font-medium">AI Conversation Fundamentals</span>
                        <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                          6 modules · 45 min · Free
                        </span>
                      </span>
                    </Link>

                    <div className="mx-4 my-2 h-px bg-[var(--hair)]" />

                    <p className={`${dropKicker} pt-1`}>For Individuals</p>
                    <Link
                      href="/academy/prompt-engineering-creators"
                      className={`${dropItem} flex items-center gap-3`}
                    >
                      <span className="bg-[var(--teal)] px-1.5 py-0.5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--paper)]">
                        New
                      </span>
                      <span>
                        <span className="block text-sm font-medium">Prompt Engineering for Creators</span>
                        <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                          9 modules · Better prompts &amp; outputs
                        </span>
                      </span>
                    </Link>
                    <Link href="/academy/ai-partner-mastery" className={dropItem}>
                      <span className="block text-sm font-medium">AI Partner Mastery</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        8 modules · Work with AI daily
                      </span>
                    </Link>
                    <Link href="/courses/claude-for-knowledge-workers" className={dropItem}>
                      <span className="block text-sm font-medium">Claude Code for Knowledge Workers</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        10 modules · Full delegation course
                      </span>
                    </Link>

                    <div className="mx-4 my-2 h-px bg-[var(--hair)]" />

                    <p className={`${dropKicker} pt-1`}>For Organizations</p>
                    <Link href="/academy/ai-for-leaders" className={dropItem}>
                      <span className="block text-sm font-medium">AI for Leaders</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        8 modules · Strategic adoption
                      </span>
                    </Link>
                    <Link href="/academy/ai-at-scale" className={dropItem}>
                      <span className="block text-sm font-medium">AI at Scale</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        8 modules · Team adoption
                      </span>
                    </Link>
                    <Link href="/academy/private-ai" className={dropItem}>
                      <span className="block text-sm font-medium">Private AI</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        8 modules · Security &amp; compliance
                      </span>
                    </Link>

                    <div className="mx-4 my-2 h-px bg-[var(--hair)]" />

                    <Link
                      href="/academy"
                      className={`${dropItem} flex items-center justify-between text-id8-orange`}
                    >
                      <span className="text-sm font-medium">View Full Curriculum</span>
                      <span className="font-[family-name:var(--font-mono)] text-xs">7 courses · 57 modules</span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/writing" className={navLink}>
                Writing
              </Link>
              <Link href="/writing?filter=magazine" className={navLink}>
                Shipped<span className="text-id8-orange">.</span>
              </Link>

              {/* Lab dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDesktopLabOpen(true)}
                onMouseLeave={() => setDesktopLabOpen(false)}
              >
                <Link href="/lab" className={`${navLink} flex items-center gap-1`}>
                  Lab
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${desktopLabOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-150 ${desktopLabOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
                >
                  <div className="min-w-[300px] border border-[var(--rule)] bg-[var(--paper)] py-3">
                    <Link href="/thesis" className={dropItem}>
                      <span className="block text-sm font-medium">Thesis</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        Consciousness as Filestructure
                      </span>
                    </Link>
                    <Link href="/thesis/series" className={dropItem}>
                      <span className="block text-sm font-medium">CaF Series</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        The complete research series (5 parts)
                      </span>
                    </Link>
                    <Link href="/lab/story" className={dropItem}>
                      <span className="block text-sm font-medium">Lab Story</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        How we got here
                      </span>
                    </Link>

                    <div className="mx-4 my-2 h-px bg-[var(--hair)]" />

                    <Link href="/writing?category=research" className={dropItem}>
                      <span className="block text-sm font-medium">Research</span>
                      <span className="block font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                        Published research and deep dives
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/contact" className={navLink}>
                Contact
              </Link>
              <Link
                href="/stackshack"
                className="hover:opacity-80 transition-opacity"
                aria-label="Stack Shack"
              >
                <StackShackLogo size="sm" />
              </Link>
              <Link
                href="/claude-corner"
                className="flex items-center font-[family-name:var(--font-mono)] text-[var(--muted)] transition-colors hover:text-id8-orange"
                title="Claude Corner"
              >
                <span className="text-sm">{'>_'}</span>
                <span className="ml-0.5 h-4 w-[2px] animate-pulse bg-current" />
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-[70] -mr-2 touch-manipulation p-3 transition-opacity hover:opacity-70 lg:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 top-16 z-[100] overflow-y-auto overscroll-contain bg-[var(--paper)] [-webkit-overflow-scrolling:touch] lg:hidden"
        >
          <div className="container space-y-4 border-t border-[var(--rule)] pb-24 pt-6">
            <Link href="/products" className="block text-lg hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>
            <Link href="/services" className="block text-lg hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>

            {/* Mobile Academy */}
            <div className="space-y-3">
              <button
                onClick={() => setAcademyExpanded(!academyExpanded)}
                className="-my-2 flex w-full items-center justify-between py-2 text-lg font-medium transition-colors hover:text-id8-orange"
                aria-expanded={academyExpanded}
              >
                <span>Academy</span>
                <svg className={`h-5 w-5 transition-transform duration-200 ${academyExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {academyExpanded && (
                <div className="ml-2 space-y-3 border-l border-[var(--hair)] pl-2">
                  <p className="pl-2 pt-2 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Start Here</p>
                  <Link href="/courses/ai-conversation-fundamentals" className="flex items-center gap-2 pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>
                    <span className="bg-id8-orange px-1.5 py-0.5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--paper)]">Foundation</span>
                    AI Fundamentals
                  </Link>
                  <p className="pl-2 pt-2 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">For Individuals</p>
                  <Link href="/academy/prompt-engineering-creators" className="block pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>Prompt Engineering</Link>
                  <Link href="/academy/ai-partner-mastery" className="block pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>AI Partner Mastery</Link>
                  <Link href="/courses/claude-for-knowledge-workers" className="block pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>Claude Code Course</Link>
                  <p className="pl-2 pt-2 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">For Organizations</p>
                  <Link href="/academy/ai-for-leaders" className="block pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>AI for Leaders</Link>
                  <Link href="/academy/ai-at-scale" className="block pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>AI at Scale</Link>
                  <Link href="/academy/private-ai" className="block pl-2 text-base text-[var(--muted)] transition-colors hover:text-[var(--ink)]" onClick={() => setMobileMenuOpen(false)}>Private AI</Link>
                  <Link href="/academy" className="block pl-2 text-base font-medium text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>View Full Curriculum →</Link>
                </div>
              )}
            </div>

            <Link href="/writing" className="block text-lg hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Writing
            </Link>
            <Link href="/writing?filter=magazine" className="block text-lg hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Shipped<span className="text-id8-orange">.</span>
            </Link>

            {/* Mobile Lab */}
            <div>
              <button className="flex w-full items-center gap-2 text-lg hover:text-id8-orange transition-colors" onClick={() => setLabExpanded(!labExpanded)}>
                Lab
                <svg className={`h-4 w-4 transition-transform ${labExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {labExpanded && (
                <div className="mt-3 space-y-3 border-l border-[var(--hair)] pl-4">
                  <Link href="/thesis" className="block text-base hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Thesis</Link>
                  <Link href="/thesis/series" className="block text-base hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>CaF Series</Link>
                  <Link href="/lab/story" className="block text-base hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Lab Story</Link>
                  <Link href="/writing?category=research" className="block text-base hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Research</Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="block text-lg hover:text-id8-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/stackshack" className="hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
              <StackShackLogo size="md" />
            </Link>
            <Link href="/claude-corner" className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[var(--muted)] transition-colors hover:text-id8-orange" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-lg">{'>_'}</span>
              <span className="h-5 w-[2px] animate-pulse bg-current" />
              <span className="text-xs uppercase tracking-wider">Claude Corner</span>
            </Link>
          </div>
        </nav>
      )}
    </>
  )
}
