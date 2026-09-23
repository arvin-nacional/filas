import type { Block, Field } from 'payload'

import {
  approachDefaults,
  audienceDefaults,
  contactInvitationDefaults,
  growthHeroDefaults,
  growthIntroDefaults,
  servicesOverviewDefaults,
} from './defaults'

const text = (name: string, defaultValue?: string, type: 'text' | 'textarea' = 'text'): Field =>
  type === 'textarea'
    ? { name, type: 'textarea', defaultValue, required: true }
    : { name, type: 'text', defaultValue, required: true }

const anchor = (defaultValue: string): Field => ({
  name: 'anchorId',
  label: 'Section anchor',
  type: 'text',
  defaultValue,
  required: true,
  admin: {
    description:
      'A unique section name for navigation links, such as services. Use lowercase letters, numbers, and hyphens.',
  },
  validate: (value: string | null | undefined) =>
    Boolean(value && /^[a-z][a-z0-9-]*$/.test(value)) ||
    'Use a lowercase letter followed by letters, numbers, or hyphens.',
})

const action = (name: string, defaults: { label: string; url: string }): Field => ({
  name,
  type: 'group',
  fields: [
    text('label', defaults.label),
    {
      name: 'url',
      type: 'text',
      required: true,
      defaultValue: defaults.url,
      admin: {
        description:
          'A site path (/contact), section link (/#services), https:// URL, or mailto: address.',
      },
      validate: (value: string | null | undefined) =>
        Boolean(value && /^(\/(?!\/)|#[a-z]|https?:\/\/|mailto:)/i.test(value)) ||
        'Enter a site path, section link, https:// URL, or mailto: address.',
    },
  ],
})

const introFields = (defaults: {
  anchorId: string
  eyebrow: string
  heading: string
  description: string
}): Field[] => [
  anchor(defaults.anchorId),
  text('eyebrow', defaults.eyebrow),
  text('heading', defaults.heading, 'textarea'),
  text('description', defaults.description, 'textarea'),
]

export const GrowthHero: Block = {
  slug: 'growthHero',
  interfaceName: 'GrowthHeroBlock',
  labels: { singular: 'Growth Hero', plural: 'Growth Heroes' },
  fields: [
    text('eyebrow', growthHeroDefaults.eyebrow),
    text('heading', growthHeroDefaults.heading),
    text('emphasis', growthHeroDefaults.emphasis),
    text('description', growthHeroDefaults.description, 'textarea'),
    action('primaryLink', growthHeroDefaults.primaryLink),
    action('secondaryLink', growthHeroDefaults.secondaryLink),
    text('footnote', growthHeroDefaults.footnote),
  ],
}

export const GrowthIntro: Block = {
  slug: 'growthIntro',
  interfaceName: 'GrowthIntroBlock',
  labels: { singular: 'Growth Introduction', plural: 'Growth Introductions' },
  fields: [
    ...introFields(growthIntroDefaults),
    text('supportingText', growthIntroDefaults.supportingText, 'textarea'),
    text('statement', growthIntroDefaults.statement),
  ],
}

export const Approach: Block = {
  slug: 'approach',
  interfaceName: 'ApproachBlock',
  labels: { singular: 'Our Approach', plural: 'Approach Sections' },
  fields: [
    ...introFields(approachDefaults),
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: approachDefaults.steps,
      fields: [text('title'), text('description', undefined, 'textarea')],
    },
  ],
}

export const ServicesOverview: Block = {
  slug: 'servicesOverview',
  interfaceName: 'ServicesOverviewBlock',
  labels: { singular: 'Services Overview', plural: 'Services Overviews' },
  fields: [
    ...introFields(servicesOverviewDefaults),
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      defaultValue: servicesOverviewDefaults.services,
      fields: [
        text('title'),
        text('summary'),
        text('description', undefined, 'textarea'),
        {
          name: 'capabilities',
          type: 'array',
          required: true,
          minRows: 1,
          maxRows: 12,
          fields: [text('label')],
        },
      ],
    },
  ],
}

export const Audience: Block = {
  slug: 'audience',
  interfaceName: 'AudienceBlock',
  labels: { singular: 'Who We Work With', plural: 'Audience Sections' },
  fields: [
    ...introFields(audienceDefaults),
    {
      name: 'stages',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: audienceDefaults.stages,
      fields: [
        text('label'),
        text('title'),
        text('description', undefined, 'textarea'),
        { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Highlight this stage' },
      ],
    },
  ],
}

export const ClientLogos: Block = {
  slug: 'clientLogos',
  interfaceName: 'ClientLogosBlock',
  labels: { singular: 'Approved Client Logos', plural: 'Client Logo Sections' },
  fields: [
    anchor('clients'),
    text('eyebrow', 'Experience across industries'),
    text('heading', 'In good company.'),
    {
      name: 'clients',
      type: 'array',
      maxRows: 24,
      admin: {
        description:
          'Add only client names and logos approved for public display. This section stays hidden until at least one approved logo is available.',
      },
      fields: [
        text('name'),
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: { mimeType: { contains: 'image' } },
        },
        {
          name: 'approved',
          type: 'checkbox',
          defaultValue: false,
          label: 'Approved for public display',
        },
      ],
    },
  ],
}

export const ContactInvitation: Block = {
  slug: 'contactInvitation',
  interfaceName: 'ContactInvitationBlock',
  labels: { singular: 'Contact Invitation', plural: 'Contact Invitations' },
  fields: [
    ...introFields(contactInvitationDefaults),
    action('link', contactInvitationDefaults.link),
    text('note', contactInvitationDefaults.note),
  ],
}

export const homepageBlocks = [
  GrowthHero,
  GrowthIntro,
  Approach,
  ServicesOverview,
  Audience,
  ClientLogos,
  ContactInvitation,
]
