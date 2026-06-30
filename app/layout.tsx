import type { Metadata, Viewport } from 'next'
import { Fraunces, Archivo, Archivo_Narrow, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleAnalytics, UmamiAnalytics } from '@/components/Analytics'
import ContentFrost from '@/components/ContentFrost'

// ── Editorial type system ("Shipped." design language) ──
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
})

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-archivo-narrow',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
})

// Explicit viewport so mobile scaling + browser UI tint are intentional.
// The site is light-only (editorial paper), so themeColor matches --paper.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fafaf7',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: {
    default: 'id8Labs - An Independent Lab Building the Tools of the AI Build Wave',
    template: '%s | id8Labs',
  },
  description: 'id8Labs is an independent lab building the tools of the AI build wave, and writing its field notes every Friday. One cross-domain builder, a portfolio of real products shipped at institutional scale. Composer, DeepStack, Pipeline, LLC Ops, Shipped, and the Academy.',
  keywords: [
    'Independent AI Lab',
    'Build in Public',
    'Primitive Chain Architecture',
    'Agent Systems Design',
    'Solo Builder at Institutional Scale',
    'Claude Code',
    'MCP Servers',
    'AI Agent Development',
    'id8Labs',
    'DeepStack',
  ],
  authors: [{ name: 'Eddie Belaval', url: 'https://id8labs.app' }],
  creator: 'Eddie Belaval',
  metadataBase: new URL('https://id8labs.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://id8labs.app',
    siteName: 'id8Labs',
    title: 'id8Labs - An Independent Lab Building the Tools of the AI Build Wave',
    description: 'A one-person product lab. Many real products, a deep personal AI substrate, and the field notes of the build wave written every Friday. Proof that one cross-domain builder can ship at institutional scale.',
    images: [
      {
        url: '/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'id8Labs - An independent lab building the tools of the AI build wave.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'id8Labs - An Independent Lab Building the Tools of the AI Build Wave',
    description: 'A one-person product lab building the tools of the AI build wave and writing its field notes every Friday.',
    creator: '@eddiebe',
    images: ['/og-image.png?v=2'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them:
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${archivo.variable} ${archivoNarrow.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <GoogleAnalytics />
        <UmamiAnalytics />

        <div className="relative" style={{ zIndex: 1 }}>
          <Header />
          <main className="min-h-screen">
            <ContentFrost>{children}</ContentFrost>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
