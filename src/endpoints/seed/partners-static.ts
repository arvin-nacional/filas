import type { RequiredDataFromCollectionSlug } from 'payload'
import {
  partnersHeroDefaults,
  partnerStagesDefaults,
  partnerResultsDefaults,
  partnerContactDefaults,
} from '@/blocks/Partners/defaults'

// Editable draft template; never a public route fallback.
export const partnersStatic: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Who we work with',
  slug: 'who-we-work-with',
  _status: 'draft',
  hero: { type: 'none' },
  layout: [
    { blockType: 'partnersHero', ...partnersHeroDefaults },
    { blockType: 'partnerResults', ...partnerResultsDefaults },
    { blockType: 'partnerStages', ...partnerStagesDefaults },
    { blockType: 'contactInvitation', ...partnerContactDefaults },
  ],
  meta: {
    title: 'Who we work with',
    description:
      'FILAS partners with start-ups, scale-ups, and enterprise brands to connect capabilities and support their next stage of growth.',
  },
}
