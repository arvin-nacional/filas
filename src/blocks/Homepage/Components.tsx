import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from 'lucide-react'

import type {
  ApproachBlock as ApproachProps,
  AudienceBlock as AudienceProps,
  ClientLogosBlock as ClientLogosProps,
  ContactInvitationBlock as ContactInvitationProps,
  GrowthHeroBlock as GrowthHeroProps,
  GrowthIntroBlock as GrowthIntroProps,
  ServicesOverviewBlock as ServicesOverviewProps,
} from '@/payload-types'
import { Media } from '@/components/Media'
import { siteURL } from '@/components/SiteChrome/defaults'
import { cn } from '@/utilities/ui'

type PreviewProps = { homePath?: string }

export const GrowthHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  primaryLink,
  secondaryLink,
  footnote,
  homePath,
}: GrowthHeroProps & PreviewProps) => (
  <section
    className="scroll-mt-28 bg-filas-paper pt-16 text-center text-filas-ink sm:pt-24 lg:pt-36"
    aria-label="Your next chapter with FILAS"
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 flex items-center justify-center gap-2.5 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
        {eyebrow}
      </p>
      <h1 className="mx-auto max-w-[1100px] text-5xl leading-none font-medium tracking-tighter text-balance sm:text-6xl lg:text-8xl">
        {heading}
        <br className="hidden sm:inline" />
        <span className="before:content-['_'] sm:before:content-none">{emphasis}</span>
        <span className="text-filas-accent">.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-loose text-pretty text-filas-muted sm:mt-8 sm:text-lg">
        {description}
      </p>
      <div className="mt-7 flex flex-col flex-wrap items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-x-8 sm:gap-y-5">
        <Link
          className="inline-flex min-h-12.5 items-center justify-center gap-6 rounded-xs border border-transparent bg-filas-ink px-5 py-4 text-sm font-medium text-filas-paper no-underline transition-colors duration-200 hover:bg-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none sm:px-6"
          href={siteURL(primaryLink.url, homePath)}
        >
          {primaryLink.label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <Link
          className="inline-flex min-h-12.5 items-center justify-center gap-6 border-b border-filas-line px-5 text-sm font-medium text-filas-ink no-underline transition-colors duration-200 hover:border-current hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none sm:gap-3.5 sm:px-0"
          href={siteURL(secondaryLink.url, homePath)}
        >
          {secondaryLink.label}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-[1fr_auto] items-center gap-5 border-b border-filas-line py-5.5 font-mono text-xs leading-relaxed text-filas-muted sm:mt-22 sm:grid-cols-[1fr_auto_1fr] sm:gap-8 sm:py-6">
        <p className="max-w-60 text-left sm:max-w-none">{footnote}</p>
        <a
          href={siteURL('/#about', homePath)}
          aria-label="Get to know FILAS"
          className="grid h-10.5 w-10.5 place-items-center rounded-full border border-filas-line text-filas-ink transition-colors duration-200 hover:border-filas-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none"
        >
          <ArrowDown size={19} aria-hidden="true" />
        </a>
        <span className="hidden text-right sm:block">Strategy. Execution. Accountability.</span>
      </div>
    </div>
  </section>
)

export const GrowthIntroBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  supportingText,
  statement,
}: GrowthIntroProps) => (
  <section
    className="scroll-mt-28 bg-filas-paper py-16 text-filas-ink sm:py-24 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="grid items-start gap-6 sm:grid-cols-[1.05fr_0.8fr] sm:gap-12 lg:gap-24 xl:gap-32">
        <h2 className="max-w-[610px] text-4xl leading-tight font-medium tracking-tighter text-pretty whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <div className="space-y-5 text-base leading-loose text-pretty text-filas-muted sm:text-lg">
          <p>{description}</p>
          <p>{supportingText}</p>
        </div>
      </div>
      <div className="mt-9 flex items-center gap-4 bg-filas-surface px-4 py-4.5 sm:mt-12 sm:gap-7 sm:py-4 sm:pr-8 sm:pl-3.5">
        <Image
          src="/filas-logo.jpg"
          alt="FILAS"
          width={120}
          height={120}
          quality={100}
          sizes="120px"
          className="h-15 w-15 shrink-0 object-contain mix-blend-multiply sm:h-22.5 sm:w-22.5"
        />
        <p className="text-lg leading-normal tracking-tight sm:text-xl">{statement}</p>
        <span className="ml-6 hidden h-px flex-1 bg-filas-line sm:block" aria-hidden="true" />
        <ArrowUpRight
          size={28}
          strokeWidth={1.2}
          aria-hidden="true"
          className="hidden shrink-0 text-filas-accent sm:block"
        />
      </div>
    </div>
  </section>
)

export const ApproachBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  steps,
}: ApproachProps) => (
  <section className="scroll-mt-28 bg-filas-ink py-16 text-filas-paper sm:py-24" id={anchorId}>
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-[#d7937c] uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="mb-9 grid items-end gap-6 sm:mb-14 sm:grid-cols-[1.2fr_0.7fr] sm:gap-10 lg:gap-20">
        <h2 className="text-4xl leading-tight font-medium tracking-tighter text-pretty whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-sm text-base leading-loose text-pretty text-[#bdbbb4]">{description}</p>
      </div>
      <ol className="mt-10 grid list-none grid-cols-1 gap-8 p-0 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] lg:gap-8">
        {steps.map((step, index) => (
          <li
            className="grid grid-cols-[35px_1fr] gap-x-4 border-t border-[#494944] pt-5.5 sm:block sm:pt-6.5"
            key={step.id || index}
          >
            <span className="row-span-2 pt-1 font-mono text-xs font-normal text-[#d7937c] sm:pt-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-3 text-2xl leading-tight font-normal tracking-tight sm:mt-9 sm:mb-3.5">
              {step.title}
            </h3>
            <p className="text-sm leading-loose text-[#bdbbb4] lg:max-w-66">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

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
