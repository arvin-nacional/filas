// Adapted from FILAS - An Overview of our Solutions.pdf, pages 2–5 and 19–23.
export const growthHeroDefaults = {
  eyebrow: 'Your end-to-end e-commerce partner',
  heading: 'One team.',
  emphasis: 'End-to-end system.',
  description:
    'We integrate and operate your e-commerce ecosystem, from generating demand and managing stores to fulfilling every order. Faster decisions. Tighter coordination. Support that grows with your business.',
  primaryLink: { label: "Let's talk about your brand", url: '/#contact' },
  secondaryLink: { label: 'Explore our solutions', url: '/#services' },
  footnote: 'Every brand is a VIP, regardless of its size today.',
}

export const growthIntroDefaults = {
  anchorId: 'about',
  eyebrow: '01 / Growth without the complexity',
  heading: 'E-commerce is dozens of jobs. Happening all at once.',
  description:
    'Content, ads, store management, inventory, fulfillment, customer service, returns, and reporting. Every stage of growth brings more people, processes, and moving parts to manage.',
  supportingText:
    'FILAS brings them together in one coordinated team, giving you back the attention and resources to focus on growing your business.',
  statement: 'Manage one partner. Keep your focus on growth.',
}

export const approachDefaults = {
  anchorId: 'approach',
  eyebrow: '02 / Built around your business',
  heading: 'Choose the support\nyou need.',
  description:
    'Start with your goals. We bring together the platforms, fulfillment setup, and growth services that fit your brand.',
  steps: [
    {
      title: 'Choose your channels',
      description:
        'Identify the e-commerce platforms that best fit your products, customers, and business goals.',
    },
    {
      title: 'Set up fulfillment',
      description:
        'Choose fulfillment at FILAS’s facility, a FILAS team in your warehouse, or technology for your own operations.',
    },
    {
      title: 'Build demand',
      description:
        'Add the support you need: paid media, creators, affiliates, social content, live selling, or a brand website.',
    },
    {
      title: 'Track and improve',
      description:
        'Review sales, conversion, and inventory movement. Turn performance data into clear decisions and ongoing improvements.',
    },
  ],
}

export const servicesOverviewDefaults = {
  anchorId: 'services',
  eyebrow: '03 / Our solutions',
  heading: 'All the moving parts.\nOne connected team.',
  description:
    'Demand generation, store management, and warehousing and fulfillment, working together across your e-commerce ecosystem.',
  services: [
    {
      title: 'Demand generation',
      summary: 'Bring more people to your store.',
      description:
        'From market research and entry planning to paid media, creators, and live selling, we manage the channels that drive discovery and demand. FILAS Studios supports content production and livestream commerce.',
      capabilities: [
        'Market research & entry planning',
        'Content strategy & design',
        'Meta ads',
        'Creators & affiliates',
        'Live selling',
        'FILAS Studios',
        'Social media management',
      ].map((label) => ({ label })),
    },
    {
      title: 'Store management',
      summary: 'Turn attention into transactions.',
      description:
        'We manage the daily work of your online stores, from product listings and page designs to campaigns, vouchers, chat support, and reporting. Promotions are planned, executed, and optimized across the full funnel.',
      capabilities: [
        'Product listings & page design',
        'Ads, promotions & campaigns',
        'Chat support',
        'Virtual bundling',
        'Analytics & monthly reporting',
        'Logistics coordination',
        'Returns & refund claims',
      ].map((label) => ({ label })),
    },
    {
      title: 'Warehousing & fulfillment',
      summary: 'Keep every order moving.',
      description:
        'Storage, picking, verification, packing, recording, and quality control follow a controlled process. Our systems give you real-time visibility across inventory, orders, and fulfillment.',
      capabilities: [
        'Fulfilled by FILAS',
        'Managed by FILAS',
        'Tech by FILAS',
        'Storage & regulatory compliance',
        'Picking & custom packing',
        'Nationwide last-mile delivery',
        'Reverse logistics',
        'Freight forwarding',
        'Metro Manila express delivery',
      ].map((label) => ({ label })),
    },
  ],
}

export const audienceDefaults = {
  anchorId: 'partners',
  eyebrow: '04 / Every brand is a VIP',
  heading: 'Support for every\nstage of growth.',
  description:
    'Choose only where you need us. Wherever you are in your growth journey, there is a FILAS solution for you.',
  stages: [
    {
      label: 'Build your foundation',
      title: 'Start-ups',
      description:
        'Choose your platforms, prepare your storefront, and put a fulfillment setup in place. Start with the services your brand needs today.',
      featured: false,
    },
    {
      label: 'Coordinate the moving parts',
      title: 'Scale-ups',
      description:
        'Bring growing order volumes, campaigns, inventory, and customer support together through one experienced team.',
      featured: true,
    },
    {
      label: 'Strengthen your operations',
      title: 'Enterprise brands',
      description:
        'Add specialist execution, fulfillment capacity, or order and warehouse technology to your existing operations.',
      featured: false,
    },
  ],
}

export const contactInvitationDefaults = {
  anchorId: 'contact',
  eyebrow: 'Let’s build your solution',
  heading: 'Your next stage.\nOne committed partner.',
  description:
    'Tell us about your brand and where you want to grow. We will help you choose the platforms, fulfillment setup, and services that fit.',
  link: { label: 'Start a conversation', url: '/contact' },
  note: 'Guided and supported, every step of the way.',
}
