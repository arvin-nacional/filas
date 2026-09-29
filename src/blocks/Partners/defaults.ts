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
    description: [
      'Launch with the right channels, content, and fulfillment foundations.',
      'Keep campaigns, orders, and inventory moving together as demand grows.',
      'Add specialist expertise and operational capacity to your existing setup.',
    ][index],
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

export const partnerResultsDefaults = {
  eyebrow: 'Results across categories',
  heading: 'Different products.\nMeasurable progress.',
  description:
    'A closer look at the results reported in our solutions overview. Each story reflects its own category and reporting period.',
  note: 'Category imagery is illustrative. Results relate to individual case studies; client names are not disclosed in the overview.',
  cases: [
    {
      category: 'FMCG',
      metric: '4.3×',
      metricLabel: 'sales growth',
      period: 'Over one year',
      description: 'More customers. A steady basket value.',
      detail:
        'Orders grew 4.2× while average order value rose from ₱464 to ₱480. Sales and transactions grew together without relying on lower-value baskets.',
      imagePosition: 'right' as const,
    },
    {
      category: 'Pet care',
      metric: '3.6×',
      metricLabel: 'sales growth',
      period: 'Over one year',
      description: 'More orders. Bigger baskets.',
      detail:
        'Orders doubled and average order value increased 71%. Revenue growth came from both more transactions and customers buying more per order.',
      imagePosition: 'left' as const,
    },
    {
      category: 'Pharmaceuticals',
      metric: '+46%',
      metricLabel: 'sales growth',
      period: 'Over one month',
      description: 'Growth from more than one lever.',
      detail:
        'Orders increased 28% and average basket size grew 14%, improving both transaction volume and the value of each purchase.',
      imagePosition: 'center' as const,
    },
  ],
}

export const partnerContactDefaults = {
  anchorId: 'contact',
  eyebrow: 'Your next chapter',
  heading: 'Wherever your brand is today,\nlet’s build what comes next.',
  description:
    'Tell us about your products, your current setup, and where you want to grow. We will help you find the right support.',
  link: { label: 'Let’s talk about your brand', url: '/contact' },
  note: 'Every brand. A VIP.',
}
