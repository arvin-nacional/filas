import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    labelClassName?: string
    register: UseFormRegister<FieldValues>
  }
> = ({ labelClassName, name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required })
  const { setValue } = useFormContext()

  return (
    <Width width={width}>
      <div className="flex min-h-11 items-center gap-3">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          aria-required={required || undefined}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked === true, { shouldValidate: true, shouldDirty: true })
          }}
        />
        <Label
          className={`flex min-h-11 flex-1 cursor-pointer items-center ${labelClassName || ''}`}
          htmlFor={name}
        >
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
          {label}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
