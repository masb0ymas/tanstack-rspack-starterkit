/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod'

import type {
  NestedValidationMessagesKey,
  ValidationMessagesKey,
  ValidationMessagesParams,
} from '~/types/message'

import { VALIDATION_MESSAGES } from './constants/message'

/**
 * Detect validation messages type
 * @param ValidationMessages
 * @param params
 * @returns
 */
export function detectValidationMessagesType<T extends ValidationMessagesKey>(
  ValidationMessages: T,
  params: ValidationMessagesParams[T]
): NestedValidationMessagesKey<T> | undefined {
  const msg = VALIDATION_MESSAGES[ValidationMessages]
  if (typeof msg !== 'object') return undefined

  if ('string' in msg && typeof (params as any).min === 'number') {
    return 'string' as NestedValidationMessagesKey<T>
  }
  if ('numeric' in msg && typeof (params as any).min === 'number') {
    return 'numeric' as NestedValidationMessagesKey<T>
  }
  if ('file' in msg && 'file' in params) {
    return 'file' as NestedValidationMessagesKey<T>
  }
  if ('array' in msg && Array.isArray((params as any).values)) {
    return 'array' as NestedValidationMessagesKey<T>
  }

  return 'string' as NestedValidationMessagesKey<T>
}

/**
 * Get validation message
 * @param rule
 * @param params
 * @param type
 * @returns
 */
export function getValidationMessage<T extends ValidationMessagesKey>(
  rule: T,
  params: ValidationMessagesParams[T],
  type?: NestedValidationMessagesKey<T>
): string {
  const message = VALIDATION_MESSAGES[rule]
  let template: string | undefined

  if (typeof message === 'object') {
    const resolvedType = type ?? detectValidationMessagesType(rule, params)
    if (!resolvedType) {
      throw new Error(
        `Rule "${rule}" requires a type (e.g. "string" | "numeric" | "file" | "array").`
      )
    }

    if (resolvedType in message) {
      template = (message as Record<string, string>)[resolvedType as string]
    } else {
      throw new Error(`Type "${String(resolvedType)}" is not valid for rule "${rule}"`)
    }
  } else {
    template = message
  }

  if (!template) {
    throw new Error(`Template for rule "${rule}" not found`)
  }

  return template.replace(/:([a-zA-Z_]+)/g, (_, key) => {
    return (params as any)[key] !== undefined ? String((params as any)[key]) : `:${key}`
  })
}

/**
 * Required string validation
 * @param attribute
 * @returns
 */
export const requiredString = (attribute: string) =>
  z.string().nonempty(getValidationMessage('required', { attribute }))

/**
 * Required email validation
 * @param attribute
 * @returns
 */
export const requiredEmail = (attribute: string) =>
  z.email(getValidationMessage('email', { attribute }))

/**
 * Required number validation
 * @param attribute
 * @returns
 */
export const requiredNumber = (attribute: string) =>
  z.number().refine(Number.isInteger, getValidationMessage('numeric', { attribute }))

/**
 * Required date validation
 * @param attribute
 * @returns
 */
export const requiredDate = (attribute: string) =>
  requiredString(attribute).refine(
    (value) => !Number.isNaN(Date.parse(value)),
    getValidationMessage('date', { attribute })
  )

/**
 * Optional date validation
 * @param attribute
 * @returns
 */
export const optionalDateForm = (attribute: string) =>
  z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      getValidationMessage('date', { attribute })
    )
    .nullable()
    .optional()

/**
 * Optional date validation
 * @param attribute
 * @returns
 */
export const optionalDateFilter = (attribute: string) =>
  z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      getValidationMessage('date', { attribute })
    )
    .optional()

/**
 * Required file validation
 * @param attribute
 * @returns
 */
export const requiredFile = (attribute: string) =>
  z.custom<File>(
    (val) => {
      // If no value provided, it's valid since it's required
      if (val === undefined || val === null) return true
      // If value provided, it must be a File instance
      return val instanceof File
    },
    {
      message: getValidationMessage('file', { attribute }),
    }
  )

/**
 * Optional file validation
 * @param attribute
 * @returns
 */
export const optionalFile = (attribute: string) =>
  z
    .custom<File>(
      (val) => {
        // If no value provided, it's valid since it's optional
        if (val === undefined || val === null) return true
        // If value provided, it must be a File instance
        return val instanceof File
      },
      {
        message: getValidationMessage('file', { attribute }),
      }
    )
    .optional()
