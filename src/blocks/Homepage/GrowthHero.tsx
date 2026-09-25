import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Package, ShoppingCart } from 'lucide-react'

import type { GrowthHeroBlock as GrowthHeroProps, Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { siteURL } from '@/components/SiteChrome/defaults'

const defaultMarketplaces = [
  { name: 'Shopee', logo: null },
  { name: 'Lazada', logo: null },
  { name: 'TikTok', logo: null },
  { name: 'Shopify', logo: null },
]

function HeroPhoto({
  resource,
  fallback,
  alt,
  priority = false,
}: {
  resource?: string | number | MediaType | null
  fallback: string
  alt: string
  priority?: boolean
}) {
  const media = resource && typeof resource === 'object' ? resource : null
  return (
    <Image
      src={media?.url ? getMediaUrl(media.url, media.updatedAt) : fallback}
      alt={media?.alt || alt}
      fill
      unoptimized
      priority={priority}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover [object-position:62%_center]"
    />
  )
}

export const GrowthHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  primaryLink,
  secondaryLink,
  visuals,
  homePath,
}: GrowthHeroProps & { homePath?: string }) => {
  const showCards = visuals?.showCards !== false
  const marketplaces = visuals?.marketplaces ?? defaultMarketplaces
  return (
    <section
      className="relative isolate overflow-hidden bg-filas-paper text-filas-ink"
      aria-label="Your next chapter with FILAS"
    >
      <div className="w-[84%] max-w-379 [margin:0_auto] min-h-175 flex items-center [padding:70px_0_95px] [@media(min-width:_1600px)]:min-h-[770px] [@media(max-width:_1023px)]:min-h-0 [@media(max-width:_1023px)]:[padding:55px_0_35px] [@media(max-width:_1023px)]:[width:calc(100%_-_48px)] [@media(max-width:_540px)]:[width:calc(100%_-_40px)] [@media(max-width:_540px)]:pt-[38px]">
        <div className="relative z-[3] w-[47%] [&_h1]:[font-size:clamp(48px,_5.25vw,_94px)] [&_h1]:font-medium [&_h1]:tracking-[-0.065em] [&_h1]:leading-[0.99] [@media(max-width:_1200px)_and_(min-width:_1024px)]:w-[49%] [@media(max-width:_1200px)_and_(min-width:_1024px)]:[&_h1]:text-[59px] [@media(max-width:_1023px)]:w-full [@media(max-width:_1023px)]:max-w-170 [@media(max-width:_1023px)]:[&_h1]:[font-size:clamp(46px,_8.5vw,_76px)] [@media(max-width:_1023px)]:[&_h1]:max-w-165 [@media(max-width:_540px)]:[&_h1]:[font-size:clamp(42px,_11vw,_59px)]">
          <p className="flex items-center gap-3 text-filas-accent-text [font-family:monospace] text-3 tracking-[0.13em] uppercase mb-9 [&_span]:w-[7px] [&_span]:h-[7px] [&_span]:rounded-full [&_span]:[background:currentColor] [&_span]:shrink-0 [@media(min-width:_1600px)]:text-[14px] [@media(max-width:_1023px)]:mb-[25px] [@media(max-width:_540px)]:text-[10px] [@media(max-width:_540px)]:gap-2">
            <span aria-hidden="true" />
            {eyebrow}
          </p>
          <h1>
            {heading}
            <br />
            <span>
              {emphasis}
              <span className="text-filas-accent">.</span>
            </span>
          </h1>
          <p className="mt-[34px] max-w-[650px] [font-size:clamp(16px,_1.3vw,_23px)] leading-[1.6] text-filas-muted [@media(max-width:_1023px)]:text-[18px] [@media(max-width:_1023px)]:max-w-150 [@media(max-width:_1023px)]:mt-6 [@media(max-width:_540px)]:text-4">
            {description}
          </p>
          <div className="flex flex-wrap items-center [gap:20px_28px] mt-[38px] [&_a]:inline-flex [&_a]:items-center [&_a]:justify-between [&_a]:gap-6 [&_a]:min-h-[54px] [&_a]:text-[14px] [&_a]:font-medium [&_a]:no-underline [&_a]:[transition:background_0.2s,_color_0.2s] [&_a:focus-visible]:[outline:2px_solid_var(--filas-accent-text)] [&_a:focus-visible]:[outline-offset:5px] [@media(min-width:_1600px)]:[&_a]:text-[17px] [@media(min-width:_1600px)]:[&_a]:min-h-16 [@media(max-width:_540px)]:gap-[14px] [@media(max-width:_540px)]:mt-[26px] [@media(max-width:_540px)]:[&_a]:min-h-[50px] [@media(prefers-reduced-motion:_reduce)]:[&_a]:transition-none">
            <Link
              className="bg-filas-accent-text text-filas-paper [padding:17px_25px] rounded-[3px] [&:hover]:bg-filas-ink"
              href={siteURL(primaryLink.url, homePath)}
            >
              {primaryLink.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <Link
              className="[border-bottom:1px_solid_var(--filas-line)] [&:hover]:text-filas-accent-text"
              href={siteURL(secondaryLink.url, homePath)}
            >
              {secondaryLink.label}
              <ArrowRight size={21} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute [inset:0_0_0_45%] z-[1] [@media(max-width:_1023px)]:relative [@media(max-width:_1023px)]:[inset:auto] [@media(max-width:_1023px)]:h-140 [@media(max-width:_1023px)]:w-full [@media(max-width:_540px)]:h-110">
        <div
          className="absolute [inset:0_0_0_-8%] [background:linear-gradient(125deg,_transparent_25%,_#e9e5de_25%,_#f5f3ef_40%,_transparent_40%)] [&::after]:[content:''] [&::after]:absolute [&::after]:left-[7%] [&::after]:top-[19%] [&::after]:w-[17%] [&::after]:h-[45%] [&::after]:[background:linear-gradient(170deg,_#bc5332,_#bc533200_88%)] [&::after]:[clip-path:polygon(64%_0,_100%_8%,_46%_100%,_0_74%,_0_45%)] [&::after]:[transform:rotate(8deg)]"
          aria-hidden="true"
        />
        <div className="absolute [inset:0] [clip-path:polygon(39%_0,_100%_0,_100%_100%,_34%_100%,_17%_66%)] [@media(max-width:_1023px)]:[clip-path:polygon(30%_0,_100%_0,_100%_100%,_20%_100%,_9%_65%)] [@media(max-width:_540px)]:[clip-path:polygon(28%_0,_100%_0,_100%_100%,_13%_100%,_0_66%)]">
          <HeroPhoto
            resource={visuals?.mainImage}
            fallback="/hero/entrepreneur.png"
            alt="Entrepreneur planning her next stage of growth in her warehouse office"
            priority
          />
        </div>
        <div className="absolute w-[31%] h-[46%] left-[10%] top-[34%] [border:3px_solid_white] rounded-4 overflow-hidden [transform:rotate(14deg)] [box-shadow:0_25px_45px_#29251d20] [&_img]:[transform:scale(1.15)_rotate(-5deg)] [&_img]:object-center [@media(max-width:_1023px)]:left-[9%] [@media(max-width:_1023px)]:w-[29%] [@media(max-width:_540px)]:w-[36%] [@media(max-width:_540px)]:h-[43%] [@media(max-width:_540px)]:left-[6%] [@media(max-width:_540px)]:top-[35%]">
          <HeroPhoto
            resource={visuals?.fulfillmentImage}
            fallback="/hero/fulfillment.png"
            alt="Shipping parcels moving along a warehouse conveyor"
          />
        </div>
        {showCards && (
          <>
            <div className="absolute [background:#fcfbf9] [box-shadow:0_12px_40px_#29251d15] rounded-4 p-[22px] [font-size:clamp(12px,_1vw,_18px)] leading-[1.2] [&_p]:whitespace-pre-line [@media(max-width:_1200px)_and_(min-width:_1024px)]:p-4 [@media(max-width:_1023px)]:text-[15px] [@media(max-width:_540px)]:rounded-3 [@media(max-width:_540px)]:p-[13px] [@media(max-width:_540px)]:text-3 top-[16%] left-[24%] w-[30%] min-h-35 flex justify-between gap-[10px] [&_p]:flex-1 [@media(max-width:_1200px)_and_(min-width:_1024px)]:w-[35%] [@media(max-width:_1023px)]:left-[24%] [@media(max-width:_1023px)]:top-[9%] [@media(max-width:_1023px)]:w-[32%] [@media(max-width:_540px)]:left-[4%] [@media(max-width:_540px)]:top-[6%] [@media(max-width:_540px)]:w-[45%] [@media(max-width:_540px)]:min-h-[95px]">
              <p>{visuals?.progressLabel ?? 'From potential\nto progress.'}</p>
              <div
                className="w-[49%] h-24 flex items-end gap-2 self-end mt-[3px] [&_span]:flex-1 [&_span]:rounded-[5px] [&_span]:bg-filas-accent [@media(max-width:_540px)]:h-[63px] [@media(max-width:_540px)]:gap-[5px]"
                aria-hidden="true"
              >
                {[20, 38, 58, 80, 100].map((height, i) => (
                  <span key={height} style={{ height: `${height}%`, opacity: 0.2 + i * 0.2 }} />
                ))}
              </div>
            </div>
            <div className="absolute [background:#fcfbf9] [box-shadow:0_12px_40px_#29251d15] rounded-4 p-[22px] [font-size:clamp(12px,_1vw,_18px)] leading-[1.2] [&_p]:whitespace-pre-line [@media(max-width:_1200px)_and_(min-width:_1024px)]:p-4 [@media(max-width:_1023px)]:text-[15px] [@media(max-width:_540px)]:rounded-3 [@media(max-width:_540px)]:p-[13px] [@media(max-width:_540px)]:text-3 left-[10%] top-[62%] flex items-center gap-[13px] w-[24%] min-w-[165px] [&_svg]:shrink-0 [@media(max-width:_540px)]:left-[4%] [@media(max-width:_540px)]:top-[68%] [@media(max-width:_540px)]:w-[39%] [@media(max-width:_540px)]:min-w-0 [@media(max-width:_540px)]:gap-[7px] [@media(max-width:_540px)]:[&_svg]:w-6">
              <Package size={32} strokeWidth={1.2} aria-hidden="true" />
              <p>{visuals?.fulfillmentLabel ?? 'Fulfillment\nthat keeps you\nmoving.'}</p>
            </div>
            <div className="absolute [background:#fcfbf9] [box-shadow:0_12px_40px_#29251d15] rounded-4 p-[22px] [font-size:clamp(12px,_1vw,_18px)] leading-[1.2] [&_p]:whitespace-pre-line [@media(max-width:_1200px)_and_(min-width:_1024px)]:p-4 [@media(max-width:_1023px)]:text-[15px] [@media(max-width:_540px)]:rounded-3 [@media(max-width:_540px)]:p-[13px] [@media(max-width:_540px)]:text-3 right-[6%] bottom-[12%] w-[32%] [@media(max-width:_1200px)_and_(min-width:_1024px)]:w-[37%] [@media(max-width:_1200px)_and_(min-width:_1024px)]:right-[3%] [@media(max-width:_540px)]:w-[46%] [@media(max-width:_540px)]:right-[4%] [@media(max-width:_540px)]:bottom-[5%]">
              <div className="flex gap-5 items-center [&_svg]:shrink-0 [@media(max-width:_540px)]:gap-[10px] [@media(max-width:_540px)]:[&_svg]:w-[26px]">
                <ShoppingCart size={36} strokeWidth={1.2} aria-hidden="true" />
                <p>{visuals?.marketplaceLabel ?? 'Across every\nmarketplace.'}</p>
              </div>
              {marketplaces.length > 0 && (
                <ul className="grid [grid-template-columns:repeat(4,_minmax(0,_1fr))] list-none gap-2 [margin:22px_0_0] p-0 [&_li]:min-w-0 [&_li]:grid [&_li]:place-items-center [&_li:nth-child(2)_span]:[background:#2623c9] [&_li:nth-child(3)_span]:[background:#151515] [&_li:nth-child(4)_span]:[background:#638c2e] [@media(max-width:_540px)]:gap-[5px] [@media(max-width:_540px)]:mt-[14px]">
                  {marketplaces.map((item, i) => (
                    <li key={i}>
                      {item.logo && typeof item.logo === 'object' && item.logo.url ? (
                        <Image
                          src={getMediaUrl(item.logo.url, item.logo.updatedAt)}
                          alt={item.name}
                          width={48}
                          height={48}
                          unoptimized
                          className="w-full h-12 object-contain"
                        />
                      ) : (
                        <span className="grid place-items-center w-full min-h-11 rounded-[9px] [font-size:clamp(8px,_0.64vw,_12px)] font-semibold [background:#ee542c] text-[white] [overflow-wrap:anywhere] p-[3px] [@media(max-width:_1023px)]:text-[10px] [@media(max-width:_540px)]:text-[7px] [@media(max-width:_540px)]:min-h-8 [@media(max-width:_540px)]:rounded-[6px]">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
