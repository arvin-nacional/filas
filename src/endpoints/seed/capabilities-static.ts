import type { RequiredDataFromCollectionSlug } from 'payload'

import {
  capabilitiesHeroDefaults,
  capabilityGroups,
  connectedCapabilitiesDefaults,
} from '@/blocks/Capabilities/defaults'
import { approachDefaults, contactInvitationDefaults } from '@/blocks/Homepage/defaults'

// Draft starter content only; all public content continues to come from Payload.
export const capabilitiesStatic: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Capabilities',
  slug: 'capabilities',
  _status: 'draft',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'capabilitiesHero',
      blockName: 'Connected capabilities',
      ...capabilitiesHeroDefaults,
    },
    ...capabilityGroups.map((group) => ({
      blockType: 'capabilityDetail' as const,
      blockName: group.eyebrow,
      ...group,
    })),
    {
      blockType: 'connectedCapabilities',
      blockName: 'How it comes together',
      ...connectedCapabilitiesDefaults,
    },
    {
      blockType: 'approach',
      blockName: 'Working with FILAS',
      ...approachDefaults,
      eyebrow: 'How we get started',
    },
    {
      blockType: 'contactInvitation',
      blockName: 'Discuss your needs',
      ...contactInvitationDefaults,
      heading: 'What does your\nnext stage need?',
      description:
        'Tell us what you are working towards. Together, we can identify the capabilities and support that fit your business.',
      link: { label: 'Talk about your needs', url: '/contact' },
    },
  ],
  meta: {
    title: 'Our Capabilities',
    description:
      'Explore FILAS capabilities in commerce, fulfillment, content, activation, and business support, connected through one committed partnership.',
  },
}
