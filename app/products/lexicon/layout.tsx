import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lexicon',
  description: 'Wikipedia meets Perplexity for story universes. Graph-powered knowledge platform for narrative worlds.',
  alternates: { canonical: '/products/lexicon' },
  openGraph: {
    title: 'Lexicon | id8Labs',
    description: 'Wikipedia meets Perplexity for story universes. Graph-powered knowledge platform for narrative worlds.',
    url: 'https://id8labs.app/products/lexicon',
  },
}

export default function LexiconLayout({ children }: { children: React.ReactNode }) {
  return children
}
