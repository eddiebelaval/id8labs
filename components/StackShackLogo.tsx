import React from 'react'

interface StackShackLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function StackShackLogo({ size = 'md', className = '' }: StackShackLogoProps) {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-2xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl',
  }

  return (
    <span
      className={`${sizes[size]} ${className}`}
      style={{ fontFamily: 'var(--font-press-start)' }}
      suppressHydrationWarning
    >
      <span className="text-[var(--ink)]">
        STACK
      </span>
      <span className="text-id8-orange">
        SHACK
      </span>
    </span>
  )
}
