import type { Block, Field, TextField, TextareaField } from 'payload'

import {
  aboutHeroDefaults,
  companyStoryDefaults,
  leadershipDefaults,
  purposeDefaults,
  valuesDefaults,
} from './defaults'

const text = (name: string, defaultValue?: string, multiline = false): TextField | TextareaField =>
  multiline
    ? { name, type: 'textarea', required: true, defaultValue }
    : { name, type: 'text', required: true, defaultValue }

const section = (defaults: { anchorId: string; eyebrow: string; heading: string }): Field[] => [
  {
    name: 'anchorId',
    label: 'Section anchor',
    type: 'text',
    required: true,
    defaultValue: defaults.anchorId,
    admin: { description: 'Use a unique lowercase section name for links, such as our-people.' },
    validate: (value: string | null | undefined) =>
      Boolean(value && /^[a-z][a-z0-9-]*$/.test(value)) ||
      'Use lowercase letters, numbers, and hyphens, starting with a letter.',
  },
  text('eyebrow', defaults.eyebrow),
  text('heading', defaults.heading, true),
]

export const AboutHero: Block = {
  slug: 'aboutHero',
  interfaceName: 'AboutHeroBlock',
  labels: { singular: 'About Hero', plural: 'About Heroes' },
  fields: [
    text('eyebrow', aboutHeroDefaults.eyebrow),
    text('heading', aboutHeroDefaults.heading),
    text('emphasis', aboutHeroDefaults.emphasis),
    text('description', aboutHeroDefaults.description, true),
  ],
}

export const CompanyStory: Block = {
  slug: 'companyStory',
  interfaceName: 'CompanyStoryBlock',
  labels: { singular: 'Company Story', plural: 'Company Stories' },
  fields: [
    ...section(companyStoryDefaults),
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      defaultValue: companyStoryDefaults.paragraphs,
      fields: [text('text', undefined, true)],
    },
    text('statement', companyStoryDefaults.statement),
  ],
}

export const Purpose: Block = {
  slug: 'purpose',
  interfaceName: 'PurposeBlock',
  labels: { singular: 'Mission & Vision', plural: 'Mission & Vision Sections' },
  fields: [
    ...section(purposeDefaults),
    text('missionLabel', purposeDefaults.missionLabel),
    {
      ...text('mission', purposeDefaults.mission, true),
      admin: {
        description: 'Suggested draft copy. Replace with the approved FILAS mission before launch.',
      },
    },
    text('visionLabel', purposeDefaults.visionLabel),
    {
      ...text('vision', purposeDefaults.vision, true),
      admin: {
        description: 'Suggested draft copy. Replace with the approved FILAS vision before launch.',
      },
    },
  ],
}

export const Values: Block = {
  slug: 'values',
  interfaceName: 'ValuesBlock',
  labels: { singular: 'Our Principles', plural: 'Principle Sections' },
  fields: [
    ...section(valuesDefaults),
    {
      name: 'values',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      defaultValue: valuesDefaults.values,
      fields: [text('title'), text('description', undefined, true)],
    },
  ],
}

export const Leadership: Block = {
  slug: 'leadership',
  interfaceName: 'LeadershipBlock',
  labels: { singular: 'Leadership Team', plural: 'Leadership Teams' },
  fields: [
    ...section(leadershipDefaults),
    text('description', leadershipDefaults.description, true),
    {
      name: 'people',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 24,
      defaultValue: leadershipDefaults.people,
      admin: {
        description:
          'Reorder people here. Photos and biographies are optional; add supplied content when available.',
      },
      fields: [
        text('name'),
        text('role'),
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          filterOptions: { mimeType: { contains: 'image' } },
        },
        { name: 'biography', type: 'textarea' },
      ],
    },
  ],
}

export const aboutBlocks = [AboutHero, CompanyStory, Purpose, Values, Leadership]
