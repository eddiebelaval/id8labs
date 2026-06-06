'use client'

import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { ToolFactoryModal } from './ToolFactoryModal'
import type { ToolType } from '@/lib/tool-factory/types'

interface GenerateToolButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
  initialToolType?: ToolType
}

export function GenerateToolButton({
  variant = 'primary',
  className = '',
  initialToolType = 'skill',
}: GenerateToolButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSaved = (toolId: string, toolType: ToolType) => {
    console.log(`${toolType} saved with ID:`, toolId)
  }

  const baseClasses =
    'inline-flex items-center gap-2 px-4 py-2.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150'
  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-[var(--orange)] hover:border-[var(--orange)]'
      : 'bg-[var(--paper)] text-[var(--ink)] border-[var(--hair)] hover:border-[var(--orange)] hover:text-[var(--orange)]'

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        <Wand2 className="w-4 h-4" />
        AI Tool Factory
      </button>

      <ToolFactoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSaved={handleSaved}
        initialToolType={initialToolType}
      />
    </>
  )
}
