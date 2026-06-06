'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from '@/components/motion'
import { useAnnotationContext } from './AnnotationProvider'
import type { Note } from '@/lib/courses/types'

interface NoteCardProps {
  note: Note
  showActions?: boolean
}

export function NoteCard({ note, showActions = true }: NoteCardProps) {
  const { updateNote, deleteNote } = useAnnotationContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(note.title || '')
  const [editedContent, setEditedContent] = useState(note.content)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleSave = async () => {
    await updateNote(note.id, {
      title: editedTitle.trim() || undefined,
      content: editedContent.trim(),
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteNote(note.id)
    setIsDeleting(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group p-4 bg-[var(--paper-shadow)] border border-[var(--hair)] "
    >
      {!isEditing ? (
        <>
          {/* Note title */}
          {note.title && (
            <h4 className="font-medium text-[var(--ink)] mb-2">
              {note.title}
            </h4>
          )}

          {/* Note content */}
          <p className="text-sm text-[var(--muted)] whitespace-pre-wrap">
            {note.content}
          </p>

          {/* Actions */}
          {showActions && (
            <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-[var(--muted)]">
                {new Date(note.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-[var(--muted)] hover:text-[var(--muted)]"
                >
                  Edit
                </button>

                {!showConfirmDelete ? (
                  <button
                    onClick={() => setShowConfirmDelete(true)}
                    className="text-xs text-[var(--muted)] hover:text-id8-orange"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs text-id8-orange hover:underline disabled:opacity-50"
                  >
                    {isDeleting ? '...' : 'Confirm'}
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full px-3 py-2 text-sm bg-[var(--paper)] border border-[var(--hair)]  focus:outline-none focus:border-[var(--ink)]"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Write your note..."
            className="w-full h-24 px-3 py-2 text-sm bg-[var(--paper)] border border-[var(--hair)]  resize-none focus:outline-none focus:border-[var(--ink)]"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsEditing(false)
                setEditedTitle(note.title || '')
                setEditedContent(note.content)
              }}
              className="px-3 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!editedContent.trim()}
              className="px-3 py-1.5 text-sm bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange transition-colors disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
