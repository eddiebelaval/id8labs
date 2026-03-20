import type { Metadata } from 'next'
import LabStoryContent from './LabStoryContent'

export const metadata: Metadata = {
  title: 'Lab Story',
  description: 'From cameraman to systems architect. Twenty years in production, now building tools for creators and infrastructure for builders.',
}

export default function LabStoryPage() {
  return <LabStoryContent />
}
