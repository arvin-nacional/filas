'use client'

import Image from 'next/image'
import Link from 'next/link'

export const Brand = ({ href = '/' }: { href?: string }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center no-underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-filas-accent-text"
      aria-label="FILAS home"
    >
      <Image
        src="/filas-horizontal-logo.png"
        alt="FILAS"
        width={149}
        height={32}
        quality={90}
        priority
        sizes="149px"
        style={{ width: 'auto' }}
        className="h-8 w-auto"
      />
    </Link>
  )
}
