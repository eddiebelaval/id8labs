import type { Metadata } from 'next'
import { WorkshopsIndex } from '@/components/workshops/WorkshopsIndex'

const description =
  'Enseñanza desde Miami Lakes, en inglés y en español. Eddie ayuda a dueños de pequeños negocios y a otras personas a aprender herramientas de inteligencia artificial, como Claude Code, y a construir su propia infraestructura. Las sesiones caben en una sala, un grupo pequeño o una persona. El diario de la noche de US Century Bank y de Presencia.'

export const metadata: Metadata = {
  title: 'Enseñanza',
  description,
  alternates: {
    canonical: '/es/workshops',
    languages: {
      en: '/workshops',
      es: '/es/workshops',
    },
  },
}

export default function TalleresPage() {
  return <WorkshopsIndex locale="es" />
}
