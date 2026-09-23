import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { aboutStatic } from '../src/endpoints/seed/about-static'

// Explicit maintenance command: create a new private draft only.
// Existing pages and global navigation are never updated.
const payload = await getPayload({ config })

try {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    draft: true,
    overrideAccess: true,
    depth: 0,
    limit: 1,
  })

  if (existing.docs.length) {
    console.log(
      'About already exists. Preserved its content; the new About blocks are available in the editor.',
    )
  } else if (!process.argv.includes('--write')) {
    console.log('Ready to create an unpublished About FILAS page. Run with --write to save it.')
  } else {
    const created = await payload.create({
      collection: 'pages',
      draft: true,
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: aboutStatic,
    })
    const saved = await payload.findByID({
      collection: 'pages',
      id: created.id,
      draft: true,
      overrideAccess: true,
      depth: 0,
    })
    const visible = await payload.find({
      collection: 'pages',
      where: { id: { equals: created.id } },
      draft: false,
      overrideAccess: false,
      depth: 0,
      limit: 1,
    })
    const team = saved.layout.find((block) => block.blockType === 'leadership')
    if (
      saved._status !== 'draft' ||
      saved.layout.length !== 6 ||
      team?.people.length !== 6 ||
      visible.docs.length
    ) {
      throw new Error('About draft verification failed. Review the saved page before publishing.')
    }
    console.log(
      `Saved and verified private About FILAS draft (${created.id}): six sections and six team members.`,
    )
  }
} finally {
  await payload.destroy()
}

process.exit(0)
