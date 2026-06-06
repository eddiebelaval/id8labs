'use client'

import Link from 'next/link'
import { motion } from '@/components/motion'
import type { Highlight, Note, HighlightColor } from '@/lib/courses/types'
import { COURSES } from '@/lib/courses/config'

interface NotebookCardProps {
  item: Highlight | Note
  type: 'highlight' | 'note'
  onDelete?: (id: string) => void
}

// Highlight colors mapped to the on-palette ramp so the 4-way distinction
// survives while staying ink/orange/teal/hairline only.
const COLOR_CLASSES: Record<HighlightColor, string> = {
  yellow: 'bg-[var(--paper-mid)] border-id8-orange',
  green: 'bg-[var(--paper-mid)] border-[var(--teal)]',
  blue: 'bg-[var(--paper-mid)] border-[var(--ink)]',
  pink: 'bg-[var(--paper-mid)] border-[var(--hair-hard)]',
}

// Solid dot/bar accents per highlight color (on-palette).
const COLOR_ACCENTS: Record<HighlightColor, string> = {
  yellow: 'bg-id8-orange',
  green: 'bg-[var(--teal)]',
  blue: 'bg-[var(--ink)]',
  pink: 'bg-[var(--hair-hard)]',
}

export function NotebookCard({ item, type, onDelete }: NotebookCardProps) {
  const isHighlight = type === 'highlight'
  const highlight = isHighlight ? (item as Highlight) : null
  const note = !isHighlight ? (item as Note) : null

  const courseConfig = COURSES[item.course_slug]
  const courseName = courseConfig?.title || item.course_slug
  const modulePath = item.module_slug
    ? `/${item.course_slug}/${item.module_slug}`
    : `/${item.course_slug}`

  const moduleNumber = item.module_slug?.replace('module-', '') || ''

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-4 border transition-colors ${
        highlight ? `${COLOR_CLASSES[highlight.color]} border-l-4` : "bg-[var(--paper-shadow)] border-[var(--hair)]"
      }`}
    >
      {/* Header - Course & Module info */}
      <div className="flex items-center justify-between mb-3">
        <Link
          href={`/academy${modulePath}`}
          className="flex items-center gap-2 text-xs font-medium text-[var(--muted)] hover:text-id8-orange transition-colors"
        >
          <BookIcon className="w-3.5 h-3.5" />
          <span>{courseName}</span>
          {moduleNumber && (
            <>
              <span className="text-[var(--muted)]">/</span>
              <span>Module {moduleNumber}</span>
            </>
          )}
        </Link>

        <span className="text-xs text-[var(--muted)]">
          {formatRelativeTime(new Date(item.created_at))}
        </span>
      </div>

      {/* Content */}
      {highlight ? (
        <>
          <p className="text-sm leading-relaxed text-[var(--ink)]">
            "{highlight.highlighted_text}"
          </p>
          {highlight.note && (
            <p className="mt-2 text-sm text-[var(--muted)] italic pl-3 border-l-2 border-[var(--hair)]">
              {highlight.note}
            </p>
          )}
        </>
      ) : note ? (
        <>
          {note.title && (
            <h4 className="font-medium text-[var(--ink)] mb-2">
              {note.title}
            </h4>
          )}
          <p className="text-sm text-[var(--muted)] whitespace-pre-wrap line-clamp-4">
            {note.content}
          </p>
        </>
      ) : null}

      {/* Footer actions */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {highlight && (
            <span className={`w-3 h-3 rounded-full ${COLOR_ACCENTS[highlight.color]}`} />
          )}
          <span className="text-xs text-[var(--muted)]">
            {isHighlight ? 'Highlight' : 'Note'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/academy${modulePath}`}
            className="text-xs text-id8-orange hover:underline"
          >
            Go to module →
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              className="text-xs text-[var(--muted)] hover:text-id8-orange transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Compact version for listing
export function NotebookCardCompact({ item, type }: NotebookCardProps) {
  const isHighlight = type === 'highlight'
  const highlight = isHighlight ? (item as Highlight) : null
  const note = !isHighlight ? (item as Note) : null

  const courseConfig = COURSES[item.course_slug]
  const courseName = courseConfig?.title || item.course_slug

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-[var(--paper-shadow)] transition-colors cursor-pointer">
      {/* Type indicator */}
      <div
        className={`flex-shrink-0 w-1 h-12 ${
          highlight ? COLOR_ACCENTS[highlight.color] : 'bg-[var(--hair)]'
        }`}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--ink)] line-clamp-2">
          {highlight ? highlight.highlighted_text : note?.content}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-[var(--muted)]">{courseName}</span>
          <span className="text-xs text-[var(--muted)]">•</span>
          <span className="text-xs text-[var(--muted)]">
            {formatRelativeTime(new Date(item.created_at))}
          </span>
        </div>
      </div>
    </div>
  )
}

// Helper function for relative time
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
