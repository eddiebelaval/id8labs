import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academy',
  description: 'Free self-paced courses from id8Labs. Learn to work with AI through real examples, from your first conversation to building with Claude Code.',
  alternates: { canonical: '/academy' },
  openGraph: {
    title: 'Academy | id8Labs',
    description: 'Free self-paced courses from id8Labs. Learn to work with AI through real examples, from your first conversation to building with Claude Code.',
    url: 'https://id8labs.si/academy',
  },
}

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return children
}
