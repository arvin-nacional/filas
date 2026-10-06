import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { AnimatedEcosystemHeroBlock } from '@/blocks/Homepage/AnimatedEcosystemHero'
import {
  AnimatedEcosystemHero,
  EcosystemHero,
  GrowthHero,
  homepageBlocks,
} from '@/blocks/Homepage/config'
import { growthHeroDefaults } from '@/blocks/Homepage/defaults'
import type { AnimatedEcosystemHeroBlock as HeroProps } from '@/payload-types'

const base: HeroProps = {
  ...growthHeroDefaults,
  blockType: 'animatedEcosystemHero',
  visuals: {
    enableAnimation: true,
    demandTitle: 'Demand generation',
    storeTitle: 'Store management',
    fulfillmentTitle: 'Warehousing & fulfillment',
  },
}

function render(props: HeroProps & { homePath?: string }) {
  const container = document.createElement('div')
  container.innerHTML = renderToStaticMarkup(createElement(AnimatedEcosystemHeroBlock, props))
  return container
}

describe('Editable animated ecosystem hero', () => {
  it('registers a separate option while preserving both existing hero blocks', () => {
    expect(homepageBlocks).toContain(GrowthHero)
    expect(homepageBlocks).toContain(EcosystemHero)
    expect(homepageBlocks).toContain(AnimatedEcosystemHero)
    expect([GrowthHero.slug, EcosystemHero.slug, AnimatedEcosystemHero.slug]).toEqual([
      'growthHero',
      'ecosystemHero',
      'animatedEcosystemHero',
    ])
  })

  it('renders the headline and service names as native accessible content before WebGL loads', () => {
    const element = render(base)
    expect(element.querySelector('h1')?.textContent).toContain(growthHeroDefaults.heading)
    expect(element.querySelector('h1')?.textContent).toContain(growthHeroDefaults.emphasis)
    expect(element.textContent).toContain(growthHeroDefaults.description)
    const serviceButtons = [...element.querySelectorAll('button')].map(
      (button) => button.textContent,
    )
    expect(serviceButtons).toEqual(
      expect.arrayContaining([
        'Demand generation',
        'Store management',
        'Warehousing & fulfillment',
      ]),
    )
  })

  it('shows only the original FILAS emblem in the center without the wordmark text', () => {
    const element = render(base)
    const figure = element.querySelector('figure')
    const emblem = figure?.querySelector('svg[data-brand-emblem="filas"]')
    expect(emblem).not.toBeNull()
    expect(emblem?.getAttribute('viewBox')).toBe('0 0 620 641')
    const originalLogo = emblem?.querySelector('image')
    expect(originalLogo?.getAttribute('href')).toBe('/filas-horizontal-logo.png')
    expect(originalLogo?.getAttribute('width')).toBe('3076')
    expect(originalLogo?.getAttribute('height')).toBe('641')
    expect(figure?.textContent).not.toContain('FILAS')
  })

  it('honors edited heading, description, and service names', () => {
    const element = render({
      ...base,
      heading: 'Your brand.',
      emphasis: 'Moving forward.',
      description: 'A custom introduction for our client.',
      visuals: {
        demandTitle: 'Create demand',
        storeTitle: 'Connect commerce',
        fulfillmentTitle: 'Deliver orders',
      },
    })
    expect(element.querySelector('h1')?.textContent).toContain('Your brand.')
    expect(element.querySelector('h1')?.textContent).toContain('Moving forward.')
    expect(element.textContent).toContain('A custom introduction for our client.')
    const serviceButtons = [...element.querySelectorAll('button')].map(
      (button) => button.textContent,
    )
    expect(serviceButtons).toEqual(
      expect.arrayContaining(['Create demand', 'Connect commerce', 'Deliver orders']),
    )
    expect(element.textContent).not.toContain('Demand generation')
    expect(element.textContent).not.toContain('Store management')
    expect(element.textContent).not.toContain('Warehousing & fulfillment')
  })

  it.each([true, false])(
    'preserves the animation option (%s) while rendering native loading content without an image',
    (enableAnimation) => {
      const element = render({ ...base, visuals: { ...base.visuals, enableAnimation } })
      const figure = element.querySelector('figure')
      expect(figure?.getAttribute('data-animation-enabled')).toBe(String(enableAnimation))
      expect(figure?.getAttribute('data-animation')).toBe('paused')
      expect(figure?.getAttribute('data-renderer')).toBe('loading')
      expect(figure?.getAttribute('data-entrance')).toBe('waiting')
      expect(element.querySelector('img')).toBeNull()
      expect(element.querySelector('link[rel="preload"][as="image"]')).toBeNull()
      expect(figure?.querySelector('canvas')?.getAttribute('aria-hidden')).toBe('true')
      const buttons = [...(figure?.querySelectorAll('button') ?? [])]
      expect(buttons.map((button) => button.textContent)).toEqual([
        'Demand generation',
        'Store management',
        'Warehousing & fulfillment',
      ])
      expect(buttons.every((button) => button.getAttribute('aria-pressed') === 'false')).toBe(true)
      expect(element.querySelector('button[aria-label="Pause animation"]')).toBeNull()
      expect(element.querySelector('button[aria-label="Play animation"]')).toBeNull()
    },
  )

  it('enables animation by default without depending on the older hero controls', () => {
    const element = render({
      ...base,
      visuals: {
        demandTitle: 'Demand generation',
        storeTitle: 'Store management',
        fulfillmentTitle: 'Warehousing & fulfillment',
      },
    })
    expect(element.querySelector('figure')?.getAttribute('data-animation-enabled')).toBe('true')
    const visuals = AnimatedEcosystemHero.fields.find(
      (field) => 'name' in field && field.name === 'visuals',
    )
    if (visuals?.type !== 'group') throw new Error('Animated hero visual controls are missing')
    const animation = visuals.fields.find(
      (field) => 'name' in field && field.name === 'enableAnimation',
    )
    expect(animation?.type).toBe('checkbox')
    if (animation?.type !== 'checkbox') throw new Error('Animation setting is missing')
    expect(animation.defaultValue).toBe(true)
    expect(visuals.fields.some((field) => 'name' in field && field.name === 'showCards')).toBe(
      false,
    )
  })

  it('keeps both calls to action inside the homepage preview context', () => {
    const element = render({ ...base, homePath: '/animated-hero-design' })
    const links = [...element.querySelectorAll('a')]
    expect(
      links
        .find((link) => link.textContent?.includes(base.primaryLink.label))
        ?.getAttribute('href'),
    ).toBe('/animated-hero-design#contact')
    expect(
      links
        .find((link) => link.textContent?.includes(base.secondaryLink.label))
        ?.getAttribute('href'),
    ).toBe('/animated-hero-design#services')
  })
})
