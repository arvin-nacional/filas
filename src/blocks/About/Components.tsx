import type {
  AboutHeroBlock as AboutHeroProps,
  CompanyStoryBlock as CompanyStoryProps,
  LeadershipBlock as LeadershipProps,
  PurposeBlock as PurposeProps,
  ValuesBlock as ValuesProps,
} from '@/payload-types'
import { Media } from '@/components/Media'

export const AboutHeroBlock = ({ eyebrow, heading, emphasis, description }: AboutHeroProps) => (
  <section className="scroll-mt-28 border-b border-filas-line bg-filas-paper py-18 text-center text-filas-ink sm:pt-24 sm:pb-20 lg:pt-36 lg:pb-32">
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <h1 className="mx-auto max-w-[1000px] text-5xl leading-none font-medium tracking-tighter text-balance sm:text-6xl lg:text-8xl">
        {heading}
        <br />
        <span className="text-filas-accent-text">{emphasis}</span>
      </h1>
      <p className="mx-auto mt-9 max-w-xl text-base leading-loose text-filas-muted sm:text-lg">
        {description}
      </p>
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
  <section
    className="scroll-mt-28 bg-filas-paper py-16 text-filas-ink sm:py-20 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-11 lg:gap-20">
        <h2 className="max-w-[630px] text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <div className="space-y-5.5 text-lg leading-loose text-filas-muted">
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph.id || index}>{paragraph.text}</p>
          ))}
        </div>
      </div>
      <p className="mt-10 border-t border-filas-line pt-7 text-2xl tracking-tight sm:mt-17 lg:text-4xl">
        {statement}
      </p>
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
  <section
    className="scroll-mt-28 bg-filas-ink py-16 text-filas-paper sm:py-20 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-[#e6a48a] uppercase sm:mb-9">
        {eyebrow}
      </p>
      <h2 className="max-w-[630px] text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
        {heading}
      </h2>
      <div className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-11 lg:gap-20">
        <article className="border-t border-[#4b4843] pt-7">
          <h3 className="mb-5 text-sm font-medium text-[#e6a48a]">{missionLabel}</h3>
          <p className="text-2xl leading-normal tracking-tight lg:text-3xl">{mission}</p>
        </article>
        <article className="border-t border-[#4b4843] pt-7">
          <h3 className="mb-5 text-sm font-medium text-[#e6a48a]">{visionLabel}</h3>
          <p className="text-2xl leading-normal tracking-tight lg:text-3xl">{vision}</p>
        </article>
      </div>
    </div>
  </section>
)

export const ValuesBlock = ({ anchorId, eyebrow, heading, values }: ValuesProps) => (
  <section
    className="scroll-mt-28 bg-filas-paper py-16 text-filas-ink sm:py-20 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-11 lg:gap-20">
        <h2 className="max-w-[630px] text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <ol className="list-none">
          {values.map((value, index) => (
            <li
              className="grid grid-cols-[38px_1fr] gap-5 border-t border-filas-line py-6.5 first:border-t-0 first:pt-0 last:pb-0"
              key={value.id || index}
            >
              <span
                className="pt-1 font-mono text-xs leading-normal text-filas-accent-text"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-3 text-2xl leading-tight font-medium tracking-tight">
                  {value.title}
                </h3>
                <p className="text-base leading-relaxed text-filas-muted">{value.description}</p>
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
  <section
    className="scroll-mt-28 bg-filas-surface py-16 text-filas-ink sm:py-20 lg:py-28"
    id={anchorId}
  >
    <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase sm:mb-9">
        {eyebrow}
      </p>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-11 lg:gap-20">
        <h2 className="max-w-[630px] text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-sm self-end text-lg leading-loose text-filas-muted">{description}</p>
      </div>
      <ul className="mt-10 grid list-none grid-cols-1 gap-9 sm:mt-15 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-13 lg:grid-cols-3">
        {people.map((person, index) => (
          <li key={person.id || index}>
            <article>
              {typeof person.photo === 'object' && person.photo?.url ? (
                <Media
                  resource={person.photo}
                  className="aspect-[4/3] overflow-hidden bg-[#e9e4dc]"
                  imgClassName="aspect-[4/3] h-full w-full object-cover"
                  size="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              ) : (
                <div
                  className="flex aspect-[4/3] items-center justify-center overflow-hidden border-b-3 border-filas-accent bg-[#e9e4dc] text-[#a49a8d]"
                  aria-hidden="true"
                >
                  <span className="text-[5.25rem] leading-none font-normal tracking-tighter sm:text-6xl lg:text-8xl">
                    {initials(person.name)}
                  </span>
                </div>
              )}
              <div className="pt-6">
                <h3 className="text-2xl leading-tight font-medium tracking-tight wrap-anywhere lg:text-3xl">
                  {person.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-filas-accent-text">{person.role}</p>
                {person.biography && (
                  <p className="mt-4.5 text-base leading-relaxed whitespace-pre-line text-filas-muted">
                    {person.biography}
                  </p>
                )}
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
