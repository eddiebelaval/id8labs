import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import SignalToNoiseWordmark, { SIGNAL_TO_NOISE_WORDMARK_SRC } from '@/components/newsletter/SignalToNoiseWordmark'

// The versioned SVG once routed through /_next/image, which 400s on SVG, and the
// masthead rendered broken on every newsletter page. It must be served directly.
describe('SignalToNoiseWordmark', () => {
  it('serves the SVG directly, never through the image optimizer', () => {
    const html = renderToStaticMarkup(<SignalToNoiseWordmark />)
    const src = html.match(/src="([^"]+)"/)?.[1] ?? ''
    expect(src).not.toMatch(/_next\/image/)
    expect(src).toBe(SIGNAL_TO_NOISE_WORDMARK_SRC)
    expect(html).not.toMatch(/srcSet|srcset/)
  })
})
