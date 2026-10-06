import { Facebook, Globe, Instagram, Linkedin } from 'lucide-react'

export const SocialIcon = ({ url }: { url: string }) => {
  const hostname = new URL(url).hostname.toLowerCase()
  const isSite = (domain: string) => hostname === domain || hostname.endsWith(`.${domain}`)
  const iconProps = { size: 20, 'aria-hidden': true as const }

  if (isSite('facebook.com') || isSite('fb.me')) return <Facebook {...iconProps} />
  if (isSite('instagram.com')) return <Instagram {...iconProps} />
  if (isSite('linkedin.com') || isSite('lnkd.in')) return <Linkedin {...iconProps} />
  if (isSite('tiktok.com')) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.6 2h-3.1v13.2a3.1 3.1 0 1 1-2.7-3.1V9a6.3 6.3 0 1 0 5.8 6.2V8.5a8 8 0 0 0 4.7 1.5V6.9A4.8 4.8 0 0 1 16.6 2Z" />
      </svg>
    )
  }

  return <Globe {...iconProps} />
}
