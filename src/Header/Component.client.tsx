'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

import type { Header } from '@/payload-types'
import { Brand } from '@/components/Brand'
import { CMSLink } from '@/components/Link'
import { siteURL } from '@/components/SiteChrome/defaults'

import { cn } from '@/utilities/ui'

export const HeaderClient = ({ data, homePath = '/' }: { data: Header; homePath?: string }) => {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navItems = data.navItems ?? []

  return (
    <header
      className="sticky top-0 z-30 bg-filas-paper text-filas-ink"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          menuButton.current?.focus()
        }
      }}
    >
      <a
        className="absolute top-3 left-3 z-50 -translate-y-[200%] bg-filas-ink px-5 py-3 text-filas-paper focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-20 w-[calc(100%-2.5rem)] max-w-7xl flex-wrap items-center justify-between border-b border-filas-line sm:w-[calc(100%-4rem)] md:min-h-24 md:flex-nowrap md:gap-8 lg:w-[calc(100%-7rem)]">
        <Brand href={homePath} />
        <button
          className="inline-flex min-h-11 items-center gap-3 py-2 pl-3 font-mono text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text md:hidden"
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
          className={cn(
            'w-full flex-col gap-0 pt-3 pb-6 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:py-0 lg:gap-8',
            open ? 'flex' : 'hidden',
          )}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) setOpen(false)
          }}
        >
          {navItems.map(({ link }, index) => (
            <CMSLink
              {...link}
              url={link.url ? siteURL(link.url, homePath) : undefined}
              key={index}
              className="border-t border-filas-line py-4 text-base leading-relaxed text-filas-muted transition-colors hover:text-filas-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none md:border-0 md:py-0 md:text-xs"
            />
          ))}
          {data.actionURL && data.actionLabel && (
            <Link
              className="mt-3 inline-flex min-h-12 items-center justify-between gap-6 rounded-xs border border-filas-line px-4 py-3 text-sm text-filas-ink transition-colors hover:border-filas-ink hover:bg-filas-ink hover:text-filas-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text motion-reduce:transition-none md:mt-0 md:min-h-11 md:text-xs"
              href={siteURL(data.actionURL, homePath)}
            >
              {data.actionLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
