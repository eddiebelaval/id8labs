'use client'

import { RaisedDot } from '@/components/foundation/raised-dot'
import { DotMatrix } from '@/components/foundation/dot-matrix'
import { BorderWire } from '@/components/foundation/border-wire'
import { useState } from 'react'

export default function TestFoundation() {
  const [wireActive, setWireActive] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-normal tracking-[-0.02em] mb-4">
            Living Circuit Board Foundation Test
          </h1>
          <p className="text-[var(--muted)]">
            Testing RaisedDot, DotMatrix, and BorderWire components
          </p>
        </div>

        {/* RaisedDot Tests */}
        <section className="bg-[var(--paper)] border border-[var(--hair)] p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--ink)] mb-6">1. RaisedDot Component</h2>

          <div className="space-y-6">
            {/* Size Variations */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Size Variations
              </h3>
              <div className="flex items-center gap-4">
                <RaisedDot size="sm" />
                <RaisedDot size="md" />
                <RaisedDot size="lg" />
                <span className="text-sm text-[var(--muted)] ml-2">
                  (sm, md, lg)
                </span>
              </div>
            </div>

            {/* Glow Intensity */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Glow Intensity
              </h3>
              <div className="flex items-center gap-4">
                <RaisedDot glowIntensity={20} />
                <RaisedDot glowIntensity={40} />
                <RaisedDot glowIntensity={60} />
                <RaisedDot glowIntensity={80} />
                <RaisedDot glowIntensity={100} />
                <span className="text-sm text-[var(--muted)] ml-2">
                  (20% → 100%)
                </span>
              </div>
            </div>

            {/* Color Variations */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Color Variations
              </h3>
              <div className="flex items-center gap-4">
                <RaisedDot color="accent" />
                <RaisedDot color="rgb-red" />
                <RaisedDot color="rgb-green" />
                <RaisedDot color="rgb-blue" />
                <RaisedDot color="text-primary" />
                <span className="text-sm text-[var(--muted)] ml-2">
                  (accent, red, green, blue, primary)
                </span>
              </div>
            </div>

            {/* Animation States */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Animation States
              </h3>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <RaisedDot animated="static" />
                  <span className="text-xs text-[var(--muted)]">Static</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RaisedDot animated="breathing" />
                  <span className="text-xs text-[var(--muted)]">Breathing</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RaisedDot animated="pulse" />
                  <span className="text-xs text-[var(--muted)]">Pulse</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DotMatrix Tests */}
        <section className="bg-[var(--paper)] border border-[var(--hair)] p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--ink)] mb-6">2. DotMatrix Component</h2>

          <div className="space-y-6">
            {/* Pattern Variations */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Pattern Variations
              </h3>
              <div className="space-y-4">
                <DotMatrix text="Header Pattern" pattern="header" />
                <DotMatrix text="Compact Pattern" pattern="compact" />
                <DotMatrix text="Emphasis Pattern" pattern="emphasis" />
                <DotMatrix text="Logo Pattern" pattern="logo" />
              </div>
            </div>

            {/* With Animation */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Animated States
              </h3>
              <div className="space-y-4">
                <DotMatrix
                  text="Breathing Dots"
                  pattern="header"
                  animated="breathing"
                />
                <DotMatrix
                  text="Pulsing Dots"
                  pattern="emphasis"
                  animated="pulse"
                  color="rgb-green"
                />
              </div>
            </div>

            {/* As Section Headers */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Section Header Usage
              </h3>
              <div className="space-y-6">
                <div>
                  <DotMatrix
                    text="Product Features"
                    pattern="header"
                    color="accent"
                    className="text-3xl font-bold"
                  />
                  <p className="mt-2 text-[var(--muted)]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <DotMatrix
                    text="User Testimonials"
                    pattern="header"
                    color="rgb-blue"
                    className="text-3xl font-bold"
                  />
                  <p className="mt-2 text-[var(--muted)]">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BorderWire Tests */}
        <section className="bg-[var(--paper)] border border-[var(--hair)] p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--ink)] mb-6">3. BorderWire Component</h2>

          <div className="space-y-6">
            {/* Interactive Wire Demo */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Interactive Data Highway
              </h3>
              <div className="relative h-64 bg-[var(--paper-shadow)] border border-[var(--hair)]">
                {/* Connection Points */}
                <div
                  className="absolute top-8 left-8 w-4 h-4 rounded-full bg-accent"
                  style={{ zIndex: 10 }}
                />
                <div
                  className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-rgb-blue"
                  style={{ zIndex: 10 }}
                />

                {/* Border Wire */}
                <BorderWire
                  start={{ x: '2rem', y: '2rem' }}
                  end={{ x: 'calc(100% - 2rem)', y: 'calc(100% - 2rem)' }}
                  active={wireActive}
                  direction="down"
                  glowIntensity={60}
                  color="var(--accent)"
                  width={2}
                />

                {/* Toggle Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button
                    onClick={() => setWireActive(!wireActive)}
                    className="px-6 py-3.5 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150"
                  >
                    {wireActive ? 'Deactivate' : 'Activate'} Data Flow
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)] text-center">
                Click button to see particle flow animation
              </p>
            </div>

            {/* Multiple Wires */}
            <div>
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                Multiple Connection Points
              </h3>
              <div className="relative h-64 bg-[var(--paper-shadow)] border border-[var(--hair)]">
                {/* Top Center */}
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rgb-green"
                  style={{ zIndex: 10 }}
                />
                {/* Bottom Left */}
                <div
                  className="absolute bottom-4 left-8 w-3 h-3 rounded-full bg-rgb-red"
                  style={{ zIndex: 10 }}
                />
                {/* Bottom Right */}
                <div
                  className="absolute bottom-4 right-8 w-3 h-3 rounded-full bg-rgb-blue"
                  style={{ zIndex: 10 }}
                />

                {/* Wires */}
                <BorderWire
                  start={{ x: '50%', y: '1rem' }}
                  end={{ x: '2rem', y: 'calc(100% - 1rem)' }}
                  active={true}
                  direction="down"
                  color="var(--rgb-green)"
                  width={1.5}
                />
                <BorderWire
                  start={{ x: '50%', y: '1rem' }}
                  end={{ x: 'calc(100% - 2rem)', y: 'calc(100% - 1rem)' }}
                  active={true}
                  direction="down"
                  color="var(--rgb-green)"
                  width={1.5}
                />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)] text-center">
                Data flowing from central hub to multiple endpoints
              </p>
            </div>
          </div>
        </section>

        {/* Combined Example */}
        <section className="bg-[var(--paper)] border border-[var(--hair)] p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.01em] text-[var(--ink)] mb-6">
            4. Combined Foundation Example
          </h2>

          <div className="relative">
            {/* Header with DotMatrix */}
            <DotMatrix
              text="System Status"
              pattern="header"
              color="accent"
              animated="breathing"
              className="text-3xl font-bold mb-8"
            />

            {/* Three Status Indicators */}
            <div className="grid grid-cols-3 gap-8 relative">
              {/* Dot 1 */}
              <div className="text-center relative z-10">
                <RaisedDot
                  size="lg"
                  glowIntensity={80}
                  color="rgb-green"
                  animated="breathing"
                  className="mx-auto mb-4"
                />
                <h3 className="font-mono text-sm text-[var(--muted)]">
                  Core Active
                </h3>
              </div>

              {/* Dot 2 */}
              <div className="text-center relative z-10">
                <RaisedDot
                  size="lg"
                  glowIntensity={80}
                  color="rgb-blue"
                  animated="breathing"
                  className="mx-auto mb-4"
                />
                <h3 className="font-mono text-sm text-[var(--muted)]">
                  Processing
                </h3>
              </div>

              {/* Dot 3 */}
              <div className="text-center relative z-10">
                <RaisedDot
                  size="lg"
                  glowIntensity={80}
                  color="accent"
                  animated="breathing"
                  className="mx-auto mb-4"
                />
                <h3 className="font-mono text-sm text-[var(--muted)]">
                  Output Ready
                </h3>
              </div>
            </div>

            <p className="mt-8 text-center text-[var(--muted)]">
              All foundation components working together to visualize system
              state
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
