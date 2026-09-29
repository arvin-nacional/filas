import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import type {
  PartnersHeroBlock as HeroProps,
  PartnerStagesBlock as StagesProps,
  PartnershipFitBlock as FitProps,
  PartnerResultsBlock as ResultsProps,
} from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

const container = 'mx-auto w-[calc(100%-2.5rem)] max-w-[1516px] sm:w-[calc(100%-4rem)] lg:w-[84%]'
const eyebrowClass = 'font-mono text-xs leading-relaxed tracking-[0.16em] uppercase'

export const PartnersHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  note,
  image,
}: HeroProps) => {
  const photo = image && typeof image === 'object' ? image : null
  return (
    <section className="overflow-hidden bg-filas-paper py-12 text-filas-ink lg:py-16">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className={cn(eyebrowClass, 'mb-7 text-filas-accent-text')}>{eyebrow}</p>
            <h1 className="text-[clamp(3rem,6vw,6.5rem)] leading-[1.02] font-medium tracking-[-0.06em]">
              {heading}
              <br />
              <span className="text-filas-accent-text">{emphasis}</span>
            </h1>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-filas-muted">{description}</p>
            <p className="mt-7 border-t border-filas-line pt-5 font-mono text-xs leading-relaxed tracking-widest uppercase">
              {note}
            </p>
          </div>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-filas-surface pt-6 sm:mt-14 sm:pt-10">
          <Image
            src={
              photo?.url ? getMediaUrl(photo.url, photo.updatedAt) : '/partners/product-lineup.png'
            }
            alt={
              photo?.alt ||
              'A range of pet care, personal care, wellness, household, and food products on a fulfillment conveyor'
            }
            width={2172}
            height={724}
            unoptimized
            priority
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 84vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}

export const PartnerStagesBlock = ({ eyebrow, heading, description, stages }: StagesProps) => (
  <section className="bg-filas-surface py-14 text-filas-ink lg:py-20">
    <div className={container}>
      <p className={cn(eyebrowClass, 'mb-7 text-filas-accent-text')}>{eyebrow}</p>
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
        <h2 className="text-4xl leading-tight font-medium tracking-tighter whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-filas-muted">{description}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {stages.map((stage, i) => {
          const photo = stage.image && typeof stage.image === 'object' ? stage.image : null
          return (
            <article
              key={stage.id || i}
              className={cn(
                'flex flex-col rounded-xl border border-filas-line bg-filas-paper p-6 lg:p-8',
                stage.featured && 'border-t-4 border-t-filas-accent',
              )}
            >
              {photo?.url && (
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={getMediaUrl(photo.url, photo.updatedAt)}
                    alt={photo.alt || stage.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 1024px) 28vw, 90vw"
                  />
                </div>
              )}
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-filas-accent-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ArrowUpRight
                  size={23}
                  strokeWidth={1.3}
                  className="text-filas-accent-text"
                  aria-hidden="true"
                />
              </div>
              <p className="mb-3 font-mono text-[10px] leading-relaxed tracking-widest text-filas-muted uppercase">
                {stage.label}
              </p>
              <h3 className="text-3xl font-medium tracking-tight">{stage.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-filas-muted">{stage.description}</p>
              <div className="mt-auto pt-7">
                <h4 className="mb-4 text-sm font-medium">How we can help</h4>
                <ul className="space-y-3">
                  {stage.support.map((item, j) => (
                    <li key={item.id || j} className="flex gap-3 text-sm leading-relaxed">
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-filas-accent-text"
                        aria-hidden="true"
                      />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)

export const PartnershipFitBlock = ({ eyebrow, heading, description, qualities }: FitProps) => (
  <section className="bg-filas-ink py-14 text-filas-paper lg:py-20">
    <div className={cn(container, 'grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-24')}>
      <div>
        <p className={cn(eyebrowClass, 'mb-7 text-[#db8869]')}>{eyebrow}</p>
        <h2 className="text-4xl leading-tight font-medium tracking-tighter whitespace-pre-line lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c6c4be]">{description}</p>
      </div>
      <ol className="divide-y divide-white/20 border-y border-white/20">
        {qualities.map((quality, i) => (
          <li key={quality.id || i} className="flex gap-5 py-7">
            <span className="pt-1 font-mono text-xs text-[#db8869]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-xl tracking-tight sm:text-2xl">{quality.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c6c4be]">{quality.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export const PartnerResultsBlock = ({
  eyebrow,
  heading,
  description,
  note,
  cases,
}: ResultsProps) => (
  <section className="bg-filas-ink py-16 text-filas-paper sm:py-24" id="results">
    <div className={container}>
      <p className={cn(eyebrowClass, 'mb-7 text-[#e6a48a]')}>{eyebrow}</p>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
        <h2 className="text-4xl font-medium leading-tight tracking-tighter whitespace-pre-line sm:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-[#c8c4bd]">{description}</p>
      </div>
      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3">
        {cases.map((item, index) => {
          const photo = item.image && typeof item.image === 'object' ? item.image : null
          return (
            <article
              key={item.id || index}
              className="overflow-hidden rounded-xl border border-white/15 bg-white/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e7e1d6]">
                <Image
                  src={
                    photo?.url
                      ? getMediaUrl(photo.url, photo.updatedAt)
                      : '/partners/product-lineup.png'
                  }
                  alt={photo?.alt || `${item.category} category illustration`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  className="object-cover"
                  style={{ objectPosition: item.imagePosition || 'center' }}
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-[#e6a48a]">
                  {item.category}
                </p>
                <p className="mt-6 text-6xl font-medium tracking-tighter lg:text-7xl">
                  {item.metric}
                </p>
                <p className="mt-2 text-lg">{item.metricLabel}</p>
                <p className="mt-2 font-mono text-xs text-[#c8c4bd]">{item.period}</p>
                <h3 className="mt-7 border-t border-white/15 pt-6 text-xl leading-snug">
                  {item.description}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#c8c4bd]">{item.detail}</p>
              </div>
            </article>
          )
        })}
      </div>
      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#c8c4bd]">{note}</p>
    </div>
  </section>
)

export const partnerComponents = {
  partnerResults: PartnerResultsBlock,
  partnersHero: PartnersHeroBlock,
  partnerStages: PartnerStagesBlock,
  partnershipFit: PartnershipFitBlock,
}
