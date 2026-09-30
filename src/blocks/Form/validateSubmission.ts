import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export function validateSubmission(fields: FormFieldBlock[], data: unknown): string | undefined {
  if (!Array.isArray(data) || data.length > fields.length) return 'Invalid form answers.'
  const configured = fields.filter((field) => 'name' in field && field.name)
  const answers = new Map<string, string>()
  for (const row of data) {
    if (
      !row ||
      typeof row.field !== 'string' ||
      typeof row.value !== 'string' ||
      answers.has(row.field) ||
      !configured.some((field) => 'name' in field && field.name === row.field)
    )
      return 'Invalid form answers.'
    if (row.value.length > 5000) return 'Please keep each answer under 5,000 characters.'
    answers.set(row.field, row.value.trim())
  }
  for (const field of configured) {
    if (!('name' in field)) continue
    const value = answers.get(field.name) || ''
    const label = ('label' in field && field.label) || field.name
    if (
      'required' in field &&
      field.required &&
      (!value || (field.blockType === 'checkbox' && value !== 'true'))
    )
      return `${label} is required.`
    if (!value) continue
    if (field.blockType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Enter a valid email address.'
    if (field.blockType === 'checkbox' && !['true', 'false'].includes(value))
      return `Choose a valid value for ${label}.`
    if (field.blockType === 'select' && !field.options.some((option) => option.value === value))
      return `Choose a valid option for ${label}.`
    if (String(field.blockType) === 'number' && !Number.isFinite(Number(value)))
      return `Enter a number for ${label}.`
  }
}
