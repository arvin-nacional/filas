import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { businessInquiryForm, createContactPage } from '../src/endpoints/seed/contact-draft'

// Only creates new documents. Existing Contact pages, forms, and globals are preserved.
const payload = await getPayload({ config })
try {
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { in: ['contact', 'contact-design'] } },
    draft: true,
    overrideAccess: true,
    depth: 0,
    limit: 2,
  })
  const ownDraft = pages.docs.find(
    (page) =>
      page.slug === 'contact-design' ||
      page.layout.some((block) => block.blockType === 'contactInquiry'),
  )
  if (ownDraft) {
    console.log(`Contact layout already exists (${ownDraft.id}). Preserved its content.`)
  } else if (!process.argv.includes('--write')) {
    console.log(
      'Ready to create a private Contact draft and inquiry form. Run with --write to save.',
    )
  } else {
    const forms = await payload.find({
      collection: 'forms',
      where: { title: { equals: businessInquiryForm.title } },
      overrideAccess: true,
      depth: 0,
      limit: 1,
    })
    const form =
      forms.docs[0] ||
      (await payload.create({
        collection: 'forms',
        data: businessInquiryForm,
        overrideAccess: true,
      }))
    const slug = pages.docs.some((page) => page.slug === 'contact') ? 'contact-design' : 'contact'
    const created = await payload.create({
      collection: 'pages',
      data: createContactPage(form.id, slug),
      draft: true,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    const saved = await payload.findByID({
      collection: 'pages',
      id: created.id,
      draft: true,
      overrideAccess: true,
      depth: 1,
    })
    const publicPage = await payload.find({
      collection: 'pages',
      where: { id: { equals: created.id } },
      draft: false,
      overrideAccess: false,
      limit: 1,
    })
    const inquiry = saved.layout.find((block) => block.blockType === 'contactInquiry')
    if (
      saved._status !== 'draft' ||
      saved.layout.length !== 3 ||
      publicPage.docs.length ||
      !inquiry ||
      typeof inquiry.form !== 'object' ||
      inquiry.form?.id !== form.id
    ) {
      throw new Error('Contact draft verification failed. Review before publishing.')
    }
    console.log(
      `Saved and verified private ${saved.title} draft (${created.id}), slug ${slug}, with a populated Payload inquiry form.`,
    )
    console.log('No inquiry was submitted and no notification was sent.')
  }
} finally {
  await payload.destroy()
}
process.exit(0)
