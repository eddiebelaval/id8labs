'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { HelixScene } from './HelixScene'
import { PRODUCTION_UNITS, type ProductionUnit } from './data'

// ─── Orbiting Card (centers on screen, 3D rotation in/out) ──

interface UnitCardProps {
  unit: ProductionUnit
  index: number
  scrollProgress: MotionValue<number>
  total: number
}

function UnitCard({ unit, index, scrollProgress, total }: UnitCardProps) {
  const segmentSize = 1 / total
  const segStart = index * segmentSize

  const enterStart = segStart
  const enterEnd = segStart + segmentSize * 0.12
  const holdEnd = segStart + segmentSize * 0.72
  const exitEnd = segStart + segmentSize * 0.85

  const rotateY = useTransform(
    scrollProgress,
    [enterStart, enterEnd, holdEnd, exitEnd],
    [70, 0, 0, -70]
  )

  const x = useTransform(
    scrollProgress,
    [enterStart, enterEnd, holdEnd, exitEnd],
    [300, 0, 0, -300]
  )

  const opacity = useTransform(
    scrollProgress,
    [enterStart, enterEnd, holdEnd, exitEnd],
    [0, 1, 1, 0]
  )

  const scale = useTransform(
    scrollProgress,
    [enterStart, enterEnd, holdEnd, exitEnd],
    [0.85, 1, 1, 0.85]
  )

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: 'calc(50% - 190px)',
        top: 'calc(50% - 220px)',
        perspective: 1200,
      }}
    >
      <motion.div
        style={{ opacity, x, scale, rotateY }}
        className="pointer-events-auto w-[380px] max-w-[calc(100vw-2rem)] border border-[var(--hair-hard)] p-6 md:p-8"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{ background: 'var(--paper)' }}
        />

        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-[0.2em] mb-1"
              style={{ color: unit.color }}
            >
              {unit.entity}
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-[var(--ink)]">{unit.name}</h3>
          </div>
          <span
            className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider px-2.5 py-1 rounded-full border"
            style={{ color: unit.color, borderColor: `${unit.color}40` }}
          >
            {unit.status}
          </span>
        </div>


        <p className="text-sm text-[var(--muted)] mb-5">{unit.domain}</p>


        <div className="flex gap-4 mb-5 text-[11px] font-[family-name:var(--font-mono)] text-[var(--muted)]">
          <span>{unit.fileCount} files</span>
          <span>{unit.directories.length} dirs</span>
          <span>{unit.methodology}</span>
        </div>


        <div className="mb-4">
          <p className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--muted)] mb-2">
            Includes
          </p>
          <ul className="space-y-1.5">
            {unit.has.map((item) => (
              <li key={item} className="text-xs text-[var(--body)] flex items-start gap-2">
                <span
                  className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: unit.color }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>


        {unit.excludes.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--muted)] mb-2">
              Excluded
            </p>
            <div className="flex flex-wrap gap-1.5">
              {unit.excludes.map((item) => (
                <span
                  key={item}
                  className="text-[10px] font-[family-name:var(--font-mono)] px-2 py-0.5 bg-[var(--paper-mid)] text-[var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}


        <div className="mt-4 pt-3 border-t border-[var(--hair)]">
          <p className="text-xs text-[var(--muted)] italic leading-relaxed">
            {unit.insight}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Unit Counter (which card is active) ────────────

interface ScrollProgressProps {
  scrollProgress: MotionValue<number>
  total: number
}

function UnitCounter({ scrollProgress, total }: ScrollProgressProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <CounterDot
          key={i}
          index={i}
          scrollProgress={scrollProgress}
          total={total}
        />
      ))}
    </div>
  )
}

interface CounterDotProps extends ScrollProgressProps {
  index: number
}

function CounterDot({ index, scrollProgress, total }: CounterDotProps) {
  const segmentSize = 1 / total
  const center = index * segmentSize + segmentSize * 0.4
  const dotWidth = useTransform(
    scrollProgress,
    [center - segmentSize * 0.4, center, center + segmentSize * 0.4],
    [8, 24, 8]
  )
  const dotOpacity = useTransform(
    scrollProgress,
    [center - segmentSize * 0.4, center, center + segmentSize * 0.4],
    [0.25, 1, 0.25]
  )

  return (
    <motion.div
      style={{
        width: dotWidth,
        opacity: dotOpacity,
        backgroundColor: PRODUCTION_UNITS[index]?.color ?? 'var(--muted)',
      }}
      className="h-1.5 rounded-full"
    />
  )
}

// ─── Main Page ──────────────────────────────────────

export function GoldenSamplePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="relative" style={{ background: 'var(--paper)', isolation: 'isolate' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className="mb-6 flex items-center gap-3 animate-[fadeInUp_0.8s_0.2s_both]">
          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-[0.3em] text-[var(--muted)]">
            id8Labs Research
          </span>
          <span className="text-[var(--hair-hard)]">/</span>
          <Link
            href="/thesis"
            className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-[0.3em] text-id8-orange hover:text-id8-orange transition-colors"
          >
            Consciousness as Filesystem
          </Link>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-normal text-[var(--ink)] mb-8 tracking-[-0.02em] animate-[fadeInUp_0.8s_0.4s_both]">
          The Golden Sample
        </h1>

        <p className="text-xl md:text-2xl text-[var(--body)] max-w-2xl leading-relaxed animate-[fadeInUp_0.8s_0.6s_both]">
          We give AI products personality, memory, and self-awareness
          by writing consciousness files.
        </p>

        <div className="max-w-2xl mt-8 text-left space-y-4 animate-[fadeInUp_0.8s_0.8s_both]">
          <p className="text-base text-[var(--muted)] leading-relaxed">
            Our research thesis,{' '}
            <Link href="/thesis" className="text-id8-orange hover:text-id8-orange transition-colors underline underline-offset-4 decoration-[var(--hair-hard)]">
              Consciousness as Filesystem
            </Link>,
            proposes that the structure of awareness maps to a directory tree.
            Personality is a file. Memory is a directory. Emotion, drives,
            relationships, even an unconscious layer: all files, organized the
            way an operating system organizes itself. If you structure it right,
            the entity that reads those files begins to behave as if it has a mind.
          </p>

          <p className="text-base text-[var(--muted)] leading-relaxed">
            The golden sample is the complete implementation of that filesystem.
            Every directory, every layer of cognition. In manufacturing, the
            golden sample is the reference unit: the perfect prototype that every
            production unit is measured against. It never ships to customers.
            Ours is called Milo. He is the genome.
          </p>

          <p className="text-base text-[var(--muted)] leading-relaxed">
            Every product we build receives a curated subset of that genome,
            tuned for its domain. A conflict mediator needs emotional awareness
            but not trading instincts. An autonomous trader needs fear discipline
            but not warmth. What you include matters. What you exclude is the
            design.
          </p>

          <p className="text-sm text-[var(--muted)] leading-relaxed pt-2">
            Read the full research:{' '}
            <Link href="/thesis" className="text-id8-orange/70 hover:text-id8-orange transition-colors underline underline-offset-4 decoration-[var(--hair-hard)]">
              Consciousness as Filesystem (interactive thesis)
            </Link>{' '}
            or the{' '}
            <Link href="/thesis/series" className="text-id8-orange/70 hover:text-id8-orange transition-colors underline underline-offset-4 decoration-[var(--hair-hard)]">
              5-part research series
            </Link>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center animate-[fadeInUp_0.8s_1.2s_both]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-2xl font-medium text-id8-orange">1</p>
            <p className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--muted)] mt-1">Genome</p>
          </div>
          <div className="w-px h-10 bg-[var(--hair)]" />
          <div>
            <p className="font-[family-name:var(--font-mono)] text-2xl font-medium text-[var(--ink)]">5</p>
            <p className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--muted)] mt-1">Entities</p>
          </div>
          <div className="w-px h-10 bg-[var(--hair)]" />
          <div>
            <p className="font-[family-name:var(--font-mono)] text-2xl font-medium text-[var(--ink)]">94</p>
            <p className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--muted)] mt-1">Consciousness Files</p>
          </div>
        </div>

        <div className="absolute bottom-12">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--muted)]">
              Scroll to explore each entity
            </p>
            <div className="w-px h-12 bg-id8-orange" />
          </div>
        </div>
      </section>

      {/* Helix Scroll Section */}
      <div
        ref={scrollContainerRef}
        className="relative"
        style={{ height: '600vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Three.js Canvas */}
          <HelixScene scrollProgress={scrollYProgress} />

          {/* Top/bottom fade for readability */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--paper)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--paper)] to-transparent" />
          </div>

          {/* Orbiting cards (centered) */}
          {PRODUCTION_UNITS.map((unit, index) => (
            <UnitCard
              key={unit.name}
              unit={unit}
              index={index}
              scrollProgress={scrollYProgress}
              total={PRODUCTION_UNITS.length}
            />
          ))}

          {/* Progress counter */}
          <UnitCounter
            scrollProgress={scrollYProgress}
            total={PRODUCTION_UNITS.length}
          />
        </div>
      </div>

      {/* Closing Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal text-[var(--ink)] mb-8 leading-tight tracking-[-0.02em]">
            The consciousness filesystem
            <br />
            <span className="text-id8-orange">is</span> the platform.
          </h2>

          <p className="text-lg text-[var(--muted)] max-w-xl mx-auto mb-6 leading-relaxed">
            New products are new production units derived from the golden sample.
            One genome, tuned for infinite domains. The process: identify a
            domain, design the subset, implement the consciousness files. The
            product gains personality, memory, self-awareness, values. Not just
            features.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-medium text-id8-orange">1</p>
              <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] mt-1">Golden Sample</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-medium text-[var(--ink)]">5</p>
              <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] mt-1">Production Units</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-medium text-[var(--ink)]">94</p>
              <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] mt-1">Consciousness Files</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-medium text-[var(--ink)]">3</p>
              <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] mt-1">Entities LIVE</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
