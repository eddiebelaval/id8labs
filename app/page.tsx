import type { Metadata } from 'next'
import StudioHome from '@/components/StudioHome'
import { STUDIO_DESCRIPTION, studioProducts } from '@/lib/studio'

export const metadata: Metadata = {
  title: { absolute: 'id8Labs | Independent Software Studio' },
  description: STUDIO_DESCRIPTION,
  alternates: { canonical: 'https://id8labs.app' },
  openGraph: {
    title: 'id8Labs | Good questions. Useful software.',
    description: STUDIO_DESCRIPTION,
    url: 'https://id8labs.app',
  },
  twitter: {
    title: 'id8Labs | Good questions. Useful software.',
    description: STUDIO_DESCRIPTION,
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://id8labs.app/#studio',
      name: 'id8Labs',
      url: 'https://id8labs.app',
      logo: 'https://id8labs.app/brand/id8labs-lockup.svg',
      description: STUDIO_DESCRIPTION,
      foundingDate: '2024',
      founder: { '@type': 'Person', name: 'Eddie Belaval', url: 'https://id8labs.app/eddie' },
      sameAs: ['https://x.com/eddiebe', 'https://github.com/eddiebelaval'],
    },
    {
      '@type': 'WebSite',
      name: 'id8Labs',
      url: 'https://id8labs.app',
      description: STUDIO_DESCRIPTION,
      publisher: { '@id': 'https://id8labs.app/#studio' },
    },
    ...studioProducts.map((product) => ({
      '@type': 'SoftwareApplication',
      name: product.name,
      url: `https://id8labs.app${product.href}`,
      description: product.summary,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      author: { '@id': 'https://id8labs.app/#studio' },
    })),
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <StudioHome />
    </>
  )
}
