import { describe, expect, it } from 'vitest'
import { subscriptionListsForSource } from '@/lib/newsletter/subscriptions'

describe('subscriptionListsForSource', () => {
  it.each([
    ['shipped-magazine-issue-10', 'shipped'], // Shipped magazine issue page (cadence picker)
    ['shipped-issue-3', 'newsletter'],        // legacy newsletter issue page, from when it was "Shipped."
    ['newsletter-issue-3', 'newsletter'],
    ['shipped-hub', 'shipped'],
    ['shipped-daily', 'shipped'],
    ['shipped-weekly', 'shipped'],
    ['shipped-monthly', 'shipped'],
    ['shipped-writing', 'newsletter'], // legacy personal form, from when the newsletter was "Shipped."
    ['shipped-popup', 'newsletter'],
    ['newsletter-writing', 'newsletter'],
    ['newsletter-popup', 'newsletter'],
    [undefined, 'newsletter'],
  ])('%s joins %s', (source, list) => {
    expect(subscriptionListsForSource(source)).toEqual([list])
  })
})
