import { createAuthClient } from 'better-auth/react'

import { env } from '~/env'

import { AUTH_PROVIDERS } from '../constants/auth'

export const authClient = createAuthClient({
  baseURL: env.PUBLIC_SERVER_URL,
  fetchOptions: {
    credentials: 'include',
  },
})

export const signInWithGoogle = () => {
  const ENV_PROD = process.env.NODE_ENV === 'production'
  const callbackURL = ENV_PROD ? '/dashboard' : `${env.PUBLIC_CLIENT_URL}/dashboard`

  return authClient.signIn.social({
    provider: AUTH_PROVIDERS.GOOGLE,
    callbackURL,
  })
}

export const { signIn, signOut, signUp, useSession } = authClient
