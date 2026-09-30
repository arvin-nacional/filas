'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useForm, FormProvider, type FieldValues } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import { getFormDefaults, getSubmissionData } from './formValues'

const subscribeToHydration = () => () => {}

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
  const isReady = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  )
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

        const res = await req.json().catch(() => null)

        if (!req.ok) {
          setError({
            message:
              res?.errors?.[0]?.message || 'We could not send your inquiry. Please try again.',
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
    <div className={variant === 'contact' ? undefined : 'container lg:max-w-3xl'}>
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
            <div
              ref={confirmation}
              tabIndex={-1}
              role="status"
              className="rounded-lg border border-filas-line bg-filas-paper p-6 focus-visible:outline-2 focus-visible:outline-filas-accent-text"
            >
              <h4 className="mb-3 text-2xl font-medium tracking-tight">
                Thank you for getting in touch.
              </h4>
              {confirmationMessage && confirmationType === 'message' ? (
                <RichText
                  data={confirmationMessage}
                  enableGutter={false}
                  enableProse={variant !== 'contact'}
                  className={
                    variant === 'contact' ? 'text-filas-ink leading-relaxed [&_p]:m-0' : undefined
                  }
                />
              ) : (
                <p>Thank you. Your inquiry has been received.</p>
              )}
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {error.message}
            </div>
          )}
          {!hasSubmitted && (
            <form
              id={formID}
              method="post"
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              aria-busy={isLoading}
              noValidate
            >
              <noscript>
                <p>Please enable JavaScript to send an inquiry through this form.</p>
              </noscript>
              <fieldset disabled={isLoading || !isReady} className="m-0 min-w-0 border-0 p-0">
                <legend className="sr-only">{formFromProps.title || 'Inquiry details'}</legend>
                <div
                  className={
                    variant === 'contact'
                      ? 'mb-7 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2'
                      : 'mb-4 last:mb-0'
                  }
                >
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (Field) {
                        return (
                          <div
                            className={
                              variant === 'contact'
                                ? cn(
                                    'min-w-0',
                                    field.blockType === 'checkbox' ||
                                      ('width' in field && Number(field.width) <= 50)
                                      ? ''
                                      : 'sm:col-span-2',
                                    field.blockType === 'checkbox' &&
                                      'rounded-lg border border-filas-line bg-filas-paper px-3',
                                  )
                                : 'mb-6 last:mb-0'
                            }
                            key={index}
                          >
                            <Field
                              form={formFromProps}
                              compact={variant === 'contact'}
                              {...field}
                              width={
                                variant === 'contact'
                                  ? 100
                                  : 'width' in field
                                    ? field.width
                                    : undefined
                              }
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
                                      field.blockType === 'textarea' && 'min-h-28',
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
                  disabled={isLoading || !isReady}
                  className={
                    variant === 'contact'
                      ? 'min-h-12 w-full rounded-lg bg-filas-accent-text px-6 py-3.5 text-filas-paper hover:bg-filas-ink'
                      : undefined
                  }
                >
                  {isLoading ? 'Sending…' : submitButtonLabel || 'Send inquiry'}
                </Button>
              </fieldset>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
