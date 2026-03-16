import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agent Deployment Services | ID8Labs',
  description: 'White-glove AI agent deployment. We build, deploy, and tune OpenClaw agents on your hardware — wired into your tools, customized to your workflow. Running in 24 hours.',
  keywords: [
    'AI agent deployment',
    'OpenClaw setup',
    'AI implementation services',
    'AI workflow automation',
    'white-glove AI setup',
    'AI consulting',
    'AI agents for business',
    'custom AI agents',
  ],
  openGraph: {
    title: 'AI Agent Deployment Services | ID8Labs',
    description: 'White-glove AI agent deployment. We build, deploy, and tune OpenClaw agents on your hardware — wired into your tools, customized to your workflow.',
    url: 'https://id8labs.app/services',
    siteName: 'ID8Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Deployment | ID8Labs',
    description: 'White-glove AI agent deployment. OpenClaw agents on your hardware, running in 24 hours.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
