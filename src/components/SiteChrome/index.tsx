import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'

export const SiteChrome = ({
  children,
  homePath = '/',
}: {
  children: React.ReactNode
  homePath?: string
}) => (
  <div className="filas-site">
    <Header homePath={homePath} />
    <main id="main-content" tabIndex={-1}>
      {children}
    </main>
    <Footer homePath={homePath} />
  </div>
)
