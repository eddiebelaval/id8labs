import type { Metadata } from 'next'
import LabStoryContent from './LabStoryContent'

export const metadata: Metadata = {
  title: 'Lab Story',
  description: 'From cameraman to primitive chain architect. Twenty years in production taught us that the leverage was never in the tools, it was in the architecture between them.',
}

export default function LabStoryPage() {
  return <LabStoryContent />
}
