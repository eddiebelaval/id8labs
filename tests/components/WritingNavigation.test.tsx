import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { WritingList } from '@/app/writing/writing-list'
import WritingPage from '@/app/writing/page'
import NewsletterArchivePage from '@/app/newsletter/page'
import { generateMetadata as newsletterMetadata } from '@/app/newsletter/[slug]/page'

const { redirect, getAllWriting } = vi.hoisted(() => ({
  redirect: vi.fn((path: string) => { throw new Error(`Redirect to ${path}`) }),
  getAllWriting: vi.fn(() => []),
}))

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  redirect,
}))
vi.mock('@/lib/writing', () => ({ getAllWriting }))
vi.mock('@/components/newsletter', () => ({ NewsletterSubscribe: () => null }))
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt} />,
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Writing and magazine destinations', () => {
  it('sends the Magazine control to the real Shipped front page', () => {
    render(<WritingList items={[]} />)
    expect(screen.getByRole('link', { name: 'Magazine', exact: true })).toHaveAttribute('href', '/shipped')
    expect(screen.queryByRole('button', { name: 'Magazine', exact: true })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Essays', exact: true })).toBeInTheDocument()
  })

  it('redirects a legacy Magazine bookmark before loading the writing feed', () => {
    expect(() => WritingPage({ searchParams: { filter: 'magazine' } })).toThrow('Redirect to /shipped')
    expect(redirect).toHaveBeenCalledWith('/shipped')
    expect(getAllWriting).not.toHaveBeenCalled()
  })

  it('keeps normal Writing category URLs on the notebook', () => {
    expect(WritingPage({ searchParams: { filter: 'research' } })).toBeTruthy()
    expect(redirect).not.toHaveBeenCalled()
    expect(getAllWriting).toHaveBeenCalledOnce()
  })

  it('names the newsletter Signal to Noise while retaining the separate magazine link', () => {
    render(<WritingList items={[]} />)
    fireEvent.click(screen.getByRole('button', { name: 'Newsletter', exact: true }))
    expect(screen.getByRole('heading', { name: 'Signal to Noise', exact: true })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Signal to Noise', exact: true })).toHaveAttribute('src', '/brand/signal-to-noise-wordmark.svg')
    expect(screen.getByRole('heading', { name: 'Get Signal to Noise delivered' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Magazine', exact: true })).toHaveAttribute('href', '/shipped')
    expect(screen.getAllByRole('img', { name: 'Shipped.' })).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Shipped.' })).toHaveAttribute('href', '/shipped')
  })

  it('opens newsletter archive links with the Newsletter filter selected', () => {
    expect(() => NewsletterArchivePage()).toThrow('Redirect to /writing?filter=newsletter')
  })

  it('identifies a newsletter issue as Signal to Noise in its page title', async () => {
    const metadata = await newsletterMetadata({ params: Promise.resolve({ slug: 'issue-3' }) })
    expect(metadata.title).toContain('Signal to Noise')
    expect(metadata.title).not.toContain('Shipped')
  })
})
