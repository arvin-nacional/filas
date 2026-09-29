import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import {
  PartnersHeroBlock,
  PartnerStagesBlock,
  PartnershipFitBlock,
} from '@/blocks/Partners/Components'
import {
  partnersHeroDefaults,
  partnerStagesDefaults,
  partnershipFitDefaults,
} from '@/blocks/Partners/defaults'
import { partnerBlocks } from '@/blocks/Partners/config'

describe('Who we work with blocks', () => {
  it('registers the partner page blocks', () => {
    expect(partnerBlocks.map((block) => block.slug)).toEqual([
      'partnersHero',
      'partnerResults',
      'partnerStages',
      'partnershipFit',
    ])
  })
  it('renders the hero without requiring an uploaded image', () => {
    const html = renderToStaticMarkup(
      createElement(PartnersHeroBlock, { ...partnersHeroDefaults, blockType: 'partnersHero' }),
    )
    expect(html).toContain(partnersHeroDefaults.emphasis)
    expect(html).toContain('/partners/product-lineup.png')
  })
  it('renders configured growth stages and support areas', () => {
    const html = renderToStaticMarkup(
      createElement(PartnerStagesBlock, { ...partnerStagesDefaults, blockType: 'partnerStages' }),
    )
    expect(html.match(/<article/g)).toHaveLength(3)
    const element = document.createElement('div')
    element.innerHTML = html
    for (const stage of partnerStagesDefaults.stages) {
      expect(element.textContent).toContain(stage.title)
      expect(element.textContent).toContain(stage.support[0].label)
    }
  })
  it('renders editor-supplied partnership criteria', () => {
    const html = renderToStaticMarkup(
      createElement(PartnershipFitBlock, {
        ...partnershipFitDefaults,
        blockType: 'partnershipFit',
        qualities: [{ title: 'Shared priorities', description: 'Our custom criterion.' }],
      }),
    )
    expect(html).toContain('Shared priorities')
    expect(html).toContain('Our custom criterion.')
    expect(html).not.toContain('You want to move forward')
  })
})
