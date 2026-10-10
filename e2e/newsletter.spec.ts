import { test, expect } from '@playwright/test';

// Signal to Noise (the id8Labs newsletter) and its denied paths. The wordmark once
// rendered broken: a cache-busting `?v=2` routed the SVG through /_next/image,
// which refuses SVG. These run against a production build in CI.

const WORDMARK = '/brand/signal-to-noise-wordmark.svg?v=2';

test.describe('Signal to Noise newsletter', () => {
  for (const path of ['/writing?filter=newsletter', '/newsletter/issue-3']) {
    test(`wordmark on ${path} is the raw SVG and actually renders`, async ({ page }) => {
      const bad: string[] = [];
      page.on('response', (r) => { if (r.status() >= 400 && /signal-to-noise|_next\/image/.test(r.url())) bad.push(`${r.status()} ${r.url()}`); });
      await page.goto(path);
      const img = page.locator('img[alt="Signal to Noise"]').first();
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('src', WORDMARK);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
      expect(bad).toEqual([]);
    });
  }

  test('/newsletter redirects to the Notebook newsletter tab', async ({ request }) => {
    const res = await request.get('/newsletter', { maxRedirects: 0 });
    expect([307, 308]).toContain(res.status());
    expect(res.headers()['location'] ?? '').toContain('/writing?filter=newsletter');
  });

  test('subscribe rejects an invalid email with 400', async ({ request }) => {
    const res = await request.post('/api/newsletter/subscribe', { data: { email: 'not-an-email', source: 'newsletter-writing' } });
    expect(res.status()).toBe(400);
  });

  test('newsletter send refuses a caller with no credentials (401)', async ({ request }) => {
    const res = await request.post('/api/newsletter/send', { data: {} });
    expect(res.status()).toBe(401);
  });
});
