'use client'

import { useState, useEffect } from 'react'

// Front page section definitions
const sections = [
  { id: 'hero', title: 'ID8Labs' },
  { id: 'deploy', title: 'Work With Us' },
  { id: 'products', title: 'Proof' },
  { id: 'latest', title: 'Latest' },
  { id: 'mission', title: 'Philosophy' },
  { id: 'education', title: 'Learn' },
  { id: 'builder', title: 'Builder' },
]

function SideNavigation({ activeSection }: { activeSection: string }) {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-20">
      <ul className="space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
                aria-label={`Jump to ${section.title}`}
              >
                <span
                  className={`h-px transition-all duration-150 ${
                    isActive
                      ? 'w-12 bg-id8-orange'
                      : 'w-8 bg-[var(--hair-hard)] group-hover:w-10 group-hover:bg-[var(--ink)]'
                  }`}
                />
                <span
                  className={`transition-opacity duration-150 ${
                    isActive
                      ? 'text-id8-orange opacity-100'
                      : 'text-[var(--muted)] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function HomeNavigation() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return <SideNavigation activeSection={activeSection} />
}
