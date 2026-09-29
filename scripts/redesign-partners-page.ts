import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import {
  partnersHeroDefaults,
  partnerStagesDefaults,
  partnerResultsDefaults,
  partnerContactDefaults,
} from '../src/blocks/Partners/defaults'
import type { Page } from '../src/payload-types'

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'partners' } },
    draft: true,
    depth: 0,
    overrideAccess: true,
    limit: 1,
  })
  const page = docs[0]
  if (!page) throw new Error('Partners page not found')
  const { docs: homes } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    draft: true,
    depth: 0,
    overrideAccess: true,
    limit: 1,
  })
  const logos = homes[0]?.layout.find((block) => block.blockType === 'clientLogos')
  if (!logos?.clients?.length) throw new Error('Homepage client logos not found')
  if (!process.argv.includes('--write')) {
    console.log(
      'Ready: product hero, client logos, case studies, growth stages, and contact invitation.',
    )
  } else {
    const directory = path.join(process.env.TEMP || 'tmp', 'filas-content-backups')
    await mkdir(directory, { recursive: true })
    await writeFile(
      path.join(directory, `partners-before-redesign-${Date.now()}.json`),
      JSON.stringify(page, null, 2),
      { flag: 'wx' },
    )
    const existingImage = await payload.find({
      collection: 'media',
      where: { filename: { equals: 'product-lineup.png' } },
      depth: 0,
      overrideAccess: true,
      limit: 1,
    })
    const image =
      existingImage.docs[0] ||
      (await payload.create({
        collection: 'media',
        data: {
          alt: 'Illustrative range of consumer products on a fulfillment conveyor, from the FILAS solutions overview',
        },
        filePath: path.resolve('public/partners/product-lineup.png'),
        overrideAccess: true,
      }))
    const oldHero = page.layout.find((block) => block.blockType === 'partnersHero')
    const oldStages = page.layout.find((block) => block.blockType === 'partnerStages')
    const oldContact = page.layout.find((block) => block.blockType === 'contactInvitation')
    const oldResults = page.layout.find((block) => block.blockType === 'partnerResults')
    const layout: Page['layout'] = [
      { ...oldHero, ...partnersHeroDefaults, blockType: 'partnersHero', image: image.id },
      {
        blockType: 'clientLogos',
        blockName: 'Our clients',
        anchorId: 'clients',
        eyebrow: 'The brands we work with',
        heading: 'In good company.',
        clients: logos.clients.map(({ name, logo, approved }) => ({ name, logo, approved })),
      },
      {
        ...oldResults,
        ...partnerResultsDefaults,
        blockType: 'partnerResults',
        blockName: 'Results across categories',
      },
      {
        ...oldStages,
        ...partnerStagesDefaults,
        blockType: 'partnerStages',
        stages: partnerStagesDefaults.stages.map((stage) => ({
          ...oldStages?.stages.find((old) => old.title === stage.title),
          ...stage,
        })),
      },
      { ...oldContact, ...partnerContactDefaults, blockType: 'contactInvitation' },
    ]
    // Retain unrelated blocks if editors have added any outside the redesign scope.
    layout.push(
      ...page.layout.filter(
        (block) =>
          ![
            'partnersHero',
            'clientLogos',
            'partnerResults',
            'partnerStages',
            'partnershipFit',
            'contactInvitation',
          ].includes(block.blockType),
      ),
    )
    const current = await payload.findByID({
      collection: 'pages',
      id: page.id,
      draft: true,
      depth: 0,
      overrideAccess: true,
    })
    if (current.updatedAt !== page.updatedAt)
      throw new Error('Page changed during preparation; rerun to preserve newer edits.')
    await payload.update({
      collection: 'pages',
      id: page.id,
      draft: page._status === 'draft',
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: { layout, _status: page._status },
    })
    const saved = await payload.findByID({
      collection: 'pages',
      id: page.id,
      draft: true,
      depth: 1,
      overrideAccess: true,
    })
    const results = saved.layout.find((block) => block.blockType === 'partnerResults')
    if (
      results?.cases.length !== 3 ||
      saved.layout.length !== layout.length ||
      saved._status !== page._status
    )
      throw new Error('Page verification failed')
    console.log(
      `Verified ${saved.slug}: ${saved.layout.length} sections, 12 logos, 3 case studies.`,
    )
  }
} finally {
  await payload.destroy()
}
process.exit(0)
