import type { Metadata } from 'next'

import { ComingSoonBlock } from '@/blocks/ComingSoon/Component'
import { comingSoonDefaults } from '@/blocks/ComingSoon/defaults'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'FILAS — Coming Soon',
  description: comingSoonDefaults.description,
  openGraph: mergeOpenGraph({
    title: 'FILAS — Coming Soon',
    description: comingSoonDefaults.description,
    siteName: 'FILAS',
    images: [{ url: '/filas-logo.jpg', width: 2000, height: 2000, alt: 'FILAS' }],
    url: '/',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'FILAS — Coming Soon',
    description: comingSoonDefaults.description,
    images: ['/filas-logo.jpg'],
  },
}

// Keep the initial landing page available without a database connection or CMS seed.
export default function HomePage() {
  return (
    <main>
      <ComingSoonBlock blockType="comingSoon" {...comingSoonDefaults} />
    </main>
  )
}
