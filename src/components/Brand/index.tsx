import Link from 'next/link'

import styles from './styles.module.css'

export const Brand = ({ href = '/' }: { href?: string }) => (
  <Link href={href} className={styles.brand} aria-label="FILAS home">
    FILAS<span aria-hidden="true">.</span>
  </Link>
)
