import { test, expect } from '@playwright/test'

// The editorial reface intentionally removed the old green/emerald "glow"
// (ring + shadow) on added cards. The in-stack state is now a flat teal
// outline (non-featured cards) and the button label flips to "In Stack".
// This test verifies the add-to-stack feedback under the new design.
test('verify in-stack state is reflected when a card is added to stack', async ({ page }) => {
  await page.goto('/skills')
  await page.waitForLoadState('domcontentloaded')

  // Find first skill card
  const firstCard = page.locator('article').first()

  // Click Add to Stack (the card's only button; label flips after click)
  const addButton = firstCard.getByRole('button').last()
  await addButton.click()

  // Wait for transition
  await page.waitForTimeout(500)

  // Button should say "In Stack"
  await expect(addButton).toHaveText(/In Stack/)

  // Stack builder should be visible
  await expect(page.locator('.fixed.bottom-6.right-6.z-50')).toBeVisible()
})
