#!/usr/bin/env node
/**
 * lab-log/approve.mjs — THE FOUNDER PUBLISHES THE STAGED ENTRY.
 *
 * The judgment half of the chain, and the human gate. Reads the staged
 * pending.json, prepends it to lib/lab-log.json (newest first), and clears the
 * pending file. It does NOT commit or deploy — that stays your hand.
 *
 * Run after reading scripts/lab-log/pending.json:
 *   node scripts/lab-log/approve.mjs
 */
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '../..')
const LOG_JSON = resolve(REPO, 'lib/lab-log.json')
const PENDING = resolve(HERE, 'pending.json')

function die(msg) { console.error(`[lab-log] ${msg}`); process.exit(1) }

if (!existsSync(PENDING)) die('no pending.json to approve. Run draft.mjs first.')

const entry = JSON.parse(readFileSync(PENDING, 'utf8'))
for (const k of ['date', 'stamp', 'title', 'body']) if (!entry[k]) die(`pending entry missing "${k}"`)

const entries = JSON.parse(readFileSync(LOG_JSON, 'utf8'))

// Idempotency: refuse to double-publish the same entry.
if (entries.some((e) => e.date === entry.date && e.title === entry.title)) {
  die(`an entry "${entry.title}" (${entry.date}) is already published. Nothing to do.`)
}

// Prepend (newest first), write back, clear the staging file.
entries.unshift(entry)
writeFileSync(LOG_JSON, JSON.stringify(entries, null, 2) + '\n')
rmSync(PENDING)

console.log(`[lab-log] PUBLISHED to the log: "${entry.title}" (${entry.stamp}). Now ${entries.length} entries.`)
console.log('[lab-log] Review the diff, then commit + deploy when you are ready (your gate):')
console.log('[lab-log]   git -C id8labs add lib/lab-log.json && git -C id8labs commit && deploy')
