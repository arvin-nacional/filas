import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const getFormDefaults = (fields: FormFieldBlock[] = []) =>
  Object.fromEntries(
    fields.flatMap((field) => {
      if (!('name' in field) || !field.name) return []
      const fallback = field.blockType === 'checkbox' ? false : ''
      return [[field.name, 'defaultValue' in field ? (field.defaultValue ?? fallback) : fallback]]
    }),
  )

export const getSubmissionData = (fields: FormFieldBlock[] = [], values: Record<string, unknown>) =>
  fields.flatMap((field) => {
    if (!('name' in field) || !field.name) return []
    const value = values[field.name] ?? ''
    return [{ field: field.name, value: Array.isArray(value) ? value.join(', ') : String(value) }]
  })
