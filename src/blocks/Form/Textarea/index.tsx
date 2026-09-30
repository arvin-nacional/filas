import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    labelClassName?: string
    inputClassName?: string
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  labelClassName,
  inputClassName,
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
}) => {
  return (
    <Width width={width}>
      <Label className={labelClassName} htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        className={inputClassName}
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        maxLength={5000}
        aria-required={required || undefined}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...register(name, {
          required,
          validate: (value) =>
            !required || Boolean(String(value || '').trim()) || 'This field is required',
        })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
