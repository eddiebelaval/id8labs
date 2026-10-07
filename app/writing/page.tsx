import { Metadata } from 'next'
import { getAllWriting } from '@/lib/writing'
import { WritingList } from './writing-list'

export const metadata: Metadata = {
  title: 'The Notebook: Essays and Research',
  description: 'The open notebook of id8Labs: essays, research, and observations from building software with AI. Shipped. follows what the AI labs release.',
  alternates: { canonical: '/writing' },
}

// Revalidate every hour to pick up new content
export const revalidate = 3600  // 1 hour in seconds

export default function WritingPage() {
  // Server-side: fetch all writing content (essays + newsletters)
  const allWriting = getAllWriting()

  // Pass to client component for interactivity
  return <WritingList items={allWriting} />
}
