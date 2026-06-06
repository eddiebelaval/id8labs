'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToolFactoryStore } from '@/lib/stores/tool-factory-store'
import { COMMAND_CATEGORIES, COMMAND_CATEGORY_LABELS } from '@/lib/tool-factory/types'

const COMMAND_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  git: 'Version control (commits, branches, merges)',
  testing: 'Test execution, coverage, CI integration',
  deployment: 'Build, deploy, release operations',
  setup: 'Project initialization, configuration',
  quality: 'Linting, formatting, audits',
}

export function CommandGeneratorForm() {
  const {
    description,
    setDescription,
    commandCategoryHint,
    setCommandCategoryHint,
  } = useToolFactoryStore()

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-4">
      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">
          What command do you need?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A command that runs tests and linting before committing changes, with an option to skip tests for quick commits..."
          className="w-full px-4 py-3 border border-[var(--hair)] 
                     bg-[var(--paper-shadow)] text-[var(--ink)]
                     placeholder:text-[var(--muted)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--orange)]
                     focus:border-transparent resize-none transition-all"
          rows={4}
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          {description.length}/1000 characters
        </p>
      </div>

      {/* Advanced Options Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-[var(--orange)] hover:underline"
      >
        {showAdvanced ? 'Hide' : 'Show'} advanced options
      </button>

      {/* Advanced Options */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[var(--ink)] mb-2">
                Category (optional)
              </label>
              <select
                value={commandCategoryHint || ''}
                onChange={(e) =>
                  setCommandCategoryHint(
                    e.target.value ? (e.target.value as typeof commandCategoryHint) : null
                  )
                }
                className="w-full px-4 py-2 border border-[var(--hair)] 
                           bg-[var(--paper-shadow)] text-[var(--ink)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--orange)]"
              >
                <option value="">Auto-detect</option>
                {COMMAND_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {COMMAND_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
              {commandCategoryHint && (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {COMMAND_CATEGORY_DESCRIPTIONS[commandCategoryHint]}
                </p>
              )}
            </div>

            {/* Tips */}
            <div className="p-3 bg-[var(--paper-shadow)]  border border-[var(--hair)]">
              <p className="text-xs text-[var(--muted)]">
                <strong>Tips:</strong> Include details about:
              </p>
              <ul className="mt-1 text-xs text-[var(--muted)] list-disc list-inside">
                <li>What tools/prerequisites are needed</li>
                <li>Any variables the user should provide</li>
                <li>Whether variants for different situations would be helpful</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
