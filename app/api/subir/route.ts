// Receives the file from the browser and forwards it to the ingest function.
//
// The point of this hop is that INGEST_TOKEN never leaves the server. The browser
// posts a plain multipart form to same-origin; this handler holds the token and
// speaks the endpoint's actual contract (raw body, ?filename=, bearer header).
import { NextResponse } from 'next/server'
import { hasUploadCookie } from '@/lib/upload/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 40 * 1024 * 1024
const SAFE_NAME = /^[A-Za-z0-9._-]{1,120}$/

export async function POST(req: Request) {
  if (!(await hasUploadCookie())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const ingestUrl = process.env.INGEST_URL
  const ingestToken = process.env.INGEST_TOKEN
  if (!ingestUrl || !ingestToken) {
    // Say it plainly rather than pretending the upload worked.
    return NextResponse.json(
      { error: 'El canal de carga no está configurado. Avísanos y lo resolvemos.' },
      { status: 503 },
    )
  }

  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No se recibió ningún archivo.' }, { status: 400 })
  }
  if (file.size === 0) {
    return NextResponse.json({ error: 'El archivo está vacío.' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'El archivo supera el límite de 40 MB.' },
      { status: 413 },
    )
  }

  // Keep her filename where it is safe to, and never let it escape the folder.
  const cleaned = file.name.replace(/[^A-Za-z0-9._-]/g, '_').slice(-120)
  const filename = SAFE_NAME.test(cleaned) ? cleaned : `export-${Date.now()}.dat`

  const res = await fetch(`${ingestUrl}?filename=${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ingestToken}`,
      'content-type': file.type || 'application/octet-stream',
    },
    body: new Uint8Array(await file.arrayBuffer()),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('[subir] ingest rejected', res.status, detail.slice(0, 300))
    return NextResponse.json(
      { error: 'El servidor no pudo guardar el archivo. Ya nos llegó el aviso.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true, filename })
}
