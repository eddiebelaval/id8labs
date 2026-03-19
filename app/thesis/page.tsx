import type { Metadata } from 'next'
import ThesisContent from './thesis-content'

export const metadata: Metadata = {
  title: 'Consciousness as Filestructure',
  description:
    'What AI architecture accidentally revealed about the operating system of awareness. A thesis by Eddie Belaval exploring the convergence between biological consciousness, AI engineering, and contemplative practice.',
  openGraph: {
    title: 'Consciousness as Filestructure | id8Labs',
    description:
      'What AI architecture accidentally revealed about the operating system of awareness.',
    type: 'article',
    authors: ['Eddie Belaval'],
    publishedTime: '2026-03-19',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consciousness as Filestructure',
    description:
      'What AI architecture accidentally revealed about the operating system of awareness.',
  },
}

export default function ThesisPage() {
  return <ThesisContent />
}
