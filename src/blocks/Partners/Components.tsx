import Image from 'next/image'
import { ArrowUpRight, Check, Sprout } from 'lucide-react'
import type {
  PartnersHeroBlock as HeroProps,
  PartnerStagesBlock as StagesProps,
  PartnershipFitBlock as FitProps,
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
      <div className={cn(container, 'grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20')}>
        <div>
          <p className={cn(eyebrowClass, 'mb-8 text-filas-accent-text')}>{eyebrow}</p>
          <h1 className="text-[clamp(2.5rem,5vw,5.5rem)] leading-[1.03] font-medium tracking-[-0.06em]">
            {heading}
            <br />
            <span className="text-filas-accent-text">{emphasis}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-filas-muted">{description}</p>
          <p className="mt-8 border-t border-filas-line pt-6 font-mono text-xs leading-relaxed tracking-widest uppercase">
            {note}
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-96 overflow-hidden rounded-3xl bg-filas-surface">
          {photo?.url ? (
            <Image
              src={getMediaUrl(photo.url, photo.updatedAt)}
              alt={photo.alt || 'A growing brand and its team'}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 30vw, 90vw"
            />
          ) : (
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute inset-9 rounded-full border border-filas-accent/25" />
              <div className="absolute top-9 right-12 size-12 rounded-full bg-filas-accent" />
              <Sprout
                className="absolute top-14 left-12 text-filas-accent-text"
                size={40}
                strokeWidth={1.2}
              />
              <div className="absolute inset-x-12 bottom-12 flex h-48 items-end gap-4">
                <div className="h-1/3 flex-1 rounded-t-lg bg-filas-accent/25" />
                <div className="h-2/3 flex-1 rounded-t-lg bg-filas-accent/50" />
                <div className="h-full flex-1 rounded-t-lg bg-filas-accent" />
              </div>
            </div>
          )}
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
              <div className="mt-6 border-t border-filas-line pt-5">
                <h4 className="mb-2 text-sm font-medium">Where you might be</h4>
                <p className="text-sm leading-relaxed text-filas-muted">{stage.needs}</p>
              </div>
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

export const partnerComponents = {
  partnersHero: PartnersHeroBlock,
  partnerStages: PartnerStagesBlock,
  partnershipFit: PartnershipFitBlock,
}
