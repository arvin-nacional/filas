import type {
  AboutHeroBlock as AboutHeroProps,
  CompanyStoryBlock as CompanyStoryProps,
  LeadershipBlock as LeadershipProps,
  PurposeBlock as PurposeProps,
  ValuesBlock as ValuesProps,
} from '@/payload-types'
import { Media } from '@/components/Media'

const sectionLayout =
  'scroll-mt-[110px] px-0 py-[110px] [@media(max-width:1000px)]:py-[80px] [@media(max-width:600px)]:py-[64px]'
const classes = {
  container:
    'mx-auto w-[min(100%_-_112px,1280px)] [@media(max-width:1000px)]:w-[calc(100%_-_64px)] [@media(max-width:600px)]:w-[calc(100%_-_40px)]',
  hero: [
    'scroll-mt-[110px] border-b border-filas-line bg-filas-paper px-0 pt-[clamp(80px,10vw,150px)] pb-[clamp(80px,9vw,130px)] text-center text-filas-ink [@media(max-width:600px)]:py-[72px]',
    '[&_h1]:mx-auto [&_h1]:my-0 [&_h1]:max-w-[1000px] [&_h1]:text-[clamp(54px,8vw,112px)] [&_h1]:leading-[1.04] [&_h1]:font-medium [&_h1]:tracking-[-0.06em] [&_h1]:text-balance [&_h1_span]:text-filas-accent-text [@media(max-width:600px)]:[&_h1]:text-[clamp(42px,11vw,64px)]',
  ].join(' '),
  eyebrow:
    'm-0 mb-[34px] text-[11px] leading-[1.7] tracking-[0.12em] text-filas-accent-text uppercase [font-family:var(--font-geist-mono),monospace] [@media(max-width:600px)]:mb-[26px]',
  heroDescription:
    'mx-auto mt-[34px] mb-0 max-w-[570px] text-[18px] leading-[1.8] text-filas-muted [@media(max-width:600px)]:text-[16px]',
  section: `${sectionLayout} bg-filas-paper text-filas-ink`,
  split:
    'grid grid-cols-[1fr_1fr] gap-[80px] [@media(max-width:1000px)]:gap-[44px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[30px]',
  heading:
    'm-0 max-w-[630px] text-[clamp(36px,4vw,58px)] leading-[1.12] font-medium tracking-[-0.045em] text-balance whitespace-pre-line [@media(max-width:600px)]:text-[36px]',
  copy: 'text-[17px] leading-[1.85] text-filas-muted [&_p]:m-0 [&_p]:mb-[22px] [&_p:last-child]:mb-0',
  description: 'm-0 max-w-[410px] self-end text-[17px] leading-[1.85] text-filas-muted',
  statement:
    'm-0 mt-[68px] border-t border-filas-line pt-[28px] text-[clamp(22px,2.5vw,34px)] tracking-[-0.025em] [@media(max-width:600px)]:mt-[40px]',
  purpose: `${sectionLayout} bg-filas-ink text-filas-paper [&>div>p:first-child]:text-[#e6a48a]`,
  purposeGrid: [
    'mt-[62px] grid grid-cols-[1fr_1fr] gap-[80px] [@media(max-width:1000px)]:gap-[44px] [@media(max-width:600px)]:mt-[38px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[30px]',
    '[&_article]:border-t [&_article]:border-[#4b4843] [&_article]:pt-[28px]',
    '[&_h3]:m-0 [&_h3]:mb-[20px] [&_h3]:text-[14px] [&_h3]:font-medium [&_h3]:text-[#e6a48a]',
    '[&_p]:m-0 [&_p]:text-[clamp(22px,2.3vw,30px)] [&_p]:leading-[1.5] [&_p]:tracking-[-0.02em]',
  ].join(' '),
  values: [
    'm-0 list-none p-0 [&_li]:grid [&_li]:grid-cols-[38px_1fr] [&_li]:gap-[20px] [&_li]:border-t [&_li]:border-filas-line [&_li]:px-0 [&_li]:py-[26px] [&_li:first-child]:border-t-0 [&_li:first-child]:pt-0 [&_li:last-child]:pb-0',
    '[&_h3]:m-0 [&_h3]:mb-[12px] [&_h3]:text-[25px] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.025em]',
    '[&_p]:m-0 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-filas-muted',
  ].join(' '),
  number:
    'pt-[5px] text-[12px] leading-[normal] font-normal text-filas-accent-text [font-family:var(--font-geist-mono),monospace]',
  leadership: `${sectionLayout} bg-filas-surface text-filas-ink`,
  people:
    'm-0 mt-[60px] grid list-none grid-cols-3 gap-x-[30px] gap-y-[52px] p-0 [@media(max-width:1000px)]:grid-cols-2 [@media(max-width:600px)]:mt-[38px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[36px]',
  portrait: 'aspect-[4/3] overflow-hidden bg-[#e9e4dc]',
  portraitImage: 'aspect-[4/3] h-full w-full object-cover',
  monogram:
    'flex aspect-[4/3] items-center justify-center overflow-hidden border-b-[3px] border-filas-accent bg-[#e9e4dc] text-[#a49a8d] [&_span]:text-[clamp(64px,6.5vw,100px)] [&_span]:leading-none [&_span]:font-normal [&_span]:tracking-[-0.07em] [@media(max-width:600px)]:[&_span]:text-[84px]',
  personDetails:
    'pt-[23px] [&_h3]:m-0 [&_h3]:text-[clamp(23px,2.3vw,30px)] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.035em] [&_h3]:[overflow-wrap:anywhere]',
  role: 'm-0 mt-[12px] text-[13px] leading-[1.7] text-filas-accent-text',
  biography: 'm-0 mt-[18px] text-[15px] leading-[1.8] whitespace-pre-line text-filas-muted',
}

export const AboutHeroBlock = ({ eyebrow, heading, emphasis, description }: AboutHeroProps) => (
  <section className={classes.hero}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <h1>
        {heading}
        <br />
        <span>{emphasis}</span>
      </h1>
      <p className={classes.heroDescription}>{description}</p>
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
  <section className={classes.section} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.split}>
        <h2 className={classes.heading}>{heading}</h2>
        <div className={classes.copy}>
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph.id || index}>{paragraph.text}</p>
          ))}
        </div>
      </div>
      <p className={classes.statement}>{statement}</p>
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
  <section className={classes.purpose} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <h2 className={classes.heading}>{heading}</h2>
      <div className={classes.purposeGrid}>
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
  <section className={classes.section} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.split}>
        <h2 className={classes.heading}>{heading}</h2>
        <ol className={classes.values}>
          {values.map((value, index) => (
            <li key={value.id || index}>
              <span className={classes.number} aria-hidden="true">
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
  <section className={classes.leadership} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.split}>
        <h2 className={classes.heading}>{heading}</h2>
        <p className={classes.description}>{description}</p>
      </div>
      <ul className={classes.people}>
        {people.map((person, index) => (
          <li key={person.id || index}>
            <article>
              {typeof person.photo === 'object' && person.photo?.url ? (
                <Media
                  resource={person.photo}
                  className={classes.portrait}
                  imgClassName={classes.portraitImage}
                  size="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              ) : (
                <div className={classes.monogram} aria-hidden="true">
                  <span>{initials(person.name)}</span>
                </div>
              )}
              <div className={classes.personDetails}>
                <h3>{person.name}</h3>
                <p className={classes.role}>{person.role}</p>
                {person.biography && <p className={classes.biography}>{person.biography}</p>}
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
