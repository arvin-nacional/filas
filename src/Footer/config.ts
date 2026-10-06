import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { authenticated } from '@/access/authenticated'
import { footerDefaults } from '@/components/SiteChrome/defaults'
import { isSocialURL } from './socialLinks'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      defaultValue: footerDefaults.navItems,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social media links',
      labels: { singular: 'Social link', plural: 'Social links' },
      defaultValue: footerDefaults.socialLinks,
      admin: {
        description:
          'Add, reorder, or remove links to Facebook, Instagram, LinkedIn, TikTok, or any other site. Remove all rows to hide social links.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { placeholder: 'e.g. Instagram' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          admin: { placeholder: 'https://www.instagram.com/your-profile/' },
          validate: (value: unknown) =>
            isSocialURL(value) || 'Enter a full URL starting with https:// or http://.',
        },
      ],
    },
    { name: 'description', type: 'textarea', defaultValue: footerDefaults.description },
    { name: 'promise', type: 'textarea', defaultValue: footerDefaults.promise },
    { name: 'note', type: 'text', defaultValue: footerDefaults.note },
    {
      name: 'email',
      type: 'email',
      admin: { description: 'Optional public contact email. Leave blank until confirmed.' },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
