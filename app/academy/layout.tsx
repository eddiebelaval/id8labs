import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academy',
  description: 'AI-powered courses and learning resources from id8Labs. Master modern development with hands-on, project-based learning.',
  alternates: { canonical: '/academy' },
  openGraph: {
    title: 'Academy | id8Labs',
    description: 'AI-powered courses and learning resources from id8Labs. Master modern development with hands-on, project-based learning.',
    url: 'https://id8labs.app/academy',
  },
}

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return children
}
