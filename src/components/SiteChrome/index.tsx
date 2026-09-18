import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'

export const SiteChrome = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
