import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import type { Page } from '../src/payload-types'
import { connectedCapabilitiesDefaults } from '../src/blocks/Capabilities/defaults'

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { in: ['home', 'services'] } },
    limit: 2,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })
  const page = docs.find((item) => item.slug === 'home')
  const solutions = docs.find((item) => item.slug === 'services')
  if (!page) throw new Error('Homepage not found')
  const footer = await payload.findGlobal({ slug: 'footer', depth: 0, overrideAccess: true })
  const folder = path.join(os.tmpdir(), 'filas-content-backups')
  await mkdir(folder, { recursive: true })
  await writeFile(
    path.join(folder, `homepage-${Date.now()}.json`),
    JSON.stringify({ page, footer }),
    { flag: 'wx' },
  )
  const cases = solutions?.layout.find((block) => block.blockType === 'connectedCapabilities')
  const process = solutions?.layout.find((block) => block.blockType === 'approach')
  const layout: Page['layout'] = page.layout
    .filter(
      (block) => block.blockType !== 'growthIntro' && block.blockType !== 'connectedCapabilities',
    )
    .map((block) => {
      if (block.blockType === 'growthHero')
        return {
          ...block,
          description:
            'Generate demand. Manage your stores. Fulfill your orders. One e-commerce team, with the support your brand needs to grow.',
        }
      if (block.blockType === 'servicesOverview')
        return {
          ...block,
          eyebrow: '01 / Our solutions',
          services: block.services.map((service) => {
            const name = service.title.toLowerCase()
            const anchor = name.includes('demand')
              ? 'content'
              : name.includes('store')
                ? 'commerce'
                : 'fulfillment'
            return {
              ...service,
              url: `/services#${anchor}`,
              example: (anchor === 'content'
                ? 'demand'
                : anchor === 'commerce'
                  ? 'storefronts'
                  : 'fulfillment') as 'demand' | 'storefronts' | 'fulfillment',
            }
          }),
        }
      if (block.blockType === 'audience')
        return {
          ...block,
          eyebrow: 'Who we work with',
          stages: block.stages.map((stage) => ({ ...stage, url: '/partners' })),
        }
      if (block.blockType === 'approach' && process)
        return {
          ...process,
          id: block.id,
          anchorId: 'solutions-start',
          eyebrow: 'How we get started',
        }
      return block
    })
  layout.push({
    blockType: 'connectedCapabilities',
    ...connectedCapabilitiesDefaults,
    ...(cases || {}),
    id: undefined,
    anchorId: 'home-results',
    eyebrow: 'Results in practice',
    heading: 'Growth you can measure.',
    description:
      'Selected results across three industries, each with its own reporting period. See what coordinated execution can achieve.',
  })
  const order = [
    'growthHero',
    'clientLogos',
    'servicesOverview',
    'connectedCapabilities',
    'audience',
    'approach',
    'contactInvitation',
  ]
  layout.sort((a, b) => {
    const ai = order.indexOf(a.blockType),
      bi = order.indexOf(b.blockType)
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi)
  })
  await payload.update({
    collection: 'pages',
    id: page.id,
    draft: page._status === 'draft',
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: { layout, _status: page._status },
  })
  const routes: Record<string, { url: string; label: string }> = {
    '/#about': { url: '/about', label: 'About FILAS' },
    '/#services': { url: '/services', label: 'Our Services' },
    '/#partners': { url: '/partners', label: 'Who we work with' },
  }
  await payload.updateGlobal({
    slug: 'footer',
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      navItems: footer.navItems?.map((item) => ({
        ...item,
        link: { ...item.link, ...(routes[item.link.url || ''] || {}) },
      })),
    },
  })
  console.log(
    'Updated homepage order, results, mobile service links, stage links, process, and footer navigation. Previous content backed up.',
  )
} finally {
  await payload.destroy()
}
process.exit(0)
