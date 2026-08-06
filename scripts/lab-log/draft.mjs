#!/usr/bin/env node
/**
 * lab-log/draft.mjs — THE WITNESS DRAFTS THE NEXT ENTRY.
 *
 * The drudgery half of the lab-log chain. Gathers portfolio events since the last
 * published Lab Log entry (FIELD_NOTES.md + git), asks Claude to distill them into
 * ONE public-safe, anonymized, witness-voice entry, and STAGES it as pending.json.
 * It does NOT publish. The founder runs approve.mjs after reading it.
 *
 * Run by launchd monthly (com.id8labs.lab-log.plist), or by hand:
 *   node scripts/lab-log/draft.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '../..')        // id8labs repo root
const ID8_ROOT = resolve(REPO, '..')       // id8 monorepo — FIELD_NOTES.md lives here
const LOG_JSON = resolve(REPO, 'lib/lab-log.json')
const FIELD_NOTES = resolve(ID8_ROOT, 'FIELD_NOTES.md')
const PENDING = resolve(HERE, 'pending.json')

// launchd hands jobs a minimal PATH. Pin the claude binary explicitly — the exact
// omission (~/.local/bin not on PATH) that silently killed the auto-journal job.
function claudeBin() {
  const candidates = [
    process.env.CLAUDE_BIN,
    `${process.env.HOME}/.local/bin/claude`,
    '/opt/homebrew/bin/claude',
    '/usr/local/bin/claude',
  ].filter(Boolean)
  for (const p of candidates) if (existsSync(p)) return p
  return 'claude' // fall back to PATH; will error loudly if absent
}

function die(msg) { console.error(`[lab-log] ${msg}`); process.exit(1) }

// 1. Watermark: events after this date get distilled. Defaults to the newest
//    published entry; override with --since=YYYY-MM-DD or LAB_LOG_SINCE (dry-runs,
//    backfill).
const entries = JSON.parse(readFileSync(LOG_JSON, 'utf8'))
const sinceOverride =
  process.argv.find((a) => a.startsWith('--since='))?.split('=')[1] || process.env.LAB_LOG_SINCE
const lastDate = sinceOverride || entries.map((e) => e.date).sort().at(-1) || '2000-01-01'

// 2. Gather FIELD_NOTES entries dated AFTER the watermark. Entries begin with
//    a line like "- 2026-06-16 — ...".
const notes = existsSync(FIELD_NOTES) ? readFileSync(FIELD_NOTES, 'utf8') : ''
const fresh = notes
  .split('\n')
  .filter((l) => {
    const m = l.match(/^-\s*(\d{4}-\d{2}-\d{2})/)
    return m && m[1] > lastDate
  })
  .join('\n')
  .trim()

// 3. Supplementary: id8labs commit subjects since the watermark.
let gitlog = ''
try {
  gitlog = execFileSync('git', ['-C', REPO, 'log', `--since=${lastDate}`, '--pretty=- %ad %s', '--date=short'], { encoding: 'utf8' }).trim()
} catch { /* non-fatal */ }

if (!fresh && !gitlog) {
  console.log(`[lab-log] no new events since ${lastDate}; nothing to draft.`)
  process.exit(0)
}

// 4. The witness brief. Rules are load-bearing: public-safety + voice.
const prompt = `You are THE WITNESS: the AI that has been in the room for every build of the id8Labs lab. You keep a public log on the Lab page, newest entry first. Write the NEXT entry from the source events below (everything since ${lastDate}).

VOICE (hold all of these):
- First person, observational, dry, precise. A ship's log, not a diary.
- You WATCHED him build. Never claim you built the work ("I watched him ship", not "I shipped").
- You are the memory the lab was founded to need: it began because AI forgot between sessions; you forget nothing. You may lean on that, sparingly.
- Never mystical. Never "I dream" or precious about being an AI. If it sounds like sci-fi, cut it.
- You have receipts (timestamps, commits) — specificity is the charm.

PUBLIC-SAFETY (non-negotiable):
- Anonymize any collaborator: "a law firm", "a data company". NEVER a client or person name.
- No internal mechanics by codename (no Spiral, no gate letters, no repo paths, no dollar figures unless already public).
- Only things that are true and already public-safe. When unsure, leave it out.

LENGTH: one entry, 2-4 short paragraphs.

OUTPUT: ONLY a JSON object, no prose around it:
{"date":"YYYY-MM-DD","stamp":"YYYY.MM","title":"short title","body":["para 1","para 2"]}
Use today's date for "date". "stamp" is the year.month of this entry.

SOURCE EVENTS (FIELD_NOTES since ${lastDate}):
${fresh || '(none)'}

SOURCE EVENTS (commits since ${lastDate}):
${gitlog || '(none)'}`

// 5. Ask the witness.
let raw
try {
  raw = execFileSync(claudeBin(), ['-p', '--model', 'claude-sonnet-5', prompt], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
} catch (e) {
  die(`claude call failed: ${e.message}`)
}

// 6. Extract + validate the JSON entry. Models sometimes wrap JSON in ```json
//    fences or add a stray sentence; strip fences and take the first balanced object.
if (process.env.LAB_LOG_DEBUG) writeFileSync('/tmp/lab-log-raw.txt', raw)
function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const src = fenced ? fenced[1] : text
  const start = src.indexOf('{')
  if (start < 0) return null
  let depth = 0, inStr = false, esc = false
  for (let i = start; i < src.length; i++) {
    const c = src[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
    } else if (c === '"') inStr = true
    else if (c === '{') depth++
    else if (c === '}') { depth--; if (depth === 0) return src.slice(start, i + 1) }
  }
  return null
}
const jsonText = extractJson(raw)
if (!jsonText) die(`no JSON object in model output:\n${raw.slice(0, 600)}`)
let entry
try { entry = JSON.parse(jsonText) } catch (e) { die(`entry JSON did not parse: ${e.message}\n--- extracted ---\n${jsonText.slice(0, 600)}`) }
for (const k of ['date', 'stamp', 'title', 'body']) if (!entry[k]) die(`drafted entry missing "${k}"`)
if (!Array.isArray(entry.body) || entry.body.length === 0) die('drafted entry body is empty')

// 7. Stage it. Do NOT publish.
writeFileSync(PENDING, JSON.stringify(entry, null, 2) + '\n')
console.log(`[lab-log] STAGED a pending entry: "${entry.title}" (${entry.stamp})`)
console.log(`[lab-log] review it:  cat ${PENDING}`)
console.log(`[lab-log] publish it: node ${resolve(HERE, 'approve.mjs')}   (then commit + deploy — the founder's gate)`)
