// Draft service copy based on the website proposal's capability inventory.
export const capabilityGroups = [
  {
    anchorId: 'commerce',
    eyebrow: '01 / Commerce & channels',
    heading: 'Show up where\nyour customers are.',
    description:
      'Connect your marketplace presence, brand website, and retail channels with practical support for the everyday work of selling.',
    tone: 'paper' as const,
    services: [
      {
        title: 'Shopee & Lazada',
        description:
          'Support for marketplace storefronts, product listings, and day-to-day store management.',
      },
      {
        title: 'TikTok Shop',
        description:
          'Bring your shop, content, and selling activity together on a channel built around discovery.',
      },
      {
        title: 'Brand websites & D2C',
        description:
          'Build a direct connection with your customers through a brand-owned online store.',
      },
      {
        title: 'Retail store management',
        description:
          'Coordinate your retail presence with the wider needs of your brand and sales channels.',
      },
    ],
  },
  {
    anchorId: 'fulfillment',
    eyebrow: '02 / Fulfillment & systems',
    heading: 'Keep the promise\nbeyond the checkout.',
    description:
      'Connect inventory, orders, and delivery so the work behind the scenes supports the experience your customers expect.',
    tone: 'surface' as const,
    services: [
      {
        title: 'Storage & warehousing',
        description:
          'Organize the storage and handling of your products around the needs of your business.',
      },
      {
        title: 'Fulfillment & logistics',
        description: 'Coordinate the steps from receiving an order to preparing it for delivery.',
      },
      {
        title: 'Warehouse Management Systems',
        description: 'Support the systems that help your team manage stock and warehouse activity.',
      },
      {
        title: 'Order Management Systems',
        description:
          'Bring order information and operational workflows together across your channels.',
      },
    ],
  },
  {
    anchorId: 'content',
    eyebrow: '03 / Content & activation',
    heading: 'Give people a reason\nto connect.',
    description:
      'Turn your brand story into creative work, content, and experiences that meet your audience online and on the ground.',
    tone: 'paper' as const,
    services: [
      {
        title: 'Social media management',
        description: 'Plan and manage a social presence that gives your brand a consistent voice.',
      },
      {
        title: 'Creative concepts & execution',
        description:
          'Develop ideas and bring them to life through creative work shaped around your brand.',
      },
      {
        title: 'Online & on-ground activations',
        description:
          'Create opportunities for people to discover, experience, and engage with your brand.',
      },
      {
        title: 'Affiliate management',
        description:
          'Coordinate affiliate activity as part of your wider content and commerce plan.',
      },
      {
        title: 'Live selling',
        description: 'Bring product storytelling and selling together through live experiences.',
      },
    ],
  },
  {
    anchorId: 'business-support',
    eyebrow: '04 / Business support',
    heading: 'Find a way through\nthe next step.',
    description:
      'Explore the practical support your business needs as it enters a market, opens a channel, or takes on a new challenge.',
    tone: 'surface' as const,
    services: [
      {
        title: 'Importer on Record',
        description:
          'Discuss your import requirements and the scope of support appropriate to your products and market.',
      },
      {
        title: 'Seller on Record',
        description:
          'Explore a selling arrangement suited to your business needs and chosen channels.',
      },
      {
        title: 'Value-added services',
        description:
          'Talk through the gaps in your current setup and identify where additional support could help.',
      },
    ],
  },
]

export const capabilitiesHeroDefaults = {
  eyebrow: 'Our capabilities',
  heading: 'All the moving parts.',
  emphasis: 'Moving together.',
  description:
    'Strategy, commerce, creative, and fulfillment. The capabilities your brand needs, connected by a partner who sees the whole picture.',
  navigationLabel: 'Explore our capabilities',
  links: [
    { label: 'Commerce & channels', anchorId: 'commerce' },
    { label: 'Fulfillment & systems', anchorId: 'fulfillment' },
    { label: 'Content & activation', anchorId: 'content' },
    { label: 'Business support', anchorId: 'business-support' },
  ],
}

export const connectedCapabilitiesDefaults = {
  anchorId: 'connected-capabilities',
  eyebrow: 'One connected partnership',
  heading: 'Your business works together.\nYour support should, too.',
  description:
    'Start with the support you need today. Build the connections that make your next stage possible.',
  connections: [
    {
      title: 'From attention to action',
      description:
        'Connect content and activation with the channels where customers can discover and buy your products.',
    },
    {
      title: 'From an order to an experience',
      description:
        'Bring commerce, inventory, and fulfillment into the same conversation, so plans account for what happens after a sale.',
    },
    {
      title: 'From a plan to everyday progress',
      description:
        'Align your priorities, people, and systems around practical next steps and clear responsibilities.',
    },
  ],
}
