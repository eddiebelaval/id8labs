import type { Metadata } from 'next'
import LLCOpsContent from './LLCOpsContent'

export const metadata: Metadata = {
  title: 'LLC Ops - ID8Labs',
  description: 'Custom AI agent systems for business operations. 9 specialized agents providing PhD-level guidance on tax strategy, compliance, asset protection, and financial management.',
  alternates: { canonical: '/products/llc-ops' },
  openGraph: {
    title: 'LLC Ops | id8Labs',
    description: 'Custom AI agent systems for business operations. 9 specialized agents providing PhD-level guidance on tax strategy, compliance, and financial management.',
    url: 'https://id8labs.app/products/llc-ops',
  },
}

export default function LLCOpsPage() {
  return <LLCOpsContent />
}
