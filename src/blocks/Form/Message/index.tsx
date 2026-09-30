import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const Message: React.FC<{ message: DefaultTypedEditorState; compact?: boolean }> = ({
  message,
  compact,
}) => {
  return (
    <Width className={compact ? 'pt-2' : 'my-12'} width="100">
      {message && (
        <RichText
          data={message}
          enableGutter={!compact}
          enableProse={!compact}
          className={compact ? 'text-sm text-filas-ink [&_p]:m-0' : undefined}
        />
      )}
    </Width>
  )
}
