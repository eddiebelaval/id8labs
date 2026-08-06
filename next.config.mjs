import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ['framer-motion', '@radix-ui/react-icons'],
  },

  // Image optimization
  images: {
    // Enable optimization on Vercel (was unoptimized: true)
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Redirects for backwards compatibility
  async redirects() {
    if (process.env.DISABLE_MARKETPLACE_REDIRECTS === 'true') {
      return []
    }
    return [
      // The Tuning Fork moved to the Hamato front door (converged 2026-07-08).
      // Edge-level redirect so no-JS clients and crawlers follow it too; the
      // page-level redirect() alone served a 307 with no Location header.
      {
        source: '/workshops/the-tuning-fork',
        destination: 'https://hamato.systems/workshops/the-tuning-fork/',
        permanent: true,
      },
      // Services and Method graduated to Hamato with the brand split (locked
      // 2026-06-29): id8Labs is the studio, Hamato is the services arm. These
      // routes are removed here, so send the buyer to the Hamato front door.
      // Target is the root, not /services or /method — those 404 on Hamato.
      {
        source: '/services',
        destination: 'https://hamato.systems/',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: 'https://hamato.systems/',
        permanent: true,
      },
      {
        source: '/method',
        destination: 'https://hamato.systems/',
        permanent: true,
      },
      // Legacy /skills routes
      {
        source: '/skills',
        destination: '/stackshack',
        permanent: true,
      },
      {
        source: '/skills/:path*',
        destination: '/stackshack/:path*',
        permanent: true,
      },
      // Legacy /essays routes → /writing
      {
        source: '/essays',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/essays/:slug',
        destination: '/writing/:slug',
        permanent: true,
      },
      // Legacy browse pages → unified marketplace tabs
      {
        source: '/commands',
        destination: '/stackshack?tab=commands',
        permanent: false, // Not permanent - might change
      },
      {
        source: '/settings',
        destination: '/stackshack?tab=settings',
        permanent: false,
      },
      {
        source: '/gallery',
        destination: '/stackshack?tab=stacks',
        permanent: false,
      },
    ]
  },

  // Headers for caching and security
  async headers() {
    // Security headers applied to all routes
    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https: http:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com https://api.stripe.com https://*.vercel-insights.com https://*.vercel-analytics.com https://umami-analytics-eddies-projects-b49c74d7.vercel.app",
          "frame-src 'self' https://js.stripe.com https://vercel.live",
          "worker-src 'self' blob:",
          "media-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join('; '),
      },
    ]

    // Same headers, but allow the page to be framed by the SAME ORIGIN only.
    // Used for /periodic-table.html so the essay at
    // /periodic-table-of-primitives.html can embed the interactive table.
    // Cross-origin framing stays blocked (clickjacking protection preserved).
    const frameableSecurityHeaders = securityHeaders.map((h) => {
      if (h.key === 'X-Frame-Options') return { key: h.key, value: 'SAMEORIGIN' }
      if (h.key === 'Content-Security-Policy')
        return { key: h.key, value: h.value.replace("frame-ancestors 'none'", "frame-ancestors 'self'") }
      return h
    })

    return [
      {
        // The interactive table page: same-origin framing allowed.
        source: '/periodic-table.html',
        headers: frameableSecurityHeaders,
      },
      {
        // Apply strict security headers to all other routes (frame DENY).
        source: '/((?!periodic-table\\.html).*)',
        headers: securityHeaders,
      },
      {
        // Cache static assets for 1 year
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS/CSS chunks for 1 year (they have content hashes)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production-only optimizations can go here
    // Note: framer-motion tree-shaking is handled by optimizePackageImports
    return config
  },
}

export default withBundleAnalyzer(nextConfig)
