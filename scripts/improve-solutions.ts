import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { capabilityGroups } from '../src/blocks/Capabilities/defaults'

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })
  const page = docs[0]
  if (!page) throw new Error('Solutions page not found')
  const layout = page.layout.map((block) => {
    if (block.blockType === 'capabilityDetail') {
      const defaults = capabilityGroups.find((group) => group.anchorId === block.anchorId)
      if (!defaults) return block
      return {
        ...block,
        ...defaults,
        ...(block.anchorId === 'fulfillment'
          ? {
              description:
                'FILAS brings together e-commerce services and ART fulfillment solutions. Choose the facility, team, or technology setup that fits your operations.',
            }
          : {}),
      }
    }
    if (block.blockType === 'approach')
      return {
        ...block,
        anchorId: 'solutions-start',
        eyebrow: 'Built around your business',
        heading: 'Choose where we come in.',
        description: 'Start with the support you need today. Add services as your business grows.',
        steps: [
          {
            title: 'Choose your channels',
            description:
              'Identify the e-commerce platforms that fit your products, customers, and goals.',
          },
          {
            title: 'Choose your fulfillment setup',
            description:
              'Use ART’s facility, bring an ART team into yours, or equip your own team with ART technology.',
          },
          {
            title: 'Add your growth services',
            description:
              'Select the creative, paid media, creators, live selling, or website support your brand needs.',
          },
        ],
      }
    return block
  })
  const resultsIndex = layout.findIndex((block) => block.blockType === 'connectedCapabilities')
  if (resultsIndex >= 0) {
    const [results] = layout.splice(resultsIndex, 1)
    layout.splice(
      layout.findIndex((block) => block.blockType === 'capabilitiesHero') + 1,
      0,
      results,
    )
  }
  if (process.argv.includes('--write')) {
    const folder = path.join(os.tmpdir(), 'filas-content-backups')
    await mkdir(folder, { recursive: true })
    await writeFile(path.join(folder, `solutions-${Date.now()}.json`), JSON.stringify(page), {
      flag: 'wx',
    })
    await payload.update({
      collection: 'pages',
      id: page.id,
      draft: page._status === 'draft',
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: { layout, _status: page._status },
    })
    console.log(
      'Updated Solutions content, PDF visuals, results order, and three-step selection process.',
    )
  }
} finally {
  await payload.destroy()
}
process.exit(0)
