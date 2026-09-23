export const growthHeroDefaults = {
  eyebrow: 'Your next chapter starts here',
  heading: 'You have built something',
  emphasis: 'worth growing',
  description:
    'FILAS helps you take it further. We bring strategy, commerce, creative, and fulfillment together to support your next stage of growth.',
  primaryLink: { label: "Let's talk about your brand", url: '/#contact' },
  secondaryLink: { label: 'Explore our capabilities', url: '/#services' },
  footnote: 'First to Execute. Last to See Things Through.',
}

export const growthIntroDefaults = {
  anchorId: 'about',
  eyebrow: '01 / A partner in your progress',
  heading: 'Growth brings possibility. And a lot of moving parts.',
  description:
    'More orders. More channels. More to bring together. As your brand grows, the things that got you here need room to grow, too.',
  supportingText:
    'We get to know your business, build on what is working, and connect the strategy, systems, and people that help you move forward.',
  statement: 'Your ambition. Our shared commitment.',
}

export const approachDefaults = {
  anchorId: 'approach',
  eyebrow: '02 / How we work',
  heading: 'We listen first.\nThen get to work.',
  description: 'Good partnerships start with understanding. Ours is built to go the distance.',
  steps: [
    {
      title: 'Listen',
      description:
        'We start with your story. What you have built, what is working, and where you want to go.',
    },
    {
      title: 'Optimize',
      description:
        'Together, we find the opportunities and build a practical plan around your business.',
    },
    {
      title: 'Execute',
      description:
        'We bring the right people, systems, and capabilities together to turn the plan into progress.',
    },
    {
      title: 'Stay accountable',
      description:
        'We stay involved, work through the challenges, and keep moving forward with you.',
    },
  ],
}

export const servicesOverviewDefaults = {
  anchorId: 'services',
  eyebrow: '03 / Connected capabilities',
  heading: 'All the moving parts.\nMoving together.',
  description:
    'The support your brand needs, connected by one partner. Start where you are. Build from there.',
  services: [
    {
      title: 'Commerce & channels',
      summary: 'Show up where your customers are.',
      description:
        'Bring your stores and sales channels together with hands-on support for the everyday work of e-commerce.',
      capabilities: [
        { label: 'Shopee & Lazada' },
        { label: 'TikTok Shop' },
        { label: 'Brand websites & D2C' },
        { label: 'Retail store management' },
      ],
    },
    {
      title: 'Fulfillment & systems',
      summary: 'Keep your operations ready for growth.',
      description:
        'Connect storage, orders, and delivery with the systems and operational support that help your business keep moving.',
      capabilities: [
        { label: 'Storage & warehousing' },
        { label: 'Fulfillment & logistics' },
        { label: 'Warehouse Management Systems' },
        { label: 'Order Management Systems' },
      ],
    },
    {
      title: 'Content & activation',
      summary: 'Give people a reason to connect.',
      description:
        'Bring your brand to life through creative, content, and experiences that meet your audience online and on the ground.',
      capabilities: [
        { label: 'Social media management' },
        { label: 'Creative concepts & execution' },
        { label: 'Online & on-ground activations' },
        { label: 'Affiliate management' },
        { label: 'Live selling' },
      ],
    },
    {
      title: 'Business support',
      summary: 'Find a way through the next step.',
      description:
        'Talk to us about the practical support your business needs to enter a market or take its next step.',
      capabilities: [
        { label: 'Importer on Record' },
        { label: 'Seller on Record' },
        { label: 'Value-added services' },
      ],
    },
  ],
}

export const audienceDefaults = {
  anchorId: 'partners',
  eyebrow: '04 / Who we work with',
  heading: 'A partner for\nyour next stage.',
  description:
    'You do not need to have it all figured out. Wherever your brand is today, we can start there.',
  stages: [
    {
      label: 'Building your foundation',
      title: 'Start-ups',
      description:
        'You are finding your audience and building your first channels. Let’s put the right foundations in place.',
      featured: false,
    },
    {
      label: 'Ready for what is next',
      title: 'Scale-ups',
      description:
        'Your brand is growing, and so is the complexity. Let’s connect the moving parts and make room for your next chapter.',
      featured: true,
    },
    {
      label: 'Strengthening your ecosystem',
      title: 'Enterprise brands',
      description:
        'You know where you want to go. We bring focused expertise and hands-on support to the parts that need it.',
      featured: false,
    },
  ],
}

export const contactInvitationDefaults = {
  anchorId: 'contact',
  eyebrow: 'Let’s take the next step',
  heading: 'Tell us where you are.\nLet’s work out what comes next.',
  description:
    'Bring your ambition, your questions, and the challenges on your mind. We’re here to listen.',
  link: { label: 'Start a conversation', url: '/contact' },
  note: 'Every brand deserves a committed partner.',
}
