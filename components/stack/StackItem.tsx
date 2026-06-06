'use client'

import { X, Terminal, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import type { StackItem as StackItemType } from '@/lib/stores/stack-store'

interface StackItemProps {
  skill: StackItemType
  onRemove: (itemId: string) => void
}

export function StackItem({ skill, onRemove }: StackItemProps) {
  const icon =
    skill.type === 'command' ? (
      <Terminal className="w-4 h-4" />
    ) : skill.type === 'setting' ? (
      <Settings className="w-4 h-4" />
    ) : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group flex items-center gap-3 p-3 border border-[var(--hair)] hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)] transition-colors duration-150"
    >
      {icon && <div className="text-id8-orange flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <h4 className="font-[family-name:var(--font-display)] font-normal text-sm text-[var(--ink)] truncate">{skill.name}</h4>
        <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)] truncate">
          {skill.category || skill.type}
        </p>
      </div>
      <button
        onClick={() => onRemove(skill.id)}
        className="flex-shrink-0 p-1.5 text-[var(--muted)] hover:text-id8-orange transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Remove from stack"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}
