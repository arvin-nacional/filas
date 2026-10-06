import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import type { EcosystemHeroBlock as EcosystemHeroProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { siteURL } from '@/components/SiteChrome/defaults'

const defaultMarketplaces = [
  { name: 'Shopee', logo: null },
  { name: 'Lazada', logo: null },
  { name: 'TikTok', logo: null },
  { name: 'Shopify', logo: null },
]

export const EcosystemHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  primaryLink,
  secondaryLink,
  footnote,
  visuals,
  homePath,
}: EcosystemHeroProps & { homePath?: string }) => {
  const showCards = visuals?.showCards !== false
  const marketplaces = visuals?.marketplaces ?? defaultMarketplaces
  const artwork =
    visuals?.artworkImage && typeof visuals.artworkImage === 'object' ? visuals.artworkImage : null

  return (
    <section
      className="relative isolate overflow-hidden bg-filas-paper text-filas-ink"
      aria-label="The FILAS ecosystem hero"
    >
      <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1516px] sm:w-[calc(100%-4rem)] lg:w-[84%]">
        <div className="grid items-center gap-12 pt-11 pb-12 sm:gap-14 sm:pt-16 sm:pb-16 lg:min-h-[660px] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-16 xl:min-h-[720px] xl:gap-14">
          <div className="relative z-10 min-w-0">
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-filas-accent-text uppercase sm:mb-9 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className="max-w-[11ch] text-[clamp(44px,11.5vw,68px)] leading-[1.02] font-medium tracking-[-0.065em] sm:text-[76px] lg:text-[clamp(62px,5.5vw,94px)]">
              {heading}
              <br />
              <span className="text-filas-accent-text">
                {emphasis.replace(/\.$/, '')}
                <span className="text-filas-accent">.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-[510px] text-base leading-[1.75] text-pretty text-filas-muted sm:mt-8 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-9">
              <Link
                className="group inline-flex min-h-13 items-center justify-between gap-5 rounded-xs bg-filas-accent-text px-5 py-4 text-sm font-medium text-filas-paper transition-colors hover:bg-filas-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none sm:px-6"
                href={siteURL(primaryLink.url, homePath)}
              >
                {primaryLink.label}
                <ArrowUpRight
                  size={19}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-between gap-4 border-b border-filas-line py-3 text-sm font-medium transition-colors hover:border-filas-accent-text hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none"
                href={siteURL(secondaryLink.url, homePath)}
              >
                {secondaryLink.label}
                <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
              </Link>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[480px] min-w-0 self-center lg:max-w-[min(100%,480px,62svh)]">
            <div className="relative aspect-square">
              <Image
                src={
                  artwork?.url
                    ? getMediaUrl(artwork.url, artwork.updatedAt)
                    : '/hero/ecosystem-sculpture.webp'
                }
                alt={artwork?.alt || 'The FILAS e-commerce ecosystem'}
                fill
                unoptimized
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 640px) 480px, 100vw"
                className="object-contain"
              />
              {!artwork?.url && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(24px,2.3vw,38px)] font-semibold tracking-[0.1em]"
                >
                  FILAS<span className="text-filas-accent">.</span>
                </span>
              )}
            </div>
            {showCards && (
              <figcaption className="absolute inset-0">
                <ul className="relative h-full list-none p-0">
                  {[
                    {
                      title: 'Demand generation',
                      lines: ['Demand ', 'generation'],
                      position:
                        'top-[23%] left-[33%] w-[32%] text-white [text-shadow:0_1px_3px_#57200e80]',
                    },
                    {
                      title: 'Store management',
                      lines: ['Store ', 'management'],
                      position: 'top-[39%] left-[79%] w-[36%] text-filas-ink',
                    },
                    {
                      title: 'Warehousing & fulfillment',
                      lines: ['Warehousing & ', 'fulfillment'],
                      position:
                        'top-[80%] left-[45%] w-[55%] text-white [text-shadow:0_1px_3px_#0008]',
                    },
                  ].map(({ title, lines, position }) => (
                    <li
                      key={title}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 ${position}`}
                    >
                      <h2 className="text-center text-base leading-[1.2] font-semibold tracking-tight sm:text-xl">
                        {lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h2>
                    </li>
                  ))}
                </ul>
              </figcaption>
            )}
          </figure>
        </div>

        <div className="flex flex-col justify-between gap-5 border-t border-filas-line py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:py-7">
          {footnote && (
            <p className="flex items-start gap-3 text-xs leading-relaxed text-filas-muted sm:text-sm">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-filas-accent"
                aria-hidden="true"
              />
              {footnote}
            </p>
          )}
          {showCards && marketplaces.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="font-mono text-[9px] tracking-widest text-filas-muted uppercase">
                Across your channels
              </p>
              <ul className="flex list-none flex-wrap items-center gap-x-5 gap-y-3 p-0">
                {marketplaces.map((item, i) => (
                  <li key={i} className="text-xs font-medium text-filas-ink">
                    {item.logo && typeof item.logo === 'object' && item.logo.url ? (
                      <Image
                        src={getMediaUrl(item.logo.url, item.logo.updatedAt)}
                        alt={item.name}
                        width={72}
                        height={24}
                        unoptimized
                        className="h-6 w-auto max-w-18 object-contain"
                      />
                    ) : (
                      <span className="[overflow-wrap:anywhere]">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
