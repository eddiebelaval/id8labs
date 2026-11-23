import type { Metadata } from 'next'
import { WorkshopsIndex } from '@/components/workshops/WorkshopsIndex'

const description =
  'Talleres en Miami, en inglés y en español. Eddie ayuda a dueños de pequeños negocios y a otras personas a aprender herramientas de inteligencia artificial, como Claude Code, y a construir su propia infraestructura. El diario de la noche de US Century Bank y de Presencia.'

export const metadata: Metadata = {
  title: 'Talleres',
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
