import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { EcosystemHeroBlock } from '@/blocks/Homepage/EcosystemHero'
import { GrowthHeroBlock } from '@/blocks/Homepage/GrowthHero'
import { EcosystemHero, GrowthHero, homepageBlocks } from '@/blocks/Homepage/config'
import { growthHeroDefaults } from '@/blocks/Homepage/defaults'
import type { EcosystemHeroBlock as HeroProps, Media } from '@/payload-types'

const base: HeroProps = { ...growthHeroDefaults, blockType: 'ecosystemHero' }
const photo: Media = {
  id: 'uploaded-photo',
  url: '/api/media/file/custom.png',
  alt: 'Custom brand photo',
  createdAt: '2026-09-25T00:00:00Z',
  updatedAt: '2026-09-25T00:00:00Z',
}

function render(props: HeroProps & { homePath?: string }) {
  const container = document.createElement('div')
  container.innerHTML = renderToStaticMarkup(createElement(EcosystemHeroBlock, props))
  return container
}

describe('Editable ecosystem hero', () => {
  it('renders the ecosystem artwork with only the three service titles', () => {
    const element = render(base)
    expect(element.querySelector('h1')?.textContent).toContain(growthHeroDefaults.emphasis)
    expect(element.textContent).toContain(growthHeroDefaults.heading)
    expect(element.textContent).toContain(growthHeroDefaults.description)
    expect(element.textContent).toContain(growthHeroDefaults.footnote)
    expect(element.querySelectorAll('img')).toHaveLength(1)
    const ecosystem = element.querySelector('img[alt="The FILAS e-commerce ecosystem"]')
    expect(ecosystem).not.toBeNull()
    expect(ecosystem?.getAttribute('src')).toBe('/hero/ecosystem-sculpture.webp')
    expect(ecosystem?.hasAttribute('srcset')).toBe(false)
    expect([...element.querySelectorAll('h2')].map((heading) => heading.textContent)).toEqual([
      'Demand generation',
      'Store management',
      'Warehousing & fulfillment',
    ])
    expect(element.textContent).not.toContain('Content, creators & campaigns.')
    expect(element.textContent).not.toContain('Listings, campaigns & customer care.')
    expect(element.textContent).not.toContain('Inventory, packing & delivery.')
    expect(element.textContent).not.toContain('01 / Create demand')
    expect(element.textContent).not.toContain('02 / Connect commerce')
    expect(element.textContent).not.toContain('03 / Deliver on the promise')
    expect(element.textContent).not.toContain('All the moving parts. Working as one.')
    expect(element.querySelector('figure p')).toBeNull()
    expect(element.textContent).toContain('Shopify')
  })

  it('hides service titles and marketplaces while keeping the main artwork', () => {
    const element = render({
      ...base,
      visuals: {
        showCards: false,
        progressLabel: 'Custom progress callout',
        fulfillmentLabel: 'Custom fulfillment callout',
        marketplaceLabel: 'Custom marketplace callout',
        marketplaces: [{ name: 'Our marketplace', logo: photo }],
      },
    })
    expect(element.textContent).not.toContain('Custom progress callout')
    expect(element.textContent).not.toContain('Custom fulfillment callout')
    expect(element.textContent).not.toContain('Custom marketplace callout')
    expect(element.textContent).not.toContain('Our marketplace')
    expect(element.querySelectorAll('img')).toHaveLength(1)
    const ecosystem = element.querySelector('img[alt="The FILAS e-commerce ecosystem"]')
    expect(ecosystem).not.toBeNull()
    expect(ecosystem?.getAttribute('src')).toBe('/hero/ecosystem-sculpture.webp')
    expect(element.querySelectorAll('h2')).toHaveLength(0)
  })

  it('renders the editable footnote and marketplace logos without legacy annotations', () => {
    const element = render({
      ...base,
      footnote: 'A custom partnership promise.',
      visuals: {
        progressLabel: 'Build your next chapter',
        fulfillmentLabel: 'Custom fulfillment support',
        marketplaceLabel: 'Custom marketplace support',
        marketplaces: [{ name: 'Our marketplace', logo: photo }],
      },
    })
    expect(element.textContent).toContain('A custom partnership promise.')
    expect(element.textContent).not.toContain('Build your next chapter')
    expect(element.textContent).not.toContain('Custom fulfillment support')
    expect(element.textContent).not.toContain('Custom marketplace support')
    const logo = element.querySelector('img[alt="Our marketplace"]')
    expect(logo?.getAttribute('src')).toMatch(/^\/api\/media\/file\/custom.png\?/)
    expect(logo?.hasAttribute('srcset')).toBe(false)
    expect(element.querySelectorAll('img')).toHaveLength(2)
    expect(element.textContent).not.toContain('Shopee')
  })

  it('uses uploaded artwork and its alternative text instead of the bundled illustration', () => {
    const element = render({ ...base, visuals: { artworkImage: photo } })
    const artwork = element.querySelector('img')
    expect(artwork?.getAttribute('src')).toMatch(/^\/api\/media\/file\/custom.png\?/)
    expect(artwork?.getAttribute('alt')).toBe('Custom brand photo')
    expect(artwork?.hasAttribute('srcset')).toBe(false)
    expect(element.querySelectorAll('img')).toHaveLength(1)
    expect(element.innerHTML).not.toContain('/hero/ecosystem-sculpture.webp')
  })

  it('falls back to bundled artwork when an upload relationship is not populated', () => {
    const element = render({ ...base, visuals: { artworkImage: photo.id } })
    const artwork = element.querySelector('img')
    expect(artwork?.getAttribute('src')).toBe('/hero/ecosystem-sculpture.webp')
    expect(artwork?.getAttribute('alt')).toBe('The FILAS e-commerce ecosystem')
  })

  it('keeps both calls to action in the homepage preview context', () => {
    const element = render({ ...base, homePath: '/homepage-design' })
    const links = [...element.querySelectorAll('a')]
    expect(
      links
        .find((link) => link.textContent?.includes(base.primaryLink.label))
        ?.getAttribute('href'),
    ).toBe('/homepage-design#contact')
    expect(
      links
        .find((link) => link.textContent?.includes(base.secondaryLink.label))
        ?.getAttribute('href'),
    ).toBe('/homepage-design#services')
  })

  it('keeps the original photo hero and the ecosystem hero available as distinct options', () => {
    expect(homepageBlocks).toContain(GrowthHero)
    expect(homepageBlocks).toContain(EcosystemHero)
    expect(GrowthHero.slug).toBe('growthHero')
    expect(EcosystemHero.slug).toBe('ecosystemHero')

    const originalVisuals = GrowthHero.fields.find(
      (field) => 'name' in field && field.name === 'visuals',
    )
    const ecosystemVisuals = EcosystemHero.fields.find(
      (field) => 'name' in field && field.name === 'visuals',
    )
    if (originalVisuals?.type !== 'group' || ecosystemVisuals?.type !== 'group') {
      throw new Error('Both hero options must expose their own visual controls')
    }
    for (const name of ['mainImage', 'fulfillmentImage']) {
      const originalUpload = originalVisuals.fields.find(
        (field) => 'name' in field && field.name === name,
      )
      expect(originalUpload?.type).toBe('upload')
      if (originalUpload?.type !== 'upload') {
        throw new Error(`Original hero upload ${name} is missing`)
      }
      expect(originalUpload.admin?.hidden).not.toBe(true)
      expect(ecosystemVisuals.fields.some((field) => 'name' in field && field.name === name)).toBe(
        false,
      )
    }
    const artworkUpload = ecosystemVisuals.fields.find(
      (field) => 'name' in field && field.name === 'artworkImage',
    )
    expect(artworkUpload?.type).toBe('upload')
    if (artworkUpload?.type !== 'upload') {
      throw new Error('The ecosystem hero artwork upload is missing')
    }
    expect(artworkUpload.required).not.toBe(true)
    expect(artworkUpload.admin?.hidden).not.toBe(true)
    for (const name of ['progressLabel', 'marketplaceLabel', 'fulfillmentLabel']) {
      const legacyAnnotation = ecosystemVisuals.fields.find(
        (field) => 'name' in field && field.name === name,
      )
      expect(legacyAnnotation?.type).toBe('textarea')
      if (legacyAnnotation?.type !== 'textarea') {
        throw new Error(`The preserved annotation ${name} is missing`)
      }
      expect(legacyAnnotation.admin?.hidden).toBe(true)
    }

    const original = document.createElement('div')
    original.innerHTML = renderToStaticMarkup(
      createElement(GrowthHeroBlock, { ...growthHeroDefaults, blockType: 'growthHero' }),
    )
    expect(original.querySelectorAll('img')).toHaveLength(2)
    expect(original.querySelector('img')?.getAttribute('src')).toBe('/hero/entrepreneur.png')
    expect(original.querySelector('img[alt="The FILAS e-commerce ecosystem"]')).toBeNull()
    expect(render(base).querySelector('img[alt="The FILAS e-commerce ecosystem"]')).not.toBeNull()
  })
})
