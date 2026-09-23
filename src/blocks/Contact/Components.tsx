import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type {
  ContactHeroBlock as HeroProps,
  ContactInquiryBlock as InquiryProps,
  ContactNextStepsBlock as NextStepsProps,
} from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'

const classes = {
  container:
    'mx-auto w-[min(100%_-_112px,1280px)] [@media(max-width:1000px)]:w-[calc(100%_-_64px)] [@media(max-width:450px)]:w-[calc(100%_-_40px)]',
  hero: [
    'scroll-mt-[110px] border-b border-filas-line bg-filas-paper px-0 pt-[clamp(72px,8vw,120px)] pb-[85px] text-center text-filas-ink [@media(max-width:450px)]:py-[64px]',
    '[&_h1]:m-0 [&_h1]:text-[clamp(46px,7vw,96px)] [&_h1]:leading-[1.08] [&_h1]:font-medium [&_h1]:tracking-[-0.06em] [&_h1]:text-balance [&_h1_span]:text-filas-accent-text [@media(max-width:450px)]:[&_h1]:text-[42px]',
  ].join(' '),
  eyebrow:
    'm-0 mb-[28px] text-[11px] leading-[1.7] font-normal tracking-[0.12em] text-filas-accent-text uppercase [font-family:var(--font-geist-mono),monospace]',
  heroDescription:
    'mx-auto mt-[28px] mb-0 max-w-[570px] text-[18px] leading-[1.8] text-filas-muted [@media(max-width:450px)]:text-[16px]',
  inquiry:
    'scroll-mt-[110px] bg-filas-paper px-0 pt-[95px] pb-[110px] text-filas-ink [@media(max-width:700px)]:py-[64px]',
  inquiryGrid:
    'grid grid-cols-[0.8fr_1.2fr] items-start gap-[90px] [@media(max-width:1000px)]:grid-cols-[1fr_1.3fr] [@media(max-width:1000px)]:gap-[40px] [@media(max-width:700px)]:grid-cols-1 [@media(max-width:700px)]:gap-[36px]',
  introduction: '[@media(max-width:700px)]:max-w-[530px]',
  heading:
    'm-0 text-[clamp(36px,4vw,54px)] leading-[1.15] font-medium tracking-[-0.045em] text-balance whitespace-pre-line [@media(max-width:450px)]:text-[36px]',
  description: 'm-0 mt-[24px] text-[17px] leading-[1.85] text-filas-muted',
  details: [
    'mt-[45px] border-t border-filas-line pt-[28px]',
    '[&_h3]:m-0 [&_h3]:mb-[20px] [&_h3]:text-[16px] [&_h3]:font-medium',
    '[&_a]:mb-[12px] [&_a]:block [&_a]:w-fit [&_a]:text-filas-accent-text [&_a]:underline-offset-4 [&_a]:[overflow-wrap:anywhere] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-filas-accent-text',
    '[&_address]:mt-[20px] [&_address]:text-[15px] [&_address]:leading-[1.8] [&_address]:whitespace-pre-line [&_address]:not-italic',
  ].join(' '),
  formPanel: [
    'border border-filas-line bg-filas-surface p-[38px] [@media(max-width:1000px)]:p-[28px] [@media(max-width:450px)]:px-[20px] [@media(max-width:450px)]:py-[24px]',
    '[&_input:not([type=checkbox])]:mt-[8px] [&_input:not([type=checkbox])]:min-h-[48px] [&_input:not([type=checkbox])]:rounded-[2px] [&_input:not([type=checkbox])]:border-filas-line [&_input:not([type=checkbox])]:bg-filas-paper [&_input:not([type=checkbox])]:text-[16px] [&_input:not([type=checkbox])]:shadow-none',
    '[&_textarea]:mt-[8px] [&_textarea]:min-h-[140px] [&_textarea]:rounded-[2px] [&_textarea]:border-filas-line [&_textarea]:bg-filas-paper [&_textarea]:text-[16px] [&_textarea]:shadow-none',
    '[&_button[role=combobox]]:mt-[8px] [&_button[role=combobox]]:min-h-[48px] [&_button[role=combobox]]:rounded-[2px] [&_button[role=combobox]]:border-filas-line [&_button[role=combobox]]:bg-filas-paper [&_button[role=combobox]]:text-[16px] [&_button[role=combobox]]:shadow-none',
    '[&_label]:text-[13px] [&_label]:leading-[1.6] [&_button[type=submit]]:min-h-[50px] [&_button[type=submit]]:rounded-[2px] [&_button[type=submit]]:bg-filas-ink [&_button[type=submit]]:px-[24px] [&_button[type=submit]]:py-[14px] [&_button[type=submit]]:text-filas-paper [&_button[type=submit]:hover]:bg-filas-accent-text',
  ].join(' '),
  formHeading: 'm-0 text-[27px] leading-[1.25] font-medium tracking-[-0.03em]',
  formNote: 'mx-0 mt-[12px] mb-[32px] text-[13px] leading-[1.7] text-filas-muted',
  privacy:
    'm-0 mt-[25px] text-[12px] leading-[1.8] text-filas-muted [&_a]:text-filas-accent-text [&_a]:underline [&_a]:underline-offset-[3px] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-filas-accent-text',
  nextSteps:
    'scroll-mt-[110px] bg-filas-surface px-0 py-[90px] text-filas-ink [@media(max-width:700px)]:py-[64px]',
  steps: [
    'm-0 mt-[55px] grid list-none grid-cols-3 gap-[50px] p-0 [@media(max-width:1000px)]:gap-[28px] [@media(max-width:700px)]:grid-cols-1 [@media(max-width:700px)]:gap-[36px]',
    '[&_li]:border-t [&_li]:border-filas-line [&_li]:pt-[23px]',
    '[&_h3]:mx-0 [&_h3]:mt-[24px] [&_h3]:mb-[14px] [&_h3]:text-[25px] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.025em]',
    '[&_p]:m-0 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-filas-muted',
  ].join(' '),
  number:
    'text-[12px] leading-[1.5] font-normal text-filas-accent-text [font-family:var(--font-geist-mono),monospace]',
}

export const ContactHeroBlock = ({ eyebrow, heading, emphasis, description }: HeroProps) => (
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

export const ContactInquiryBlock = ({
  anchorId,
  eyebrow,
  heading,
  description,
  form,
  formHeading,
  formNote,
  privacyNote,
  privacyURL,
  privacyLinkLabel,
  detailsHeading,
  email,
  phone,
  address,
}: InquiryProps) => {
  // Pass only presentation fields to the client, including during authenticated preview.
  const publicForm =
    typeof form === 'object' && form
      ? {
          id: form.id,
          title: form.title,
          fields: form.fields,
          confirmationType: form.confirmationType,
          confirmationMessage: form.confirmationMessage,
          redirect: form.redirect,
          submitButtonLabel: form.submitButtonLabel,
        }
      : null

  return (
    <section className={classes.inquiry} id={anchorId}>
      <div className={`${classes.container} ${classes.inquiryGrid}`}>
        <div className={classes.introduction}>
          <p className={classes.eyebrow}>{eyebrow}</p>
          <h2 className={classes.heading}>{heading}</h2>
          <p className={classes.description}>{description}</p>
          {(email || phone || address) && (
            <div className={classes.details}>
              <h3>{detailsHeading}</h3>
              {email && <a href={`mailto:${email}`}>{email}</a>}
              {phone && <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>}
              {address && <address>{address}</address>}
            </div>
          )}
        </div>
        <div className={classes.formPanel}>
          <h3 className={classes.formHeading}>{formHeading}</h3>
          <p className={classes.formNote}>{formNote}</p>
          {publicForm ? (
            <FormBlock form={publicForm as FormType} enableIntro={false} variant="contact" />
          ) : (
            <p role="status">The inquiry form is currently unavailable. Please try again later.</p>
          )}
          <p className={classes.privacy}>
            {privacyNote}
            {privacyURL && (
              <>
                {' '}
                <a href={privacyURL}>{privacyLinkLabel}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

export const ContactNextStepsBlock = ({ anchorId, eyebrow, heading, steps }: NextStepsProps) => (
  <section className={classes.nextSteps} id={anchorId}>
    <div className={classes.container}>
      <p className={classes.eyebrow}>{eyebrow}</p>
      <h2 className={classes.heading}>{heading}</h2>
      <ol className={classes.steps}>
        {steps.map((step, index) => (
          <li key={step.id || index}>
            <span className={classes.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export const contactComponents = {
  contactHero: ContactHeroBlock,
  contactInquiry: ContactInquiryBlock,
  contactNextSteps: ContactNextStepsBlock,
}
