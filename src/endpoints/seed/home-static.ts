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
    { blockType: 'growthHero', blockName: 'Your next chapter', ...growthHeroDefaults },
    { blockType: 'growthIntro', blockName: 'A partner in your progress', ...growthIntroDefaults },
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
      'FILAS is an end-to-end e-commerce enabler and growth partner helping brands scale through strategy, technology, fulfillment, creative, and execution.',
  },
}
