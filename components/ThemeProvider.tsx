'use client'

/**
 * Theme provider — retired.
 *
 * The editorial ("Shipped.") design system is paper-only; there is no
 * dark mode. This is kept as a passthrough so any lingering imports keep
 * compiling, but it no longer forces a theme class.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
