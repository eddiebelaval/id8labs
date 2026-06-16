#!/usr/bin/env node
// Shipped. CLI intake — add a person to the Shipped. list (intake #2).
//
// Adds (or re-activates) a subscriber on the Supabase `newsletter_subscribers`
// table with the `shipped` list tag, so the daily launcher picks them up on the
// next sync. Email is required; phone is optional (stored for a future SMS path,
// the launcher is email-only today). Idempotent: re-running for an existing
// email just ensures they are active and on the shipped list.
//
// Usage:
//   node scripts/shipped-add.mjs --email me@x.com [--phone +15551234567]
//   node scripts/shipped-add.mjs me@x.com            (positional email)
//
// Reads SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ENV_PATH = path.join(__dirname, '..', '.env.local')

function loadEnv(p) {
  const txt = fs.readFileSync(p, 'utf8')
  const out = {}
  for (const line of txt.split('\n')) {
    const i = line.indexOf('=')
    if (i === -1 || line.trim().startsWith('#')) continue
    out[line.slice(0, i).trim()] =
      line.slice(i + 1).trim().replace(/^"|"$/g, '').replace(/\\n$/, '')
  }
  return out
}

function parseArgs(argv) {
  const a = { email: null, phone: null }
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i]
    if (t === '--email') a.email = argv[++i]
    else if (t === '--phone') a.phone = argv[++i]
    else if (!t.startsWith('--') && !a.email) a.email = t
  }
  return a
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function main() {
  const { email, phone } = parseArgs(process.argv.slice(2))
  if (!email || !EMAIL_RE.test(email)) {
    console.error('Usage: node scripts/shipped-add.mjs --email you@x.com [--phone +1...]')
    process.exit(2)
  }
  const env = loadEnv(ENV_PATH)
  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }
  const lower = email.toLowerCase()
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  const base = `${url}/rest/v1/newsletter_subscribers`

  // Look up an existing row.
  const existRes = await fetch(
    `${base}?select=id,status,lists&email=eq.${encodeURIComponent(lower)}`, { headers })
  const existing = (await existRes.json())[0]

  // Build a payload, tolerating a pre-migration schema with no `phone` column.
  const withPhone = (p) => (phone ? { ...p, phone } : p)

  async function send(method, target, payload, prefer) {
    const res = await fetch(target, {
      method,
      headers: prefer ? { ...headers, Prefer: prefer } : headers,
      body: JSON.stringify(payload),
    })
    return res
  }

  async function run(payload, isUpdate, target) {
    let res = await send(isUpdate ? 'PATCH' : 'POST', target, withPhone(payload),
      'return=representation')
    if (res.status >= 400) {
      const body = await res.text()
      if (/column.*phone.*does not exist/i.test(body)) {
        console.warn('[shipped-add] phone column not present yet; saving without phone. '
          + 'Apply migration 20260616020402_add_phone_to_subscribers.sql to capture phone.')
        res = await send(isUpdate ? 'PATCH' : 'POST', target, payload, 'return=representation')
      } else {
        throw new Error(`${res.status}: ${body}`)
      }
    }
    return res
  }

  if (existing) {
    const lists = Array.isArray(existing.lists) ? existing.lists : ['newsletter']
    const merged = lists.includes('shipped') ? lists : [...lists, 'shipped']
    await run({ status: 'active', unsubscribed_at: null, lists: merged }, true,
      `${base}?id=eq.${existing.id}`)
    console.log(`Updated ${lower}: active, lists=[${merged.join(', ')}]${phone ? `, phone=${phone}` : ''}`)
  } else {
    await run({
      email: lower,
      source: 'shipped-cli',
      status: 'active',
      is_academy_member: false,
      lists: ['newsletter', 'shipped'],
    }, false, base)
    console.log(`Added ${lower} to the Shipped. list${phone ? ` (phone ${phone})` : ''}.`)
  }
}

main().catch((e) => { console.error('shipped-add failed:', e.message); process.exit(1) })
