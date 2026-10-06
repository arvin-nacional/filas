import assert from 'node:assert/strict'
import { setTimeout as delay } from 'node:timers/promises'
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const output = 'C:/Users/Arvin/.codex/visualizations/2026/10/06/01a11043-a2dd-7cd2-be04-78596e0c74c1'
const browser = await chromium.launch({ headless: true, args: ['--enable-unsafe-swiftshader'] })
const url = 'http://localhost:3000/hero-preview/animated'
const errors = []
const pages = []
const makePage = async (options = {}) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options })
  const page = await context.newPage()
  pages.push(context)
  page.on('pageerror', (error) => errors.push(error.message))
  await page.clock.install({ time: new Date('2026-10-06T00:00:00Z') })
  await page.clock.pauseAt(new Date('2026-10-06T00:00:01Z'))
  return page
}
const waitState = async (page, property, expected) => {
  for (let i = 0; i < 200; i++) {
    const value = await page.locator('figure[data-renderer]').getAttribute(property).catch(() => null)
    if (value === expected) return
    await delay(100)
  }
  throw new Error(`Timed out waiting for ${property}=${expected}`)
}
const state = (page) => page.locator('figure[data-renderer]').evaluate((figure) => ({
  renderer: figure.dataset.renderer,
  entrance: figure.dataset.entrance,
  animation: figure.dataset.animation,
  labels: [...figure.querySelectorAll('li button')].map((button) => Number(getComputedStyle(button).opacity)),
  emblem: Number(getComputedStyle(figure.querySelector('[data-brand-emblem]')).opacity),
  text: figure.textContent,
}))
const colors = async (image) => {
  const { data, info } = await sharp(image).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const counts = { rust: 0, sand: 0, green: 0 }
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    if (r > g * 1.35 && r > b * 1.4 && r > 90 && g < 170) counts.rust++
    if (r - b > 20 && r - g > 5 && g - b > 10 && r > 110) counts.sand++
    if (g > r * 1.05 && g > b && g < 110 && r < 100) counts.green++
  }
  return counts
}

try {
  const page = await makePage()
  const requested = []
  page.on('request', (request) => requested.push(request.url()))
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await waitState(page, 'data-renderer', 'webgl')
  const states = []
  const capture = async (name) => {
    const current = await state(page)
    const png = await page.locator('figure').screenshot({ path: `${output}/${name}.png`, animations: 'disabled' })
    const counts = await colors(png)
    states.push({ name, ...current, colors: counts })
    console.log(JSON.stringify(states.at(-1)))
    return current
  }
  const initial = await capture('filas-entrance-00')
  assert.equal(initial.entrance, 'entering')
  assert.deepEqual(initial.labels, [0, 0, 0])
  assert.equal(initial.emblem, 0)
  await page.clock.runFor(220)
  const one = await capture('filas-entrance-01')
  assert.equal(one.labels[1], 0)
  assert.equal(one.labels[2], 0)
  assert.equal(one.emblem, 0)
  assert.equal(states.at(-1).colors.green, 0)
  await page.clock.runFor(260)
  const two = await capture('filas-entrance-02')
  assert.ok(two.labels[0] > 0)
  assert.equal(two.labels[1], 0)
  assert.equal(two.labels[2], 0)
  assert.equal(states.at(-1).colors.green, 0)
  await page.getByRole('button', { name: 'Pause animation' }).click({ force: true })
  await waitState(page, 'data-animation', 'paused')
  const paused = await state(page)
  await page.clock.runFor(1200)
  assert.deepEqual(await state(page), paused)
  await page.getByRole('button', { name: 'Play animation' }).click({ force: true })
  await waitState(page, 'data-animation', 'running')
  await page.clock.runFor(300)
  await capture('filas-entrance-03')
  await page.clock.runFor(600)
  await waitState(page, 'data-entrance', 'complete')
  const completed = await capture('filas-entrance-04')
  assert.deepEqual(completed.labels, [1, 1, 1])
  assert.equal(completed.emblem, 1)
  assert.ok(!completed.text.includes('FILAS'))
  assert.ok(!requested.some((request) => request.includes('/hero/ecosystem-sculpture.webp')))
  await page.screenshot({ path: `${output}/filas-animated-hero-emblem-desktop.png`, fullPage: true, animations: 'disabled' })
  console.log('Normal loading, arrow sequence, pause/resume, center emblem, and no generated-image request passed.')

  const reduced = await makePage({ reducedMotion: 'reduce' })
  await reduced.goto(url, { waitUntil: 'domcontentloaded' })
  await waitState(reduced, 'data-renderer', 'webgl')
  const reducedState = await state(reduced)
  assert.equal(reducedState.entrance, 'complete')
  assert.equal(reducedState.animation, 'paused')
  assert.deepEqual(reducedState.labels, [1, 1, 1])
  assert.equal(reducedState.emblem, 1)
  console.log('Reduced motion shows the completed loop immediately.')

  const mobile = await makePage({ viewport: { width: 320, height: 500 } })
  await mobile.goto(url, { waitUntil: 'domcontentloaded' })
  await waitState(mobile, 'data-renderer', 'webgl')
  const mobileInitial = await state(mobile)
  await mobile.clock.runFor(500)
  assert.deepEqual(await state(mobile), mobileInitial)
  await mobile.locator('figure').scrollIntoViewIfNeeded({ timeout: 10000 })
  await mobile.clock.runFor(1500)
  await waitState(mobile, 'data-entrance', 'complete')
  assert.deepEqual((await state(mobile)).labels, [1, 1, 1])
  const mobileLayout = await mobile.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    labels: [...document.querySelectorAll('figure li button')].map((button) => {
      const bounds = button.getBoundingClientRect()
      return { left: bounds.left, right: bounds.right, bottom: bounds.bottom }
    }),
  }))
  assert.equal(mobileLayout.scrollWidth, mobileLayout.width)
  assert.ok(mobileLayout.labels.every(({ left, right }) => left >= 0 && right <= mobileLayout.width))
  await mobile.screenshot({ path: `${output}/filas-animated-hero-emblem-mobile.png`, fullPage: true, animations: 'disabled' })
  console.log('Offscreen entrance remains at its starting frame; mobile emblem and labels fit at 320px.')

  await page.locator('canvas').evaluate((canvas) => {
    canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()
  })
  await waitState(page, 'data-renderer', 'fallback')
  const fallback = await state(page)
  assert.equal(fallback.entrance, 'complete')
  assert.deepEqual(fallback.labels, [1, 1, 1])
  assert.equal(fallback.emblem, 1)
  assert.equal(await page.locator('figure img').getAttribute('src'), '/hero/ecosystem-sculpture.webp')
  console.log('Context loss loads fallback artwork only on failure, with emblem and all labels visible.')
  assert.deepEqual(errors, [])
  console.log('PASS: no browser exceptions.')
} finally {
  await Promise.all(pages.map((context) => context.close()))
  await browser.close()
}
