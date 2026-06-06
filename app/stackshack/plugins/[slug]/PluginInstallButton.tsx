'use client'

import { useState } from 'react'
import { Copy, Check, Plus, CheckCircle } from 'lucide-react'
import type { Plugin } from '@/lib/plugin-types'
import { useStackStore } from '@/lib/stores/stack-store'

interface PluginInstallButtonProps {
  plugin: Plugin
}

export function PluginInstallButton({ plugin }: PluginInstallButtonProps) {
  const [copied, setCopied] = useState(false)
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(plugin.id)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plugin.install_command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      // Track install via API
      fetch('/api/plugins/track-install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pluginId: plugin.id }),
      }).catch(() => {
        // Silently fail
      })
    } catch {
      // Clipboard failed
    }
  }

  const handleStackToggle = () => {
    if (inStack) {
      removeItem(plugin.id)
    } else {
      addItem({
        id: plugin.id,
        slug: plugin.slug,
        name: plugin.name,
        description: plugin.description,
        type: 'plugin',
        category: plugin.category,
        tags: plugin.tags,
      })
    }
  }

  return (
    <div className="space-y-3">
      {/* Copy Install Command */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Copied to Clipboard
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Copy Install Command
          </>
        )}
      </button>

      {/* Install command preview */}
      <div className="p-3 bg-[var(--paper)] border border-[var(--hair)]">
        <div className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-1.5">
          Install Command
        </div>
        <code className="text-sm font-[family-name:var(--font-mono)] text-[var(--body)] break-all">
          {plugin.install_command}
        </code>
      </div>

      {/* Add to Stack */}
      <button
        onClick={handleStackToggle}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
          inStack
            ? 'bg-transparent text-teal border-teal'
            : 'bg-transparent text-[var(--ink)] border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]'
        }`}
      >
        {inStack ? (
          <>
            <CheckCircle className="w-4 h-4" />
            In Your Stack
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add to Stack
          </>
        )}
      </button>
    </div>
  )
}
