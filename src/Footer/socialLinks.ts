export const defaultSocialLinks = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/share/1E8f1Qisvb/?mibextid=wwXIfr',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/filas-inc/',
  },
]

export const isSocialURL = (value: unknown): value is string => {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}
