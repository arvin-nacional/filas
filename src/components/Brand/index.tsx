import Link from 'next/link'

export const Brand = ({ href = '/' }: { href?: string }) => (
  <Link
    href={href}
    className="inline-flex items-baseline text-[27px] leading-none font-semibold tracking-[0.16em] text-filas-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-filas-accent-text"
    aria-label="FILAS home"
  >
    FILAS
    <span className="text-filas-accent-text" aria-hidden="true">
      .
    </span>
  </Link>
)
