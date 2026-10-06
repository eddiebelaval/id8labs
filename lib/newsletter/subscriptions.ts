/** Legacy personal-newsletter forms used Shipped tracking names. */
export function subscriptionListsForSource(source: unknown): string[] {
  const normalized = typeof source === 'string' ? source.toLowerCase() : 'website'
  const personalNewsletter = normalized === 'shipped-writing'
    || normalized === 'shipped-popup'
    || normalized.startsWith('shipped-issue-')
  return normalized.startsWith('shipped') && !personalNewsletter
    ? ['shipped']
    : ['newsletter']
}
