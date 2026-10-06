import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import Header from '@/components/Header'
import Home from '@/app/page'
import { studioProducts } from '@/lib/studio'
import { getLeadDaily } from '@/lib/shipped/frontpage'

vi.mock('next/navigation', () => ({ usePathname: () => '/products' }))
vi.mock('next/link', () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
}))
vi.mock('next/image', () => ({
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => <img {...props} alt={props.alt} />,
}))
vi.mock('@/lib/mdx-essays', () => ({
  getAllEssays: () => [
    { slug: 'what-an-agent-loves', title: 'What an Agent Loves', date: '2026-09-17', category: 'research', excerpt: 'A field note from the work.' },
  ],
}))

afterEach(cleanup)

describe('Studio navigation', () => {
  it('offers four focused destinations and marks the current page', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav.querySelectorAll('a')).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'Software' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Notebook' })).toHaveAttribute('href', '/writing')
  })

  it('opens the mobile destinations, closes with Escape, and returns focus', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('closes the mobile menu when a resource is chosen', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }))
    fireEvent.click(screen.getByRole('link', { name: 'StackShack' }))
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })
})

describe('Studio homepage preservation', () => {
  it('renders the selected product links and keeps Rune labeled Beta', () => {
    render(<Home />)
    for (const product of studioProducts) {
      const links = screen.getAllByRole('link', { name: `Explore ${product.name}`, exact: true })
      for (const link of links) expect(link).toHaveAttribute('href', product.href)
    }
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'The full collection' })).toHaveAttribute('href', '/products')
    expect(screen.getByRole('link', { name: 'Learn with the lab' })).toHaveAttribute('href', '/academy')
  })

  it('shows the current Shipped edition while keeping the entry in the studio', () => {
    const html = renderToStaticMarkup(<Home />)
    const lead = getLeadDaily()
    expect(lead).toBeDefined()
    expect(html).toContain('href="/shipped"')
    expect(html).not.toContain('href="https://eddiebelaval.github.io/shipped/')
    expect(html).toContain(lead!.date.slice(0, 4))
  })

  it('publishes studio and product structured data in the server HTML', () => {
    const html = renderToStaticMarkup(<Home />)
    const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
    expect(raw).toBeDefined()
    const graph = JSON.parse(raw!)['@graph']
    expect(graph.find((item: { '@type': string }) => item['@type'] === 'Organization').description).toContain('independent software studio')
    expect(graph.filter((item: { '@type': string }) => item['@type'] === 'SoftwareApplication')).toHaveLength(3)
    expect(graph.some((item: { '@type': string }) => item['@type'] === 'Service')).toBe(false)
    expect(html).not.toContain('priceCurrency')
  })
})
