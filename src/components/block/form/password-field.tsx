'use client'

import { useStore } from '@tanstack/react-form'
import type { VariantProps } from 'class-variance-authority'
import React from 'react'

import { Field, FieldError, FieldLabel } from '~/components/ui/field'
import { inputVariants } from '~/components/ui/input'
import { useFieldContext } from '~/hooks/form-context'

import PasswordInput from '../common/password-input'

type PasswordInputProps = React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    label?: string
  }

export default function PasswordField({ label, placeholder }: PasswordInputProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  const isInvalid = !!errors?.length

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className="relative">
        <PasswordInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          autoComplete="off"
          variant="lg"
        />
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
