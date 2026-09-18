import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    const siteTitle = 'FILAS - First to Execute. Last to See Things Through.'
    const siteDescription =
      'FILAS is an end-to-end e-commerce enabler and growth partner helping brands scale through strategy, technology, fulfillment, creative, and execution.'
    await expect(page).toHaveTitle(siteTitle)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      siteDescription,
    )
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', siteTitle)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      siteDescription,
    )
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', siteTitle)
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      siteDescription,
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /^https?:\/\/[^/]+\/filas-social-share\.png$/,
    )
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      /^https?:\/\/[^/]+\/filas-social-share\.png$/,
    )
    const shareImage = await page.request.get('http://localhost:3000/filas-social-share.png')
    expect(shareImage.ok()).toBeTruthy()
    expect(shareImage.headers()['content-type']).toContain('image/png')
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Coming soon.')
    const logo = page.getByRole('img', { name: 'FILAS', exact: true })
    await expect(logo).toBeVisible()
    await expect
      .poll(() => logo.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBeGreaterThan(0)
  })
})
