import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Milo',
  description: 'Mission Intelligence Life Operator. An AI entity with persistent memory, emotional awareness, and genuine personality.',
  alternates: { canonical: '/products/milo' },
  openGraph: {
    title: 'Milo | id8Labs',
    description: 'Mission Intelligence Life Operator. An AI entity with persistent memory, emotional awareness, and genuine personality.',
    url: 'https://id8labs.app/products/milo',
  },
}

export default function MiloLayout({ children }: { children: React.ReactNode }) {
  return children
}
