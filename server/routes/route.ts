import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'

import { corsOptions } from '../config/cors'
import { AppEnv } from '../middleware/auth'
import { api } from './api'

const app = new Hono<AppEnv>()

const ENV_PROD = process.env.NODE_ENV === 'production'

// Resolve frontend build directory
const currentDir = dirname(fileURLToPath(import.meta.url))
const distPath = resolve(currentDir, '..', 'client')
const hasStaticFiles = existsSync(distPath)

app.use('*', logger())
app.use('/api/*', cors(corsOptions))

// Only show JSON root when no frontend is built (dev mode)
if (!hasStaticFiles && !ENV_PROD) {
  app.get('/', (c) => {
    return c.json({
      message: 'Hello World',
      status: 'ok',
    })
  })
}

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
  })
})

app.route('/api', api)

// Serve static frontend files in production
if (hasStaticFiles && ENV_PROD) {
  app.use(
    '/*',
    serveStatic({
      root: distPath,
      rewriteRequestPath: (path) => path,
    })
  )

  // SPA fallback: serve index.html for non-API routes
  app.get('*', (c) => {
    const indexPath = resolve(distPath, 'index.html')
    const html = readFileSync(indexPath, 'utf-8')
    return c.html(html)
  })
}

app.notFound((c) => {
  return c.json({ message: 'Not Found' }, 404)
})

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, error.status)
  }

  if (error instanceof Error) {
    return c.json({ message: error.message }, 500)
  }

  return c.json({ message: 'Unexpected error' }, 500)
})

export const route = app
