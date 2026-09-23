import { ArrowUpRight } from 'lucide-react'

import type { Footer } from '@/payload-types'
import { Brand } from '@/components/Brand'
import { CMSLink } from '@/components/Link'
import { footerDefaults, siteURL } from '@/components/SiteChrome/defaults'

export const FooterContent = ({
  data,
  homePath = '/',
}: {
  data: Partial<Footer>
  homePath?: string
}) => {
  const navItems = data.navItems?.length ? data.navItems : footerDefaults.navItems
  return (
    <footer className="bg-filas-surface text-filas-ink">
      <div className="mx-auto w-full max-w-[1392px] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-9 py-12 sm:grid-cols-2 sm:gap-10 sm:py-16 lg:grid-cols-[1fr_1.2fr_0.65fr] lg:gap-16">
          <div>
            <Brand href={homePath} />
            <p className="mt-6 text-sm leading-loose whitespace-pre-line text-filas-muted">
              {data.description || footerDefaults.description}
            </p>
          </div>
          <p className="text-3xl leading-snug font-normal tracking-tight whitespace-pre-line">
            {data.promise || footerDefaults.promise}
          </p>
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:flex-wrap sm:gap-6 lg:col-span-1 lg:flex-col lg:gap-4"
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
