import { getCachedGlobal } from '@/utilities/getGlobals'
import { FooterContent } from './Content'

export async function Footer({ homePath = '/' }: { homePath?: string } = {}) {
  const footerData = await getCachedGlobal('footer', 1)()
  return <FooterContent data={footerData} homePath={homePath} />
}
