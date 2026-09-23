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

const sectionLayout = 'scroll-mt-[105px] px-0 py-[108px] [@media(max-width:600px)]:py-[70px]'
const classes = {
  container:
    'mx-auto w-[min(100%_-_112px,1280px)] [@media(max-width:1000px)]:w-[calc(100%_-_64px)] [@media(max-width:600px)]:w-[calc(100%_-_40px)]',
  eyebrow:
    'm-0 mb-[35px] flex items-center gap-[10px] text-[11px] leading-[1.7] tracking-[0.12em] text-filas-accent-text uppercase [font-family:var(--font-geist-mono),monospace] [@media(max-width:600px)]:mb-[26px] [@media(max-width:600px)]:text-[10px]',
  dot: 'h-[6px] w-[6px] shrink-0 rounded-full bg-current',
  period: 'text-filas-accent',
  hero: [
    'scroll-mt-[105px] bg-filas-paper pt-[clamp(70px,9vw,142px)] text-center text-filas-ink min-[1600px]:pt-[140px] [@media(max-width:600px)]:pt-[64px]',
    '[&>div>p:first-child]:justify-center [&>div>p:first-child]:mb-[26px] [@media(max-width:600px)]:[&>div>p:first-child]:text-[9px] [@media(max-width:600px)]:[&>div>p:first-child]:tracking-[0.09em]',
  ].join(' '),
  heroHeading:
    'mx-auto my-0 max-w-[1100px] text-[clamp(52px,7.3vw,108px)] leading-[1.04] font-medium tracking-[-0.065em] text-balance [@media(max-width:600px)]:text-[clamp(43px,10.5vw,62px)] [@media(max-width:600px)]:leading-[1.08] [@media(max-width:600px)]:tracking-[-0.06em] [@media(max-width:600px)]:[&_br]:hidden [@media(max-width:600px)]:[&>span:first-of-type]:before:content-["_"]',
  heroDescription:
    'mx-auto mt-[30px] mb-0 max-w-[570px] text-[17px] leading-[1.8] text-pretty text-filas-muted [@media(max-width:600px)]:mt-[25px] [@media(max-width:600px)]:text-[15px]',
  actions:
    'mt-[32px] flex flex-wrap items-center justify-center gap-x-[30px] gap-y-[20px] [@media(max-width:600px)]:mt-[26px] [@media(max-width:600px)]:flex-col [@media(max-width:600px)]:gap-[12px]',
  button:
    'inline-flex min-h-[50px] items-center justify-center gap-[22px] rounded-[2px] border border-transparent bg-filas-ink px-[23px] py-[15px] text-[13px] font-medium text-filas-paper no-underline transition-[background,color] duration-180 hover:bg-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-filas-accent motion-reduce:transition-none [@media(max-width:600px)]:gap-[24px] [@media(max-width:600px)]:px-[20px]',
  textLink:
    'inline-flex min-h-[50px] items-center justify-center gap-[13px] border-b border-filas-line text-[13px] font-medium text-filas-ink no-underline transition-[background,color] duration-180 hover:border-current hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-filas-accent motion-reduce:transition-none [@media(max-width:600px)]:gap-[24px] [@media(max-width:600px)]:px-[20px]',
  heroBottom:
    'mt-[88px] grid grid-cols-[1fr_auto_1fr] items-center gap-[30px] border-b border-filas-line py-[25px] text-[10px] leading-[1.8] text-filas-muted [font-family:var(--font-geist-mono),monospace] [&_p]:m-0 [&_p]:text-left [&>span]:text-right [@media(max-width:600px)]:mt-[48px] [@media(max-width:600px)]:grid-cols-[1fr_auto] [@media(max-width:600px)]:gap-[20px] [@media(max-width:600px)]:py-[22px] [@media(max-width:600px)]:[&_p]:max-w-[230px] [@media(max-width:600px)]:[&_p]:text-[9px] [@media(max-width:600px)]:[&>span]:hidden',
  scrollLink:
    'grid h-[42px] w-[42px] place-items-center rounded-full border border-filas-line text-filas-ink transition-[border-color] duration-180 hover:border-filas-accent focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-filas-accent motion-reduce:transition-none',
  intro: `${sectionLayout} bg-filas-paper text-filas-ink`,
  heading:
    'm-0 text-[clamp(35px,4.1vw,59px)] leading-[1.12] font-medium tracking-[-0.045em] text-pretty whitespace-pre-line [@media(max-width:600px)]:text-[37px]',
  introGrid:
    'grid grid-cols-[1.05fr_0.8fr] items-start gap-[clamp(40px,10vw,150px)] [&_h2]:max-w-[610px] [@media(max-width:1000px)]:gap-[48px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[25px]',
  introCopy:
    'text-[17px] leading-[1.9] text-filas-muted [&_p]:m-0 [&_p]:text-pretty [&_p+p]:mt-[20px] [@media(max-width:600px)]:[&_p]:text-[15px] [@media(max-width:600px)]:[&_p]:leading-[1.85]',
  brandStatement:
    'mt-[50px] flex items-center gap-[28px] bg-filas-surface pt-[16px] pr-[30px] pb-[16px] pl-[13px] [&_p]:m-0 [&_p]:text-[22px] [&_p]:leading-[1.5] [&_p]:tracking-[-0.025em] [&>svg]:shrink-0 [&>svg]:text-filas-accent [@media(max-width:600px)]:mt-[34px] [@media(max-width:600px)]:gap-[16px] [@media(max-width:600px)]:p-[18px_16px] [@media(max-width:600px)]:[&_p]:text-[17px] [@media(max-width:600px)]:[&>svg]:hidden',
  statementLogo:
    'h-[90px] w-[90px] shrink-0 object-contain mix-blend-multiply [@media(max-width:600px)]:h-[60px] [@media(max-width:600px)]:w-[60px]',
  statementLine: 'ml-[24px] h-px flex-1 bg-filas-line [@media(max-width:600px)]:hidden',
  approach:
    'scroll-mt-[105px] bg-filas-ink px-0 py-[100px] text-filas-paper [&>div>p:first-child]:text-[#d7937c] [@media(max-width:600px)]:py-[70px]',
  sectionHeader:
    'mb-[55px] grid grid-cols-[1.2fr_0.7fr] items-end gap-[80px] [@media(max-width:1000px)]:gap-[40px] [@media(max-width:600px)]:mb-[34px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[25px]',
  description:
    'm-0 max-w-[390px] text-[16px] leading-[1.9] text-pretty text-filas-muted [@media(max-width:600px)]:text-[15px] [@media(max-width:600px)]:leading-[1.85]',
  approachDescription:
    'm-0 max-w-[390px] text-[16px] leading-[1.9] text-pretty text-[#bdbbb4] [@media(max-width:600px)]:text-[15px] [@media(max-width:600px)]:leading-[1.85]',
  steps: [
    'm-0 mt-[65px] grid list-none grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[32px] p-0 [@media(max-width:1000px)]:grid-cols-2 [@media(max-width:1000px)]:gap-[40px] [@media(max-width:600px)]:mt-[38px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[30px]',
    '[&_li]:border-t [&_li]:border-[#494944] [&_li]:pt-[26px] [@media(max-width:600px)]:[&_li]:grid [@media(max-width:600px)]:[&_li]:grid-cols-[35px_1fr] [@media(max-width:600px)]:[&_li]:gap-x-[15px] [@media(max-width:600px)]:[&_li]:pt-[22px]',
    '[&_h3]:mx-0 [&_h3]:mt-[34px] [&_h3]:mb-[14px] [&_h3]:text-[24px] [&_h3]:leading-[1.3] [&_h3]:font-normal [&_h3]:tracking-[-0.03em] [@media(max-width:600px)]:[&_h3]:mt-0 [@media(max-width:600px)]:[&_h3]:mb-[12px] [@media(max-width:600px)]:[&_h3]:text-[23px]',
    '[&_p]:m-0 [&_p]:max-w-[265px] [&_p]:text-[14px] [&_p]:leading-[1.85] [&_p]:text-[#bdbbb4] [@media(max-width:1000px)]:[&_p]:max-w-full [@media(max-width:600px)]:[&_p]:text-[14px]',
  ].join(' '),
  stepNumber:
    'text-[12px] font-normal text-[#d7937c] [font-family:var(--font-geist-mono),monospace] [@media(max-width:600px)]:row-span-2 [@media(max-width:600px)]:pt-[5px]',
  services: `${sectionLayout} bg-filas-paper text-filas-ink`,
  serviceList: 'border-t border-filas-line',
  service:
    'border-b border-filas-line [&[open]_span:last-child]:bg-filas-accent-text [&[open]_span:last-child]:border-filas-accent-text [&[open]_span:last-child]:text-filas-paper [&[open]_span:last-child_svg]:rotate-45',
  serviceSummaryRow:
    'grid cursor-pointer list-none grid-cols-[48px_1.15fr_0.85fr_44px] items-center gap-[24px] py-[32px] [&::-webkit-details-marker]:hidden [&::marker]:content-none hover:[&_span:last-child]:bg-filas-accent-text hover:[&_span:last-child]:border-filas-accent-text hover:[&_span:last-child]:text-filas-paper focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-filas-accent [@media(max-width:1000px)]:grid-cols-[30px_1fr_40px] [@media(max-width:1000px)]:gap-[20px] [@media(max-width:600px)]:grid-cols-[22px_1fr_34px] [@media(max-width:600px)]:gap-[12px] [@media(max-width:600px)]:py-[26px]',
  serviceNumber:
    'text-[11px] font-normal text-filas-accent-text [font-family:var(--font-geist-mono),monospace]',
  serviceTitle:
    'm-0 text-[clamp(24px,2.4vw,34px)] leading-[1.2] font-normal tracking-[-0.035em] [@media(max-width:600px)]:text-[24px]',
  serviceSummary: 'text-[14px] leading-[1.5] text-filas-muted [@media(max-width:1000px)]:hidden',
  serviceToggle:
    'grid h-[40px] w-[40px] place-items-center rounded-full border border-filas-line transition-[color,background-color] duration-180 motion-reduce:transition-none [&_svg]:transition-transform [&_svg]:duration-180 motion-reduce:[&_svg]:transition-none [@media(max-width:600px)]:h-[32px] [@media(max-width:600px)]:w-[32px]',
  serviceDetail:
    'grid grid-cols-[1fr_1fr] gap-[42px] pt-0 pr-[68px] pb-[32px] pl-[72px] [&_p]:m-0 [&_p]:max-w-[480px] [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-filas-muted [&_ul]:m-0 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-wrap [&_ul]:content-start [&_ul]:gap-[9px] [&_ul]:p-0 [&_li]:border [&_li]:border-filas-line [&_li]:px-[10px] [&_li]:py-[7px] [&_li]:text-[11px] [&_li]:leading-[1.5] [@media(max-width:1000px)]:pr-0 [@media(max-width:1000px)]:pl-[50px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[22px] [@media(max-width:600px)]:pb-[26px] [@media(max-width:600px)]:pl-[34px] [@media(max-width:600px)]:[&_p]:text-[14px]',
  audience: `${sectionLayout} bg-filas-surface text-filas-ink`,
  stages:
    'grid grid-cols-[repeat(auto-fit,minmax(245px,1fr))] gap-[20px] [@media(max-width:1000px)]:grid-cols-1 [@media(max-width:1000px)]:gap-[16px]',
  stage:
    'flex min-h-[340px] flex-col border border-[#d7d3c9] p-[33px_29px] [&_h3]:m-0 [&_h3]:mb-[19px] [&_h3]:text-[clamp(27px,2.6vw,37px)] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.04em] [&_h3_span]:text-filas-accent [@media(max-width:1000px)]:min-h-0 [@media(max-width:600px)]:p-[28px_24px]',
  featuredStage:
    'flex min-h-[340px] flex-col border border-[#d7d3c9] border-t-[3px] border-t-filas-accent bg-filas-paper p-[31px_29px_33px] [&_h3]:m-0 [&_h3]:mb-[19px] [&_h3]:text-[clamp(27px,2.6vw,37px)] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.04em] [&_h3_span]:text-filas-accent [@media(max-width:1000px)]:min-h-0 [@media(max-width:600px)]:p-[26px_24px_28px]',
  stageLabel:
    'm-0 mb-[35px] text-[10px] leading-[1.8] tracking-[0.04em] text-filas-muted uppercase [font-family:var(--font-geist-mono),monospace] [@media(max-width:1000px)]:mb-[20px]',
  stageDescription:
    'm-0 mb-[30px] text-[14px] leading-[1.9] text-filas-muted [@media(max-width:1000px)]:max-w-[650px]',
  stageArrow: 'mt-auto text-filas-accent-text',
  clients: `${sectionLayout} border-b border-filas-line bg-filas-paper text-center text-filas-ink [&>div>p]:justify-center`,
  logos:
    'm-0 mt-[50px] flex list-none flex-wrap justify-center gap-x-[55px] gap-y-[32px] p-0 [&_li]:grid [&_li]:w-[150px] [&_li]:place-items-center',
  clientLogo: 'max-h-[90px] w-[150px] object-contain',
  contact:
    'scroll-mt-[105px] bg-filas-paper px-0 pt-[120px] pb-[100px] text-center text-filas-ink [&>div>p:first-child]:justify-center [&_h2]:m-0 [&_h2]:text-[clamp(36px,5vw,72px)] [&_h2]:leading-[1.12] [&_h2]:font-medium [&_h2]:tracking-[-0.05em] [&_h2]:text-balance [&_h2]:whitespace-pre-line [@media(max-width:600px)]:py-[78px] [@media(max-width:600px)]:[&_h2]:text-[38px]',
  contactDescription:
    'mx-auto mt-[25px] mb-[30px] max-w-[465px] text-[16px] leading-[1.8] text-pretty text-filas-muted [@media(max-width:600px)]:text-[15px]',
  contactButton:
    'inline-flex min-h-[50px] items-center justify-center gap-[22px] rounded-[2px] border border-transparent bg-filas-accent-text px-[23px] py-[15px] text-[13px] font-medium text-filas-paper no-underline transition-[background,color] duration-180 hover:bg-filas-ink focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-filas-accent motion-reduce:transition-none [@media(max-width:600px)]:gap-[24px] [@media(max-width:600px)]:px-[20px]',
  contactNote:
    'm-0 mt-[27px] text-[10px] leading-[1.8] text-filas-muted [font-family:var(--font-geist-mono),monospace]',
}

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
  <section className={classes.hero} aria-label="Your next chapter with FILAS">
    <div className={classes.container}>
      <p className={classes.eyebrow}>
        <span className={classes.dot} />
        {eyebrow}
      </p>
      <h1 className={classes.heroHeading}>
        {heading}
        <br />
        <span>{emphasis}</span>
        <span className={classes.period}>.</span>
      </h1>
      <p className={classes.heroDescription}>{description}</p>
      <div className={classes.actions}>
        <Link className={classes.button} href={siteURL(primaryLink.url, homePath)}>
          {primaryLink.label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <Link className={classes.textLink} href={siteURL(secondaryLink.url, homePath)}>
          {secondaryLink.label}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <div className={classes.heroBottom}>
        <p>{footnote}</p>
        <a
          href={siteURL('/#about', homePath)}
          aria-label="Get to know FILAS"
          className={classes.scrollLink}
        >
          <ArrowDown size={19} aria-hidden="true" />
        </a>
        <span>Strategy. Execution. Accountability.</span>
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
  <section className={classes.intro} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.introGrid}>
        <h2 className={classes.heading}>{heading}</h2>
        <div className={classes.introCopy}>
          <p>{description}</p>
          <p>{supportingText}</p>
        </div>
      </div>
      <div className={classes.brandStatement}>
        <Image
          src="/filas-logo.jpg"
          alt="FILAS"
          width={120}
          height={120}
          quality={100}
          sizes="120px"
          className={classes.statementLogo}
        />
        <p>{statement}</p>
        <span className={classes.statementLine} aria-hidden="true" />
        <ArrowUpRight size={28} strokeWidth={1.2} aria-hidden="true" />
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
  <section className={classes.approach} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.sectionHeader}>
        <h2 className={classes.heading}>{heading}</h2>
        <p className={classes.approachDescription}>{description}</p>
      </div>
      <ol className={classes.steps}>
        {steps.map((step, index) => (
          <li key={step.id || index}>
            <span className={classes.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
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
  <section className={classes.services} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.sectionHeader}>
        <h2 className={classes.heading}>{heading}</h2>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.serviceList}>
        {services.map((service, index) => (
          <details className={classes.service} key={service.id || index}>
            <summary className={classes.serviceSummaryRow}>
              <span className={classes.serviceNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={classes.serviceTitle}>{service.title}</h3>
              <span className={classes.serviceSummary}>{service.summary}</span>
              <span className={classes.serviceToggle}>
                <Plus size={20} strokeWidth={1.4} aria-hidden="true" />
              </span>
            </summary>
            <div className={classes.serviceDetail}>
              <p>{service.description}</p>
              <ul>
                {service.capabilities.map((capability, capabilityIndex) => (
                  <li key={capability.id || capabilityIndex}>{capability.label}</li>
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
  <section className={classes.audience} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.sectionHeader}>
        <h2 className={classes.heading}>{heading}</h2>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.stages}>
        {stages.map((stage, index) => (
          <article
            className={stage.featured ? classes.featuredStage : classes.stage}
            key={stage.id || index}
          >
            <p className={classes.stageLabel}>{stage.label}</p>
            <h3>
              {stage.title}
              <span aria-hidden="true">.</span>
            </h3>
            <p className={classes.stageDescription}>{stage.description}</p>
            <ArrowUpRight
              className={classes.stageArrow}
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
    <section className={classes.clients} id={anchorId}>
      <div className={classes.container}>
        <p className={classes.eyebrow}>{eyebrow}</p>
        <h2 className={classes.heading}>{heading}</h2>
        <ul className={classes.logos}>
          {approvedClients.map((client, index) => (
            <li key={client.id || index}>
              <Media
                resource={client.logo}
                alt={client.name}
                imgClassName={classes.clientLogo}
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
  <section className={classes.contact} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>
        <span className={classes.dot} />
        {eyebrow}
      </p>
      <h2>{heading}</h2>
      <p className={classes.contactDescription}>{description}</p>
      <Link className={classes.contactButton} href={siteURL(link.url, homePath)}>
        {link.label}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <p className={classes.contactNote}>{note}</p>
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
