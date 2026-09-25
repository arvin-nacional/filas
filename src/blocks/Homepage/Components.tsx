import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'

import type {
  AudienceBlock as AudienceProps,
  ClientLogosBlock as ClientLogosProps,
  ContactInvitationBlock as ContactInvitationProps,
  ServicesOverviewBlock as ServicesOverviewProps,
} from '@/payload-types'
import { Media } from '@/components/Media'
import { siteURL } from '@/components/SiteChrome/defaults'
import { cn } from '@/utilities/ui'

type PreviewProps = { homePath?: string }

export { GrowthHeroBlock } from './GrowthHero'
import { GrowthHeroBlock } from './GrowthHero'

export { GrowthIntroBlock } from './GrowthIntro'
import { GrowthIntroBlock } from './GrowthIntro'

export { ApproachBlock } from './Approach'
import { ApproachBlock } from './Approach'

export const ServicesOverviewBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  services,
}: ServicesOverviewProps) => (
  <section
    className="scroll-mt-28 bg-filas-paper py-16 text-filas-ink sm:py-24 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="mb-9 grid items-end gap-6 sm:mb-14 sm:grid-cols-[1.2fr_0.7fr] sm:gap-10 lg:gap-20">
        <h2 className="text-4xl leading-tight font-medium tracking-tighter text-pretty whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-sm text-base leading-loose text-pretty text-filas-muted">
          {description}
        </p>
      </div>
      <div className="border-t border-filas-line">
        {services.map((service, index) => (
          <details className="group border-b border-filas-line" key={service.id || index}>
            <summary className="group/summary grid cursor-pointer list-none grid-cols-[22px_1fr_34px] items-center gap-3 py-6.5 [&::-webkit-details-marker]:hidden [&::marker]:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text sm:grid-cols-[30px_1fr_40px] sm:gap-5 sm:py-8 lg:grid-cols-[48px_1.15fr_0.85fr_44px] lg:gap-6">
              <span className="font-mono text-xs font-normal text-filas-accent-text">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl leading-tight font-normal tracking-tight lg:text-4xl">
                {service.title}
              </h3>
              <span className="hidden text-sm leading-normal text-filas-muted lg:block">
                {service.summary}
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-filas-line transition-colors duration-200 group-open:border-filas-accent-text group-open:bg-filas-accent-text group-open:text-filas-paper group-hover/summary:border-filas-accent-text group-hover/summary:bg-filas-accent-text group-hover/summary:text-filas-paper motion-reduce:transition-none sm:h-10 sm:w-10">
                <Plus
                  size={20}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </span>
            </summary>
            <div className="grid gap-5.5 pt-0 pr-0 pb-6.5 pl-8.5 sm:pl-12.5 lg:grid-cols-2 lg:gap-10.5 lg:pr-17 lg:pl-18 lg:pb-8">
              <p className="max-w-[480px] text-sm leading-relaxed text-filas-muted sm:text-base">
                {service.description}
              </p>
              <ul className="flex list-none flex-wrap content-start gap-2.5">
                {service.capabilities.map((capability, capabilityIndex) => (
                  <li
                    className="border border-filas-line px-2.5 py-1.5 text-xs leading-normal"
                    key={capability.id || capabilityIndex}
                  >
                    {capability.label}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
)

export const AudienceBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  stages,
}: AudienceProps) => (
  <section
    className="scroll-mt-28 bg-filas-surface py-16 text-filas-ink sm:py-24 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="mb-9 grid items-end gap-6 sm:mb-14 sm:grid-cols-[1.2fr_0.7fr] sm:gap-10 lg:gap-20">
        <h2 className="text-4xl leading-tight font-medium tracking-tighter text-pretty whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-sm text-base leading-loose text-pretty text-filas-muted">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[repeat(auto-fit,minmax(245px,1fr))] lg:gap-5">
        {stages.map((stage, index) => (
          <article
            className={cn(
              'flex flex-col border border-[#d7d3c9] px-6 py-7 lg:min-h-85 lg:px-7 lg:py-8',
              stage.featured && 'border-t-3 border-t-filas-accent bg-filas-paper',
            )}
            key={stage.id || index}
          >
            <p className="mb-5 font-mono text-xs leading-relaxed tracking-wider text-filas-muted uppercase lg:mb-9">
              {stage.label}
            </p>
            <h3 className="mb-5 text-3xl leading-tight font-medium tracking-tight lg:text-4xl">
              {stage.title}
              <span className="text-filas-accent" aria-hidden="true">
                .
              </span>
            </h3>
            <p className="mb-8 max-w-2xl text-sm leading-loose text-filas-muted lg:max-w-none">
              {stage.description}
            </p>
            <ArrowUpRight
              className="mt-auto text-filas-accent-text"
              size={26}
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </div>
  </section>
)

export const ClientLogosBlock = ({ anchorId, eyebrow, heading, clients }: ClientLogosProps) => {
  const approvedClients = clients?.filter(
    (client) => client.approved && typeof client.logo === 'object' && client.logo.url,
  )
  if (!approvedClients?.length) return null

  return (
    <section
      className="scroll-mt-28 border-b border-filas-line bg-filas-paper py-16 text-center text-filas-ink sm:py-24 lg:py-28"
      id={anchorId}
    >
      <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
        <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
          {eyebrow}
        </p>
        <h2 className="text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <ul className="mt-12 flex list-none flex-wrap justify-center gap-x-14 gap-y-8">
          {approvedClients.map((client, index) => (
            <li className="grid w-[150px] place-items-center" key={client.id || index}>
              <Media
                resource={client.logo}
                alt={client.name}
                imgClassName="max-h-22.5 w-[150px] object-contain"
                size="180px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export const ContactInvitationBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  link,
  note,
  homePath,
}: ContactInvitationProps & PreviewProps) => (
  <section
    className="scroll-mt-28 bg-filas-paper py-20 text-center text-filas-ink sm:pt-30 sm:pb-25"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 flex items-center justify-center gap-2.5 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
        {eyebrow}
      </p>
      <h2 className="text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line sm:text-5xl lg:text-6xl xl:text-7xl">
        {heading}
      </h2>
      <p className="mx-auto mt-6 mb-8 max-w-md text-base leading-loose text-pretty text-filas-muted">
        {description}
      </p>
      <Link
        className="inline-flex min-h-12.5 items-center justify-center gap-6 rounded-xs border border-transparent bg-filas-accent-text px-5 py-4 text-sm font-medium text-filas-paper no-underline transition-colors duration-200 hover:bg-filas-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none sm:px-6"
        href={siteURL(link.url, homePath)}
      >
        {link.label}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <p className="mt-7 font-mono text-xs leading-loose text-filas-muted">{note}</p>
    </div>
  </section>
)

export const homepageComponents = {
  growthHero: GrowthHeroBlock,
  growthIntro: GrowthIntroBlock,
  approach: ApproachBlock,
  servicesOverview: ServicesOverviewBlock,
  audience: AudienceBlock,
  clientLogos: ClientLogosBlock,
  contactInvitation: ContactInvitationBlock,
}
