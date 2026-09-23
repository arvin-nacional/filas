'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, FormProvider, type FieldValues } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import { getFormDefaults, getSubmissionData } from './formValues'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
    variant?: 'default' | 'contact'
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    variant = 'default',
  } = props

  const formMethods = useForm({
    defaultValues: getFormDefaults(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const submitting = useRef(false)
  const confirmation = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasSubmitted) confirmation.current?.focus()
  }, [hasSubmitted])

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      if (submitting.current) return
      submitting.current = true
      setError(undefined)
      setIsLoading(true)
      const dataToSend = getSubmissionData(formFromProps.fields, data)

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (!req.ok) {
          setError({
            message:
              res.errors?.[0]?.message || 'We could not send your inquiry. Please try again.',
            status: String(req.status),
          })

          return
        }

        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect) {
          const { url } = redirect

          const redirectUrl = url

          if (redirectUrl) router.push(redirectUrl)
        }
      } catch (err) {
        console.warn(err)
        setError({
          message: 'We could not send your inquiry. Please check your connection and try again.',
        })
      } finally {
        submitting.current = false
        setIsLoading(false)
      }
    },
    [router, formID, formFromProps.fields, redirect, confirmationType],
  )

  return (
    <div className={variant === 'contact' ? undefined : 'container lg:max-w-[48rem]'}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div
        className={
          variant === 'contact' ? undefined : 'p-4 lg:p-6 border border-border rounded-[0.8rem]'
        }
      >
        <FormProvider {...formMethods}>
          {hasSubmitted && (
            <div ref={confirmation} tabIndex={-1} role="status">
              {confirmationMessage && confirmationType === 'message' ? (
                <RichText data={confirmationMessage} enableGutter={false} />
              ) : (
                <p>Thank you. Your inquiry has been received.</p>
              )}
            </div>
          )}
          {error && (
            <div role="alert" className="mb-6">
              {error.message}
            </div>
          )}
          {!hasSubmitted && (
            <form
              id={formID}
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              aria-busy={isLoading}
            >
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                            labelClassName={
                              variant === 'contact' ? 'text-sm leading-relaxed' : undefined
                            }
                            inputClassName={
                              variant === 'contact'
                                ? cn(
                                    'mt-2 min-h-12 rounded-xs border-filas-line bg-filas-paper text-base shadow-none md:text-base',
                                    field.blockType === 'textarea' && 'min-h-36',
                                  )
                                : undefined
                            }
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button
                form={formID}
                type="submit"
                variant="default"
                disabled={isLoading}
                className={
                  variant === 'contact'
                    ? 'min-h-12 rounded-xs bg-filas-ink px-6 py-3.5 text-filas-paper hover:bg-filas-accent-text'
                    : undefined
                }
              >
                {isLoading ? 'Sending…' : submitButtonLabel || 'Send inquiry'}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
