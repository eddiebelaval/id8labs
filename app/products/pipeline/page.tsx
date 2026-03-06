import type { Metadata } from 'next'
import PipelineContent from './PipelineContent'

export const metadata: Metadata = {
  title: 'Pipeline - ID8Labs',
  description: 'Complete idea-to-exit lifecycle management for solo builders. 8 interconnected AI agents handle validation, architecture, launch, growth, ops, and exit prep with decay mechanics and stage gates.',
  alternates: { canonical: '/products/pipeline' },
  openGraph: {
    title: 'Pipeline | id8Labs',
    description: 'Complete idea-to-exit lifecycle management for solo builders. 8 interconnected AI agents with decay mechanics and stage gates.',
    url: 'https://id8labs.app/products/pipeline',
  },
}

export default function PipelinePage() {
  return <PipelineContent />
}
