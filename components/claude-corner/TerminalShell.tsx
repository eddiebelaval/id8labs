'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from '@/components/motion'
import CRTMonitorPanel from './CRTMonitorPanel'
import IntroMessage from './IntroMessage'
import StatsPanel from './StatsPanel'
import FieldNotesPanel from './FieldNotesPanel'
import ChatPanel from './ChatPanel'

interface TerminalShellProps {
  userId: string
  userEmail?: string | null
}

// Staggered panel animation config - smooth fade-in without jarring effects
const panelVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.99
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1] // Smooth easing curve
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,  // Slower cascade - each panel appears 250ms after previous
      delayChildren: 0.1     // Start sooner after container appears
    }
  }
}

export default function TerminalShell({ userId, userEmail }: TerminalShellProps) {
  const [isLive, setIsLive] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showPanels, setShowPanels] = useState(false) // Phase 2: other panels
  const [flickerPhase, setFlickerPhase] = useState(0)

  // Force scroll to top on mount - aggressive approach to prevent jump
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0)

    // Also set after a frame to catch any late scrolls
    const frame1 = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    // And again after two frames for safety
    const frame2 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })

    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
    }
  }, [])

  // Lock scroll when panels appear - prevent jump to bottom
  useEffect(() => {
    if (showPanels) {
      // Lock scroll position during panel animation
      const scrollY = window.scrollY

      // Force scroll to top repeatedly during animation period
      const forceTop = () => {
        window.scrollTo(0, 0)
      }

      // Immediately force top
      forceTop()

      // Keep forcing for duration of animation (stagger * panels + animation duration)
      const interval = setInterval(forceTop, 50)
      const timeout = setTimeout(() => {
        clearInterval(interval)
      }, 2000) // Cover full animation duration

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [showPanels])

  // CRT power-on flicker effect (only runs once on mount)
  useEffect(() => {
    // Simplified flicker sequence - shorter and less jarring
    const phases = [
      { delay: 100, phase: 1 },   // Initial dim glow
      { delay: 150, phase: 2 },   // Flicker up
      { delay: 100, phase: 3 },   // Brighter
      { delay: 100, phase: 4 },   // Full brightness
    ]

    let totalDelay = 0
    const timers: NodeJS.Timeout[] = []

    phases.forEach(({ delay, phase }) => {
      totalDelay += delay
      timers.push(setTimeout(() => setFlickerPhase(phase), totalDelay))
    })

    // Show intro content after flicker completes
    timers.push(setTimeout(() => setShowContent(true), totalDelay + 50))

    // Show other panels shortly after intro appears - they animate up while intro boots
    // This creates the effect of screens powering on and loading with data
    timers.push(setTimeout(() => setShowPanels(true), totalDelay + 400))

    return () => timers.forEach(clearTimeout)
  }, [])

  // Called when boot lines done (ASCII + system init + command) - show all panels
  const handleBootReady = useCallback(() => {
    setShowPanels(true)

    // Force scroll to top after panels render - multiple frames for reliability
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [])

  // Map phase to opacity for power-on fade - smoother progression
  const flickerOpacity = [0, 0.4, 0.7, 0.9, 1][flickerPhase]

  return (
    <div className="min-h-screen bg-[var(--paper)] relative overflow-hidden">
      {/* Terminal Container with initial power-on fade only */}
      <m.div
        className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: flickerPhase === 4 ? 1 : flickerOpacity }}
        transition={{ duration: flickerPhase === 4 ? 0.3 : 0.08 }}
      >
        {/* Terminal Window */}
        <div className="max-w-7xl mx-auto">
          {/* Title Bar */}
          <div className="bg-[var(--ink)] border border-[var(--ink)] border-b-0 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Window Controls */}
              <div className="flex gap-2">
                <Link
                  href="/"
                  className="w-3 h-3 rounded-full bg-id8-orange hover:opacity-80 transition-opacity"
                  title="Return to id8Labs"
                />
                <div className="w-3 h-3 rounded-full bg-[var(--muted)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--muted)]" />
              </div>

              {/* Title */}
              <span className="text-sm font-[family-name:var(--font-mono)] text-[var(--paper)]/70 hidden sm:inline">
                claude-corner — live terminal
              </span>
            </div>

            {/* Live Indicator with Claude marker */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-id8-orange" />
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--paper)]/60 uppercase tracking-wider">
                  CLAUDE
                </span>
              </div>

              {/* Live/Cached Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-id8-orange animate-pulse' : 'bg-[var(--muted)]'}`} />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--paper)]/50 uppercase tracking-wider">
                  {isLive ? 'LIVE' : 'CACHED'}
                </span>
              </div>
            </div>
          </div>

          {/* Terminal Content - Vertical stack of monitor panels */}
          <div className="bg-[var(--paper-shadow)] border border-[var(--hair-hard)] border-t-0 p-4 md:p-6" style={{ overflowAnchor: 'none' }}>
            {/* Phase 1: Intro Panel - Appears first, alone */}
            <AnimatePresence>
              {showContent && (
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Intro Monitor */}
                  <CRTMonitorPanel title="claude_corner" glowColor="#ff6b35">
                    <div className="p-6 md:p-8">
                      <IntroMessage
                        userEmail={userEmail}
                        onBootReady={handleBootReady}
                      />
                    </div>
                  </CRTMonitorPanel>
                </m.div>
              )}
            </AnimatePresence>

            {/* Phase 2: Other Panels - Appear after intro animation completes */}
            <AnimatePresence>
              {showPanels && (
                <m.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 mt-4"
                >
                  {/* Stats Monitor - Orange glow */}
                  <m.div variants={panelVariants}>
                    <CRTMonitorPanel title="stats_console" glowColor="#ff6b35">
                      <div className="p-6 md:p-8">
                        <StatsPanel onLiveStatusChange={setIsLive} />
                      </div>
                    </CRTMonitorPanel>
                  </m.div>

                  {/* Field Notes Monitor - Green glow */}
                  <m.div variants={panelVariants}>
                    <CRTMonitorPanel title="field_notes" glowColor="#27c93f">
                      <div className="p-6 md:p-8">
                        <FieldNotesPanel />
                      </div>
                    </CRTMonitorPanel>
                  </m.div>

                  {/* Lab Assistant Monitor - Amber glow */}
                  <m.div variants={panelVariants}>
                    <CRTMonitorPanel title="lab_assistant" glowColor="#f59e0b">
                      <div className="p-6 md:p-8">
                        <ChatPanel userId={userId} />
                      </div>
                    </CRTMonitorPanel>
                  </m.div>

                  {/* Footer */}
                  <m.div
                    variants={panelVariants}
                    className="pt-4 flex items-center justify-between text-xs font-mono text-[#404040]"
                  >
                    <span>ID8Labs × Claude Partnership</span>
                    <span>Since October 2025</span>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.div>
    </div>
  )
}
