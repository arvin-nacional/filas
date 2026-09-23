import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header({ homePath = '/' }: { homePath?: string } = {}) {
  const headerData = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} homePath={homePath} />
}
