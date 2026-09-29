import Image from 'next/image'

import type { AboutHeroBlock as Props, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

function AboutPhoto({
  resource,
  fallback,
  alt,
  priority = false,
}: {
  resource?: string | Media | null
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
      sizes="(min-width: 1024px) 25vw, 60vw"
      className="object-cover object-center"
    />
  )
}

export const AboutHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  commitment,
  visuals,
}: Props) => (
  <section className="overflow-hidden bg-filas-paper text-filas-ink" aria-label="About FILAS">
    <div className="mx-auto grid w-[calc(100%-2.5rem)] max-w-[1516px] items-center gap-8 py-8 sm:w-[calc(100%-4rem)] sm:py-10 lg:w-[84%] lg:grid-cols-[1.3fr_1fr] lg:gap-12 xl:gap-16">
      <div className="relative z-10">
        <p className="mb-8 font-mono text-xs tracking-[0.24em] text-filas-accent-text uppercase">
          {eyebrow}
        </p>
        <h1 className="text-[clamp(2.5rem,5.2vw,5.75rem)] leading-[1.03] font-medium tracking-[-0.065em]">
          {heading}
          <br />
          <span className="text-filas-accent-text">{emphasis}</span>
        </h1>
        <p className="mt-8 max-w-[650px] text-base leading-relaxed text-filas-muted sm:text-lg lg:text-xl xl:text-2xl">
          {description}
        </p>
        <p className="mt-8 max-w-[650px] border-t border-filas-line pt-6 font-mono text-[10px] leading-relaxed tracking-[0.2em] uppercase lg:text-xs">
          {commitment ?? 'Your progress is a shared commitment.'}
        </p>
      </div>
      <div
        className="relative mx-auto aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] lg:mr-0 lg:max-w-[360px]"
        aria-label="Our people and operations"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-[3%] bottom-[11%] rotate-[-15deg] rounded-[50%] border border-filas-accent/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[21%] right-[2%] h-[66%] w-[79%] rounded-t-full bg-filas-surface [clip-path:polygon(0_0,100%_0,100%_100%,20%_100%,0_76%,20%_35%)]"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 z-10 h-[55%] w-[60%] overflow-hidden rounded-3xl">
          <AboutPhoto
            resource={visuals?.teamImage}
            fallback="/about/team.png"
            alt="Colleagues sharing ideas around a laptop"
            priority
          />
        </div>
        <div className="absolute right-0 bottom-0 z-10 h-[55%] w-[69%] overflow-hidden rounded-3xl">
          <AboutPhoto
            resource={visuals?.operationsImage}
            fallback="/about/operations.png"
            alt="A warehouse team member managing orders on a tablet"
          />
        </div>
        <div
          className="pointer-events-none absolute top-[12%] right-0 h-[11%] w-[15%] rounded-full bg-filas-accent"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
)
