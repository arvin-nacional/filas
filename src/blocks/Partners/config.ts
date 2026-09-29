import type { Block, TextField, TextareaField } from 'payload'
import {
  partnersHeroDefaults,
  partnerStagesDefaults,
  partnershipFitDefaults,
  partnerResultsDefaults,
} from './defaults'

const text = (name: string, defaultValue?: string, multiline = false): TextField | TextareaField =>
  multiline
    ? { name, type: 'textarea', required: true, defaultValue }
    : { name, type: 'text', required: true, defaultValue }

export const PartnersHero: Block = {
  slug: 'partnersHero',
  interfaceName: 'PartnersHeroBlock',
  labels: { singular: 'Who We Work With Hero', plural: 'Who We Work With Heroes' },
  fields: [
    text('eyebrow', partnersHeroDefaults.eyebrow),
    text('heading', partnersHeroDefaults.heading),
    text('emphasis', partnersHeroDefaults.emphasis),
    text('description', partnersHeroDefaults.description, true),
    text('note', partnersHeroDefaults.note),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description:
          'Wide product image. Leave empty to use the product lineup from the FILAS solutions overview.',
      },
    },
  ],
}

export const PartnerStages: Block = {
  slug: 'partnerStages',
  interfaceName: 'PartnerStagesBlock',
  labels: { singular: 'Partner Growth Stages', plural: 'Partner Growth Stages' },
  fields: [
    text('eyebrow', partnerStagesDefaults.eyebrow),
    text('heading', partnerStagesDefaults.heading, true),
    text('description', partnerStagesDefaults.description, true),
    {
      name: 'stages',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: partnerStagesDefaults.stages,
      fields: [
        text('label'),
        text('title'),
        text('description', undefined, true),
        {
          name: 'needs',
          type: 'textarea',
          admin: { description: 'Legacy supporting copy; not displayed in the compact cards.' },
        },
        {
          name: 'support',
          type: 'array',
          required: true,
          minRows: 1,
          maxRows: 8,
          fields: [text('label')],
        },
        { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Highlight this stage' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          filterOptions: { mimeType: { contains: 'image' } },
        },
      ],
    },
  ],
}

export const PartnershipFit: Block = {
  slug: 'partnershipFit',
  interfaceName: 'PartnershipFitBlock',
  labels: { singular: 'Partnership Fit', plural: 'Partnership Fit Sections' },
  fields: [
    text('eyebrow', partnershipFitDefaults.eyebrow),
    text('heading', partnershipFitDefaults.heading, true),
    text('description', partnershipFitDefaults.description, true),
    {
      name: 'qualities',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: partnershipFitDefaults.qualities,
      fields: [text('title'), text('description', undefined, true)],
    },
  ],
}

export const PartnerResults: Block = {
  slug: 'partnerResults',
  interfaceName: 'PartnerResultsBlock',
  labels: { singular: 'Partner Case Studies', plural: 'Partner Case Studies' },
  fields: [
    text('eyebrow', partnerResultsDefaults.eyebrow),
    text('heading', partnerResultsDefaults.heading, true),
    text('description', partnerResultsDefaults.description, true),
    text('note', partnerResultsDefaults.note, true),
    {
      name: 'cases',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: partnerResultsDefaults.cases,
      fields: [
        text('category'),
        text('metric'),
        text('metricLabel'),
        text('period'),
        text('description'),
        text('detail', undefined, true),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          filterOptions: { mimeType: { contains: 'image' } },
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'center',
          options: ['left', 'center', 'right'],
        },
      ],
    },
  ],
}

export const partnerBlocks = [PartnersHero, PartnerResults, PartnerStages, PartnershipFit]
