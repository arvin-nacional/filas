import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { authenticated } from '@/access/authenticated'
import { headerDefaults } from '@/components/SiteChrome/defaults'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      defaultValue: headerDefaults.navItems,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    { name: 'actionLabel', type: 'text', required: true, defaultValue: headerDefaults.actionLabel },
    { name: 'actionURL', type: 'text', required: true, defaultValue: headerDefaults.actionURL },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
