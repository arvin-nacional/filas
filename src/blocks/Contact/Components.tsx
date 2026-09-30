import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type {
  ContactHeroBlock as HeroProps,
  ContactInquiryBlock as InquiryProps,
  ContactNextStepsBlock as NextStepsProps,
} from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'

export const ContactHeroBlock = ({ eyebrow, heading, emphasis, description }: HeroProps) => (
  <section className="scroll-mt-28 border-b border-filas-line bg-filas-paper py-12 text-center text-filas-ink sm:py-16">
    <div className="mx-auto w-full max-w-348 px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase">
        {eyebrow}
      </p>
      <h1 className="text-4xl leading-[1.05] font-medium tracking-tighter text-balance sm:text-6xl lg:text-7xl">
        {heading}
        <br />
        <span className="text-filas-accent-text">{emphasis}</span>
      </h1>
      <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-filas-muted sm:text-lg sm:leading-loose">
        {description}
      </p>
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
    <section className="scroll-mt-28 bg-filas-paper py-12 text-filas-ink md:py-16" id={anchorId}>
      <div className="mx-auto grid w-full max-w-348 items-start gap-9 px-5 sm:px-8 md:grid-cols-[1fr_1.3fr] md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-14">
        <div className="max-w-xl md:sticky md:top-28">
          <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase">
            {eyebrow}
          </p>
          <h2 className="text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-filas-muted">{description}</p>
          <div className="mt-8 rounded-xl border border-filas-line p-5 sm:p-6">
            <h3 className="text-base font-medium">A useful starting point</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-filas-muted">
              <li>What you sell and where you sell it</li>
              <li>Your next goal or biggest operational challenge</li>
              <li>The support you need, even if you are still exploring</li>
            </ul>
            <p className="mt-5 border-t border-filas-line pt-4 text-sm leading-relaxed">
              You can start with one service or a connected, end-to-end solution.
            </p>
          </div>
          {(email || phone || address) && (
            <div className="mt-12 border-t border-filas-line pt-7">
              <h3 className="mb-5 text-base font-medium">{detailsHeading}</h3>
              {email && (
                <a
                  className="mb-3 block w-fit text-filas-accent-text wrap-anywhere underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              )}
              {phone && (
                <a
                  className="mb-3 block w-fit text-filas-accent-text wrap-anywhere underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text"
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                >
                  {phone}
                </a>
              )}
              {address && (
                <address className="mt-5 text-sm leading-loose whitespace-pre-line not-italic">
                  {address}
                </address>
              )}
            </div>
          )}
        </div>
        <div className="min-w-0 rounded-2xl border border-filas-line bg-filas-surface px-5 py-6 sm:p-7 lg:p-9">
          <h3 className="text-3xl leading-tight font-medium tracking-tight">{formHeading}</h3>
          <p className="mt-3 mb-8 text-sm leading-relaxed text-filas-muted">{formNote}</p>
          {publicForm ? (
            <FormBlock form={publicForm as FormType} enableIntro={false} variant="contact" />
          ) : (
            <p role="status">
              The inquiry form is currently unavailable.{' '}
              {email ? (
                <a className="underline underline-offset-4" href={`mailto:${email}`}>
                  Email us instead.
                </a>
              ) : phone ? (
                <a
                  className="underline underline-offset-4"
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                >
                  Call us instead.
                </a>
              ) : (
                'Please try again later.'
              )}
            </p>
          )}
          <p className="mt-6 text-xs leading-relaxed text-filas-muted">
            {privacyNote}
            {privacyURL && (
              <>
                {' '}
                <a
                  className="text-filas-accent-text underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text"
                  href={privacyURL}
                >
                  {privacyLinkLabel}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

export const ContactNextStepsBlock = ({ anchorId, eyebrow, heading, steps }: NextStepsProps) => (
  <section className="scroll-mt-28 bg-filas-surface py-16 text-filas-ink md:py-24" id={anchorId}>
    <div className="mx-auto w-full max-w-348 px-5 sm:px-8 lg:px-14">
      <p className="mb-7 font-mono text-xs leading-relaxed tracking-widest text-filas-accent-text uppercase">
        {eyebrow}
      </p>
      <h2 className="text-4xl leading-tight font-medium tracking-tighter text-balance whitespace-pre-line lg:text-5xl">
        {heading}
      </h2>
      <ol className="mt-14 grid list-none gap-9 p-0 md:grid-cols-3 md:gap-7 lg:gap-12">
        {steps.map((step, index) => (
          <li className="border-t border-filas-line pt-6" key={step.id || index}>
            <span
              className="font-mono text-xs leading-normal text-filas-accent-text"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 mb-3 text-2xl leading-tight font-medium tracking-tight">
              {step.title}
            </h3>
            <p className="text-base leading-loose text-filas-muted">{step.description}</p>
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
