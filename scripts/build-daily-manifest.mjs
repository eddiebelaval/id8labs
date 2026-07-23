#!/usr/bin/env node
/**
 * Shipped. — Daily edition manifest builder.
 *
 * The weekly ISSUES (issues.data.ts) are the marquee editions and live on-site
 * as static HTML. The DAILY editions live as published HTML on the `shipped`
 * repo's `origin/daily-pages` branch (anthropic-daily/YYYY-MM-DD.html) and are
 * served publicly at https://eddiebelaval.github.io/shipped/anthropic-daily/...
 *
 * This script reads that branch via git, extracts {date, title, url, wordCount}
 * for every daily, groups them by ISO week, and writes the typed, AUTO-GENERATED
 * data file at lib/shipped/dailies.data.ts (newest first). It is idempotent —
 * re-running fully regenerates the file from the branch's current state.
 *
 * Usage:
 *   node scripts/build-daily-manifest.mjs
 *
 * Env / config:
 *   SHIPPED_REPO  — path to the shipped repo (default: ../../shipped relative to
 *                   this id8labs repo, i.e. ~/Development/id8/shipped)
 *   DAILY_BRANCH  — branch ref (default: origin/daily-pages)
 *   DAILY_DIR     — subdir within the branch (default: anthropic-daily)
 */

import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ID8_ROOT = path.join(__dirname, '..')

const SHIPPED_REPO =
  process.env.SHIPPED_REPO || path.resolve(ID8_ROOT, '..', 'shipped')
const DAILY_BRANCH = process.env.DAILY_BRANCH || 'origin/daily-pages'
const DAILY_DIR = process.env.DAILY_DIR || 'anthropic-daily'
const PUBLIC_BASE = 'https://eddiebelaval.github.io/shipped'
const OUT_FILE = path.join(ID8_ROOT, 'lib', 'shipped', 'dailies.data.ts')

// The weekly and monthly sweeps publish to the same branch, in their own dirs,
// named by period rather than date: anthropic-weekly/YYYY-WW.html and
// anthropic-monthly/YYYY-MM.html.
const WEEKLY_DIR = process.env.WEEKLY_DIR || 'anthropic-weekly'
const MONTHLY_DIR = process.env.MONTHLY_DIR || 'anthropic-monthly'
const SWEEPS_OUT_FILE = path.join(ID8_ROOT, 'lib', 'shipped', 'sweeps.data.ts')

/** Run a git command in the shipped repo and return stdout (trimmed). */
function git(args) {
  return execFileSync('git', ['-C', SHIPPED_REPO, ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
}

/** List every anthropic-daily/YYYY-MM-DD.html path on the daily-pages branch. */
function listDailyFiles() {
  const out = git(['ls-tree', '-r', '--name-only', DAILY_BRANCH, `${DAILY_DIR}/`])
  return out
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /\/\d{4}-\d{2}-\d{2}\.html$/.test(l))
}

/** Read a file's content from the branch. */
function readDaily(filePath) {
  return git(['show', `${DAILY_BRANCH}:${filePath}`])
}

/** Decode the handful of HTML entities that show up in these pages. */
function decodeEntities(s) {
  return s
    .replace(/&middot;/g, '·')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

/** Strip tags, collapse whitespace, decode entities, tidy stray spaces. */
function clean(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1') // no space before punctuation (tag boundaries)
    .trim()
}

/**
 * Boilerplate the title extractor must skip — masthead furniture and the
 * "N confirmed items / Window: ..." count lines, not editorial standfirsts.
 */
function isBoilerplate(text) {
  if (text.length < 20) return true
  if (/^Shipped\.?\s*Daily/i.test(text)) return true
  if (/^Anthropic Daily/i.test(text)) return true
  if (/^\d+\s+(confirmed\s+)?(item|entr|release)/i.test(text)) return true
  if (/^(Window|Period)\s*:/i.test(text)) return true
  if (/^Every confirmed Anthropic/i.test(text)) return true
  return false
}

/**
 * Extract the editorial headline for a daily. Strategy, in priority order:
 *   1. The standfirst paragraph (known oneliner classes across format eras).
 *   2. The first non-boilerplate <p class="..."> in the body.
 *   3. The og:description meta.
 *   4. Fall back to a clean date-based title (handled by the caller).
 */
function extractTitle(html) {
  const oneLinerClass =
    /<p[^>]*class="[^"]*(?:one-?liner|one-line-read|daily-lede|daily-summary)[^"]*"[^>]*>([\s\S]*?)<\/p>/i
  let m = html.match(oneLinerClass)
  if (m) {
    const t = clean(m[1])
    if (!isBoilerplate(t)) return t
  }

  // First non-boilerplate classed <p> in the body.
  const bodyStart = html.search(/<body[^>]*>/i)
  const body = bodyStart >= 0 ? html.slice(bodyStart) : html
  const pRe = /<p[^>]*class="[^"]*"[^>]*>([\s\S]*?)<\/p>/gi
  let pm
  while ((pm = pRe.exec(body)) !== null) {
    const t = clean(pm[1])
    if (!isBoilerplate(t)) return t
  }

  // og:description fallback.
  const og = html.match(
    /<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i,
  )
  if (og) {
    const t = decodeEntities(og[1]).trim()
    if (!isBoilerplate(t)) return t
  }

  return null
}

/** Visible-body word count (strip <head>, <style>, <script>, tags). */
function wordCount(html) {
  let body = html
  const bodyStart = html.search(/<body[^>]*>/i)
  if (bodyStart >= 0) body = html.slice(bodyStart)
  body = body
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  const text = clean(body)
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

/** ISO week (YYYY-Www) for a YYYY-MM-DD date. */
function isoWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z')
  const day = (d.getUTCDay() + 6) % 7 // Mon=0..Sun=6
  d.setUTCDate(d.getUTCDate() - day + 3) // nearest Thursday
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4))
  const week =
    1 +
    Math.round(
      ((d - firstThursday) / 86400000 -
        3 +
        ((firstThursday.getUTCDay() + 6) % 7)) /
        7,
    )
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

/** Monday (start) of the ISO week containing dateStr, as YYYY-MM-DD. */
function weekStart(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z')
  const day = (d.getUTCDay() + 6) % 7 // Mon=0
  d.setUTCDate(d.getUTCDate() - day)
  return d.toISOString().slice(0, 10)
}

/** Human "Week of June 9-15, 2026" label from a Monday-start date. */
function weekLabel(weekStartStr) {
  const start = new Date(weekStartStr + 'T00:00:00Z')
  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 6)
  const month = (d) =>
    d.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
  const sM = month(start)
  const eM = month(end)
  const sD = start.getUTCDate()
  const eD = end.getUTCDate()
  const year = end.getUTCFullYear()
  if (sM === eM) return `Week of ${sM} ${sD}-${eD}, ${year}`
  return `Week of ${sM} ${sD} - ${eM} ${eD}, ${year}`
}

/** Pretty single-day label, e.g. "Mon, Jun 15". */
function dayLabel(dateStr) {
  return new Date(dateStr + 'T00:00:00Z').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function fallbackTitle(dateStr) {
  const pretty = new Date(dateStr + 'T00:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
  return `Shipped. Daily — ${pretty}`
}

function tsString(s) {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
}

/** Monday of an ISO year-week ("2026-29"), as YYYY-MM-DD. */
function isoWeekToMonday(year, week) {
  // Jan 4 is always in ISO week 1; walk back to that week's Monday, then add weeks.
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = (jan4.getUTCDay() + 6) % 7 // Mon=0
  const week1Monday = new Date(jan4)
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day)
  const monday = new Date(week1Monday)
  monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7)
  return monday.toISOString().slice(0, 10)
}

/** Human "June 2026" label from a YYYY-MM period. */
function monthLabel(year, month) {
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Collect the period-named sweeps in one directory on the branch.
 * `kind` is 'weekly' | 'monthly'; both are YYYY-NN.html but the second number
 * means different things, so each gets its own label and sort key.
 */
function collectSweeps(dir, kind) {
  let listing
  try {
    listing = git(['ls-tree', '-r', '--name-only', DAILY_BRANCH, `${dir}/`])
  } catch {
    return [] // directory absent on the branch — not an error, just nothing to surface
  }
  const files = listing
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /\/\d{4}-\d{2}\.html$/.test(l))

  const sweeps = []
  for (const file of files) {
    const m = file.match(/(\d{4})-(\d{2})\.html$/)
    const y = Number(m[1])
    const n = Number(m[2])
    const period = `${m[1]}-${m[2]}`
    const html = readDaily(file)
    const sortKey =
      kind === 'weekly' ? isoWeekToMonday(y, n) : `${m[1]}-${m[2]}-01`
    const label =
      kind === 'weekly' ? weekLabel(isoWeekToMonday(y, n)) : monthLabel(y, n)
    const title = extractTitle(html) || label
    sweeps.push({
      period,
      label,
      sortKey,
      title,
      url: `${PUBLIC_BASE}/${file}`,
      wordCount: wordCount(html),
    })
  }
  // Newest period first.
  sweeps.sort((a, b) => (a.sortKey < b.sortKey ? 1 : a.sortKey > b.sortKey ? -1 : 0))
  return sweeps
}

/**
 * Write lib/shipped/sweeps.data.ts — the weekly and monthly Anthropic sweeps.
 * These publish to the same branch as the dailies but were never surfaced on
 * the hub, so every one of them was a live public page nothing linked to.
 */
function writeSweeps() {
  const weekly = collectSweeps(WEEKLY_DIR, 'weekly')
  const monthly = collectSweeps(MONTHLY_DIR, 'monthly')
  const today = new Date().toISOString().slice(0, 10)

  const emit = (name, comment, rows) => {
    const out = [`/** ${comment} */`, `export const ${name}: ShippedSweep[] = [`]
    for (const s of rows) {
      out.push('  {')
      out.push(`    period: ${tsString(s.period)},`)
      out.push(`    label: ${tsString(s.label)},`)
      out.push(`    sortKey: ${tsString(s.sortKey)},`)
      out.push(`    title: ${tsString(s.title)},`)
      out.push(`    url: ${tsString(s.url)},`)
      out.push(`    wordCount: ${s.wordCount},`)
      out.push('  },')
    }
    out.push(']')
    return out
  }

  const lines = [
    '/**',
    ' * Shipped. — Weekly + Monthly Sweep Data (AUTO-GENERATED)',
    ' *',
    ' * DO NOT EDIT BY HAND. Regenerated by:',
    ' *',
    ' *     node scripts/build-daily-manifest.mjs',
    ' *',
    ` * Source: the ${DAILY_BRANCH} branch of the shipped repo (${WEEKLY_DIR}/,`,
    ` * ${MONTHLY_DIR}/). Published at eddiebelaval.github.io/shipped.`,
    ' *',
    ' * These are the ROUTINE sweeps, distinct from the numbered magazine issues',
    ' * in issues.data.ts. Newest period first.',
    ' *',
    ` * Last generated: ${today} (${weekly.length} weekly, ${monthly.length} monthly)`,
    ' */',
    '',
    'export interface ShippedSweep {',
    '  /** Period key: ISO year-week for weekly ("2026-29"), year-month for monthly ("2026-06") */',
    '  period: string',
    '  /** Human label, e.g. "Week of July 13-19, 2026" or "June 2026" */',
    '  label: string',
    '  /** ISO date the period starts, for sorting */',
    '  sortKey: string',
    '  /** Editorial standfirst for the sweep */',
    '  title: string',
    '  /** Published public URL (github.io) */',
    '  url: string',
    '  /** Approximate visible word count */',
    '  wordCount: number',
    '}',
    '',
    ...emit('SHIPPED_WEEKLY_SWEEPS', 'Weekly Anthropic sweeps, newest first.', weekly),
    '',
    ...emit('SHIPPED_MONTHLY_SWEEPS', 'Monthly Anthropic roundups, newest first.', monthly),
    '',
  ]

  fs.writeFileSync(SWEEPS_OUT_FILE, lines.join('\n'), 'utf8')
  console.log(
    `Wrote ${path.relative(ID8_ROOT, SWEEPS_OUT_FILE)} — ${weekly.length} weekly, ${monthly.length} monthly.`,
  )
}

function main() {
  if (!fs.existsSync(SHIPPED_REPO)) {
    console.error(`shipped repo not found at ${SHIPPED_REPO}`)
    process.exit(1)
  }

  const files = listDailyFiles()
  if (files.length === 0) {
    console.error(
      `No daily files found on ${DAILY_BRANCH}:${DAILY_DIR}/ — is the branch fetched?`,
    )
    process.exit(1)
  }

  const dailies = []
  for (const file of files) {
    const date = file.match(/(\d{4}-\d{2}-\d{2})\.html$/)[1]
    const html = readDaily(file)
    const title = extractTitle(html) || fallbackTitle(date)
    const url = `${PUBLIC_BASE}/${file}`
    dailies.push({ date, title, url, wordCount: wordCount(html) })
  }

  // Newest first.
  dailies.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  // Group by ISO week (newest week first; days within newest first).
  const weekMap = new Map()
  for (const d of dailies) {
    const key = isoWeek(d.date)
    if (!weekMap.has(key)) {
      const ws = weekStart(d.date)
      weekMap.set(key, {
        isoWeek: key,
        weekStart: ws,
        label: weekLabel(ws),
        editions: [],
      })
    }
    weekMap.get(key).editions.push({ ...d, dayLabel: dayLabel(d.date) })
  }
  const weeks = [...weekMap.values()].sort((a, b) =>
    a.weekStart < b.weekStart ? 1 : a.weekStart > b.weekStart ? -1 : 0,
  )

  const today = new Date().toISOString().slice(0, 10)
  const lines = []
  lines.push('/**')
  lines.push(' * Shipped. — Daily Edition Data (AUTO-GENERATED)')
  lines.push(' *')
  lines.push(' * DO NOT EDIT BY HAND. Regenerated by:')
  lines.push(' *')
  lines.push(' *     node scripts/build-daily-manifest.mjs')
  lines.push(' *')
  lines.push(
    ` * Source: the ${DAILY_BRANCH} branch of the shipped repo (${DAILY_DIR}/).`,
  )
  lines.push(
    ' * Each daily edition is published at eddiebelaval.github.io/shipped and',
  )
  lines.push(
    ' * surfaced here grouped by ISO week so /shipped can present the archive as',
  )
  lines.push(' * issue buckets. Newest week (and newest day) first.')
  lines.push(' *')
  lines.push(` * Last generated: ${today} (${dailies.length} daily editions, ${weeks.length} weeks)`)
  lines.push(' */')
  lines.push('')
  lines.push('export interface ShippedDaily {')
  lines.push('  /** Publish date (ISO YYYY-MM-DD) */')
  lines.push('  date: string')
  lines.push('  /** Short weekday label, e.g. "Mon, Jun 15" */')
  lines.push('  dayLabel: string')
  lines.push('  /** Editorial standfirst / headline for the edition */')
  lines.push('  title: string')
  lines.push('  /** Published public URL (github.io) */')
  lines.push('  url: string')
  lines.push('  /** Approximate visible word count */')
  lines.push('  wordCount: number')
  lines.push('}')
  lines.push('')
  lines.push('export interface ShippedDailyWeek {')
  lines.push('  /** ISO week key, e.g. "2026-W25" */')
  lines.push('  isoWeek: string')
  lines.push('  /** Monday of the week (ISO YYYY-MM-DD) */')
  lines.push('  weekStart: string')
  lines.push('  /** Human label, e.g. "Week of June 9-15, 2026" */')
  lines.push('  label: string')
  lines.push('  /** Editions in the week, newest day first */')
  lines.push('  editions: ShippedDaily[]')
  lines.push('}')
  lines.push('')
  lines.push(
    '/** Every daily edition, flat, newest first. */',
  )
  lines.push('export const SHIPPED_DAILIES: ShippedDaily[] = [')
  for (const d of dailies) {
    lines.push('  {')
    lines.push(`    date: ${tsString(d.date)},`)
    lines.push(`    dayLabel: ${tsString(dayLabel(d.date))},`)
    lines.push(`    title: ${tsString(d.title)},`)
    lines.push(`    url: ${tsString(d.url)},`)
    lines.push(`    wordCount: ${d.wordCount},`)
    lines.push('  },')
  }
  lines.push(']')
  lines.push('')
  lines.push(
    '/** Daily editions grouped by ISO week, newest week first. */',
  )
  lines.push('export const SHIPPED_DAILY_WEEKS: ShippedDailyWeek[] = [')
  for (const w of weeks) {
    lines.push('  {')
    lines.push(`    isoWeek: ${tsString(w.isoWeek)},`)
    lines.push(`    weekStart: ${tsString(w.weekStart)},`)
    lines.push(`    label: ${tsString(w.label)},`)
    lines.push('    editions: [')
    for (const d of w.editions) {
      lines.push('      {')
      lines.push(`        date: ${tsString(d.date)},`)
      lines.push(`        dayLabel: ${tsString(d.dayLabel)},`)
      lines.push(`        title: ${tsString(d.title)},`)
      lines.push(`        url: ${tsString(d.url)},`)
      lines.push(`        wordCount: ${d.wordCount},`)
      lines.push('      },')
    }
    lines.push('    ],')
    lines.push('  },')
  }
  lines.push(']')
  lines.push('')

  fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8')
  console.log(
    `Wrote ${path.relative(ID8_ROOT, OUT_FILE)} — ${dailies.length} dailies across ${weeks.length} weeks.`,
  )

  writeSweeps()
}

main()
