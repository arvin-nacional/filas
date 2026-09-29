import type { RequiredDataFromCollectionSlug } from 'payload'

import {
  approachDefaults,
  audienceDefaults,
  contactInvitationDefaults,
  growthHeroDefaults,
  growthIntroDefaults,
  servicesOverviewDefaults,
} from '@/blocks/Homepage/defaults'

// Starter content when Home is missing or still contains only Coming Soon.
// A configured CMS homepage takes precedence; this fallback never writes to the CMS.
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  title: 'Home',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    { blockType: 'growthHero', blockName: 'One team, end-to-end system', ...growthHeroDefaults },
    { blockType: 'growthIntro', blockName: 'Growth without the complexity', ...growthIntroDefaults },
    { blockType: 'approach', blockName: 'How we work', ...approachDefaults },
    {
      blockType: 'servicesOverview',
      blockName: 'Connected capabilities',
      ...servicesOverviewDefaults,
    },
    { blockType: 'audience', blockName: 'Who we work with', ...audienceDefaults },
    {
      blockType: 'contactInvitation',
      blockName: 'Start a conversation',
      ...contactInvitationDefaults,
    },
  ],
  meta: {
    title: 'FILAS - First to Execute. Last to See Things Through.',
    description:
      'FILAS connects demand generation, store management, and warehousing and fulfillment through one team. Every brand is a VIP, at every stage of growth.',
  },
}
