import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { FooterContent } from '@/Footer/Content'
import { defaultSocialLinks, isSocialURL } from '@/Footer/socialLinks'

describe('Footer social media links', () => {
  it('shows the provided Facebook and LinkedIn links for existing footer content', () => {
    const html = renderToStaticMarkup(createElement(FooterContent, { data: {} }))
    for (const { label, url } of defaultSocialLinks) {
      expect(html).toContain(`href="${url.replaceAll('&', '&amp;')}"`)
      expect(html).toContain(`${label} (opens in a new tab)`)
    }
    expect(html).toContain('rel="noopener noreferrer"')
    const document = new DOMParser().parseFromString(html, 'text/html')
    const links = document.querySelectorAll('nav[aria-label="Social media"] a')
    expect(links).toHaveLength(2)
    for (const link of links) {
      expect(link.textContent).toBe('')
      expect(link.querySelector('svg[aria-hidden="true"]')).not.toBeNull()
    }
  })

  it('renders CMS links in the saved order, including other sites', () => {
    const html = renderToStaticMarkup(
      createElement(FooterContent, {
        data: {
          socialLinks: [
            { label: 'TikTok', url: 'https://www.tiktok.com/@filas' },
            { label: 'Instagram', url: 'https://www.instagram.com/filas/' },
            { label: 'Our community', url: 'https://example.com/community' },
          ],
        },
      }),
    )
    expect(html).not.toContain('facebook.com')
    expect(html.indexOf('TikTok')).toBeLessThan(html.indexOf('Instagram'))
    expect(html).toContain('href="https://example.com/community"')
    expect(html).toContain('lucide-instagram')
    expect(html).toContain('lucide-globe')
  })

  it('keeps social links hidden when the editor removes all rows', () => {
    const html = renderToStaticMarkup(
      createElement(FooterContent, { data: { socialLinks: [] } }),
    )
    expect(html).not.toContain('aria-label="Social media"')
    expect(html).not.toContain('facebook.com')
  })

  it.each(['javascript:alert(1)', 'data:text/html,test', '/profile', 'invalid', ''])(
    'rejects unsafe or incomplete social URLs: %s',
    (url) => {
      expect(isSocialURL(url)).toBe(false)
      const html = renderToStaticMarkup(
        createElement(FooterContent, { data: { socialLinks: [{ label: 'Invalid', url }] } }),
      )
      expect(html).not.toContain('aria-label="Social media"')
    },
  )
})
