// Adapted from FILAS - An Overview of our Solutions.pdf, pages 5–17 and 21.
export const capabilityGroups = [
  {
    anchorId: 'commerce',
    eyebrow: '01 / Store management',
    heading: 'Every touchpoint.\nReady for conversion.',
    description:
      'Storefronts, product displays, and promotions that build desire and simplify decisions. We manage the day-to-day work that keeps your stores moving.',
    tone: 'paper' as const,
    services: [
      {
        title: 'Product listings & page design',
        description:
          'Manage product listings, storefronts, and product pages so customers can discover your range and make buying decisions.',
      },
      {
        title: 'Ads, promotions & campaigns',
        description:
          'Plan, execute, and optimize platform campaigns and vouchers, coordinating visibility, timing, and performance tracking.',
      },
      {
        title: 'Chat support & virtual bundling',
        description:
          'Support customers as they shop and bring complementary products together through virtual bundles.',
      },
      {
        title: 'Returns & logistics coordination',
        description:
          'Coordinate logistics and handle the filing of returns and refund claims as part of everyday store operations.',
      },
      {
        title: 'Analytics & monthly reporting',
        description:
          'Track store performance and turn sales and conversion data into clear insights for your next decisions.',
      },
    ],
  },
  {
    anchorId: 'fulfillment',
    eyebrow: '02 / Warehousing & fulfillment',
    heading: 'Real infrastructure.\nReliable execution.',
    description:
      'Storage, picking, verification, packing, recording, and quality control are designed to reduce errors and protect your products at every step.',
    tone: 'surface' as const,
    services: [
      {
        title: 'Fulfilled by ART (FBA)',
        description:
          'Store your products in ART’s facility. Our experienced team handles picking, packing, and shipping, with a setup that scales as your brand grows.',
      },
      {
        title: 'Managed by ART (MBA)',
        description:
          'An ART team operates fulfillment in your facility, tailoring the setup to your workflow and integrating with your existing processes.',
      },
      {
        title: 'Tech by ART (TBA)',
        description:
          'Order and warehouse management systems with real-time tracking, reporting, analytics, and automated workflows for faster order processing.',
      },
      {
        title: 'Storage & delivery services',
        description:
          'Storage solutions and regulatory compliance, custom packaging, nationwide last-mile delivery, reverse logistics, and freight forwarding.',
      },
      {
        title: 'Express delivery',
        description:
          'Quick-commerce fulfillment capabilities support express deliveries within Metro Manila.',
      },
    ],
  },
  {
    anchorId: 'content',
    eyebrow: '03 / Demand generation',
    heading: 'Bring people\nto your store.',
    description:
      'We manage the growth channels around your e-commerce platforms, supported by FILAS Studios, our space for content production and livestream commerce.',
    tone: 'paper' as const,
    services: [
      {
        title: 'Market research & entry planning',
        description:
          'Build a plan around your market, audience, and the channels that fit your business.',
      },
      {
        title: 'Content strategy & design',
        description:
          'Connect your content, creative design, and social media activity around your brand and products.',
      },
      {
        title: 'Paid media',
        description:
          'Manage Meta ads and connect demand generation with your store promotions and campaigns.',
      },
      {
        title: 'Creators & affiliates',
        description:
          'Source and manage creators and affiliates who help bring your products to new audiences.',
      },
      {
        title: 'Live selling & FILAS Studios',
        description:
          'Bring product storytelling and live commerce together with dedicated content production and livestream space.',
      },
      {
        title: 'Website design & creation',
        description:
          'Create a brand website as part of the growth services that support your e-commerce presence.',
      },
    ],
  },
  {
    anchorId: 'business-support',
    eyebrow: '04 / Visibility & performance',
    heading: 'See what is happening.\nKnow what comes next.',
    description:
      'We track performance across your e-commerce ecosystem, from sales and conversion to inventory movement, so you can make better decisions and grow profitably.',
    tone: 'surface' as const,
    services: [
      {
        title: 'Real-time visibility',
        description:
          'Proprietary systems connect inventory, orders, and fulfillment so your team can see what needs attention.',
      },
      {
        title: 'Performance analysis',
        description:
          'Review sales, conversion, and inventory movement together to understand where growth is coming from.',
      },
      {
        title: 'Coordinated execution',
        description:
          'One integrated team connects growth strategy, proactive campaign execution, and regular analytics.',
      },
    ],
  },
]

export const capabilitiesHeroDefaults = {
  eyebrow: 'Our solutions',
  heading: 'One team.',
  emphasis: 'End-to-end system.',
  description:
    'Generate demand. Manage your stores. Fulfill your orders. Choose the support you need, connected through one e-commerce partner.',
  navigationLabel: 'Explore our solutions',
  links: [
    { label: 'Store management', anchorId: 'commerce' },
    { label: 'Warehousing & fulfillment', anchorId: 'fulfillment' },
    { label: 'Demand generation', anchorId: 'content' },
    { label: 'Visibility & performance', anchorId: 'business-support' },
  ],
}

export const connectedCapabilitiesDefaults = {
  anchorId: 'connected-capabilities',
  eyebrow: 'Case studies / Results in practice',
  heading: 'Different categories.\nConsistent execution.',
  description:
    'Selected results reported in the FILAS solutions overview. Each case reflects its own category and reporting period.',
  connections: [
    {
      title: 'FMCG / 4.3× sales in one year',
      description:
        'Orders grew 4.2× while average order value rose from ₱464 to ₱480. Sales and orders grew together with a stable basket value.',
    },
    {
      title: 'Pet care / 3.6× sales in one year',
      description:
        'Orders doubled and average order value increased 71%. Growth came from more transactions and larger baskets.',
    },
    {
      title: 'Pharmaceuticals / 46% sales growth in one month',
      description:
        'Orders grew 28% and average basket size increased 14%, improving both transaction volume and the value of each purchase.',
    },
  ],
}
