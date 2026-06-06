'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from '@/components/motion'
import { useAnnotationContext } from './AnnotationProvider'
import type { HighlightColor } from '@/lib/courses/types'

interface Position {
  x: number
  y: number
}

interface HighlightPopoverProps {
  position: Position | null
  selectedText: string
  textPrefix?: string
  textSuffix?: string
  onClose: () => void
}

// Highlight colors mapped to the on-palette ramp (ink/orange/teal/hairline).
const HIGHLIGHT_COLORS: { color: HighlightColor; bg: string; border: string; label: string }[] = [
  { color: 'yellow', bg: 'bg-id8-orange', border: 'border-id8-orange', label: 'Yellow' },
  { color: 'green', bg: 'bg-[var(--teal)]', border: 'border-[var(--teal)]', label: 'Green' },
  { color: 'blue', bg: 'bg-[var(--ink)]', border: 'border-[var(--ink)]', label: 'Blue' },
  { color: 'pink', bg: 'bg-[var(--hair-hard)]', border: 'border-[var(--hair-hard)]', label: 'Pink' },
]

export function HighlightPopover({
  position,
  selectedText,
  textPrefix,
  textSuffix,
  onClose,
}: HighlightPopoverProps) {
  const { createHighlight, isAuthenticated, courseSlug, moduleSlug } = useAnnotationContext()
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [note, setNote] = useState('')
  const [selectedColor, setSelectedColor] = useState<HighlightColor>('yellow')
  const [isCreating, setIsCreating] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    function handleEscape(e: KeyboardEvent): void {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleHighlight = async (color: HighlightColor, withNote = false) => {
    if (!isAuthenticated) {
      // Show login prompt or handle gracefully
      onClose()
      return
    }

    setIsCreating(true)

    try {
      await createHighlight({
        course_slug: courseSlug,
        module_slug: moduleSlug,
        highlighted_text: selectedText,
        text_prefix: textPrefix,
        text_suffix: textSuffix,
        color,
        note: withNote ? note : undefined,
      })
      onClose()
    } catch (error) {
      console.error('Failed to create highlight:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleColorClick = (color: HighlightColor) => {
    if (showNoteInput) {
      setSelectedColor(color)
    } else {
      handleHighlight(color)
    }
  }

  if (!position) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={popoverRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed z-50 bg-[var(--paper)] border border-[var(--hair-hard)]"
        style={{
          left: Math.min(position.x, window.innerWidth - 280),
          top: position.y + 10,
          minWidth: showNoteInput ? '280px' : '200px',
        }}
      >
        {/* Color picker row */}
        <div className="flex items-center gap-2 p-3 border-b border-[var(--hair)]">
          {HIGHLIGHT_COLORS.map(({ color, bg, border, label }) => (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              disabled={isCreating}
              className={`w-7 h-7 rounded-full ${bg} border-2 ${
                selectedColor === color && showNoteInput
                  ? `${border} ring-2 ring-offset-2 ring-offset-[var(--paper)]`
                  : 'border-transparent'
              } hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
              title={`Highlight ${label}`}
              aria-label={`Highlight with ${label}`}
            />
          ))}

          <div className="w-px h-5 bg-[var(--hair)] mx-1" />

          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            disabled={isCreating}
            className={`p-1.5 transition-colors ${
              showNoteInput
                ? 'bg-[var(--paper-mid)] text-id8-orange'
                : 'hover:bg-[var(--paper-shadow)] text-[var(--muted)]'
            } disabled:opacity-50`}
            title="Add note"
            aria-label="Add note to highlight"
          >
            <NoteIcon />
          </button>
        </div>

        {/* Note input (expandable) */}
        <AnimatePresence>
          {showNoteInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-3">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full h-20 px-3 py-2 text-sm bg-[var(--paper)] border border-[var(--hair)]  resize-none focus:outline-none focus:border-[var(--ink)]"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={onClose}
                    disabled={isCreating}
                    className="px-3 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleHighlight(selectedColor, true)}
                    disabled={isCreating}
                    className="px-3 py-1.5 text-sm bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login prompt for unauthenticated users */}
        {!isAuthenticated && (
          <div className="p-3 text-xs text-[var(--muted)] text-center border-t border-[var(--hair)]">
            Sign in to save highlights
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Icon components
function NoteIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
