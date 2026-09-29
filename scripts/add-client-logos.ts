import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import type { ClientLogosBlock, Page } from '../src/payload-types'

// Originals extracted from pages 1 and 25 of the supplied FILAS solutions overview.
// Run with --write to upload media and insert the section. Existing pages are backed up.
const logos = [
  ['aboitiz-foods', 'Aboitiz Foods'],
  ['ansons', 'Anson’s'],
  ['maxime', 'Maxime'],
  ['owala', 'Owala'],
  ['the-berry-company', 'The Berry Company'],
  ['medsgo', 'MedsGo Mandaluyong'],
  ['kindercare', 'KinderCare'],
  ['saipo', 'Saipo'],
  ['truvia', 'Truvia'],
  ['hmr', 'HMR Trading Haus'],
  ['mum-mum', 'Mum-Mum'],
  ['surechoice', 'SureChoice Pharma Philippines'],
]

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    draft: true,
    depth: 0,
    overrideAccess: true,
    limit: 1,
  })
  const home = docs[0]
  if (!home) throw new Error('Homepage not found')
  if (!process.argv.includes('--write')) {
    console.log('Ready to add 12 client logos below the homepage hero.')
  } else {
    const backupDirectory = path.join(process.env.TEMP || 'tmp', 'filas-content-backups')
    await mkdir(backupDirectory, { recursive: true })
    const backup = path.join(backupDirectory, `before-client-logos-${Date.now()}.json`)
    await writeFile(backup, JSON.stringify(home, null, 2), { flag: 'wx' })
    console.log(`Backup: ${backup}`)
    const clients: NonNullable<ClientLogosBlock['clients']> = []
    for (const [filename, name] of logos) {
      const { docs: existing } = await payload.find({
        collection: 'media',
        where: { filename: { equals: `${filename}.png` } },
        depth: 0,
        overrideAccess: true,
        limit: 1,
      })
      const media =
        existing[0] ||
        (await payload.create({
          collection: 'media',
          data: { alt: `${name} logo` },
          filePath: path.resolve('public/clients', `${filename}.png`),
          overrideAccess: true,
        }))
      clients.push({ name, logo: media.id, approved: true })
      console.log(`Ready: ${name}`)
    }
    const current = await payload.findByID({
      collection: 'pages',
      id: home.id,
      draft: true,
      depth: 0,
      overrideAccess: true,
    })
    if (current.updatedAt !== home.updatedAt)
      throw new Error('Homepage changed during upload; rerun to preserve newer edits.')
    const previous = home.layout.find((block) => block.blockType === 'clientLogos')
    const block: ClientLogosBlock = {
      ...previous,
      blockType: 'clientLogos',
      blockName: 'Our clients',
      anchorId: 'clients',
      eyebrow: 'The brands we work with',
      heading: 'In good company.',
      clients,
    }
    const layout: Page['layout'] = home.layout.filter((section) => section.blockType !== 'clientLogos')
    const heroIndex = layout.findIndex((section) => section.blockType === 'growthHero')
    layout.splice(heroIndex + 1, 0, block)
    await payload.update({
      collection: 'pages',
      id: home.id,
      overrideAccess: true,
      draft: home._status === 'draft',
      context: { disableRevalidate: true },
      data: { layout, _status: home._status },
    })
    const saved = await payload.findByID({
      collection: 'pages',
      id: home.id,
      draft: true,
      depth: 1,
      overrideAccess: true,
    })
    const section = saved.layout.find((section) => section.blockType === 'clientLogos')
    if (
      section?.clients?.length !== 12 ||
      section.clients.some(
        (client) => !client.approved || typeof client.logo !== 'object' || !client.logo.url,
      )
    ) {
      throw new Error('Saved logo section did not verify')
    }
    console.log('Verified 12 editable client logos on the homepage.')
  }
} finally {
  await payload.destroy()
}
process.exit(0)
