import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import type { AnimatedEcosystemHeroBlock as AnimatedHeroProps } from '@/payload-types'
import { siteURL } from '@/components/SiteChrome/defaults'
import { AnimatedEcosystemScene } from './AnimatedEcosystemScene'

export const AnimatedEcosystemHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  primaryLink,
  secondaryLink,
  visuals,
  homePath,
}: AnimatedHeroProps & { homePath?: string }) => {
  const breakAt = emphasis.lastIndexOf(' ')
  const highlighted = breakAt > 0 ? emphasis.slice(0, breakAt) : emphasis
  const closing = breakAt > 0 ? emphasis.slice(breakAt + 1) : ''

  return (
    <section
      aria-label="The FILAS animated ecosystem hero"
      className="relative isolate overflow-hidden bg-filas-paper text-filas-ink"
    >
      <div className="mx-auto grid w-[calc(100%-2.5rem)] max-w-[1516px] items-center gap-9 py-12 sm:w-[calc(100%-4rem)] sm:gap-12 sm:py-14 lg:min-h-[min(720px,calc(100svh-96px))] lg:w-[84%] lg:grid-cols-[1fr_1.08fr] lg:gap-6 lg:py-8 xl:gap-12">
        <div className="relative z-10 min-w-0">
          <p className="mb-7 flex items-center gap-3 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-filas-accent-text uppercase sm:mb-8 sm:text-xs">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="max-w-[12ch] text-[clamp(44px,11.5vw,68px)] leading-[1.02] font-medium tracking-[-0.065em] sm:text-[76px] lg:text-[clamp(60px,5.4vw,90px)]">
            {heading}
            <span className="block text-filas-accent-text">
              {highlighted}
              {closing && ' '}
            </span>
            {closing && <span className="block">{closing}</span>}
          </h1>
          <p className="mt-7 max-w-[480px] text-base leading-[1.7] text-pretty text-filas-muted sm:mt-8 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-9">
            <Link
              href={siteURL(primaryLink.url, homePath)}
              className="group inline-flex min-h-13 items-center justify-between gap-5 rounded-xs bg-filas-accent-text px-5 py-4 text-sm font-medium text-filas-paper transition-colors hover:bg-filas-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none sm:px-6"
            >
              {primaryLink.label}
              <ArrowUpRight size={19} aria-hidden="true" className="shrink-0" />
            </Link>
            <Link
              href={siteURL(secondaryLink.url, homePath)}
              className="inline-flex min-h-12 items-center justify-between gap-4 border-b border-filas-line py-3 text-sm font-medium transition-colors hover:border-filas-accent-text hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none"
            >
              {secondaryLink.label}
              <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
            </Link>
          </div>
        </div>
        <AnimatedEcosystemScene
          enableAnimation={visuals?.enableAnimation !== false}
          showBackground={visuals?.showBackground !== false}
          demandTitle={visuals?.demandTitle || 'Demand generation'}
          storeTitle={visuals?.storeTitle || 'Store management'}
          fulfillmentTitle={visuals?.fulfillmentTitle || 'Warehousing & fulfillment'}
        />
      </div>
    </section>
  )
}
