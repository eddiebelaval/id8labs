import { test, expect } from '@playwright/test'

test.describe('Stack Builder - Flip Animation & Floating Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skills')
    await page.waitForLoadState('domcontentloaded')
  })

  test('should show floating stack builder after adding a skill', async ({ page }) => {
    // Stack builder should NOT be visible initially
    const stackBuilder = page.locator('div:has-text("Stack Builder")').first()
    await expect(stackBuilder).not.toBeVisible()

    // Click "Add to Stack" on first skill card
    const addButton = page.locator('button:has-text("Add to Stack")').first()
    await addButton.click()

    // Stack builder should appear in bottom-right
    await expect(stackBuilder).toBeVisible()
    await expect(stackBuilder).toHaveText(/Stack Builder/)
    await expect(stackBuilder).toHaveText(/1 item/)
  })

  test('should show flip animation when adding skill', async ({ page }) => {
    // Add first skill. Use a stable button locator (the card's only button) —
    // its label flips from "Add to Stack" to "In Stack" after clicking, so a
    // :has-text("Add to Stack") locator would go stale.
    const firstCard = page.locator('article').first()
    const addButton = firstCard.getByRole('button').last()

    await addButton.click()

    // Wait for animation
    await page.waitForTimeout(800)

    // Button should change to "In Stack"
    await expect(addButton).toHaveText(/In Stack/)
  })

  test('should expand and collapse stack builder', async ({ page }) => {
    // Add the first item
    await page.locator('article').first().getByRole('button').last().click()

    // Wait for panel to appear
    await page.waitForTimeout(500)

    // Panel should be expanded by default, showing the item's group heading.
    // The first card may be a skill or an agent depending on dataset ordering,
    // so match any group with one item rather than hardcoding "Skills (1)".
    const expandedContent = page.getByText(/(Skills|Agents|Commands|Settings) \(1\)/)
    await expect(expandedContent).toBeVisible()
    
    // Click header to collapse
    const header = page.locator('button:has-text("Stack Builder")')
    await header.click()
    
    // Content should be hidden
    await expect(expandedContent).not.toBeVisible()
    
    // Click again to expand
    await header.click()
    await expect(expandedContent).toBeVisible()
  })

  test('should add multiple skills and group them', async ({ page }) => {
    // Add 3 skills (click each card's button so labels flipping to "In Stack"
    // don't invalidate the locator list)
    const cards = page.locator('article')
    await cards.nth(0).getByRole('button').last().click()
    await page.waitForTimeout(300)
    await cards.nth(1).getByRole('button').last().click()
    await page.waitForTimeout(300)
    await cards.nth(2).getByRole('button').last().click()

    // Stack should show 3 items
    await expect(page.locator('text=/3 items/')).toBeVisible()
    
    // Skills should be grouped
    await expect(page.locator('text=/Skills \\(\\d+\\)/')).toBeVisible()
  })

  test('should generate install command', async ({ page }) => {
    // Add a skill
    await page.locator('article').first().getByRole('button').last().click()
    await page.waitForTimeout(500)

    // GeneratedCommand renders an "Installation" section (CLI mode by default)
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()

    // Should show the generated install command
    await expect(page.locator('code:has-text("stackshack install")')).toBeVisible()

    // Should have Copy button
    const copyButton = page.locator('button:has-text("Copy")').last()
    await expect(copyButton).toBeVisible()
  })

  test('should copy command to clipboard', async ({ page }) => {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])

    // Add a skill
    await page.locator('article').first().getByRole('button').last().click()
    await page.waitForTimeout(500)

    // Click copy button
    const copyButton = page.locator('button:has-text("Copy")').last()
    await copyButton.click()

    // Button should show "Copied"
    await expect(page.locator('button:has-text("Copied")')).toBeVisible()

    // Should change back after 2 seconds
    await page.waitForTimeout(2500)
    await expect(page.locator('button:has-text("Copy")').last()).toBeVisible()
  })

  test('should remove individual skill from stack', async ({ page }) => {
    // Add 2 skills
    await page.locator('article').nth(0).getByRole('button').last().click()
    await page.waitForTimeout(300)
    await page.locator('article').nth(1).getByRole('button').last().click()
    await page.waitForTimeout(500)

    // Should have 2 items
    await expect(page.locator('text=/2 items/')).toBeVisible()

    // Remove the first stack item (the remove control is opacity-0 until hover,
    // but opacity:0 elements are still actionable in Playwright)
    const removeButton = page.locator('button[aria-label="Remove from stack"]').first()
    await removeButton.click()

    // Should now have 1 item
    await expect(page.locator('text=/1 item/')).toBeVisible()
  })

  test('should clear all skills from stack', async ({ page }) => {
    // Add 2 skills
    await page.locator('article').nth(0).getByRole('button').last().click()
    await page.waitForTimeout(300)
    await page.locator('article').nth(1).getByRole('button').last().click()
    await page.waitForTimeout(500)

    // Click clear all button (trash icon)
    const clearButton = page.locator('button[aria-label="Clear all"]')
    await clearButton.click()

    // Stack builder should disappear
    await expect(page.locator('.fixed.bottom-6.right-6.z-50')).not.toBeVisible()
  })

  test('should persist stack across page refresh', async ({ page }) => {
    // Add a skill
    await page.locator('button:has-text("Add to Stack")').first().click()
    await page.waitForTimeout(500)
    
    // Verify stack is visible
    await expect(page.locator('text=/1 item/')).toBeVisible()
    
    // Refresh page
    await page.reload()
    await page.waitForLoadState('domcontentloaded')
    
    // Stack should still be visible with same item
    await expect(page.locator('text=/1 item/')).toBeVisible()
    
    // Clean up - clear stack
    const clearButton = page.locator('button[aria-label="Clear all"]')
    await clearButton.click()
  })

  test('should position stack builder in bottom-right corner', async ({ page }) => {
    // Add a skill
    await page.locator('article').first().getByRole('button').last().click()
    await page.waitForTimeout(500)

    // Get stack builder position (the floating panel is fixed bottom-right)
    const stackBuilder = page.locator('.fixed.bottom-6.right-6.z-50').first()
    const box = await stackBuilder.boundingBox()
    
    // Should be in bottom-right area
    expect(box).not.toBeNull()
    if (box) {
      const viewport = page.viewportSize()
      expect(box.x).toBeGreaterThan(viewport!.width - 500) // Near right edge
      // Panel is bottom-anchored (fixed bottom-6): its bottom edge sits near the
      // viewport bottom regardless of panel height.
      expect(box.y + box.height).toBeGreaterThan(viewport!.height - 100)
    }
  })

  test('should handle rapid clicks without duplicates', async ({ page }) => {
    // Stable button locator (label flips between Add/In Stack on each click)
    const addButton = page.locator('article').first().getByRole('button').last()

    // Click multiple times rapidly (add → remove → add ends at a single item)
    await addButton.click()
    await addButton.click()
    await addButton.click()

    await page.waitForTimeout(500)

    // Should only have 1 item (no duplicates)
    await expect(page.locator('text=/1 item/')).toBeVisible()
  })
})
