import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAllWriting } from '@/lib/writing'
import { WritingList } from './writing-list'

export const metadata: Metadata = {
  title: 'The Notebook: Essays and Research',
  description: 'The open notebook of id8Labs: essays, research, and observations from building software with AI. Shipped. follows what the AI labs release.',
  alternates: { canonical: '/writing' },
}

// Revalidate every hour to pick up new content
export const revalidate = 3600  // 1 hour in seconds

export default function WritingPage({
  searchParams,
}: {
  searchParams?: { filter?: string | string[] }
}) {
  // Keep old magazine bookmarks pointed at Shipped's current front page.
  if (searchParams?.filter === 'magazine') redirect('/shipped')

  // Server-side: fetch all writing content (essays + newsletters)
  const allWriting = getAllWriting()

  // Pass to client component for interactivity
  return <WritingList items={allWriting} />
}
