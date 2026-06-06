'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { AnimatePresence, m } from '@/components/motion'
import { useAnnotations } from '@/hooks/useAnnotations'
import { NotebookCard, AIInsightsPanel } from '@/components/annotations'
import { COURSES } from '@/lib/courses/config'
import type { Highlight, Note } from '@/lib/courses/types'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  MetaRow,
  EditorialButton,
} from '@/components/editorial'

type FilterType = 'all' | 'highlights' | 'notes'
type SortType = 'newest' | 'oldest' | 'course'

export default function NotebookPage() {
  const {
    highlights,
    notes,
    stats,
    loading,
    error,
    isAuthenticated,
    deleteHighlight,
    deleteNote,
  } = useAnnotations()

  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterCourse, setFilterCourse] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortType>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [aiCourse, setAiCourse] = useState<string>('')

  // Combine and filter items
  const allItems = useMemo(() => {
    let items: Array<{ item: Highlight | Note; type: 'highlight' | 'note' }> = []

    if (filterType === 'all' || filterType === 'highlights') {
      items = [
        ...items,
        ...highlights.map((h) => ({ item: h as Highlight | Note, type: 'highlight' as const })),
      ]
    }

    if (filterType === 'all' || filterType === 'notes') {
      items = [
        ...items,
        ...notes.map((n) => ({ item: n as Highlight | Note, type: 'note' as const })),
      ]
    }

    // Filter by course
    if (filterCourse !== 'all') {
      items = items.filter((i) => i.item.course_slug === filterCourse)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter((i) => {
        if (i.type === 'highlight') {
          const h = i.item as Highlight
          return (
            h.highlighted_text.toLowerCase().includes(query) ||
            h.note?.toLowerCase().includes(query)
          )
        } else {
          const n = i.item as Note
          return (
            n.content.toLowerCase().includes(query) ||
            n.title?.toLowerCase().includes(query)
          )
        }
      })
    }

    // Sort
    items.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.item.created_at).getTime() - new Date(a.item.created_at).getTime()
      }
      if (sortBy === 'oldest') {
        return new Date(a.item.created_at).getTime() - new Date(b.item.created_at).getTime()
      }
      // Sort by course
      return a.item.course_slug.localeCompare(b.item.course_slug)
    })

    return items
  }, [highlights, notes, filterType, filterCourse, sortBy, searchQuery])

  // Get unique courses from items
  const coursesWithAnnotations = useMemo(() => {
    const courseSet = new Set<string>()
    highlights.forEach((h) => courseSet.add(h.course_slug))
    notes.forEach((n) => courseSet.add(n.course_slug))
    return Array.from(courseSet)
  }, [highlights, notes])

  const handleDelete = async (id: string, type: 'highlight' | 'note') => {
    if (type === 'highlight') {
      await deleteHighlight(id)
    } else {
      await deleteNote(id)
    }
  }

  const selectClass =
    'border border-[var(--hair)] bg-[var(--paper)] px-4 py-2.5 font-[family-name:var(--font-narrow)] text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none'

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero */}
      <section className="pt-16 pb-10">
        <Container>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-id8-orange"
          >
            <ArrowLeftIcon />
            Back to Academy
          </Link>

          <Kicker className="mt-7">Notebook</Kicker>
          <h1 className="mt-4 font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[0.95] text-[var(--ink)] text-[clamp(2.25rem,6vw,3.5rem)]">
            My <em className="italic text-id8-orange">Notebook</em>
          </h1>
          <Deck className="mt-5 max-w-xl">
            Your personal collection of highlights and notes from all courses.
          </Deck>

          {stats && (
            <MetaRow
              className="mt-7"
              items={[
                { value: stats.total_highlights, label: 'highlights' },
                { value: stats.total_notes, label: 'notes' },
                { value: coursesWithAnnotations.length, label: 'courses' },
              ]}
            />
          )}

          {isAuthenticated && stats && stats.total_highlights + stats.total_notes >= 3 && (
            <div className="mt-7">
              <EditorialButton
                variant="secondary"
                onClick={() => setShowAIPanel(!showAIPanel)}
              >
                Generate Study Guide
              </EditorialButton>
            </div>
          )}
        </Container>
      </section>

      <Rule />

      {/* AI Panel */}
      <AnimatePresence>
        {showAIPanel && (
          <m.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[var(--hair)]"
          >
            <Container narrow>
              <div className="py-8">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Generate for
                    </label>
                    <select
                      value={aiCourse}
                      onChange={(e) => setAiCourse(e.target.value)}
                      className={selectClass}
                    >
                      <option value="">Select a course</option>
                      {coursesWithAnnotations.map((slug) => (
                        <option key={slug} value={slug}>
                          {COURSES[slug]?.title || slug}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowAIPanel(false)}
                    className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    Close
                  </button>
                </div>

                {aiCourse ? (
                  <AIInsightsPanel
                    action="study-guide"
                    courseSlug={aiCourse}
                    title={`Study Guide: ${COURSES[aiCourse]?.title || aiCourse}`}
                  />
                ) : (
                  <div className="border border-[var(--hair)] bg-[var(--paper-shadow)] p-8 text-center">
                    <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--muted)]">
                      Select a course to generate a personalized study guide.
                    </p>
                  </div>
                )}
              </div>
            </Container>
          </m.section>
        )}
      </AnimatePresence>

      {/* Content */}
      <section className="py-12">
        <Container>
          {!isAuthenticated ? (
            <div className="mx-auto max-w-md py-16 text-center">
              <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)]">
                Sign in to view your notes
              </h2>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-[var(--body)]">
                Create an account to save highlights and notes while reading courses.
              </p>
              <div className="mt-7 flex justify-center">
                <EditorialButton href="/sign-in" variant="primary">
                  Sign In
                </EditorialButton>
              </div>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-id8-orange border-t-transparent" />
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <p className="font-[family-name:var(--font-mono)] text-sm text-id8-orange">
                Error loading notes: {error}
              </p>
            </div>
          ) : (
            <div>
              {/* Filters */}
              <div className="mb-8 flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your notes..."
                    className="w-full border border-[var(--hair)] bg-[var(--paper)] py-2.5 pl-10 pr-4 font-[family-name:var(--font-sans)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:outline-none"
                  />
                </div>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className={selectClass}
                >
                  <option value="all">All Types</option>
                  <option value="highlights">Highlights</option>
                  <option value="notes">Notes</option>
                </select>

                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className={selectClass}
                >
                  <option value="all">All Courses</option>
                  {coursesWithAnnotations.map((slug) => (
                    <option key={slug} value={slug}>
                      {COURSES[slug]?.title || slug}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className={selectClass}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="course">By Course</option>
                </select>
              </div>

              <p className="mb-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Showing {allItems.length} items
              </p>

              {allItems.length === 0 ? (
                <div className="py-16 text-center">
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)]">
                    No notes yet
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-sans)] text-[var(--body)]">
                    Start highlighting text and adding notes in your courses.
                  </p>
                  <Link
                    href="/academy"
                    className="mt-4 inline-block font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange"
                  >
                    Browse courses &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {allItems.map(({ item, type }) => (
                    <NotebookCard
                      key={item.id}
                      item={item}
                      type={type}
                      onDelete={(id) => handleDelete(id, type)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}

// Icons
function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}
