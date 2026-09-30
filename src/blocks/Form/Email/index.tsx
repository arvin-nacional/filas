import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
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
        type="email"
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        spellCheck={false}
        maxLength={254}
        aria-required={required || undefined}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...register(name, {
          setValueAs: (value) => (typeof value === 'string' ? value.trim() : value),
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
          required,
        })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
