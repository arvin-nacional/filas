import { ArrowDownRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type {
  CapabilitiesHeroBlock as HeroProps,
  CapabilityDetailBlock as DetailProps,
  ConnectedCapabilitiesBlock as ConnectedProps,
} from '@/payload-types'

export const CapabilitiesHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  navigationLabel,
  links,
}: HeroProps) => (
  <section className="scroll-mt-28 bg-filas-paper pt-12 text-filas-ink sm:pt-16">
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <div className="grid items-center gap-8 pb-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pb-14">
        <div>
          <p className="mb-6 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-8">
            {eyebrow}
          </p>
          <h1 className="text-5xl leading-[1.05] font-medium tracking-tighter text-balance sm:text-6xl xl:text-7xl">
            {heading}
            <br />
            <span className="text-filas-accent-text">{emphasis}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-loose text-filas-muted sm:text-lg">
            {description}
          </p>
        </div>
        <figure className="m-0">
          <Image
            src="/solutions/operations.webp"
            alt="ART fulfillment team, warehouse facilities, and packing operations"
            width={1464}
            height={688}
            priority
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="mt-4 border-t border-filas-line pt-3 text-xs leading-relaxed text-filas-muted">
            The people, facilities, and operations behind your next stage of growth.
          </figcaption>
        </figure>
      </div>
      <nav
        className="grid grid-cols-2 border-t border-filas-line lg:grid-cols-4"
        aria-label={navigationLabel}
      >
        {links.map((link, index) => (
          <a
            className="grid grid-cols-[1fr_auto] gap-3 border-r border-b border-filas-line px-3 py-5 text-sm leading-normal text-filas-ink no-underline even:border-r-0 hover:bg-filas-surface hover:text-filas-accent-text focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-filas-accent-text sm:gap-4 sm:px-5 sm:py-6 lg:even:border-r lg:[&:nth-child(4n)]:border-r-0"
            key={link.id || index}
            href={`#${link.anchorId}`}
          >
            <span
              className="col-span-full font-mono text-xs leading-normal text-filas-accent-text"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{link.label}</span>
            <ArrowDownRight className="self-center" size={19} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  </section>
)

export const CapabilityDetailBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  tone,
  services,
  visual,
  visualCaption,
}: DetailProps) => (
  <section
    className={cn(
      'scroll-mt-28 py-16 text-filas-ink sm:py-20 lg:py-28',
      tone === 'surface' ? 'bg-filas-surface' : 'bg-filas-paper',
    )}
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-6 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-8">
        {eyebrow}
      </p>
      <div
        className={cn(
          'grid gap-9 sm:gap-11',
          anchorId !== 'fulfillment' && 'sm:grid-cols-2 lg:gap-24',
        )}
      >
        <div
          className={cn(
            anchorId === 'fulfillment' && 'grid items-center gap-8 md:grid-cols-2 md:gap-16',
          )}
        >
          <div>
            <h2 className="max-w-3xl text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-filas-muted">{description}</p>
          </div>
          {visual && (
            <figure className="mt-8">
              <Image
                src={`/solutions/${visual}.webp`}
                alt={visualCaption || `${eyebrow} examples from the FILAS solutions overview`}
                width={1672}
                height={941}
                unoptimized
                className="h-auto w-full rounded-sm bg-white"
              />
              {visualCaption && (
                <figcaption className="mt-3 text-xs leading-relaxed text-filas-muted">
                  {visualCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
        <ul
          className={cn('list-none p-0', anchorId === 'fulfillment' && 'grid gap-5 md:grid-cols-6')}
        >
          {services.map((service, index) => (
            <li
              className={cn(
                'border-t border-filas-line py-5 first:border-t-0 first:pt-0 last:pb-0',
                anchorId === 'fulfillment' &&
                  index < 3 &&
                  'border border-filas-line bg-filas-paper p-5 first:border-t first:pt-5 md:col-span-2',
                anchorId === 'fulfillment' && index >= 3 && 'md:col-span-3',
              )}
              key={service.id || index}
            >
              <h3 className="mb-3 text-2xl leading-tight font-medium tracking-tight">
                {service.title}
              </h3>
              <p className="text-base leading-loose text-filas-muted">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

export const ConnectedCapabilitiesBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  connections,
}: ConnectedProps) => (
  <section
    className="scroll-mt-28 border-b border-filas-line bg-filas-surface py-14 text-filas-ink sm:py-20"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-4 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase">
        {eyebrow}
      </p>
      <div className="grid items-end gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <h2 className="max-w-3xl text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-filas-muted">{description}</p>
      </div>
      <ul className="mt-9 grid list-none gap-5 p-0 lg:grid-cols-3">
        {connections.map((connection, index) => (
          <li
            className="flex flex-col border border-filas-line border-t-2 border-t-filas-accent-text bg-filas-paper p-6 xl:p-8"
            key={connection.id || index}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-medium">{connection.category || connection.title}</h3>
              {connection.period && (
                <span className="rounded-full border border-filas-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-filas-muted">
                  {connection.period}
                </span>
              )}
            </div>
            {connection.result && (
              <div className="my-8">
                <p className="text-7xl font-medium leading-none tracking-tighter text-filas-accent-text xl:text-8xl">
                  {connection.result}
                </p>
                <p className="mt-3 text-sm text-filas-muted">{connection.resultLabel}</p>
              </div>
            )}
            {Boolean(connection.metrics?.length) && (
              <dl className="mb-6 grid grid-cols-2 gap-4 border-y border-filas-line py-5">
                {connection.metrics?.map((metric, metricIndex) => (
                  <div key={metric.id || metricIndex}>
                    <dt className="text-xs leading-relaxed text-filas-muted">{metric.label}</dt>
                    <dd className="mt-2 text-lg font-medium tracking-tight xl:text-xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-auto text-sm leading-relaxed text-filas-muted">
              {connection.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export const capabilitiesComponents = {
  capabilitiesHero: CapabilitiesHeroBlock,
  capabilityDetail: CapabilityDetailBlock,
  connectedCapabilities: ConnectedCapabilitiesBlock,
}
