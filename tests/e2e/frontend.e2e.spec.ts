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
    await expect(page.getByRole('banner')).toHaveCount(1)
    await expect(page.getByRole('main')).toHaveCount(1)
    await expect(page.getByRole('contentinfo')).toHaveCount(1)
    await expect(page.locator('.filas-site')).toHaveCount(0)
    await expect(page.locator('#main-content')).toBeVisible()
    const brand = page.getByRole('banner').getByRole('link', { name: 'FILAS home', exact: true })
    await expect(brand).toBeVisible()
    await expect(brand).toHaveAttribute('href', '/')
    const skipLink = page.getByRole('link', { name: 'Skip to content', exact: true })
    await skipLink.focus()
    await skipLink.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()
  })
})
