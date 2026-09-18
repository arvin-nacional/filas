import Image from 'next/image'
import React from 'react'

import type { ComingSoonBlock as ComingSoonBlockProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { comingSoonDefaults } from './defaults'
import styles from './styles.module.css'

export const ComingSoonBlock: React.FC<ComingSoonBlockProps> = ({
  logo,
  eyebrow = comingSoonDefaults.eyebrow,
  heading = comingSoonDefaults.heading,
  description = comingSoonDefaults.description,
  footerNote = comingSoonDefaults.footerNote,
}) => {
  const customLogo = logo && typeof logo === 'object' && logo.url ? logo : null

  return (
    <section className={styles.page} aria-label="FILAS coming soon">
      <div className={styles.frame}>
        <div className={styles.topline}>
          <span>FILAS</span>
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            In the works
          </span>
        </div>

        <div className={styles.content}>
          <Image
            alt={customLogo?.alt || 'FILAS'}
            className={styles.logo}
            height={customLogo?.height || 2000}
            priority
            quality={100}
            sizes="(max-width: 600px) 200px, 240px"
            src={customLogo ? getMediaUrl(customLogo.url, customLogo.updatedAt) : '/filas-logo.jpg'}
            width={customLogo?.width || 2000}
          />
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.heading}>
            {heading}
            {!/[.!?]$/.test(heading) && (
              <span className={styles.period} aria-hidden="true">
                .
              </span>
            )}
          </h1>
          {description && <p className={styles.description}>{description}</p>}
          <span className={styles.rule} aria-hidden="true" />
        </div>

        <div className={styles.footer}>
          <span>© {new Date().getFullYear()} FILAS</span>
          {footerNote && <span>{footerNote}</span>}
        </div>
      </div>
    </section>
  )
}
