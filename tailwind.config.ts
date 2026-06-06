import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Dark mode retired — editorial system is paper-only.
  theme: {
    extend: {
      colors: {
        // Editorial palette
        paper: '#fafaf7',
        'paper-shadow': '#f2f0e8',
        'paper-mid': '#ededdf',
        ink: '#0b0b0b',
        body: '#2a2a2a',
        muted: '#5a5a5a',
        hair: '#d6d3c9',
        'hair-hard': '#b4afa0',
        orange: '#ff6b35',
        teal: '#2a8d83',

        // id8-orange registered as a Tailwind color so `hover:bg-id8-orange`,
        // `hover:text-id8-orange`, `hover:border-id8-orange` (used throughout
        // the editorial kit) actually generate hover variants.
        'id8-orange': '#ff6b35',
        'id8-orange-hover': '#e85a28',

        // Legacy aliases mapped to editorial values
        'bg-light': '#fafaf7',
        'text-light': '#0b0b0b',
        'text-light-secondary': '#5a5a5a',
        'border-light': '#d6d3c9',
        'bg-dark': '#fafaf7',
        'text-dark': '#0b0b0b',
        'text-dark-secondary': '#5a5a5a',
        'border-dark': '#d6d3c9',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-archivo)', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        narrow: ['var(--font-archivo-narrow)', 'var(--font-archivo)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'SF Mono', 'monospace'],
      },
      fontSize: {
        h1: '3.5rem',
        h2: '2.5rem',
        body: '1.0625rem',
      },
      letterSpacing: {
        kicker: '0.22em',
      },
      maxWidth: {
        content: '1200px',
        read: '760px',
      },
      spacing: {
        section: '6rem',
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
}

export default config
