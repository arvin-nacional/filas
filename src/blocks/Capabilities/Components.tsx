import { ArrowDownRight } from 'lucide-react'
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
  <section className="scroll-mt-28 bg-filas-paper pt-16 text-filas-ink sm:pt-24 lg:pt-30">
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-6 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-8">
        {eyebrow}
      </p>
      <h1 className="text-5xl leading-none font-medium tracking-tighter text-balance sm:text-6xl lg:text-8xl">
        {heading}
        <br />
        <span className="text-filas-accent-text">{emphasis}</span>
      </h1>
      <p className="mt-8 mb-10 max-w-xl text-base leading-loose text-filas-muted sm:mb-16 sm:text-lg">
        {description}
      </p>
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
      <div className="grid gap-9 sm:grid-cols-2 sm:gap-11 lg:gap-24">
        <div>
          <h2 className="max-w-3xl text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-filas-muted">{description}</p>
        </div>
        <ul className="list-none p-0">
          {services.map((service, index) => (
            <li
              className="border-t border-filas-line py-6 first:border-t-0 first:pt-0 last:pb-0"
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
    className="scroll-mt-28 bg-filas-ink py-16 text-filas-paper sm:py-20 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-6 font-mono text-xs leading-relaxed tracking-widest text-[#e6a48a] uppercase sm:mb-8">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
        {heading}
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#c8c4bd]">{description}</p>
      <ul className="mt-10 grid list-none gap-9 p-0 sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {connections.map((connection, index) => (
          <li className="border-t border-[#4b4843] pt-6" key={connection.id || index}>
            <span className="font-mono text-xs leading-normal text-[#e6a48a]" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 mb-3 text-2xl leading-tight font-medium tracking-tight">
              {connection.title}
            </h3>
            <p className="text-base leading-loose text-[#c8c4bd]">{connection.description}</p>
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
