import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import type { Page } from '../src/payload-types'

// Change service branding only; preserve layout, media, links, and publication status.
const serviceBlocks = new Set(['capabilityDetail', 'approach', 'servicesOverview', 'partnerStages'])
const copyFields = new Set(['title', 'description', 'label', 'summary', 'visualCaption'])

function updateCopy(value: unknown, key = ''): unknown {
  if (typeof value === 'string' && copyFields.has(key)) {
    return value
      .replace(/an ART team/g, 'a FILAS team')
      .replace(/ \((FBA|MBA|TBA)\)/g, '')
      .replace(/\bART\b/g, 'FILAS')
      .replace(
        'FILAS brings together e-commerce services and FILAS fulfillment solutions.',
        'FILAS brings together e-commerce and fulfillment services.',
      )
  }
  if (Array.isArray(value)) return value.map((item) => updateCopy(item, key))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([name, item]) => [name, updateCopy(item, name)]),
    )
  }
  return value
}

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    draft: true,
    overrideAccess: true,
    depth: 0,
    pagination: false,
  })
  for (const page of docs) {
    const layout = page.layout.map((block) =>
      serviceBlocks.has(block.blockType) ? updateCopy(block) : block,
    ) as Page['layout']
    const meta = { ...page.meta }
    if (['services', 'capabilities'].includes(page.slug || '') && meta.description) {
      meta.description = updateCopy(meta.description, 'description') as string
    }
    if (
      JSON.stringify(layout) === JSON.stringify(page.layout) &&
      meta.description === page.meta?.description
    )
      continue
    if (!process.argv.includes('--write')) {
      console.log(`Ready to update FILAS service branding: ${page.slug} (${page._status})`)
      continue
    }
    const folder = path.join(os.tmpdir(), 'filas-content-backups')
    await mkdir(folder, { recursive: true })
    await writeFile(
      path.join(folder, `service-branding-${page.id}-${Date.now()}.json`),
      JSON.stringify(page),
      { flag: 'wx' },
    )
    await payload.update({
      collection: 'pages',
      id: page.id,
      draft: page._status === 'draft',
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: { layout, meta, _status: page._status },
    })
    console.log(`Updated FILAS service branding: ${page.slug} (${page._status})`)
  }
} finally {
  await payload.destroy()
}
process.exit(0)
