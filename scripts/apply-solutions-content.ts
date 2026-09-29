import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import * as home from '../src/blocks/Homepage/defaults'
import * as about from '../src/blocks/About/defaults'
import * as partners from '../src/blocks/Partners/defaults'
import {
  capabilitiesHeroDefaults,
  capabilityGroups,
  connectedCapabilitiesDefaults,
} from '../src/blocks/Capabilities/defaults'
import type { Page } from '../src/payload-types'

// Explicit content maintenance command. Dry-run by default; --write updates existing pages.
// Only known section copy is replaced. Uploaded media, links, anchors, and status are retained.
const defaults: Record<string, object> = {
  growthHero: home.growthHeroDefaults,
  growthIntro: home.growthIntroDefaults,
  approach: home.approachDefaults,
  servicesOverview: home.servicesOverviewDefaults,
  audience: home.audienceDefaults,
  contactInvitation: home.contactInvitationDefaults,
  aboutHero: about.aboutHeroDefaults,
  companyStory: about.companyStoryDefaults,
  purpose: about.purposeDefaults,
  values: about.valuesDefaults,
  leadership: about.leadershipDefaults,
  partnersHero: partners.partnersHeroDefaults,
  partnerStages: partners.partnerStagesDefaults,
  partnershipFit: partners.partnershipFitDefaults,
  capabilitiesHero: capabilitiesHeroDefaults,
  connectedCapabilities: connectedCapabilitiesDefaults,
}

type Content = Record<string, unknown>
const isObject = (value: unknown): value is Content =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

function identity(value: Content) {
  return value.name || value.title || value.label || value.anchorId
}

function mergeCopy(existing: Content, copy: Content): Content {
  const result = { ...existing }
  for (const [key, value] of Object.entries(copy)) {
    if ((key === 'anchorId' || key === 'url') && existing[key]) continue
    if (Array.isArray(value)) {
      const oldRows = Array.isArray(existing[key]) ? existing[key] : []
      result[key] = value.map((row) => {
        if (!isObject(row)) return row
        const previous = oldRows.find(
          (old) => isObject(old) && identity(row) && identity(old) === identity(row),
        )
        return mergeCopy(isObject(previous) ? previous : {}, row)
      })
    } else if (isObject(value)) {
      result[key] = mergeCopy(isObject(existing[key]) ? existing[key] : {}, value)
    } else {
      result[key] = value
    }
  }
  return result
}

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    draft: true,
    overrideAccess: true,
    depth: 0,
    limit: 100,
    where: {
      slug: {
        in: [
          'home',
          'homepage-design',
          'about',
          'services',
          'capabilities',
          'partners',
          'who-we-work-with',
        ],
      },
    },
  })
  const plans = docs
    .map((page) => {
      let changed = 0
      const layout = page.layout.map((block) => {
        const copy =
          block.blockType === 'capabilityDetail'
            ? capabilityGroups.find((group) => group.anchorId === block.anchorId)
            : defaults[block.blockType]
        if (!copy) return block
        changed++
        return mergeCopy(
          block as unknown as Content,
          copy as Content,
        ) as unknown as Page['layout'][number]
      })
      return { page, layout, changed }
    })
    .filter((plan) => plan.changed)

  if (process.argv.includes('--write')) {
    const backupDirectory = path.join(process.env.TEMP || 'tmp', 'filas-content-backups')
    await mkdir(backupDirectory, { recursive: true })
    const backupPath = path.join(backupDirectory, `before-solutions-${Date.now()}.json`)
    await writeFile(
      backupPath,
      JSON.stringify(
        plans.map((plan) => plan.page),
        null,
        2,
      ),
      { flag: 'wx' },
    )
    console.log(`Content backup: ${backupPath}`)
  }
  for (const { page, layout, changed } of plans) {
    console.log(`${page.slug}: ${changed} sections; status ${page._status}`)
    if (!process.argv.includes('--write')) continue
    const current = await payload.findByID({
      collection: 'pages',
      id: page.id,
      draft: true,
      overrideAccess: true,
      depth: 0,
    })
    if (current.updatedAt !== page.updatedAt)
      throw new Error(`${page.slug} changed during preparation; rerun to preserve newer edits.`)
    await payload.update({
      collection: 'pages',
      id: page.id,
      overrideAccess: true,
      draft: page._status === 'draft',
      context: { disableRevalidate: true },
      data: { layout, _status: page._status },
    })
    const saved = await payload.findByID({
      collection: 'pages',
      id: page.id,
      draft: true,
      overrideAccess: true,
      depth: 0,
    })
    if (saved._status !== page._status || saved.layout.length !== layout.length) {
      throw new Error(`Content verification failed for ${page.slug}`)
    }
    for (let index = 0; index < layout.length; index++) {
      const expected = layout[index]
      const actual = saved.layout[index]
      if (
        'heading' in expected &&
        (!('heading' in actual) || actual.heading !== expected.heading)
      ) {
        throw new Error(`Heading verification failed for ${page.slug}`)
      }
    }
    console.log(`Verified ${page.slug}`)
  }
} finally {
  await payload.destroy()
}
process.exit(0)
