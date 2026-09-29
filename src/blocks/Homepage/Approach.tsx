import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { ApproachBlock as Props, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

function Photo({
  resource,
  fallback,
  alt,
  label,
}: {
  resource?: string | Media | null
  fallback: string
  alt: string
  label: string
}) {
  const media = resource && typeof resource === 'object' ? resource : null
  return (
    <figure className="relative h-[clamp(210px,_16vw,_280px)] [border:1px_solid_#51514a] rounded-[9px] overflow-hidden m-0 [&_img]:object-cover [&_img]:object-center [&::after]:[content:''] [&::after]:absolute [&::after]:inset-0 [&::after]:[background:linear-gradient(90deg,_#0009,_transparent_55%)] [&::after]:pointer-events-none [&_figcaption]:absolute [&_figcaption]:z-[1] [&_figcaption]:left-[34px] [&_figcaption]:bottom-6 [&_figcaption]:text-[#f6f3ed] [&_figcaption]:[font:12px/1.7_monospace] [&_figcaption]:tracking-[0.12em] [&_figcaption]:uppercase [&_figcaption]:whitespace-pre-line [&_figcaption::after]:[content:''] [&_figcaption::after]:block [&_figcaption::after]:w-11 [&_figcaption::after]:h-px [&_figcaption::after]:bg-[#d2cfc880] [&_figcaption::after]:mt-[14px] max-[541px]:h-[195px] max-[541px]:[&_figcaption]:left-5 max-[541px]:[&_figcaption]:bottom-[18px] max-[541px]:[&_figcaption]:text-[10px]">
      <Image
        src={media?.url ? getMediaUrl(media.url, media.updatedAt) : fallback}
        alt={media?.alt || alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 55vw, 100vw"
      />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  )
}

export const ApproachBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  steps,
  visuals,
}: Props) => (
  <section
    id={anchorId}
    className="scroll-mt-24 bg-[#1c1d1a] text-filas-paper [padding:70px_0_60px] max-[541px]:[padding:48px_0]"
  >
    <div className="w-[84%] max-w-379 m-auto max-[541px]:w-[calc(100%_-_40px)]">
      <p className="mb-[30px] text-[#db8869] uppercase [font:13px/1.5_monospace] tracking-[0.1em] max-[541px]:text-[11px] max-[541px]:mb-[26px]">
        {eyebrow}
      </p>
      <div className="grid grid-cols-[1.8fr_1fr] gap-[7%] items-center [&_h2]:text-[clamp(42px,_5.1vw,_86px)] [&_h2]:leading-[1.02] [&_h2]:tracking-[-0.055em] [&_h2]:font-medium [&_h2]:whitespace-pre-line max-[1101px]:gap-10 max-[901px]:grid-cols-[1fr] max-[901px]:gap-6 max-[541px]:[&_h2]:text-[clamp(38px,_10vw,_52px)]">
        <h2>
          {heading.split('.').map((part, i, parts) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && <span className="text-[#c76e50]">.</span>}
            </span>
          ))}
        </h2>
        <p className="text-[#d4d2cc] text-[clamp(16px,_1.3vw,_22px)] leading-[1.6] max-[901px]:max-w-[650px]">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-[1.95fr_1fr] gap-[22px] mt-[42px] max-[541px]:grid-cols-[1fr] max-[541px]:gap-[14px] max-[541px]:mt-7">
        <Photo
          resource={visuals?.strategyImage}
          fallback="/approach/strategy.png"
          alt="Partners planning a strategy together at a worktable"
          label={visuals?.strategyLabel ?? 'Strategy\nmeets\nexecution'}
        />
        <Photo
          resource={visuals?.executionImage}
          fallback="/approach/execution.png"
          alt="FILAS parcels moving through a fulfillment warehouse"
          label={visuals?.executionLabel ?? 'Ideas\ninto\nopportunity'}
        />
      </div>
      <ol className="grid grid-cols-[repeat(4,_minmax(0,_1fr))] list-none p-0 [margin:46px_0_0] [&_li]:flex [&_li]:flex-col [&_li]:[padding:0_34px] [&_li]:[border-left:1px_solid_#575750] [&_li:first-child]:pl-0 [&_li:first-child]:border-l-0 [&_li:last-child]:pr-0 [&_h3]:text-[clamp(23px,_1.8vw,_30px)] [&_h3]:leading-[1.2] [&_h3]:tracking-[-0.04em] [&_h3]:font-normal [&_h3]:mb-3 [&_p]:text-[14px] [&_p]:leading-[1.6] [&_p]:text-[#c6c4be] [&_p]:mb-5 max-[1101px]:[&_li]:[padding:0_20px] max-[901px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[901px]:[gap:35px_0] max-[901px]:[&_li:nth-child(odd)]:border-l-0 max-[901px]:[&_li:nth-child(odd)]:pl-0 max-[901px]:[&_li:nth-child(even)]:pr-0 max-[541px]:grid-cols-[1fr] max-[541px]:mt-8 max-[541px]:gap-7 max-[541px]:[&_li]:p-0 max-[541px]:[&_li]:border-0 max-[541px]:[&_h3]:text-[25px] max-[541px]:[&_p]:max-w-110">
        {steps.map((step, index) => (
          <li key={step.id || index}>
            <div className="flex gap-6 items-center text-[#db8869] [font:14px/1.5_monospace] mb-6 [&_span:last-child]:flex-1 [&_span:last-child]:h-px [&_span:last-child]:bg-[#575750] max-[541px]:mb-[15px]">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span
              className="mt-auto grid place-items-center w-[43px] h-[43px] rounded-full [border:1px_solid_#c76e50] text-[#e5c8b8]"
              aria-hidden="true"
            >
              <ArrowRight size={19} strokeWidth={1.3} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
