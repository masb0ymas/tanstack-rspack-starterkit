import { redirect } from '@tanstack/react-router'

import { authClient } from './auth-client'

export async function getAuthSession() {
  return authClient.getSession()
}

export async function requireAuth() {
  const result = await getAuthSession()

  if (!result.data?.session) {
    throw redirect({
      href: '/sign-in',
    })
  }

  return result.data
}

export async function redirectIfAuthenticated() {
  const result = await getAuthSession()

  if (result.data?.session) {
    throw redirect({
      href: '/dashboard',
    })
  }
}
