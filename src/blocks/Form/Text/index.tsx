import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    labelClassName?: string
    inputClassName?: string
    register: UseFormRegister<FieldValues>
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
      <Input
        className={inputClassName}
        defaultValue={defaultValue}
        id={name}
        type={/phone|mobile|telephone/i.test(name) ? 'tel' : 'text'}
        autoComplete={
          /phone|mobile|telephone/i.test(name)
            ? 'tel'
            : /company|brand/i.test(name)
              ? 'organization'
              : /name/i.test(name)
                ? 'name'
                : undefined
        }
        maxLength={200}
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
