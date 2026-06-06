import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Architecture & Agent Deployment | ID8Labs',
  description: 'White-glove AI architecture. We design primitive chains with human gates, then build and deploy them on your hardware — wired into your tools, customized to your workflow. Running in 24 hours.',
  keywords: [
    'AI agent deployment',
    'primitive chain architecture',
    'AI implementation services',
    'AI workflow automation',
    'white-glove AI setup',
    'AI consulting',
    'AI agents for business',
    'custom AI agents',
  ],
  openGraph: {
    title: 'AI Architecture & Agent Deployment | ID8Labs',
    description: 'White-glove AI architecture. We design primitive chains with human gates, then build and deploy them on your hardware — wired into your tools, customized to your workflow.',
    url: 'https://id8labs.app/services',
    siteName: 'ID8Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Architecture & Deployment | ID8Labs',
    description: 'White-glove AI architecture. Primitive chains with human gates, deployed on your hardware, running in 24 hours.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
