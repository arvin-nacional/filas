import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AnimatedEcosystemHeroBlock } from '@/blocks/Homepage/AnimatedEcosystemHero'
import { growthHeroDefaults } from '@/blocks/Homepage/defaults'

export const metadata: Metadata = {
  title: 'Animated Ecosystem Hero — FILAS preview',
  robots: { index: false, follow: false },
}

export default function AnimatedHeroPreview() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <AnimatedEcosystemHeroBlock
      {...growthHeroDefaults}
      blockType="animatedEcosystemHero"
      visuals={{
        enableAnimation: true,
        demandTitle: 'Demand generation',
        storeTitle: 'Store management',
        fulfillmentTitle: 'Warehousing & fulfillment',
      }}
    />
  )
}
