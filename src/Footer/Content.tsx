import { ArrowUpRight } from 'lucide-react'

import type { Footer } from '@/payload-types'
import { Brand } from '@/components/Brand'
import { CMSLink } from '@/components/Link'
import { footerDefaults, siteURL } from '@/components/SiteChrome/defaults'
import { isSocialURL } from './socialLinks'
import { SocialIcon } from './SocialIcon'

export const FooterContent = ({
  data,
  homePath = '/',
}: {
  data: Partial<Footer>
  homePath?: string
}) => {
  const navItems = data.navItems?.length ? data.navItems : footerDefaults.navItems
  const socialLinks = (data.socialLinks ?? footerDefaults.socialLinks).filter(
    ({ label, url }) => label.trim() && isSocialURL(url),
  )
  return (
    <footer className="bg-filas-surface text-filas-ink">
      <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-8 py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-12 sm:py-12 lg:gap-24">
          <div className="min-w-0">
            <Brand href={homePath} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-pretty sm:text-base">
              {footerDefaults.promise}
            </p>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-filas-muted">
              {data.description || footerDefaults.description}
            </p>
            {socialLinks.length > 0 && (
              <nav aria-label="Social media" className="mt-6 flex flex-wrap gap-2">
                {socialLinks.map(({ label, url }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    title={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-filas-line transition-colors hover:border-filas-accent-text hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text"
                  >
                    <SocialIcon url={url} />
                  </a>
                ))}
              </nav>
            )}
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 content-start items-start gap-x-6 gap-y-4 sm:flex sm:flex-col"
          >
            {navItems.map(({ link }, index) => (
              <CMSLink
                {...link}
                url={link.url ? siteURL(link.url, homePath) : undefined}
                key={index}
                className="inline-flex items-center gap-4 text-sm leading-relaxed wrap-anywhere hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text sm:text-xs"
              />
            ))}
            <a
              className="inline-flex items-center gap-4 text-sm leading-relaxed wrap-anywhere hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text sm:text-xs"
              href={siteURL('/#contact', homePath)}
            >
              Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {data.email && (
              <a
                className="inline-flex items-center gap-4 text-sm leading-relaxed wrap-anywhere hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text sm:text-xs"
                href={`mailto:${data.email}`}
              >
                {data.email}
              </a>
            )}
          </nav>
        </div>
        <div className="flex flex-col items-start gap-2 border-t border-filas-line py-6 font-mono text-xs leading-relaxed text-filas-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span>© {new Date().getFullYear()} FILAS</span>
          <span>{data.note || footerDefaults.note}</span>
          <a
            className="text-filas-ink hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text"
            href="#main-content"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
