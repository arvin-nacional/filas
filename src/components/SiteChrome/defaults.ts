import type { Footer, Header } from '@/payload-types'

export const navigationDefaults = [
  { link: { type: 'custom' as const, label: 'About FILAS', url: '/#about' } },
  { link: { type: 'custom' as const, label: 'Our capabilities', url: '/#services' } },
  { link: { type: 'custom' as const, label: 'Who we work with', url: '/#partners' } },
]

export const headerDefaults = {
  navItems: navigationDefaults,
  actionLabel: "Let's talk",
  actionURL: '/#contact',
} satisfies Omit<Header, 'id' | 'createdAt' | 'updatedAt'>

export const footerDefaults = {
  navItems: navigationDefaults,
  description: 'Your e-commerce enabler.\nYour partner in what comes next.',
  promise: 'First to Execute.\nLast to See Things Through.',
  note: 'Built on partnership. Driven by progress.',
} satisfies Omit<Footer, 'id' | 'createdAt' | 'updatedAt'>

// The development preview uses the same content without navigating to the live holding page.
export const siteURL = (url: string, homePath = '/') =>
  homePath !== '/' && (url === '/' || url.startsWith('/#')) ? `${homePath}${url.slice(1)}` : url
