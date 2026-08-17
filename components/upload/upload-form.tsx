'use client'

import { useState } from 'react'

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done'; name: string } | { kind: 'error'; message: string }

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<State>({ kind: 'idle' })

  async function send() {
    if (!file) return
    setState({ kind: 'sending' })
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/subir', { method: 'POST', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setState({ kind: 'error', message: data.error ?? 'No se pudo enviar el archivo.' })
        return
      }
      setState({ kind: 'done', name: data.filename ?? file.name })
      setFile(null)
    } catch {
      setState({ kind: 'error', message: 'No se pudo conectar. Revisa la conexión e inténtalo otra vez.' })
    }
  }

  if (state.kind === 'done') {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-lg font-semibold">Archivo recibido</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Recibimos <span className="font-medium">{state.name}</span>. No hay que hacer nada más.
        </p>
        <button
          type="button"
          onClick={() => setState({ kind: 'idle' })}
          className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Enviar otro archivo
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <label
        htmlFor="archivo"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-6 py-10 text-center hover:bg-accent"
      >
        <span className="text-base font-medium">
          {file ? file.name : 'Elegir archivo'}
        </span>
        <span className="text-sm text-muted-foreground">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(1)} MB, listo para enviar`
            : 'Excel, CSV o el archivo que exporte ACCPAC'}
        </span>
        <input
          id="archivo"
          type="file"
          className="sr-only"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null)
            setState({ kind: 'idle' })
          }}
        />
      </label>

      {state.kind === 'error' && (
        <p role="alert" className="mt-4 text-sm text-destructive">{state.message}</p>
      )}

      <button
        type="button"
        onClick={send}
        disabled={!file || state.kind === 'sending'}
        className="mt-4 w-full rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground disabled:opacity-50"
      >
        {state.kind === 'sending' ? 'Enviando...' : 'Enviar archivo'}
      </button>
    </div>
  )
}
