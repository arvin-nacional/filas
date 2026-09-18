import type { Block } from 'payload'

import { comingSoonDefaults } from './defaults'

export const ComingSoon: Block = {
  slug: 'comingSoon',
  interfaceName: 'ComingSoonBlock',
  labels: {
    singular: 'Coming Soon',
    plural: 'Coming Soon Blocks',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description: 'Optional. Uses the FILAS logo when no image is selected.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: comingSoonDefaults.eyebrow,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: comingSoonDefaults.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: comingSoonDefaults.description,
    },
    {
      name: 'footerNote',
      type: 'text',
      defaultValue: comingSoonDefaults.footerNote,
    },
  ],
}
