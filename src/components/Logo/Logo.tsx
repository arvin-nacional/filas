import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  size?: number
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, size = 34 } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="FILAS"
      width={size}
      height={size}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
      src="/filas-logo.jpg"
    />
  )
}

export const AdminLogo = () => <Logo size={160} loading="eager" priority="high" />
