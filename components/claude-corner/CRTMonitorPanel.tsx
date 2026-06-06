'use client'

import { ReactNode } from 'react'

interface CRTMonitorPanelProps {
  children: ReactNode
  title?: string           // Label on bezel (e.g., "stats_console")
  className?: string
  enableStatic?: boolean   // Retained for API compatibility (unused in editorial reface)
  glowColor?: string       // Accent rule color for the panel header (ink/orange/teal)
}

/**
 * CRTMonitorPanel — editorial reface of the old CRT monitor.
 *
 * Keeps the terminal/monospace character but on warm paper: a flat hairline
 * panel with an ink title tab and a thin accent rule. No glow, scanlines,
 * gradients, or animation. Props are preserved for call-site compatibility;
 * `glowColor` now drives only a 2px accent rule under the title.
 */
export default function CRTMonitorPanel({
  children,
  title,
  className = '',
  glowColor = 'var(--ink)',
}: CRTMonitorPanelProps) {
  return (
    <div className={`border border-[var(--hair-hard)] bg-[var(--paper)] ${className}`}>
      {/* Title bar */}
      {title && (
        <div className="flex items-center gap-2 border-b border-[var(--hair)] px-4 py-2">
          <span
            className="inline-block h-2.5 w-2.5"
            style={{ backgroundColor: glowColor }}
          />
          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
            {title}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
