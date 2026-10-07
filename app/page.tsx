import type { Metadata } from 'next'
import StudioHome from '@/components/StudioHome'
import { STUDIO_DESCRIPTION, studioProducts } from '@/lib/studio'

export const metadata: Metadata = {
  title: { absolute: 'id8Labs | Independent Software Studio' },
  description: STUDIO_DESCRIPTION,
  alternates: { canonical: 'https://id8labs.app' },
  // Next.js REPLACES the layout's openGraph/twitter with a page's (no merge), so the homepage
  // restates them in full: without the image, a shared id8labs.app link had no preview.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'id8Labs',
    title: 'id8Labs | Good questions. Useful software.',
    description: STUDIO_DESCRIPTION,
    url: 'https://id8labs.app',
    images: [{ url: '/og-image.png?v=3', width: 1200, height: 630, alt: 'id8Labs, an independent software studio.' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@eddiebe',
    title: 'id8Labs | Good questions. Useful software.',
    description: STUDIO_DESCRIPTION,
    images: ['/og-image.png?v=3'],
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
