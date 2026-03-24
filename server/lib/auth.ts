import { betterAuth } from 'better-auth'

import { env } from '../config/env'

export const auth = betterAuth({
  baseURL: env.SERVER_URL,
  secret: env.SERVER_KEY,
  trustedOrigins: [env.CLIENT_URL],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      accessType: 'offline',
      prompt: 'select_account consent',
    },
  },
})
