import type { RequiredDataFromCollectionSlug } from 'payload'
import {
  contactHeroDefaults,
  contactInquiryDefaults,
  contactNextStepsDefaults,
} from '@/blocks/Contact/defaults'

const paragraph = (text: string) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: [
      {
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        children: [
          { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text },
        ],
      },
    ],
  },
})

export const businessInquiryForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'FILAS business inquiry',
  submitButtonLabel: 'Send inquiry',
  confirmationType: 'message',
  confirmationMessage: paragraph(
    'Thank you for reaching out. Your inquiry has been received. We look forward to learning more about your brand.',
  ),
  // Notification recipients and transport must be configured before launch.
  emails: [],
  fields: [
    {
      blockType: 'text',
      name: 'company',
      label: 'Company / brand name',
      required: true,
      width: 100,
    },
    { blockType: 'text', name: 'contactName', label: 'Contact person', required: true, width: 100 },
    { blockType: 'email', name: 'email', label: 'Email address', required: true, width: 100 },
    {
      blockType: 'text',
      name: 'phone',
      label: 'Contact number (optional)',
      required: false,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'links',
      label: 'Website or marketplace links (optional)',
      required: false,
      width: 100,
    },
    { blockType: 'message', message: paragraph('Services of interest — choose any that apply.') },
    {
      blockType: 'checkbox',
      name: 'commerce',
      label: 'Commerce & channels',
      required: false,
      defaultValue: false,
      width: 100,
    },
    {
      blockType: 'checkbox',
      name: 'fulfillment',
      label: 'Fulfillment & systems',
      required: false,
      defaultValue: false,
      width: 100,
    },
    {
      blockType: 'checkbox',
      name: 'content',
      label: 'Content & activation',
      required: false,
      defaultValue: false,
      width: 100,
    },
    {
      blockType: 'checkbox',
      name: 'businessSupport',
      label: 'Business support',
      required: false,
      defaultValue: false,
      width: 100,
    },
    {
      blockType: 'checkbox',
      name: 'notSure',
      label: 'I’m not sure yet',
      required: false,
      defaultValue: false,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'requirements',
      label: 'Tell us about your goals and what you need',
      required: true,
      width: 100,
    },
  ],
}

export const createContactPage = (
  formID: string,
  slug = 'contact',
): RequiredDataFromCollectionSlug<'pages'> => ({
  title: slug === 'contact' ? 'Contact' : 'Contact design',
  slug,
  _status: 'draft',
  hero: { type: 'none' },
  layout: [
    { blockType: 'contactHero', blockName: 'Let’s talk', ...contactHeroDefaults },
    {
      blockType: 'contactInquiry',
      blockName: 'Business inquiry',
      ...contactInquiryDefaults,
      form: formID,
    },
    { blockType: 'contactNextSteps', blockName: 'What happens next', ...contactNextStepsDefaults },
  ],
  meta: {
    title: 'Contact FILAS',
    description:
      'Tell us about your brand and explore how FILAS can support your next stage of growth.',
  },
})
