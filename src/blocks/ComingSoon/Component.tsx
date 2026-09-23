import Image from 'next/image'
import React from 'react'

import type { ComingSoonBlock as ComingSoonBlockProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { comingSoonDefaults } from './defaults'

const classes = {
  page: 'min-h-svh bg-[#faf9f6] px-[clamp(24px,5vw,80px)] text-[#1c1c1b] scheme-light [--coming-soon-accent:#b85236]',
  frame: 'mx-auto flex min-h-svh max-w-[1440px] flex-col',
  topline:
    'flex min-h-[76px] items-center justify-between gap-[24px] border-b border-[#dfddd6] text-[11px] leading-[1.6] tracking-[0.16em] uppercase [font-family:var(--font-geist-mono),monospace] [&>:first-child]:font-semibold [&>:first-child]:tracking-[0.3em] [@media(max-width:600px)]:min-h-[72px] [@media(max-width:600px)]:text-[10px]',
  status: 'inline-flex items-center gap-[10px] text-[#69655f]',
  dot: 'h-[6px] w-[6px] rounded-full bg-(--coming-soon-accent)',
  content:
    'flex flex-1 flex-col items-center justify-center px-0 pt-[32px] pb-[40px] text-center [@media(max-width:600px)]:pt-[24px] [@media(max-width:600px)]:pb-[36px]',
  logo: 'mb-[24px] block h-[clamp(160px,22svh,240px)] w-[clamp(160px,22svh,240px)] object-contain mix-blend-multiply [@media(max-width:600px)]:h-[clamp(150px,24svh,200px)] [@media(max-width:600px)]:w-[clamp(150px,24svh,200px)]',
  eyebrow:
    'm-0 mb-[16px] text-[10px] leading-[1.8] tracking-[0.19em] text-[#9e442e] uppercase [font-family:var(--font-geist-mono),monospace] [@media(max-width:600px)]:max-w-[250px] [@media(max-width:600px)]:text-[9px]',
  heading:
    'm-0 max-w-full text-[clamp(56px,8.5vw,120px)] leading-[1.05] font-medium tracking-[-0.075em] text-balance [overflow-wrap:anywhere]',
  period: 'text-(--coming-soon-accent)',
  description:
    'm-0 mt-[24px] max-w-[390px] text-[16px] leading-[1.8] text-pretty whitespace-pre-line text-[#69655f] [@media(max-width:600px)]:max-w-[300px] [@media(max-width:600px)]:text-[14px]',
  rule: 'mt-[32px] h-[2px] w-[40px] bg-(--coming-soon-accent)',
  footer:
    'flex min-h-[68px] items-center justify-between gap-[24px] border-t border-[#dfddd6] py-[24px] text-[11px] leading-[1.6] text-[#76716a] [font-family:var(--font-geist-mono),monospace] [@media(max-width:600px)]:flex-col [@media(max-width:600px)]:items-start [@media(max-width:600px)]:gap-[6px] [@media(max-width:600px)]:text-[10px]',
}

export const ComingSoonBlock: React.FC<ComingSoonBlockProps> = ({
  logo,
  eyebrow = comingSoonDefaults.eyebrow,
  heading = comingSoonDefaults.heading,
  description = comingSoonDefaults.description,
  footerNote = comingSoonDefaults.footerNote,
}) => {
  const customLogo = logo && typeof logo === 'object' && logo.url ? logo : null

  return (
    <section className={classes.page} aria-label="FILAS coming soon">
      <div className={classes.frame}>
        <div className={classes.topline}>
          <span>FILAS</span>
          <span className={classes.status}>
            <span className={classes.dot} aria-hidden="true" />
            In the works
          </span>
        </div>

        <div className={classes.content}>
          <Image
            alt={customLogo?.alt || 'FILAS'}
            className={classes.logo}
            height={customLogo?.height || 2000}
            priority
            quality={100}
            sizes="(max-width: 600px) 200px, 240px"
            src={customLogo ? getMediaUrl(customLogo.url, customLogo.updatedAt) : '/filas-logo.jpg'}
            width={customLogo?.width || 2000}
          />
          {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}
          <h1 className={classes.heading}>
            {heading}
            {!/[.!?]$/.test(heading) && (
              <span className={classes.period} aria-hidden="true">
                .
              </span>
            )}
          </h1>
          {description && <p className={classes.description}>{description}</p>}
          <span className={classes.rule} aria-hidden="true" />
        </div>

        <div className={classes.footer}>
          <span>© {new Date().getFullYear()} FILAS</span>
          {footerNote && <span>{footerNote}</span>}
        </div>
      </div>
    </section>
  )
}
