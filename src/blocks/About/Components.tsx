import type {
  AboutHeroBlock as AboutHeroProps,
  CompanyStoryBlock as CompanyStoryProps,
  LeadershipBlock as LeadershipProps,
  PurposeBlock as PurposeProps,
  ValuesBlock as ValuesProps,
} from '@/payload-types'
import { Media } from '@/components/Media'

import styles from './styles.module.css'

export const AboutHeroBlock = ({ eyebrow, heading, emphasis, description }: AboutHeroProps) => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>
        {heading}
        <br />
        <span>{emphasis}</span>
      </h1>
      <p className={styles.heroDescription}>{description}</p>
    </div>
  </section>
)

export const CompanyStoryBlock = ({
  anchorId,
  eyebrow,
  heading,
  paragraphs,
  statement,
}: CompanyStoryProps) => (
  <section className={styles.section} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.split}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.copy}>
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph.id || index}>{paragraph.text}</p>
          ))}
        </div>
      </div>
      <p className={styles.statement}>{statement}</p>
    </div>
  </section>
)

export const PurposeBlock = ({
  anchorId,
  eyebrow,
  heading,
  missionLabel,
  mission,
  visionLabel,
  vision,
}: PurposeProps) => (
  <section className={`${styles.section} ${styles.purpose}`} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.purposeGrid}>
        <article>
          <h3>{missionLabel}</h3>
          <p>{mission}</p>
        </article>
        <article>
          <h3>{visionLabel}</h3>
          <p>{vision}</p>
        </article>
      </div>
    </div>
  </section>
)

export const ValuesBlock = ({ anchorId, eyebrow, heading, values }: ValuesProps) => (
  <section className={styles.section} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.split}>
        <h2 className={styles.heading}>{heading}</h2>
        <ol className={styles.values}>
          {values.map((value, index) => (
            <li key={value.id || index}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
)

const initials = (name: string) => {
  const parts = name.trim().split(/\s+/)
  return `${parts[0]?.[0] || ''}${parts.length > 1 ? parts[parts.length - 1][0] : ''}`.toUpperCase()
}

export const LeadershipBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  people,
}: LeadershipProps) => (
  <section className={`${styles.section} ${styles.leadership}`} id={anchorId}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.split}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <ul className={styles.people}>
        {people.map((person, index) => (
          <li key={person.id || index}>
            <article>
              {typeof person.photo === 'object' && person.photo?.url ? (
                <Media
                  resource={person.photo}
                  className={styles.portrait}
                  imgClassName={styles.portraitImage}
                  size="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              ) : (
                <div className={styles.monogram} aria-hidden="true">
                  <span>{initials(person.name)}</span>
                </div>
              )}
              <div className={styles.personDetails}>
                <h3>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                {person.biography && <p className={styles.biography}>{person.biography}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export const aboutComponents = {
  aboutHero: AboutHeroBlock,
  companyStory: CompanyStoryBlock,
  purpose: PurposeBlock,
  values: ValuesBlock,
  leadership: LeadershipBlock,
}
