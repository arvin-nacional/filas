import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { homeStatic } from '../src/endpoints/seed/home-static'
import { footerDefaults, headerDefaults } from '../src/components/SiteChrome/defaults'

// This explicit local maintenance command creates a separate draft and replaces template navigation.
// It never publishes, resets collections, or updates an existing page.
const payload = await getPayload({ config })
const slug = 'homepage-design'

try {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft: true,
    overrideAccess: true,
    depth: 0,
    limit: 1,
  })

  if (existing.docs.length) {
    console.log('Homepage design already exists. Preserved its content.')
  } else if (!process.argv.includes('--write')) {
    console.log('Ready to create a separate Homepage design draft. Run with --write to save it.')
  } else {
    const created = await payload.create({
      collection: 'pages',
      overrideAccess: true,
      draft: true,
      context: { disableRevalidate: true },
      data: { ...homeStatic, title: 'Homepage design', slug, _status: 'draft' },
    })
    const draft = await payload.findByID({
      collection: 'pages',
      id: created.id,
      draft: true,
      overrideAccess: true,
      depth: 0,
    })
    const publicResult = await payload.find({
      collection: 'pages',
      where: { id: { equals: created.id } },
      draft: false,
      overrideAccess: false,
      depth: 0,
    })
    if (
      draft._status !== 'draft' ||
      draft.layout.length !== homeStatic.layout.length ||
      publicResult.docs.length !== 0
    ) {
      throw new Error('Draft verification failed. Review the page before proceeding.')
    }
    console.log(
      'Created and verified the private Homepage design draft with six sections. Existing pages are unchanged.',
    )
  }
  if (process.argv.includes('--write')) {
    const header = await payload.findGlobal({ slug: 'header', depth: 1, overrideAccess: true })
    const footer = await payload.findGlobal({ slug: 'footer', depth: 1, overrideAccess: true })
    const items = header.navItems || []
    const contactReference = items[1]?.link.reference?.value
    const templateHeader =
      items.length === 2 &&
      items[0].link.label === 'Posts' &&
      items[0].link.url === '/posts' &&
      items[1].link.label === 'Contact' &&
      typeof contactReference === 'object' &&
      contactReference?.slug === 'contact'
    const footerSignature = (footer.navItems || [])
      .map(({ link }) => `${link.label}:${link.url}`)
      .join('|')
    const templateFooter =
      footerSignature ===
      'Admin:/admin|Source Code:https://github.com/payloadcms/payload/tree/3.x/templates/website|Payload:https://payloadcms.com/'

    if (templateHeader || !items.length) {
      await payload.updateGlobal({
        slug: 'header',
        data: headerDefaults,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      console.log('Replaced template header navigation with FILAS section links.')
    } else {
      console.log('Preserved customized header navigation.')
    }
    if (templateFooter || !footer.navItems?.length) {
      await payload.updateGlobal({
        slug: 'footer',
        data: footerDefaults,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      console.log('Replaced template footer navigation with FILAS section links.')
    } else {
      console.log('Preserved customized footer navigation.')
    }
  }
} finally {
  await payload.destroy()
}

// Payload integrations can retain background handles after the database disconnects.
process.exit(0)
