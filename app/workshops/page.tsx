import type { Metadata } from 'next'
import { WorkshopsIndex } from '@/components/workshops/WorkshopsIndex'

const description =
  'Teaching from Miami Lakes, in English and Spanish. Eddie helps small-business owners and people learn AI tools such as Claude Code and build their own infrastructure. Sessions fit a room, a small group, or one person. Journal accounts of the US Century Bank night and Presencia.'

export const metadata: Metadata = {
  title: 'Teaching',
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
