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

import styles from './styles.module.css'

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
  <section className={styles.hero} aria-label="Your next chapter with FILAS">
    <div className={styles.container}>
      <p className={styles.eyebrow}>
        <span className={styles.dot} />
        {eyebrow}
      </p>
      <h1 className={styles.heroHeading}>
        {heading}
        <br />
        <span>{emphasis}</span>
        <span className={styles.period}>.</span>
      </h1>
      <p className={styles.heroDescription}>{description}</p>
      <div className={styles.actions}>
        <Link className={styles.button} href={siteURL(primaryLink.url, homePath)}>
          {primaryLink.label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <Link className={styles.textLink} href={siteURL(secondaryLink.url, homePath)}>
          {secondaryLink.label}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.heroBottom}>
        <p>{footnote}</p>
        <a
          href={siteURL('/#about', homePath)}
          aria-label="Get to know FILAS"
          className={styles.scrollLink}
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
  <section className={styles.intro} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.introGrid}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.introCopy}>
          <p>{description}</p>
          <p>{supportingText}</p>
        </div>
      </div>
      <div className={styles.brandStatement}>
        <Image
          src="/filas-logo.jpg"
          alt="FILAS"
          width={120}
          height={120}
          quality={100}
          sizes="120px"
          className={styles.statementLogo}
        />
        <p>{statement}</p>
        <span className={styles.statementLine} aria-hidden="true" />
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
  <section className={styles.approach} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step.id || index}>
            <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
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
  <section className={styles.services} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.serviceList}>
        {services.map((service, index) => (
          <details className={styles.service} key={service.id || index}>
            <summary>
              <span className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <span className={styles.serviceSummary}>{service.summary}</span>
              <span className={styles.serviceToggle}>
                <Plus size={20} strokeWidth={1.4} aria-hidden="true" />
              </span>
            </summary>
            <div className={styles.serviceDetail}>
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
  <section className={styles.audience} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.stages}>
        {stages.map((stage, index) => (
          <article
            className={stage.featured ? styles.featuredStage : styles.stage}
            key={stage.id || index}
          >
            <p className={styles.stageLabel}>{stage.label}</p>
            <h3>
              {stage.title}
              <span aria-hidden="true">.</span>
            </h3>
            <p className={styles.stageDescription}>{stage.description}</p>
            <ArrowUpRight
              className={styles.stageArrow}
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
    <section className={styles.clients} id={anchorId}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>
        <ul className={styles.logos}>
          {approvedClients.map((client, index) => (
            <li key={client.id || index}>
              <Media
                resource={client.logo}
                alt={client.name}
                imgClassName={styles.clientLogo}
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
  <section className={styles.contact} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>
        <span className={styles.dot} />
        {eyebrow}
      </p>
      <h2>{heading}</h2>
      <p className={styles.contactDescription}>{description}</p>
      <Link className={styles.button} href={siteURL(link.url, homePath)}>
        {link.label}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <p className={styles.contactNote}>{note}</p>
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
