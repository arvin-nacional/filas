import Image from 'next/image'
import Link from 'next/link'

import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

export const Brand = ({
  href = '/',
  logo,
}: {
  href?: string
  logo?: MediaType | string | number | null
}) => (
  <Link
    href={href}
    className="inline-flex items-center no-underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-filas-accent-text"
    aria-label="FILAS home"
  >
    {typeof logo === 'object' && logo?.url ? (
      <Media resource={logo} htmlElement={null} imgClassName="h-8 w-auto" size="150px" priority />
    ) : (
      <Image
        src="/filas-horizontal-logo.png"
        alt="FILAS"
        width={149}
        height={32}
        quality={100}
        className="h-8 w-auto"
      />
    )}
  </Link>
)
