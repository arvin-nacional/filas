import { ArrowUpRight } from 'lucide-react'

import type { Footer } from '@/payload-types'
import { Brand } from '@/components/Brand'
import { CMSLink } from '@/components/Link'
import { footerDefaults, siteURL } from '@/components/SiteChrome/defaults'

import styles from './styles.module.css'

export const FooterContent = ({
  data,
  homePath = '/',
}: {
  data: Partial<Footer>
  homePath?: string
}) => {
  const navItems = data.navItems?.length ? data.navItems : footerDefaults.navItems
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Brand href={homePath} />
            <p>{data.description || footerDefaults.description}</p>
          </div>
          <p className={styles.promise}>{data.promise || footerDefaults.promise}</p>
          <nav aria-label="Footer navigation" className={styles.navigation}>
            {navItems.map(({ link }, index) => (
              <CMSLink
                {...link}
                url={link.url ? siteURL(link.url, homePath) : undefined}
                key={index}
              />
            ))}
            <a href={siteURL('/#contact', homePath)}>
              Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} FILAS</span>
          <span>{data.note || footerDefaults.note}</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
