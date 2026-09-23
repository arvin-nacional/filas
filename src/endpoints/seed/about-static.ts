import type { RequiredDataFromCollectionSlug } from 'payload'

import {
  aboutHeroDefaults,
  companyStoryDefaults,
  leadershipDefaults,
  purposeDefaults,
  valuesDefaults,
} from '@/blocks/About/defaults'
import { contactInvitationDefaults } from '@/blocks/Homepage/defaults'

// Used only to prepare an editable, unpublished CMS page; never a route fallback.
export const aboutStatic: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'About FILAS',
  slug: 'about',
  _status: 'draft',
  hero: { type: 'none' },
  layout: [
    { blockType: 'aboutHero', blockName: 'About FILAS', ...aboutHeroDefaults },
    { blockType: 'companyStory', blockName: 'The FILAS promise', ...companyStoryDefaults },
    { blockType: 'purpose', blockName: 'Mission and vision', ...purposeDefaults },
    { blockType: 'values', blockName: 'Our principles', ...valuesDefaults },
    { blockType: 'leadership', blockName: 'Our people', ...leadershipDefaults },
    {
      blockType: 'contactInvitation',
      blockName: 'Start a partnership',
      ...contactInvitationDefaults,
    },
  ],
  meta: {
    title: 'About FILAS',
    description:
      'Meet the people behind FILAS and discover our approach to connected capabilities, practical execution, and committed partnership.',
  },
}
