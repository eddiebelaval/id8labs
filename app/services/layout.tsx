import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'We install HALO, your operating DNA, inside your business and stay its custodian. Primitive chains with human gates, forward-deployed. A workshop opens it, an audit confirms the fit, we build and tend.',
  keywords: [
    'forward deployment',
    'primitive chain architecture',
    'AI operations',
    'HALO',
    'AI for professional services',
    'AI for law firms',
    'custom AI systems',
    'AI custodianship retainer',
  ],
  openGraph: {
    title: 'Services | ID8Labs',
    description: 'We install HALO, your operating DNA, inside your business and stay its custodian. Forward deployment for AI-era operators.',
    url: 'https://id8labs.app/services',
    siteName: 'ID8Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | ID8Labs',
    description: 'We install your operating DNA inside your business and stay its custodian. Forward deployment, primitive chains, human gates.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
