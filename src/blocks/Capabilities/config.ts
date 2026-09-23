import type { Block, Field, TextField, TextareaField } from 'payload'

import {
  capabilitiesHeroDefaults,
  capabilityGroups,
  connectedCapabilitiesDefaults,
} from './defaults'

const text = (name: string, defaultValue?: string, multiline = false): TextField | TextareaField =>
  multiline
    ? { name, type: 'textarea', required: true, defaultValue }
    : { name, type: 'text', required: true, defaultValue }

const anchor = (defaultValue?: string): TextField => ({
  name: 'anchorId',
  label: 'Section anchor',
  type: 'text',
  required: true,
  defaultValue,
  admin: {
    description: 'Use a unique lowercase section name. Match the hero jump link to this value.',
  },
  validate: (value: string | null | undefined) =>
    Boolean(value && /^[a-z][a-z0-9-]*$/.test(value)) ||
    'Start with a lowercase letter and use only letters, numbers, and hyphens.',
})

const section = (defaults: {
  anchorId: string
  eyebrow: string
  heading: string
  description: string
}): Field[] => [
  anchor(defaults.anchorId),
  text('eyebrow', defaults.eyebrow),
  text('heading', defaults.heading, true),
  text('description', defaults.description, true),
]

export const CapabilitiesHero: Block = {
  slug: 'capabilitiesHero',
  interfaceName: 'CapabilitiesHeroBlock',
  labels: { singular: 'Capabilities Hero', plural: 'Capabilities Heroes' },
  fields: [
    text('eyebrow', capabilitiesHeroDefaults.eyebrow),
    text('heading', capabilitiesHeroDefaults.heading),
    text('emphasis', capabilitiesHeroDefaults.emphasis),
    text('description', capabilitiesHeroDefaults.description, true),
    text('navigationLabel', capabilitiesHeroDefaults.navigationLabel),
    {
      name: 'links',
      label: 'Section jump links',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      required: true,
      defaultValue: capabilitiesHeroDefaults.links,
      fields: [text('label'), anchor()],
    },
  ],
}

export const CapabilityDetail: Block = {
  slug: 'capabilityDetail',
  interfaceName: 'CapabilityDetailBlock',
  labels: { singular: 'Capability Detail', plural: 'Capability Details' },
  fields: [
    ...section(capabilityGroups[0]),
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'paper',
      required: true,
      options: [
        { label: 'Ivory', value: 'paper' },
        { label: 'Warm neutral', value: 'surface' },
      ],
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      defaultValue: capabilityGroups[0].services,
      admin: {
        description:
          'Add one block per capability group, with its own heading, section anchor, and services.',
      },
      fields: [text('title'), text('description', undefined, true)],
    },
  ],
}

export const ConnectedCapabilities: Block = {
  slug: 'connectedCapabilities',
  interfaceName: 'ConnectedCapabilitiesBlock',
  labels: { singular: 'Connected Capabilities', plural: 'Connected Capability Sections' },
  fields: [
    ...section(connectedCapabilitiesDefaults),
    {
      name: 'connections',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      defaultValue: connectedCapabilitiesDefaults.connections,
      fields: [text('title'), text('description', undefined, true)],
    },
  ],
}

export const capabilitiesBlocks = [CapabilitiesHero, CapabilityDetail, ConnectedCapabilities]
