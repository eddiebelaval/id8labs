/**
 * Which publication a signup joins, by form source.
 *
 * The personal newsletter (now Signal to Noise) once wore the "Shipped." name,
 * so its legacy forms still send Shipped tracking names: `shipped-writing`,
 * `shipped-popup`, and `shipped-issue-N` (old newsletter issue pages; current
 * ones send `newsletter-issue-N`). Every other `shipped*` source is the magazine:
 * `shipped-magazine-issue-NN`, `shipped-hub`, `shipped-daily|weekly|monthly`.
 */
export function subscriptionListsForSource(source: unknown): string[] {
  const normalized = typeof source === 'string' ? source.toLowerCase() : 'website'
  const legacyPersonal = normalized === 'shipped-writing'
    || normalized === 'shipped-popup'
    || normalized.startsWith('shipped-issue-')
  return normalized.startsWith('shipped') && !legacyPersonal
    ? ['shipped']
    : ['newsletter']
}
