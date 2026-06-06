'use client'

import { useState, useEffect } from 'react'
import { Save, FolderOpen, Trash2, Download, Upload, X, Edit2, Check, Share2, Cloud, CloudOff } from 'lucide-react'
import { useStackStore, type SavedStack } from '@/lib/stores/stack-store'
import { generateShareUrl, copyToClipboard } from '@/lib/utils/share'
import { saveStackToDb, makeStackPublic } from '@/lib/stacks-db-client'
import { createClient } from '@/lib/supabase/client'

export function StackManager() {
  const {
    items,
    currentStackId,
    savedStacks,
    saveStack,
    loadStack,
    deleteStack,
    renameStack,
    exportStack,
    importStack,
  } = useStackStore()

  const [showDialog, setShowDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState<'save' | 'load' | 'export' | 'import' | 'share'>('save')
  const [stackName, setStackName] = useState('')
  const [stackDescription, setStackDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [exportedJson, setExportedJson] = useState('')
  const [importJson, setImportJson] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const currentStack = savedStacks.find((s) => s.id === currentStackId)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const handleSave = async () => {
    if (!stackName.trim()) return
    
    const savedStack = saveStack(stackName, stackDescription || undefined)
    
    if (isAuthenticated) {
      setSyncing(true)
      await saveStackToDb(savedStack)
      setSyncing(false)
    }
    
    setStackName('')
    setStackDescription('')
    setShowDialog(false)
  }

  const handleLoad = (stackId: string) => {
    loadStack(stackId)
    setShowDialog(false)
  }

  const handleDelete = (stackId: string) => {
    if (confirm('Are you sure you want to delete this stack?')) {
      deleteStack(stackId)
    }
  }

  const handleRename = (stackId: string) => {
    if (!stackName.trim()) return
    
    renameStack(stackId, stackName, stackDescription || undefined)
    setEditingId(null)
    setStackName('')
    setStackDescription('')
  }

  const handleExport = (stackId?: string) => {
    try {
      const json = exportStack(stackId)
      setExportedJson(json)
      setDialogMode('export')
      setShowDialog(true)
    } catch (error) {
      alert('Failed to export stack')
    }
  }

  const handleImport = () => {
    const imported = importStack(importJson)
    if (imported) {
      setImportJson('')
      setShowDialog(false)
      alert(`Stack "${imported.name}" imported successfully!`)
    } else {
      alert('Failed to import stack. Please check the JSON format.')
    }
  }

  const handleShare = (stackId?: string) => {
    const stackToShare = stackId
      ? savedStacks.find((s) => s.id === stackId)
      : currentStack || {
          id: 'temp',
          name: 'Current Stack',
          items,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

    if (!stackToShare || stackToShare.items.length === 0) {
      alert('Please add items to your stack before sharing')
      return
    }

    const url = generateShareUrl(stackToShare)
    setShareUrl(url)
    setDialogMode('share')
    setShowDialog(true)
  }

  const handleCopyShareUrl = async () => {
    const success = await copyToClipboard(shareUrl)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } else {
      alert('Failed to copy to clipboard')
    }
  }

  const downloadJson = () => {
    const blob = new Blob([exportedJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stackshack-${currentStack?.name || 'export'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setDialogMode('save')
            setStackName(currentStack?.name || '')
            setStackDescription(currentStack?.description || '')
            setShowDialog(true)
          }}
          className="flex items-center gap-2 px-3 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-id8-orange hover:border-id8-orange transition-colors duration-150"
          disabled={items.length === 0}
        >
          <Save className="w-4 h-4" />
          {currentStackId ? 'Update' : 'Save'} Stack
        </button>

        <button
          onClick={() => {
            setDialogMode('load')
            setShowDialog(true)
          }}
          className="flex items-center gap-2 px-3 py-2 border border-[var(--hair)] text-[var(--body)] font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[var(--hair-hard)] transition-colors duration-150"
          disabled={savedStacks.length === 0}
        >
          <FolderOpen className="w-4 h-4" />
          Load
        </button>

        <button
          onClick={() => handleExport(currentStackId || undefined)}
          className="flex items-center gap-2 px-3 py-2 border border-[var(--hair)] text-[var(--body)] font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[var(--hair-hard)] transition-colors duration-150"
          disabled={items.length === 0}
        >
          <Download className="w-4 h-4" />
          Export
        </button>

        <button
          onClick={() => {
            setDialogMode('import')
            setShowDialog(true)
          }}
          className="flex items-center gap-2 px-3 py-2 border border-[var(--hair)] text-[var(--body)] font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[var(--hair-hard)] transition-colors duration-150"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>

        <button
          onClick={() => handleShare(currentStackId || undefined)}
          className="flex items-center gap-2 px-3 py-2 border border-[var(--hair)] text-[var(--body)] font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[var(--hair-hard)] transition-colors duration-150"
          disabled={items.length === 0}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/60">
          <div className="bg-[var(--paper)] border border-[var(--hair-hard)] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--hair)]">
              <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)]">
                {dialogMode === 'save' && (currentStackId ? 'Update Stack' : 'Save Stack')}
                {dialogMode === 'load' && 'Load Stack'}
                {dialogMode === 'export' && 'Export Stack'}
                {dialogMode === 'import' && 'Import Stack'}
                {dialogMode === 'share' && 'Share Stack'}
              </h2>
              <button
                onClick={() => setShowDialog(false)}
                className="p-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Save Mode */}
              {dialogMode === 'save' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2">Stack Name *</label>
                    <input
                      type="text"
                      value={stackName}
                      onChange={(e) => setStackName(e.target.value)}
                      placeholder="My Awesome Stack"
                      className="w-full px-4 py-2 bg-[var(--paper)] border border-[var(--hair)] text-[var(--ink)] focus:outline-none focus:border-id8-orange"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2">Description (optional)</label>
                    <textarea
                      value={stackDescription}
                      onChange={(e) => setStackDescription(e.target.value)}
                      placeholder="What's this stack for?"
                      rows={3}
                      className="w-full px-4 py-2 bg-[var(--paper)] border border-[var(--hair)] text-[var(--ink)] focus:outline-none focus:border-id8-orange resize-none"
                    />
                  </div>
                  <div className="text-sm text-[var(--muted)]">
                    {items.length} items in current stack
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={!stackName.trim()}
                    className="w-full py-3 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] hover:bg-id8-orange hover:border-id8-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    {currentStackId ? 'Update' : 'Save'} Stack
                  </button>
                </div>
              )}

              {/* Load Mode */}
              {dialogMode === 'load' && (
                <div className="space-y-3">
                  {savedStacks.length === 0 ? (
                    <p className="text-center py-8 text-[var(--muted)]">
                      No saved stacks yet. Save your current stack to get started!
                    </p>
                  ) : (
                    savedStacks.map((stack) => (
                      <div
                        key={stack.id}
                        className={`p-4 border ${
                          currentStackId === stack.id
                            ? 'border-id8-orange bg-[var(--paper-shadow)]'
                            : 'border-[var(--hair)]'
                        }`}
                      >
                        {editingId === stack.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={stackName}
                              onChange={(e) => setStackName(e.target.value)}
                              className="w-full px-3 py-2 bg-[var(--paper)] border border-[var(--hair)] text-sm text-[var(--ink)]"
                              autoFocus
                            />
                            <textarea
                              value={stackDescription}
                              onChange={(e) => setStackDescription(e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-[var(--paper)] border border-[var(--hair)] text-sm text-[var(--ink)] resize-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleRename(stack.id)}
                                className="flex items-center gap-1 px-3 py-1.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-id8-orange hover:border-id8-orange transition-colors duration-150"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null)
                                  setStackName('')
                                  setStackDescription('')
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 border border-[var(--hair)] font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--body)] hover:border-[var(--hair-hard)] transition-colors duration-150"
                              >
                                <X className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)]">{stack.name}</h3>
                                {stack.description && (
                                  <p className="text-sm text-[var(--muted)] mt-1">
                                    {stack.description}
                                  </p>
                                )}
                              </div>
                              {currentStackId === stack.id && (
                                <span className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-id8-orange">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[var(--muted)]" suppressHydrationWarning>
                                {stack.items.length} items • Updated{' '}
                                {new Date(stack.updatedAt).toLocaleDateString()}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleLoad(stack.id)}
                                  className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.15em] text-id8-orange"
                                >
                                  Load
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingId(stack.id)
                                    setStackName(stack.name)
                                    setStackDescription(stack.description || '')
                                  }}
                                  className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleExport(stack.id)}
                                  className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(stack.id)}
                                  className="text-[var(--muted)] hover:text-id8-orange transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Export Mode */}
              {dialogMode === 'export' && (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--muted)]">
                    Copy this JSON or download it as a file to backup or share your stack.
                  </p>
                  <textarea
                    value={exportedJson}
                    readOnly
                    rows={15}
                    className="w-full px-4 py-3 bg-[var(--paper-shadow)] border border-[var(--hair)] font-[family-name:var(--font-mono)] text-xs text-[var(--body)]"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={downloadJson}
                      className="flex-1 py-3 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] hover:bg-id8-orange hover:border-id8-orange transition-colors duration-150"
                    >
                      Download JSON
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(exportedJson)
                        alert('Copied to clipboard!')
                      }}
                      className="flex-1 py-3 border border-[var(--ink)] text-[var(--ink)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-150"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              )}

              {/* Import Mode */}
              {dialogMode === 'import' && (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--muted)]">
                    Paste a previously exported stack JSON to import it.
                  </p>
                  <textarea
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder='{"id": "stack_...", "name": "My Stack", ...}'
                    rows={15}
                    className="w-full px-4 py-3 bg-[var(--paper-shadow)] border border-[var(--hair)] font-[family-name:var(--font-mono)] text-xs text-[var(--body)] focus:outline-none focus:border-id8-orange"
                    autoFocus
                  />
                  <button
                    onClick={handleImport}
                    disabled={!importJson.trim()}
                    className="w-full py-3 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] hover:bg-id8-orange hover:border-id8-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Import Stack
                  </button>
                </div>
              )}

              {/* Share Mode */}
              {dialogMode === 'share' && (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--muted)]">
                    Share this URL with anyone. They can view and import your stack without signing in.
                  </p>
                  <div className="p-4 bg-[var(--paper-shadow)] border border-[var(--hair)]">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-[var(--paper)] border border-[var(--hair)] text-sm font-[family-name:var(--font-mono)] text-[var(--body)]"
                      />
                      <button
                        onClick={handleCopyShareUrl}
                        className="px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-id8-orange hover:border-id8-orange transition-colors duration-150"
                      >
                        {copySuccess ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">How it works:</h3>
                    <ul className="text-sm text-[var(--body)] space-y-1 list-disc list-inside">
                      <li>Anyone with this link can view your stack</li>
                      <li>They can import it to their own collection</li>
                      <li>No sign-in required</li>
                      <li>Stack data is encoded in the URL</li>
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopyShareUrl}
                      className="flex-1 py-3 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] hover:bg-id8-orange hover:border-id8-orange transition-colors duration-150"
                    >
                      {copySuccess ? 'Copied to Clipboard' : 'Copy Link'}
                    </button>
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 border border-[var(--ink)] text-[var(--ink)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-150 text-center"
                    >
                      Open Link
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
