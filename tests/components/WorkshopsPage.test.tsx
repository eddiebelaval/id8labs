import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { WorkshopsIndex } from '@/components/workshops/WorkshopsIndex'

vi.mock('next/link', () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
}))

afterEach(cleanup)

describe('Workshops page', () => {
  it('links both journal stories and stays on the paper palette', () => {
    const { container } = render(<WorkshopsIndex locale="en" />)
    expect(container.querySelector('article')).toHaveAttribute('lang', 'en')
    expect(screen.getByRole('link', { name: /Read the journal/i })).toHaveAttribute('href', '/writing/the-paper-stays')
    expect(screen.getByRole('link', { name: 'Presence, Not Tools' })).toHaveAttribute('href', '/writing/presence-not-tools')
    expect(screen.getByRole('link', { name: 'Your Next AI Hire Is Already on Your Payroll' })).toHaveAttribute(
      'href',
      '/writing/your-next-ai-hire-is-already-on-your-payroll',
    )
    expect(screen.getByRole('link', { name: 'Español' })).toHaveAttribute('href', '/es/workshops')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Teaching from Miami Lakes.')
    expect(container.innerHTML).toContain('Miami Lakes is the home base.')
    expect(container.innerHTML).toContain('wherever it fits')
    expect(container.innerHTML).toContain('thirty to forty')
    expect(container.innerHTML).toContain('Universidad Ana G. Méndez) in Miami Lakes')
    expect(container.innerHTML).not.toContain('Doral')
    expect(container.innerHTML).not.toContain('Jose Cruz')
    expect(container.innerHTML).not.toMatch(/dark:/)
  })

  it('marks the Spanish page and keeps the same journal links', () => {
    const { container } = render(<WorkshopsIndex locale="es" />)
    expect(container.querySelector('article')).toHaveAttribute('lang', 'es')
    expect(screen.getByRole('link', { name: /Leer el diario/i })).toHaveAttribute('href', '/writing/the-paper-stays')
    expect(screen.getByRole('link', { name: 'Presence, Not Tools' })).toHaveAttribute('href', '/writing/presence-not-tools')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Enseñanza desde Miami Lakes.')
    expect(container.innerHTML).toContain('Miami Lakes es la base.')
    expect(container.innerHTML).toContain('donde haga falta')
    expect(container.innerHTML).toContain('Universidad Ana G. Méndez')
    expect(container.innerHTML).toContain('en Miami Lakes')
    expect(container.innerHTML).toContain('treinta y cuarenta')
    expect(container.innerHTML).not.toContain('Doral')
    expect(container.innerHTML).not.toContain('Jose Cruz')
  })
})
