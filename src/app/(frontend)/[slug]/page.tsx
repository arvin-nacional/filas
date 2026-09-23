import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { homepageComponents } from '@/blocks/Homepage/Components'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const hasHomepageBlocks = layout.some((block) => block.blockType in homepageComponents)
  const hasGrowthHero = layout.some((block) => block.blockType === 'growthHero')
  const homePath =
    draft && hasGrowthHero && slug !== 'home' ? `/${encodeURIComponent(decodedSlug)}` : '/'

  return (
    <div className={hasHomepageBlocks ? undefined : 'pt-16 pb-24'}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {!hasGrowthHero && <RenderHero {...hero} />}
      <RenderBlocks blocks={layout} homePath={homePath} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page =
    (await queryPageBySlug({ slug: decodedSlug })) || (slug === 'home' ? homeStatic : null)

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = result.docs?.[0]
  if (!page || slug !== 'home') return page || null

  // Keep this branch's homepage usable while the shared CMS still contains the
  // production holding page. This transforms output only; no CMS writes occur.
  const layout = page.layout.filter((block) => block.blockType !== 'comingSoon')
  if (page.layout.some((block) => block.blockType === 'comingSoon') && !layout.length) {
    return { ...page, hero: homeStatic.hero, layout: homeStatic.layout, meta: homeStatic.meta }
  }
  return { ...page, layout }
})
