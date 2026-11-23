import type { Metadata } from 'next'
import { WorkshopsIndex } from '@/components/workshops/WorkshopsIndex'

const description =
  'Workshops in Miami, in English and Spanish. Eddie helps small-business owners and people learn AI tools such as Claude Code and build their own infrastructure. Journal accounts of the US Century Bank night and Presencia.'

export const metadata: Metadata = {
  title: 'Workshops',
  description,
  alternates: {
    canonical: '/workshops',
    languages: {
      en: '/workshops',
      es: '/es/workshops',
    },
  },
}

export default function WorkshopsPage() {
  return <WorkshopsIndex locale="en" />
}
