import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { connectedCapabilitiesDefaults } from '../src/blocks/Capabilities/defaults'

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    depth: 0,
    limit: 1,
    draft: true,
    overrideAccess: true,
  })
  const page = docs[0]
  if (!page) throw new Error('Solutions page not found')
  const descriptions = [
    'Sales and orders grew together while average order value stayed stable.',
    'Growth came from more transactions and larger baskets per customer.',
    'Both order volume and basket size increased during the one-month reporting period.',
  ]
  const layout = page.layout.map((block) =>
    block.blockType === 'connectedCapabilities'
      ? {
          ...block,
          eyebrow: 'Case studies / Measured results',
          heading: 'Different categories.\nReal business growth.',
          description:
            'Three results from the FILAS solutions overview. Each reflects its own reporting period; figures are shown as reported.',
          connections: connectedCapabilitiesDefaults.connections.map((item, index) => ({
            ...item,
            id: block.connections[index]?.id,
            description: descriptions[index],
          })),
        }
      : block,
  )
  const folder = path.join(os.tmpdir(), 'filas-content-backups')
  await mkdir(folder, { recursive: true })
  await writeFile(path.join(folder, `case-studies-${Date.now()}.json`), JSON.stringify(page), {
    flag: 'wx',
  })
  await payload.update({
    collection: 'pages',
    id: page.id,
    overrideAccess: true,
    draft: page._status === 'draft',
    context: { disableRevalidate: true },
    data: { layout, _status: page._status },
  })
  console.log(
    'Saved three editable case study cards with PDF-backed metrics and reporting periods.',
  )
} finally {
  await payload.destroy()
}
process.exit(0)
