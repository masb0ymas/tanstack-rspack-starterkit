import z from 'zod'

import { requiredEmail, requiredString } from '~/lib/validation'

export const EmailSignInSchema = z.object({
  email: requiredEmail('email'),
  password: requiredString('password'),
})

export type EmailSignInDto = z.infer<typeof EmailSignInSchema>
