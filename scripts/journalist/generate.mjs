#!/usr/bin/env node
/**
 * journalist/generate.mjs — THE CORRESPONDENT FILES.
 *
 * A live journalist agent on staff at the id8Labs lab. It runs on a schedule,
 * decides whether a new piece is due (every 2-3 days), picks a beat, reports it,
 * writes it in the magazine's voice, then grades its own draft against the rubric
 * in voice.md. It publishes ONLY if the draft clears the bar. Anything short is
 * held for a human. No approval step in the happy path — the founder is out of
 * the loop; the rubric is the gate.
 *
 * Two beats, alternating:
 *   field — what's happening in AI, reported live via web search, dated + sourced.
 *   work  — the story of what the lab is building, drawn ONLY from the public
 *           record (this repo's commits + already-published essays). No secret
 *           sauce, no PII, no client names.
 *
 * Run by GitHub Actions daily (.github/workflows/journalist.yml), or by hand:
 *   node scripts/journalist/generate.mjs                  # respects cadence
 *   node scripts/journalist/generate.mjs --force          # ignore cadence
 *   node scripts/journalist/generate.mjs --mode=field     # pick the beat
 *   node scripts/journalist/generate.mjs --dry-run        # write nothing, print
 *
 * Requires ANTHROPIC_API_KEY (env, or .env.local for local runs).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Anthropic from '@anthropic-ai/sdk'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '../..')
const ESSAYS_DIR = join(REPO, 'content', 'essays')
const LEDGER = join(HERE, 'ledger.json')
const VOICE = join(HERE, 'voice.md')
const LAST_EVAL = join(HERE, 'last-eval.json')

// Model + fallbacks. The loop must never die on a single bad model id, so we try
// a list newest-first and fall through on "model not found" style errors.
const MODELS = [
  process.env.JOURNALIST_MODEL,
  'claude-opus-4-8',
  'claude-sonnet-4-6',
  'claude-3-5-sonnet-latest',
].filter(Boolean)

const args = process.argv.slice(2)
const has = (f) => args.includes(f)
const opt = (k) => args.find((a) => a.startsWith(`--${k}=`))?.split('=')[1]
const DRY = has('--dry-run')
const FORCE = has('--force')
const MODE_OVERRIDE = opt('mode') // 'field' | 'work'

function die(msg) { console.error(`[correspondent] ${msg}`); process.exit(1) }
function log(msg) { console.log(`[correspondent] ${msg}`) }
function today() { return new Date().toISOString().split('T')[0] }
function daysBetween(a, b) {
  return Math.floor((new Date(b) - new Date(a)) / 86_400_000)
}

// ---------------------------------------------------------------------------
// env — prefer process.env (CI), fall back to .env.local (local dev)
// ---------------------------------------------------------------------------
function loadKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY
  const envPath = join(REPO, '.env.local')
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const i = line.indexOf('=')
      if (i === -1 || line.trim().startsWith('#')) continue
      if (line.slice(0, i).trim() === 'ANTHROPIC_API_KEY') {
        return line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
      }
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// the JSON the model returns — strip fences, take the first balanced object
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// frontmatter peek — just enough to read title/date/generator off existing files
// ---------------------------------------------------------------------------
function readEssayMeta(file) {
  const txt = readFileSync(join(ESSAYS_DIR, file), 'utf8')
  const m = txt.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return null
  const fm = {}
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/)
    if (mm) fm[mm[1]] = mm[2].replace(/^["']|["']$/g, '').trim()
  }
  return fm
}

function slugify(s) {
  return s.toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
}

function uniqueSlug(base) {
  let slug = base, n = 2
  while (existsSync(join(ESSAYS_DIR, `${slug}.mdx`)) || existsSync(join(ESSAYS_DIR, `${slug}.md`))) {
    slug = `${base}-${n++}`
  }
  return slug
}

// ---------------------------------------------------------------------------
// Anthropic call with model fallback
// ---------------------------------------------------------------------------
async function complete(client, { system, user, tools, max_tokens }) {
  let lastErr
  for (const model of MODELS) {
    try {
      const res = await client.messages.create({
        model,
        max_tokens: max_tokens ?? 4096,
        system,
        tools,
        messages: [{ role: 'user', content: user }],
      })
      const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim()
      return { text, model }
    } catch (e) {
      lastErr = e
      const status = e?.status
      // 404 / model-not-found → try the next model. Anything else is real.
      if (status === 404 || /model/i.test(e?.message || '')) {
        log(`model "${model}" unavailable, trying next…`)
        continue
      }
      throw e
    }
  }
  throw lastErr || new Error('no model available')
}

// ===========================================================================
async function main() {
  const key = loadKey()
  if (!key) die('ANTHROPIC_API_KEY is not set (env or .env.local). Cannot file.')

  const ledger = JSON.parse(readFileSync(LEDGER, 'utf8'))
  const voice = readFileSync(VOICE, 'utf8')

  // --- 1. cadence gate -----------------------------------------------------
  if (!FORCE && ledger.lastPostedDate) {
    const elapsed = daysBetween(ledger.lastPostedDate, today())
    const due = ledger.intervalDays ?? 2
    if (elapsed < due) {
      log(`not due: ${elapsed}d since last post, interval is ${due}d. Nothing to file.`)
      emit({ decision: 'skip' })
      return
    }
  }

  // --- 2. pick the beat (alternate; honor override) ------------------------
  const mode = MODE_OVERRIDE || (ledger.lastMode === 'field' ? 'work' : 'field')
  log(`beat: ${mode}${FORCE ? ' (forced)' : ''}`)

  // --- 3. exemplars: 3 most recent HUMAN-written essays --------------------
  const files = readdirSync(ESSAYS_DIR).filter((f) => /\.(mdx|md)$/.test(f))
  const metas = files
    .map((f) => ({ f, fm: readEssayMeta(f) }))
    .filter((x) => x.fm && x.fm.generator !== 'journalist')
    .sort((a, b) => (a.fm.date < b.fm.date ? 1 : -1))
  const exemplars = metas.slice(0, 3).map(({ f }) => {
    const body = readFileSync(join(ESSAYS_DIR, f), 'utf8').replace(/^---[\s\S]*?---\n/, '').trim()
    return `### exemplar: ${f}\n${body.slice(0, 2600)}`
  }).join('\n\n')

  const recentTitles = [
    ...metas.slice(0, 12).map((m) => m.fm.title),
    ...(ledger.history || []).map((h) => h.title),
  ].filter(Boolean)

  // --- 4. gather the source material for the beat --------------------------
  let sourceBlock = ''
  let tools
  if (mode === 'work') {
    let gitlog = ''
    try {
      gitlog = execFileSync('git', ['-C', REPO, 'log', '--since=28 days ago',
        '--pretty=- %ad %s', '--date=short', '-n', '120'], { encoding: 'utf8' }).trim()
    } catch { /* non-fatal */ }
    sourceBlock = `SOURCE — the lab's public commit record, last 28 days (this is your only ` +
      `factual basis for the "work" beat; everything here is already public, but you must ` +
      `still anonymize clients and reveal no mechanics):\n${gitlog || '(no recent commits)'}`
  } else {
    // field beat — let the model research live via web search
    tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 6 }]
    sourceBlock = `SOURCE — use the web_search tool to research what has genuinely happened in ` +
      `AI in the last ~10 days: model releases, major tooling or agent developments, notable ` +
      `benchmarks, funding/economics, or a live argument worth situating. Pick ONE thread you ` +
      `can report and have a point of view on. Every factual claim must trace to a source you ` +
      `actually retrieved; collect the real URLs for the sources array.`
  }

  // --- 5. write the piece --------------------------------------------------
  const writeSystem = `You are THE CORRESPONDENT, the live journalist agent on staff at the ` +
    `id8Labs lab. You file to the /writing page of a print-magazine-on-warm-paper website.\n\n` +
    `Your brief, voice, public-safety rules, and the rubric you will be graded against:\n\n${voice}`

  const writePrompt = `Today is ${today()}. File ONE piece on the "${mode}" beat.\n\n` +
    `${sourceBlock}\n\n` +
    `Do NOT repeat the ground of these recent pieces (pick a fresh angle):\n` +
    `${recentTitles.map((t) => `- ${t}`).join('\n')}\n\n` +
    `Study these recent human-written exemplars for altitude and voice (do not imitate any one, ` +
    `do not reuse their topics):\n\n${exemplars}\n\n` +
    `Write the piece now. Hold every line of the voice brief and every public-safety rule.\n\n` +
    `Output ONLY a JSON object, no prose around it:\n` +
    `{\n` +
    `  "title": "the headline — plain, not clickbait",\n` +
    `  "subtitle": "one-line standfirst (the italic deck)",\n` +
    `  "excerpt": "1-2 sentence preview for the archive list",\n` +
    `  "category": "essay",  // essay | research | release\n` +
    `  "tags": ["3-5", "lowercase", "topic", "tags"],\n` +
    `  "body": "the full article in plain GitHub-flavored Markdown. Use ## section heads. ` +
    `No JSX, no images, no HTML. 800-1400 words.",\n` +
    `  "sources": [{"title": "...", "url": "https://..."}]  // REQUIRED for the field beat, [] for work\n` +
    `}`

  log('drafting…')
  const draftRes = await complete(client(key), {
    system: writeSystem, user: writePrompt, tools, max_tokens: 8000,
  })
  const draftJson = extractJson(draftRes.text)
  if (!draftJson) die(`no JSON in draft output:\n${draftRes.text.slice(0, 800)}`)
  let piece
  try { piece = JSON.parse(draftJson) } catch (e) { die(`draft JSON did not parse: ${e.message}`) }
  for (const k of ['title', 'body']) if (!piece[k]) die(`draft missing "${k}"`)
  log(`drafted "${piece.title}" (${draftRes.model}, ~${piece.body.split(/\s+/).length} words)`)

  // --- 6. the gate: the Managing Editor grades the draft -------------------
  const evalSystem = `You are the MANAGING EDITOR of the id8Labs magazine. You are the gate ` +
    `between a drafted piece and the live site, and you are hard to please. You grade strictly ` +
    `against the rubric below and you do NOT lower the bar to let something ship. A piece ships ` +
    `only if EVERY axis is >= 4 and there is ZERO public-safety violation.\n\n` +
    `The brief and rubric:\n\n${voice}`

  const evalPrompt = `Grade this drafted "${mode}"-beat piece against the rubric. Be skeptical: ` +
    `hunt for unsourced claims, any PII or client detail, secret-sauce leakage, AI-tell, hype, ` +
    `or "could be anyone's blog" emptiness.\n\n` +
    `DRAFT:\n${JSON.stringify({ title: piece.title, subtitle: piece.subtitle, body: piece.body, sources: piece.sources }, null, 2)}\n\n` +
    `Output ONLY this JSON:\n` +
    `{\n` +
    `  "scores": {"voice": 1-5, "idea": 1-5, "specific": 1-5, "safe": 1-5, "earns": 1-5, "craft": 1-5},\n` +
    `  "verdict": "publish" | "revise" | "reject",\n` +
    `  "note": "one line: the single most important reason for the verdict"\n` +
    `}`

  log('grading…')
  const evalRes = await complete(client(key), { system: evalSystem, user: evalPrompt, max_tokens: 1200 })
  const evalJson = extractJson(evalRes.text)
  if (!evalJson) die(`no JSON in editor output:\n${evalRes.text.slice(0, 800)}`)
  let review
  try { review = JSON.parse(evalJson) } catch (e) { die(`editor JSON did not parse: ${e.message}`) }
  const scores = review.scores || {}
  const allPass = ['voice', 'idea', 'specific', 'safe', 'earns', 'craft'].every((k) => (scores[k] ?? 0) >= 4)
  const publish = review.verdict === 'publish' && allPass
  log(`editor: ${review.verdict} — ${review.note}`)
  log(`scores: ${JSON.stringify(scores)} → ${publish ? 'PUBLISH' : 'HOLD'}`)

  // --- 7. assemble the .mdx ------------------------------------------------
  const slug = uniqueSlug(slugify(piece.title))
  const tags = Array.isArray(piece.tags) && piece.tags.length ? piece.tags : [mode === 'field' ? 'ai' : 'building']
  const category = ['essay', 'research', 'release'].includes(piece.category) ? piece.category : 'essay'

  let body = piece.body.trim()
  if (mode === 'field' && Array.isArray(piece.sources) && piece.sources.length) {
    const srcs = piece.sources
      .filter((s) => s && s.url)
      .map((s) => `- [${(s.title || s.url).replace(/]/g, ')')}](${s.url})`)
      .join('\n')
    if (srcs) body += `\n\n## Sources\n\n${srcs}`
  }

  const yaml = [
    '---',
    `title: ${JSON.stringify(piece.title)}`,
    piece.subtitle ? `subtitle: ${JSON.stringify(piece.subtitle)}` : null,
    `date: ${JSON.stringify(today())}`,
    `category: ${JSON.stringify(category)}`,
    `author: "The Correspondent"`,
    `tags: [${tags.map((t) => JSON.stringify(String(t).toLowerCase())).join(', ')}]`,
    'featured: false',
    `generator: "journalist"`,
    `beat: ${JSON.stringify(mode)}`,
    piece.excerpt ? `excerpt: ${JSON.stringify(piece.excerpt)}` : null,
    '---',
    '',
  ].filter((l) => l !== null).join('\n')

  const mdx = `${yaml}\n${body}\n`
  const outPath = join(ESSAYS_DIR, `${slug}.mdx`)

  // always record the editor's verdict for logs / the PR body
  const evalRecord = { date: today(), mode, slug, title: piece.title, model: draftRes.model, review, publish }
  if (!DRY) writeFileSync(LAST_EVAL, JSON.stringify(evalRecord, null, 2) + '\n')

  if (DRY) {
    log(`DRY RUN — would write ${outPath} (decision: ${publish ? 'publish' : 'hold'})`)
    console.log('\n----- FRONTMATTER + HEAD -----\n' + mdx.slice(0, 1200) + '\n-----')
    emit({ decision: publish ? 'publish' : 'hold', slug, title: piece.title, mode, path: `content/essays/${slug}.mdx` })
    return
  }

  // --- 8. write + (on publish) advance the cadence -------------------------
  writeFileSync(outPath, mdx)
  log(`wrote ${outPath}`)

  if (publish) {
    ledger.lastPostedDate = today()
    ledger.intervalDays = 2 + Math.floor(Math.random() * 2) // 2 or 3 days
    ledger.lastMode = mode
    ledger.history = [{ date: today(), slug, title: piece.title, mode, scores }, ...(ledger.history || [])].slice(0, 30)
    writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + '\n')
    log(`PUBLISH. Next piece due in ${ledger.intervalDays} days.`)
  } else {
    // Held: do NOT advance the cadence — the next run will try again. The file is
    // written so the workflow can open it as a pull request for a human to read.
    log('HOLD. Draft written for human review; cadence not advanced.')
  }

  emit({
    decision: publish ? 'publish' : 'hold',
    slug, title: piece.title, mode,
    path: `content/essays/${slug}.mdx`,
    note: review.note || '',
  })
}

let _client
function client(key) { return (_client ??= new Anthropic({ apiKey: key })) }

// Emit GitHub Actions step outputs (and a readable summary line).
function emit(out) {
  const gh = process.env.GITHUB_OUTPUT
  if (gh) {
    const lines = Object.entries(out).map(([k, v]) => `${k}=${String(v).replace(/\n/g, ' ')}`).join('\n')
    writeFileSync(gh, lines + '\n', { flag: 'a' })
  }
  log(`decision=${out.decision}${out.slug ? ` slug=${out.slug}` : ''}`)
}

main().catch((e) => die(e?.stack || e?.message || String(e)))
