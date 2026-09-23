import { ArrowDownRight } from 'lucide-react'
import type {
  CapabilitiesHeroBlock as HeroProps,
  CapabilityDetailBlock as DetailProps,
  ConnectedCapabilitiesBlock as ConnectedProps,
} from '@/payload-types'

const sectionLayout =
  'scroll-mt-[110px] px-0 py-[110px] [@media(max-width:1000px)]:py-[80px] [@media(max-width:600px)]:py-[64px]'
const classes = {
  container:
    'mx-auto w-[min(100%_-_112px,1280px)] [@media(max-width:1000px)]:w-[calc(100%_-_64px)] [@media(max-width:600px)]:w-[calc(100%_-_40px)]',
  hero: [
    'scroll-mt-[110px] bg-filas-paper px-0 pt-[clamp(70px,8vw,120px)] pb-0 text-filas-ink [@media(max-width:600px)]:pt-[64px]',
    '[&_h1]:m-0 [&_h1]:text-[clamp(48px,7vw,98px)] [&_h1]:leading-[1.07] [&_h1]:font-medium [&_h1]:tracking-[-0.06em] [&_h1]:text-balance [&_h1_span]:text-filas-accent-text [@media(max-width:600px)]:[&_h1]:text-[clamp(40px,10.5vw,62px)]',
  ].join(' '),
  eyebrow:
    'm-0 mb-[30px] text-[11px] leading-[1.7] font-normal tracking-[0.12em] text-filas-accent-text uppercase [font-family:var(--font-geist-mono),monospace] [@media(max-width:600px)]:mb-[24px]',
  heroDescription:
    'mx-0 mt-[32px] mb-[64px] max-w-[590px] text-[18px] leading-[1.8] text-filas-muted [@media(max-width:600px)]:mb-[40px] [@media(max-width:600px)]:text-[16px]',
  jumpLinks: [
    'grid grid-cols-4 border-y border-filas-line [@media(max-width:1000px)]:grid-cols-2',
    '[&_a]:grid [&_a]:grid-cols-[1fr_20px] [&_a]:gap-[15px] [&_a]:border-r [&_a]:border-filas-line [&_a]:px-[20px] [&_a]:py-[26px] [&_a]:text-[14px] [&_a]:leading-[1.5] [&_a]:text-filas-ink [&_a]:no-underline',
    '[&_a:first-child]:pl-0 [&_a:last-child]:border-r-0 [&_a:hover]:bg-filas-surface [&_a:hover]:text-filas-accent-text [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-[-3px] [&_a:focus-visible]:outline-filas-accent-text',
    '[&_a>span:first-child]:col-span-full [&_svg]:self-center [@media(max-width:1000px)]:[&_a:nth-child(2)]:border-r-0 [@media(max-width:1000px)]:[&_a:nth-child(n+3)]:border-t [@media(max-width:1000px)]:[&_a:nth-child(3)]:pl-0',
    '[@media(max-width:600px)]:[&_a]:gap-[12px] [@media(max-width:600px)]:[&_a]:px-[12px] [@media(max-width:600px)]:[&_a]:py-[20px] [@media(max-width:600px)]:[&_a]:text-[13px]',
  ].join(' '),
  number:
    'text-[12px] leading-[1.5] font-normal text-filas-accent-text [font-family:var(--font-geist-mono),monospace]',
  section: `${sectionLayout} bg-filas-paper text-filas-ink`,
  surface: `${sectionLayout} bg-filas-surface text-filas-ink`,
  detailGrid:
    'grid grid-cols-[1fr_1fr] gap-[90px] [@media(max-width:1000px)]:gap-[44px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[36px]',
  heading:
    'm-0 max-w-[760px] text-[clamp(36px,4vw,56px)] leading-[1.14] font-medium tracking-[-0.045em] text-balance whitespace-pre-line [@media(max-width:600px)]:text-[36px]',
  description: 'm-0 mt-[25px] max-w-[540px] text-[17px] leading-[1.85] text-filas-muted',
  services: [
    'm-0 list-none p-0 [&_li]:border-t [&_li]:border-filas-line [&_li]:px-0 [&_li]:py-[24px] [&_li:first-child]:border-t-0 [&_li:first-child]:pt-0 [&_li:last-child]:pb-0',
    '[&_h3]:m-0 [&_h3]:mb-[12px] [&_h3]:text-[24px] [&_h3]:leading-[1.25] [&_h3]:font-medium [&_h3]:tracking-[-0.025em]',
    '[&_p]:m-0 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-filas-muted',
  ].join(' '),
  connected: `${sectionLayout} bg-filas-ink text-filas-paper [&>div>p:first-child]:text-[#e6a48a] [&>div>p:not(:first-child)]:text-[#c8c4bd] [&_li>span]:text-[#e6a48a]`,
  connections: [
    'm-0 mt-[60px] grid list-none grid-cols-3 gap-[40px] p-0 [@media(max-width:1000px)]:gap-[26px] [@media(max-width:600px)]:mt-[40px] [@media(max-width:600px)]:grid-cols-1 [@media(max-width:600px)]:gap-[36px]',
    '[&_li]:border-t [&_li]:border-[#4b4843] [&_li]:pt-[24px]',
    '[&_h3]:mx-0 [&_h3]:mt-[26px] [&_h3]:mb-[12px] [&_h3]:text-[24px] [&_h3]:leading-[1.25] [&_h3]:font-medium [&_h3]:tracking-[-0.025em]',
    '[&_p]:m-0 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-[#c8c4bd]',
  ].join(' '),
}

export const CapabilitiesHeroBlock = ({
  eyebrow,
  heading,
  emphasis,
  description,
  navigationLabel,
  links,
}: HeroProps) => (
  <section className={classes.hero}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <h1>
        {heading}
        <br />
        <span>{emphasis}</span>
      </h1>
      <p className={classes.heroDescription}>{description}</p>
      <nav className={classes.jumpLinks} aria-label={navigationLabel}>
        {links.map((link, index) => (
          <a key={link.id || index} href={`#${link.anchorId}`}>
            <span className={classes.number} aria-hidden="true">
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
  <section className={tone === 'surface' ? classes.surface : classes.section} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <div className={classes.detailGrid}>
        <div>
          <h2 className={classes.heading}>{heading}</h2>
          <p className={classes.description}>{description}</p>
        </div>
        <ul className={classes.services}>
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
  <section className={classes.connected} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <h2 className={classes.heading}>{heading}</h2>
      <p className={classes.description}>{description}</p>
      <ul className={classes.connections}>
        {connections.map((connection, index) => (
          <li key={connection.id || index}>
            <span className={classes.number} aria-hidden="true">
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
