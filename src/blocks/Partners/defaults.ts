import { audienceDefaults } from '../Homepage/defaults'

// Adapted from FILAS - An Overview of our Solutions.pdf, pages 19 and 21–23.
export const partnersHeroDefaults = {
  eyebrow: 'Who we work with',
  heading: 'Every brand.',
  emphasis: 'A VIP.',
  description:
    'Your size today does not determine the attention you receive. We bring experienced people, connected services, and hands-on execution to your brand’s unique needs and goals.',
  note: 'A FILAS solution for every stage of your growth journey.',
}

export const partnerStagesDefaults = {
  eyebrow: '01 / Support at every stage',
  heading: 'Choose where\nyou need us.',
  description:
    'Start with the platforms that suit your business, choose your fulfillment setup, and add the growth services you need.',
  stages: audienceDefaults.stages.map((stage, index) => ({
    ...stage,
    needs: [
      'Choosing your e-commerce platforms, preparing product listings, and getting orders out reliably.',
      'Coordinating more campaigns, orders, and inventory as your brand grows.',
      'Adding specialist capacity, improving visibility, or integrating fulfillment with an established operation.',
    ][index],
    support: [
      ['Market research & entry planning', 'Product listings & store design', 'Fulfilled by ART'],
      ['Campaigns, creators & affiliates', 'Store management & reporting', 'Scalable fulfillment'],
      ['Managed by ART', 'Tech by ART', 'Performance analysis & execution'],
    ][index].map((label) => ({ label })),
  })),
}

export const partnershipFitDefaults = {
  eyebrow: '02 / One partner, connected execution',
  heading: 'Less to coordinate.\nMore room to grow.',
  description:
    'Bring the moving parts together through an experienced team, with growth strategy, campaign execution, and regular analytics working in sync.',
  qualities: [
    {
      title: 'A cohesive team',
      description:
        'Work with specialists across store management, demand generation, and fulfillment through one coordinated partner.',
    },
    {
      title: 'Practical experience',
      description:
        'Get support from people already running e-commerce and fulfillment operations for other brands.',
    },
    {
      title: 'Support that fits',
      description:
        'Choose services around your existing setup and goals, with guidance as your business scales.',
    },
  ],
}
