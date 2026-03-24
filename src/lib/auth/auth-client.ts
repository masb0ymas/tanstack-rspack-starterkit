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
  return authClient.signIn.social({
    provider: AUTH_PROVIDERS.GOOGLE,
    callbackURL: `${env.PUBLIC_CLIENT_URL}/dashboard`,
  })
}

export const { signIn, signOut, signUp, useSession } = authClient
