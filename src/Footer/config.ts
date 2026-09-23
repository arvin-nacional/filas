import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { authenticated } from '@/access/authenticated'
import { footerDefaults } from '@/components/SiteChrome/defaults'

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
