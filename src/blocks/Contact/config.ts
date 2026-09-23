import type { Block, Field, TextareaField, TextField } from 'payload'
import { contactHeroDefaults, contactInquiryDefaults, contactNextStepsDefaults } from './defaults'

const text = (name: string, defaultValue?: string, multiline = false): TextField | TextareaField =>
  multiline
    ? { name, type: 'textarea', required: true, defaultValue }
    : { name, type: 'text', required: true, defaultValue }

const section = (defaults: { anchorId: string; eyebrow: string; heading: string }): Field[] => [
  {
    name: 'anchorId',
    type: 'text',
    label: 'Section anchor',
    required: true,
    defaultValue: defaults.anchorId,
    validate: (value: string | null | undefined) =>
      Boolean(value && /^[a-z][a-z0-9-]*$/.test(value)) ||
      'Use lowercase letters, numbers, and hyphens, starting with a letter.',
  },
  text('eyebrow', defaults.eyebrow),
  text('heading', defaults.heading, true),
]

export const ContactHero: Block = {
  slug: 'contactHero',
  interfaceName: 'ContactHeroBlock',
  labels: { singular: 'Contact Hero', plural: 'Contact Heroes' },
  fields: [
    text('eyebrow', contactHeroDefaults.eyebrow),
    text('heading', contactHeroDefaults.heading),
    text('emphasis', contactHeroDefaults.emphasis),
    text('description', contactHeroDefaults.description, true),
  ],
}

export const ContactInquiry: Block = {
  slug: 'contactInquiry',
  interfaceName: 'ContactInquiryBlock',
  labels: { singular: 'Contact Inquiry', plural: 'Contact Inquiry Sections' },
  fields: [
    ...section(contactInquiryDefaults),
    text('description', contactInquiryDefaults.description, true),
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description:
          'Select a Payload form. Edit inquiry fields and confirmation content under Forms.',
      },
    },
    text('formHeading', contactInquiryDefaults.formHeading),
    text('formNote', contactInquiryDefaults.formNote),
    text('privacyNote', contactInquiryDefaults.privacyNote, true),
    {
      name: 'privacyURL',
      type: 'text',
      label: 'Privacy policy URL',
      admin: { description: 'Optional. Add a published policy path or HTTPS URL when available.' },
      validate: (value: string | null | undefined) =>
        !value || /^(\/(?!\/)|https:\/\/)/.test(value) || 'Use a site path or HTTPS URL.',
    },
    text('privacyLinkLabel', contactInquiryDefaults.privacyLinkLabel),
    text('detailsHeading', contactInquiryDefaults.detailsHeading),
    {
      name: 'email',
      type: 'email',
      admin: { description: 'Optional public email; not the form notification recipient.' },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { description: 'Optional public phone number, including country code.' },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: { description: 'Optional approved business address.' },
    },
  ],
}

export const ContactNextSteps: Block = {
  slug: 'contactNextSteps',
  interfaceName: 'ContactNextStepsBlock',
  labels: { singular: 'Contact Next Steps', plural: 'Contact Next Steps Sections' },
  fields: [
    ...section(contactNextStepsDefaults),
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: contactNextStepsDefaults.steps,
      fields: [text('title'), text('description', undefined, true)],
    },
  ],
}

export const contactBlocks = [ContactHero, ContactInquiry, ContactNextSteps]
