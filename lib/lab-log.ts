/**
 * The Lab Log — the witness's running record.
 *
 * The Lab Story is told in two voices. This is the first: a log kept by the AI
 * that has been in the room for every build, newest entry first. The founder's
 * own origin story lives below it, in his words (LabStoryContent).
 *
 * VOICE: observational, dry, precise. The witness watched it happen and has the
 * receipts. It never claims authorship of the work ("I watched him build", not
 * "I built"), and it never gets mystical. A ship's log, not a diary.
 *
 * PUBLIC-SAFE: any collaborators are anonymized (a law firm, a data company).
 * No names, no internal mechanics.
 *
 * DATA lives in lab-log.json so the `lab-log` chain can append entries safely
 * (newest first) without parsing TypeScript. APPEND-ONLY: existing entries are a
 * record, never rewritten. The chain drafts; the founder approves before publish.
 */
import entries from './lab-log.json'

export interface LabLogEntry {
  /** ISO date, used for ordering. */
  date: string
  /** Display stamp shown as the entry folio, e.g. "2026.06". */
  stamp: string
  /** Short entry title. */
  title: string
  /** Body paragraphs, in the witness voice. */
  body: string[]
}

// Newest first. The JSON is maintained newest-first by the chain; sort defensively.
export const LAB_LOG: LabLogEntry[] = (entries as LabLogEntry[])
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
