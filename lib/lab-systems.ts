/**
 * Canonical state for the living systems the Lab features.
 *
 * The Lab MIRRORS working doctrine that lives in other repos (the Periodic Table
 * doctrine in `periodic-table/`, the HALO/Genome system in the id8-halos vault).
 * A mirror that hardcodes numbers in prose rots: the table card once read "25
 * placed / 5 open" for weeks after the doctrine moved to 28/3. So the volatile
 * facts live here, in ONE place, and the Forge-Watch monthly audit updates this
 * file as part of the pass (see periodic-table/FORGE-WATCH.md).
 *
 * PRIVACY RULE (LANDING-SPLIT-SPEC.md, Eddie 2026-07-22): never name a client on
 * a public surface. The HALO entry describes the SYSTEM only — no brand, no
 * count of clients, no tells. Examples are welcome; identities are not.
 */

export type LabSystem = {
  slug: string
  /** Last time the underlying doctrine/system was audited or advanced. */
  lastUpdated: string // ISO date
}

/** The Periodic Table of Primitives. Source of truth: periodic-table/ELEMENTS.md. */
export const periodicTable = {
  slug: 'periodic-table',
  placed: 30,
  openGaps: 3,
  fullColumns: 4, // Transformers, Provers, Gates, Meters
  lastAudit: '2026-08-15',
  auditCadence: 'monthly',
  // The audit trail, newest first. These are the essays that narrate each pass.
  essays: [
    { slug: 'the-floor-below-the-floor', title: 'The Floor Below the Floor', href: '/the-floor-below-the-floor.html', date: '2026-08-17' },
    { slug: 'the-table-has-a-pulse', title: 'The Table Has a Pulse', href: '/the-table-has-a-pulse.html', date: '2026-08-15' },
    { slug: 'the-gaps-are-the-product', title: 'The Gaps Are the Product', href: '/periodic-table-of-primitives.html', date: '2026-07-20' },
  ],
  instrumentHref: '/periodic-table.html',
  // One-line pulse: what the last pass did. Updated each audit.
  lastPass:
    'The first monthly audit (Aug 2026) admitted two elements the table had been running unnamed and placed a third as a lab-forged candidate. Days later, tuning to a pattern we run constantly forged Rollup — the deterministic fan-in that consolidates many records into one report — into the cell the table had flagged between Meter and Billing.',
} as const

/** The HALO / Genome system. Source: the id8-halos vault. Client-neutral only. */
export const halo = {
  slug: 'halo-genome',
  genes: ['Design', 'Voice', 'Ethos', 'Lexicon'],
  lastUpdated: '2026-08',
} as const
