import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { businessInquiryForm } from '../src/endpoints/seed/contact-draft'
import { contactHeroDefaults, contactInquiryDefaults } from '../src/blocks/Contact/defaults'

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    depth: 0,
    draft: true,
    overrideAccess: true,
    limit: 1,
  })
  const page = docs[0]
  const inquiry = page?.layout.find((block) => block.blockType === 'contactInquiry')
  if (!inquiry?.form) throw new Error('Contact inquiry form not found')
  const id = typeof inquiry.form === 'object' ? inquiry.form.id : inquiry.form
  const form = await payload.findByID({ collection: 'forms', id, depth: 0, overrideAccess: true })
  if (process.argv.includes('--write')) {
    const directory = path.join(process.env.TEMP || 'tmp', 'filas-content-backups')
    await mkdir(directory, { recursive: true })
    await writeFile(
      path.join(directory, `contact-${Date.now()}.json`),
      JSON.stringify({ page, form }, null, 2),
      { flag: 'wx' },
    )
    const fields = form.fields?.map((field) => {
      const replacement =
        'name' in field
          ? businessInquiryForm.fields?.find((item) => 'name' in item && item.name === field.name)
          : null
      return replacement ? { ...replacement, id: field.id } : field
    })
    await payload.update({ collection: 'forms', id, overrideAccess: true, data: { fields } })
    await payload.update({
      collection: 'pages',
      id: page.id,
      draft: page._status === 'draft',
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: {
        layout: page.layout.map((block) =>
          block.blockType === 'contactHero'
            ? { ...block, ...contactHeroDefaults }
            : block.blockType === 'contactInquiry'
              ? { ...block, ...contactInquiryDefaults, anchorId: block.anchorId }
              : block,
        ),
        _status: page._status,
      },
    })
    console.log(
      'Updated contact copy and form fields. Preserved contact details, privacy URL, confirmation, and notification settings. No email sent.',
    )
  } else console.log('Ready to update contact copy and matching form fields.')
} finally {
  await payload.destroy()
}
process.exit(0)
