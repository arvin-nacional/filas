import type { Metadata } from 'next'

import { ComingSoonBlock } from '@/blocks/ComingSoon/Component'
import { comingSoonDefaults } from '@/blocks/ComingSoon/defaults'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'FILAS - First to Execute. Last to See Things Through.',
  description:
    'FILAS is an end-to-end e-commerce enabler and growth partner helping brands scale through strategy, technology, fulfillment, creative, and execution.',
  openGraph: mergeOpenGraph({
    title: 'FILAS - First to Execute. Last to See Things Through.',
    description:
      'FILAS is an end-to-end e-commerce enabler and growth partner helping brands scale through strategy, technology, fulfillment, creative, and execution.',
    siteName: 'FILAS',
    images: [{ url: '/filas-logo.jpg', width: 2000, height: 2000, alt: 'FILAS' }],
    url: '/',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'FILAS - First to Execute. Last to See Things Through.',
    description:
      'FILAS is an end-to-end e-commerce enabler and growth partner helping brands scale through strategy, technology, fulfillment, creative, and execution.',
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
