'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyInstallPromptProps {
  prompt: string
}

export function CopyInstallPrompt({ prompt }: CopyInstallPromptProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      <div className="bg-[var(--paper-shadow)] border border-[var(--hair)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--hair)]">
          <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
            Claude Code Install Prompt
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-id8-orange transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-teal" />
                <span className="text-teal">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto font-[family-name:var(--font-mono)] text-sm text-[var(--body)] whitespace-pre-wrap">
          {prompt}
        </pre>
      </div>

      <button
        onClick={handleCopy}
        className="mt-4 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Copied to Clipboard
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Copy Install Prompt
          </>
        )}
      </button>
    </div>
  )
}
