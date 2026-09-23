import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { capabilitiesStatic } from '../src/endpoints/seed/capabilities-static'

// Create a new private draft only; never update existing content or navigation.
const payload = await getPayload({ config })

try {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'capabilities' } },
    draft: true,
    overrideAccess: true,
    depth: 0,
    limit: 1,
  })
  if (existing.docs.length) {
    console.log(
      'Capabilities already exists. Preserved its content; new blocks are available in the editor.',
    )
  } else if (!process.argv.includes('--write')) {
    console.log('Ready to create an unpublished Capabilities page. Run with --write to save it.')
  } else {
    const created = await payload.create({
      collection: 'pages',
      draft: true,
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: capabilitiesStatic,
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
    const groups = saved.layout.filter((block) => block.blockType === 'capabilityDetail')
    const hero = saved.layout.find((block) => block.blockType === 'capabilitiesHero')
    const anchors = new Set(groups.map((group) => group.anchorId))
    if (
      saved._status !== 'draft' ||
      saved.layout.length !== 8 ||
      groups.length !== 4 ||
      anchors.size !== 4 ||
      !hero ||
      hero.links.length !== 4 ||
      hero.links.some((link) => !anchors.has(link.anchorId)) ||
      visible.docs.length
    ) {
      throw new Error(
        'Capabilities draft verification failed. Review the saved page before publishing.',
      )
    }
    console.log(
      `Saved and verified private Capabilities draft (${created.id}): eight sections, four capability groups, and matching section links.`,
    )
  }
} finally {
  await payload.destroy()
}

process.exit(0)
