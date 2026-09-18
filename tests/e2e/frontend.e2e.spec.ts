import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle('FILAS — Coming Soon')
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Coming soon.')
    const logo = page.getByRole('img', { name: 'FILAS', exact: true })
    await expect(logo).toBeVisible()
    await expect
      .poll(() => logo.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBeGreaterThan(0)
  })
})
