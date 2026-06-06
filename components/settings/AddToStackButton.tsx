'use client'

import { Plus, CheckCircle } from 'lucide-react'
import type { Setting } from '@/lib/settings'
import { useStackStore } from '@/lib/stores/stack-store'

interface AddToStackButtonProps {
  setting: Setting
  fullWidth?: boolean
}

export function AddToStackButton({ setting, fullWidth = false }: AddToStackButtonProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(setting.id)

  const handleClick = () => {
    if (inStack) {
      removeItem(setting.id)
    } else {
      addItem({
        id: setting.id,
        slug: setting.slug,
        name: setting.name,
        description: setting.description,
        type: 'setting',
        category: setting.category,
        tags: setting.tags,
      })
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
        fullWidth ? 'w-full' : ''
      } ${
        inStack
          ? 'bg-transparent text-[var(--teal)] border-[var(--teal)] hover:bg-[var(--paper-shadow)]'
          : 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange'
      }`}
    >
      {inStack ? (
        <>
          <CheckCircle className="w-5 h-5" />
          In Stack
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          Add to Stack
        </>
      )}
    </button>
  )
}
