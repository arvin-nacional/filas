import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { GrowthHeroBlock } from '@/blocks/Homepage/GrowthHero'
import { growthHeroDefaults } from '@/blocks/Homepage/defaults'
import type { GrowthHeroBlock as HeroProps, Media } from '@/payload-types'

const base: HeroProps = { ...growthHeroDefaults, blockType: 'growthHero' }
const photo: Media = {
  id: 'uploaded-photo',
  url: '/api/media/file/custom.png',
  alt: 'Custom brand photo',
  createdAt: '2026-09-25T00:00:00Z',
  updatedAt: '2026-09-25T00:00:00Z',
}

function render(props: HeroProps) {
  const container = document.createElement('div')
  container.innerHTML = renderToStaticMarkup(createElement(GrowthHeroBlock, props))
  return container
}

describe('Editable growth hero', () => {
  it('renders generated photos and editable-card defaults for existing pages without visuals', () => {
    const element = render(base)
    expect(element.querySelector('h1')?.textContent).toContain('worth growing')
    expect(element.querySelectorAll('img')).toHaveLength(2)
    expect(element.querySelector('img')?.getAttribute('src')).toBe('/hero/entrepreneur.png')
    expect(element.textContent).toContain('From potential')
    expect(element.textContent).toContain('Shopify')
  })

  it('uses uploaded media directly and honors the hide-cards setting', () => {
    const element = render({ ...base, visuals: { mainImage: photo, showCards: false } })
    const image = element.querySelector('img')
    expect(image?.getAttribute('src')).toMatch(/^\/api\/media\/file\/custom.png\?/)
    expect(image?.getAttribute('alt')).toBe('Custom brand photo')
    expect(image?.hasAttribute('srcset')).toBe(false)
    expect(element.textContent).not.toContain('From potential')
  })

  it('renders custom card copy and marketplace logo uploads', () => {
    const element = render({
      ...base,
      visuals: {
        progressLabel: 'Build your next chapter',
        marketplaces: [{ name: 'Our marketplace', logo: photo }],
      },
    })
    expect(element.textContent).toContain('Build your next chapter')
    expect(element.querySelector('img[alt="Our marketplace"]')?.getAttribute('src')).toContain(
      '/api/media/file/custom.png',
    )
    expect(element.textContent).not.toContain('Shopee')
  })
})
