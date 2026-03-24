import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'

import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const configDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(configDir, '..', '..')
const nodeEnv = process.env.NODE_ENV ?? 'development'

const envFiles = [
  resolve(projectRoot, '.env'),
  resolve(projectRoot, `.env.${nodeEnv}`),
  resolve(projectRoot, '.env.local'),
  resolve(projectRoot, `.env.${nodeEnv}.local`),
]

for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    loadEnvFile(envFile)
  }
}

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().int().positive(),
    SERVER_URL: z.string().url(),
    SERVER_KEY: z.string().min(10),
    CLIENT_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    // Server
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_URL: process.env.SERVER_URL,
    SERVER_KEY: process.env.SERVER_KEY,

    CLIENT_URL: process.env.CLIENT_URL,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
})
