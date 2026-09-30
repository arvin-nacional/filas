import { APIError, type CollectionBeforeValidateHook } from 'payload'
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import { validateSubmission } from '@/blocks/Form/validateSubmission'

export const validateFormSubmission: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') return data
  const formID = typeof data?.form === 'object' ? data.form?.id : data?.form
  if (!formID) throw new APIError('Select a valid form.', 400)
  const form = await req.payload.findByID({
    collection: 'forms',
    id: formID,
    depth: 0,
    overrideAccess: false,
    req,
  })
  const error = validateSubmission((form.fields || []) as FormFieldBlock[], data?.submissionData)
  if (error) throw new APIError(error, 400)
  return {
    ...data,
    submissionData: data?.submissionData?.map((row: { field: string; value: string }) => ({
      ...row,
      value: row.value.trim(),
    })),
  }
}
