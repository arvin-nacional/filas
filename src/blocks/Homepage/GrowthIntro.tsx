import Image from 'next/image'
import { ArrowUpRight, ChartNoAxesColumnIncreasing } from 'lucide-react'
import type { GrowthIntroBlock as Props, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

function Photo({
  resource,
  fallback,
  alt,
  className,
}: {
  resource?: string | Media | null
  fallback: string
  alt: string
  className: string
}) {
  const media = resource && typeof resource === 'object' ? resource : null
  return (
    <div className={className}>
      <Image
        src={media?.url ? getMediaUrl(media.url, media.updatedAt) : fallback}
        alt={media?.alt || alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}

export const GrowthIntroBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  supportingText,
  statement,
  visuals,
}: Props) => {
  const hasPeriod = heading.endsWith('.')
  const capabilities =
    visuals?.capabilities ??
    ['Strategy', 'Commerce', 'Fulfillment', 'People'].map((label) => ({ label }))
  return (
    <section
      id={anchorId}
      className="bg-filas-paper text-filas-ink [padding:70px_0_48px] scroll-mt-24 [@media(max-width:_767px)]:[padding:50px_0]"
    >
      <div className="w-[84%] max-w-379 m-auto [@media(max-width:_767px)]:[width:calc(100%_-_40px)]">
        <p className="[font:12px/1.5_monospace] tracking-[0.16em] uppercase text-filas-accent-text mb-[42px] [@media(max-width:_767px)]:text-[10px] [@media(max-width:_767px)]:mb-[26px]">
          {eyebrow}
        </p>
        <div className="grid [grid-template-columns:1.25fr_1fr] gap-[6.5%] items-start [&_h2]:[font-size:clamp(40px,_4.5vw,_76px)] [&_h2]:leading-[1.04] [&_h2]:font-medium [&_h2]:tracking-[-0.06em] [&_h2]:whitespace-pre-line [&_h2_span]:text-filas-accent [@media(max-width:_1100px)]:gap-9 [@media(max-width:_767px)]:grid-cols-[1fr] [@media(max-width:_767px)]:gap-[26px] [@media(max-width:_767px)]:[&_h2]:[font-size:clamp(38px,_7vw,_54px)]">
          <h2>
            {hasPeriod ? heading.slice(0, -1) : heading}
            {hasPeriod && <span>.</span>}
          </h2>
          <div className="[font-size:clamp(16px,_1.3vw,_22px)] leading-[1.6] [&_p_+_p]:mt-[30px] [@media(max-width:_767px)]:[&_p_+_p]:mt-5">
            <p>{description}</p>
            <p>{supportingText}</p>
          </div>
        </div>
        <div className="grid [grid-template-columns:2.95fr_1.6fr_1fr] gap-[18px] mt-11 [@media(max-width:_1100px)]:[grid-template-columns:2.2fr_1.5fr_1.1fr] [@media(max-width:_1100px)]:gap-[14px] [@media(max-width:_767px)]:[grid-template-columns:1.3fr_1fr] [@media(max-width:_767px)]:mt-[30px] [@media(max-width:_767px)]:gap-3">
          <Photo
            resource={visuals?.warehouseImage}
            fallback="/growth-intro/warehouse.png"
            alt="FILAS-branded parcels on a warehouse conveyor"
            className="relative min-h-70 rounded-[9px] overflow-hidden [&_img]:[object-position:55%_center] [@media(min-width:_1600px)]:min-h-[325px] [@media(max-width:_767px)]:col-span-full [@media(max-width:_767px)]:min-h-0 [@media(max-width:_767px)]:[aspect-ratio:2.25]"
          />
          <Photo
            resource={visuals?.teamImage}
            fallback="/growth-intro/partnership.png"
            alt="A team working together on a business plan"
            className="relative min-h-70 rounded-[9px] overflow-hidden [&_img]:[object-position:48%_center] [@media(min-width:_1600px)]:min-h-[325px] [@media(max-width:_767px)]:min-h-[245px]"
          />
          <div className="bg-filas-surface [border:1px_solid_var(--filas-line)] rounded-[9px] p-7 [&_svg]:text-filas-accent-text [&_svg]:mb-[18px] [&_h3]:[font-size:clamp(20px,_1.65vw,_28px)] [&_h3]:font-normal [&_h3]:tracking-[-0.04em] [&_h3]:leading-[1.1] [&_h3]:whitespace-pre-line [&_ul]:[border-top:1px_solid_var(--filas-line)] [&_ul]:pt-5 [&_ul]:mt-[26px] [&_ul]:list-none [&_ul]:[font:11px/2_monospace] [&_ul]:tracking-[0.12em] [&_ul]:uppercase [&_ul]:text-filas-muted [&_ul]:[overflow-wrap:anywhere] [@media(min-width:_1600px)]:p-8 [@media(max-width:_1100px)]:p-5 [@media(max-width:_767px)]:[padding:20px_16px] [@media(max-width:_767px)]:[&_h3]:text-[22px] [@media(max-width:_767px)]:[&_ul]:text-[9px] [@media(max-width:_767px)]:[&_ul]:tracking-[0.1em] [@media(max-width:_767px)]:[&_ul]:mt-5 [@media(max-width:_767px)]:[&_ul]:pt-4">
            <ChartNoAxesColumnIncreasing size={32} strokeWidth={1.5} aria-hidden="true" />
            <h3>{visuals?.cardHeading ?? 'From ambition\nto what’s next.'}</h3>
            {capabilities.length > 0 && (
              <ul>
                {capabilities.map((item, i) => (
                  <li key={i}>{item.label}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center gap-10 rounded-[9px] bg-filas-surface mt-[26px] [padding:22px_28px] [&_p]:[font-size:clamp(18px,_1.5vw,_24px)] [&_p]:tracking-[-0.025em] [&_p]:flex-1 [@media(max-width:_767px)]:[padding:18px_14px] [@media(max-width:_767px)]:gap-4 [@media(max-width:_767px)]:mt-[18px] [@media(max-width:_767px)]:[&_p]:text-4">
          <div className="[border-right:1px_solid_var(--filas-line)] pr-[30px] shrink-0 [@media(max-width:_767px)]:pr-[14px]">
            <Image
              src="/filas-logo.jpg"
              alt="FILAS"
              width={90}
              height={90}
              quality={100}
              className="w-20 h-[65px] object-contain mix-blend-multiply [@media(max-width:_767px)]:w-12 [@media(max-width:_767px)]:h-13"
            />
          </div>
          <p>{statement}</p>
          <div className="pl-6 [border-left:1px_solid_var(--filas-line)] text-filas-accent-text h-15 grid place-items-center [@media(max-width:_767px)]:pl-0 [@media(max-width:_767px)]:[border:0] [@media(max-width:_767px)]:[&_svg]:w-6">
            <ArrowUpRight size={32} strokeWidth={1.3} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
