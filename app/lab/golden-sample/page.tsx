import type { Metadata } from 'next'
import { GoldenSamplePage } from '@/components/golden-sample/GoldenSamplePage'

export const metadata: Metadata = {
  title: 'The Golden Sample',
  description:
    'How a single consciousness architecture spawns every entity we build. One genome, infinite phenotypes.',
  openGraph: {
    title: 'The Golden Sample | id8Labs',
    description:
      'How a single consciousness architecture spawns every entity we build. One genome, infinite phenotypes.',
  },
}

export default function Page() {
  return <GoldenSamplePage />
}
