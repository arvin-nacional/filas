import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { findPage } = vi.hoisted(() => ({ findPage: vi.fn() }))

vi.mock('payload', () => ({ getPayload: vi.fn(async () => ({ find: findPage })) }))
vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('next/headers', () => ({ draftMode: vi.fn(async () => ({ isEnabled: false })) }))
vi.mock('@/components/PayloadRedirects', () => ({ PayloadRedirects: vi.fn(() => null) }))
vi.mock('@/utilities/generateMeta', () => ({ generateMeta: vi.fn(async () => ({})) }))
vi.mock('@/components/LivePreviewListener', () => ({ LivePreviewListener: () => null }))
vi.mock('@/app/(frontend)/[slug]/page.client', () => ({ default: () => null }))
vi.mock('@/blocks/RenderBlocks', () => ({ RenderBlocks: vi.fn(() => null) }))
vi.mock('@/heros/RenderHero', () => ({ RenderHero: vi.fn(() => null) }))
vi.mock('@/components/RichText', () => ({ default: () => null }))
vi.mock('@/blocks/Homepage/Components', () => ({ homepageComponents: { growthHero: () => null } }))

import Page, { generateMetadata } from '@/app/(frontend)/[slug]/page'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LowImpactHero } from '@/heros/LowImpact'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { generateMeta } from '@/utilities/generateMeta'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Low Impact hero', () => {
  it('does not render an empty container or margin without content', () => {
    expect(renderToStaticMarkup(createElement(LowImpactHero, {}))).toBe('')
    expect(
      renderToStaticMarkup(createElement(LowImpactHero, { type: 'lowImpact', richText: null })),
    ).toBe('')
  })

  it('preserves supplied hero content', () => {
    const html = renderToStaticMarkup(
      createElement(LowImpactHero, { children: createElement('h1', null, 'Page heading') }),
    )
    expect(html).toContain('<h1>Page heading</h1>')
  })
})

describe('CMS page rendering', () => {
  it('uses redirect or not-found handling when the CMS homepage is missing', async () => {
    findPage.mockResolvedValue({ docs: [] })

    const page = await Page({ params: Promise.resolve({}) })
    renderToStaticMarkup(page)

    expect(RenderBlocks).not.toHaveBeenCalled()
    expect(RenderHero).not.toHaveBeenCalled()
    expect(vi.mocked(PayloadRedirects).mock.calls[0]?.[0]).toEqual({ url: '/' })
  })

  it('does not substitute starter metadata when the CMS homepage is missing', async () => {
    findPage.mockResolvedValue({ docs: [] })

    await generateMetadata({ params: Promise.resolve({}) })

    expect(generateMeta).toHaveBeenCalledWith({ doc: null })
  })

  it.each([
    { layout: [{ blockType: 'comingSoon', heading: 'Saved coming soon heading' }] },
    {
      layout: [
        { blockType: 'comingSoon', heading: 'Saved coming soon heading' },
        { blockType: 'growthHero', heading: 'Saved growth heading' },
        { blockType: 'content', columns: [] },
      ],
    },
  ])('preserves the saved homepage hero and layout: $layout', async ({ layout }) => {
    const savedPage = {
      slug: 'home',
      hero: { type: 'lowImpact', richText: null },
      layout,
    }
    findPage.mockResolvedValue({ docs: [savedPage] })

    const page = await Page({ params: Promise.resolve({ slug: 'home' }) })
    renderToStaticMarkup(page)

    expect(vi.mocked(RenderBlocks).mock.calls[0]?.[0].blocks).toBe(savedPage.layout)
    expect(vi.mocked(RenderHero).mock.calls[0]?.[0]).toEqual(savedPage.hero)
  })
})
