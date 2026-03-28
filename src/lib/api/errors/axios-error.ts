import { AxiosError } from 'axios'

export function throwAxiosError(error: Error) {
  if (error instanceof AxiosError) {
    const errors: Record<string, string[]> = error.response?.data?.errors
    const message = error.response?.data?.message

    if (errors && Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors)
        .map(([field, messages]) => {
          const fieldName = field.replace(/_/g, ' ')
          return `field ${fieldName}: ${messages.join(', ')}`
        })
        .join('; ')

      throw new Error(`${message || 'Validation failed'}: ${errorMessages}`)
    }

    throw new Error(message || 'An error occurred while creating source of fund')
  }

  throw new Error(error.message)
}
