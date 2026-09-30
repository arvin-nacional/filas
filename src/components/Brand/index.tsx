'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

import type { Media as MediaType } from '@/payload-types'

export const Brand = ({
  href = '/',
  logo,
}: {
  href?: string
  logo?: MediaType | string | number | null
}) => {
  const [failed, setFailed] = useState(false)
  const source =
    !failed && typeof logo === 'object' && logo?.url ? logo.url : '/filas-horizontal-logo.png'
  return (
    <Link
      href={href}
      className="inline-flex items-center no-underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-filas-accent-text"
      aria-label="FILAS home"
    >
      <Image
        src={source}
        alt="FILAS"
        width={149}
        height={32}
        quality={100}
        unoptimized
        onError={() => setFailed(true)}
        className="h-8 w-auto"
      />
    </Link>
  )
}
