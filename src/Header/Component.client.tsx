'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

import type { Header } from '@/payload-types'
import { Brand } from '@/components/Brand'
import { CMSLink } from '@/components/Link'
import { headerDefaults, siteURL } from '@/components/SiteChrome/defaults'

import styles from './styles.module.css'

export const HeaderClient = ({
  data,
  homePath = '/',
}: {
  data: Partial<Header>
  homePath?: string
}) => {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navItems = data.navItems?.length ? data.navItems : headerDefaults.navItems

  return (
    <header
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          menuButton.current?.focus()
        }
      }}
    >
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.inner}>
        <Brand href={homePath} />
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
          ref={menuButton}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`${styles.navigation} ${open ? styles.open : ''}`}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) setOpen(false)
          }}
        >
          {navItems.map(({ link }, index) => (
            <CMSLink
              {...link}
              url={link.url ? siteURL(link.url, homePath) : undefined}
              key={index}
              className={styles.navLink}
            />
          ))}
          <Link
            className={styles.action}
            href={siteURL(data.actionURL || headerDefaults.actionURL, homePath)}
          >
            {data.actionLabel || headerDefaults.actionLabel}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
