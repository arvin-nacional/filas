import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'FILAS is an end-to-end e-commerce enabler and growth partner helping brands scale through strategy, technology, fulfillment, creative, and execution.',
  images: [
    {
      url: `${getServerSideURL()}/filas-logo.jpg`,
      alt: 'FILAS',
    },
  ],
  siteName: 'FILAS',
  title: 'FILAS - First to Execute. Last to See Things Through.',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
