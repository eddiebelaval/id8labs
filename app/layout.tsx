import type { Metadata, Viewport } from 'next'
import { Fraunces, Archivo, Archivo_Narrow, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleAnalytics, UmamiAnalytics } from '@/components/Analytics'
import LeadMagnetFunnel from '@/components/LeadMagnetFunnel'
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
    default: 'ID8Labs - Primitive Chain Architecture for AI-Era Operators',
    template: '%s | ID8Labs',
  },
  description: 'ID8Labs designs primitive chain architectures with human gates for AI-era operators. Forward deployment that eats the drudgery before the work, so companies reach scale tools alone cannot deliver. Composer, DeepStack, Pipeline, LLC Ops, and live Claude Code training.',
  keywords: [
    'Primitive Chain Architecture',
    'Forward Deployment for AI Systems',
    'Human-Gated Workflow Architecture',
    'Agent Systems Design',
    'AI Architecture for Operators',
    'Claude Code',
    'MCP Servers',
    'AI Agent Development',
    'ID8Labs',
    'DeepStack',
  ],
  authors: [{ name: 'Eddie Belaval', url: 'https://id8labs.app' }],
  creator: 'Eddie Belaval',
  metadataBase: new URL('https://id8labs.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://id8labs.app',
    siteName: 'ID8Labs',
    title: 'ID8Labs - Primitive Chain Architecture for AI-Era Operators',
    description: 'Architecture, not tools. Primitive chains with human gates, designed domain-deep, deployed inside companies. Forward deployment that eats the drudgery before the work.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ID8Labs - Architecture, not tools. Primitive chains for AI-era operators.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ID8Labs - Primitive Chain Architecture for AI-Era Operators',
    description: 'Architecture, not tools. Primitive chains with human gates, designed domain-deep, deployed inside companies.',
    creator: '@eddiebe',
    images: ['/og-image.png'],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${fraunces.variable} ${archivo.variable} ${archivoNarrow.variable} ${jetbrainsMono.variable}`}>
        <GoogleAnalytics />
        <UmamiAnalytics />

        <div className="relative" style={{ zIndex: 1 }}>
          <Header />
          <main className="min-h-screen">
            <ContentFrost>{children}</ContentFrost>
          </main>
          <Footer />
        </div>
        <LeadMagnetFunnel />
      </body>
    </html>
  )
}
