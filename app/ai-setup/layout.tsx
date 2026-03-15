import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'AI Setup - White-Glove AI Agent Deployment | ID8Labs',
  description:
    'Your AI assistant, built and running in 24 hours. We deploy, harden, and customize your AI agent — then keep it running while you focus on the work.',
  openGraph: {
    title: 'AI Setup - White-Glove AI Agent Deployment | ID8Labs',
    description:
      'Your AI assistant, built and running in 24 hours. We deploy, harden, and customize your AI agent.',
    type: 'website',
  },
}

export default function AISetupLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
