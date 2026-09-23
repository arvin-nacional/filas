import { ArrowDownRight } from 'lucide-react'
import type {
  CapabilitiesHeroBlock as HeroProps,
  CapabilityDetailBlock as DetailProps,
  ConnectedCapabilitiesBlock as ConnectedProps,
} from '@/payload-types'

import styles from './styles.module.css'

export const CapabilitiesHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  navigationLabel,
  links,
}: HeroProps) => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>
        {heading}
        <br />
        <span>{emphasis}</span>
      </h1>
      <p className={styles.heroDescription}>{description}</p>
      <nav className={styles.jumpLinks} aria-label={navigationLabel}>
        {links.map((link, index) => (
          <a key={link.id || index} href={`#${link.anchorId}`}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{link.label}</span>
            <ArrowDownRight size={19} aria-hidden="true" />
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
    className={`${styles.section} ${tone === 'surface' ? styles.surface : ''}`}
    id={anchorId}
  >
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.detailGrid}>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <ul className={styles.services}>
          {services.map((service, index) => (
            <li key={service.id || index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
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
  <section className={`${styles.section} ${styles.connected}`} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.description}>{description}</p>
      <ul className={styles.connections}>
        {connections.map((connection, index) => (
          <li key={connection.id || index}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{connection.title}</h3>
            <p>{connection.description}</p>
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
