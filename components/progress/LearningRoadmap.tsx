'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { COURSES, COURSES_BY_ORDER, FOUNDATION_COURSE, EXTERNAL_COURSES } from '@/lib/courses/config'

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function LearningRoadmap() {
  const { progress, isFoundationComplete, getCourseStats } = useProgress()

  const foundation = COURSES[FOUNDATION_COURSE]
  const foundationStats = getCourseStats(FOUNDATION_COURSE)
  const foundationComplete = foundationStats
    ? foundationStats.completed >= foundationStats.total
    : false

  // Non-foundation courses
  const parallelCourses = COURSES_BY_ORDER.filter((c) => !c.isFoundation)

  return (
    <div className="py-8">
      {/* Foundation Course */}
      <div
        className="flex justify-center mb-4"
      >
        <Link
          href={foundation.path}
          className={`relative px-6 py-4 border-2 transition-all ${
            foundationComplete
              ? 'bg-[var(--paper-shadow)] border-[var(--teal)] hover:border-[var(--teal)]'
              : 'bg-[var(--paper-shadow)] border-id8-orange hover:border-id8-orange'
          }`}
        >
          <div className="flex items-center gap-3">
            {foundationComplete ? (
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--paper-mid)] text-[var(--teal)]">
                <CheckIcon />
              </span>
            ) : (
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--paper-mid)] text-id8-orange text-xs font-bold">
                1
              </span>
            )}
            <div>
              <p className="text-xs font-[family-name:var(--font-narrow)] uppercase tracking-wider text-[var(--muted)] mb-0.5">
                Start Here
              </p>
              <p className="font-semibold">{foundation.title}</p>
              {foundationStats && (
                <p className="text-xs text-[var(--muted)]">
                  {foundationStats.completed}/{foundationStats.total} modules
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Connecting Line */}
      <div className="flex justify-center mb-4">
        <div className="w-px h-8 bg-[var(--hair)]" />
      </div>

      {/* Unlock Message */}
      {!isFoundationComplete && (
        <p className="text-center text-sm text-[var(--muted)] mb-4">
          Complete foundation to unlock all courses below
        </p>
      )}

      {/* Parallel Courses Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${
        parallelCourses.length <= 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-4'
      }`}>
        {parallelCourses.map((course) => {
          const stats = getCourseStats(course.slug)
          const isComplete = stats ? stats.completed >= stats.total : false
          const hasStarted = stats ? stats.completed > 0 : false
          const isLocked = !isFoundationComplete

          return (
            <div key={course.slug}>
              {isLocked ? (
                <div className="p-3   bg-[var(--paper-shadow)] border border-[var(--hair)] opacity-50 text-center">
                  <span className="flex items-center justify-center w-6 h-6 mx-auto rounded-full bg-[var(--paper-mid)] text-[var(--muted)] mb-2">
                    <LockIcon />
                  </span>
                  <p className="text-xs font-medium truncate">{course.title}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {course.modules} modules
                  </p>
                </div>
              ) : (
                <Link
                  href={course.path}
                  className={`block p-3   border transition-all text-center ${
                    isComplete
                      ? 'bg-[var(--paper-shadow)] border-[var(--teal)] hover:border-[var(--teal)]'
                      : hasStarted
                      ? 'bg-[var(--paper-shadow)] border-id8-orange hover:border-id8-orange'
                      : 'bg-[var(--paper)] border-[var(--hair)] hover:border-[var(--hair-hard)]'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 mx-auto rounded-full mb-2 ${
                      isComplete
                        ? 'bg-[var(--paper-mid)] text-[var(--teal)]'
                        : 'bg-[var(--paper-mid)] text-[var(--muted)]'
                    }`}
                  >
                    {isComplete ? (
                      <CheckIcon />
                    ) : (
                      <span className="text-xs font-bold">
                        {course.recommendedOrder}
                      </span>
                    )}
                  </span>
                  <p className="text-xs font-medium truncate">{course.title}</p>
                  {stats && (
                    <p className="text-xs text-[var(--muted)]">
                      {stats.completed}/{stats.total}
                    </p>
                  )}
                </Link>
              )}
            </div>
          )
        })}
      </div>

      {/* External Courses Hint */}
      <div className="mt-6 text-center">
        <Link
          href="#anthropic-courses"
          className="text-sm text-[var(--muted)] hover:text-id8-orange transition-colors"
        >
          + {Object.keys(EXTERNAL_COURSES).length} official Anthropic courses available below
        </Link>
      </div>
    </div>
  )
}
