import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FooterContent } from '@/Footer/Content'
import { HeaderClient } from '@/Header/Component.client'
import { footerDefaults, headerDefaults } from '@/components/SiteChrome/defaults'
import { homeStatic } from '@/endpoints/seed/home-static'

export const metadata: Metadata = {
  title: 'FILAS homepage preview',
  robots: { index: false, follow: false },
}

export default function HomepagePreview() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <div className="filas-site">
      <HeaderClient data={headerDefaults} homePath="/homepage-preview" />
      <main id="main-content" tabIndex={-1}>
        <RenderBlocks blocks={homeStatic.layout} homePath="/homepage-preview" />
      </main>
      <FooterContent data={footerDefaults} homePath="/homepage-preview" />
    </div>
  )
}
