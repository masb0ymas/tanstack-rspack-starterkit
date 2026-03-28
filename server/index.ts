import { existsSync, readFileSync } from 'node:fs'
import type { Socket } from 'node:net'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'

import { env } from './config/env'
import { prettyLog } from './lib/colorize'
import { type AppEnv } from './middleware/auth'
import { api } from './routes/api'

const app = new Hono<AppEnv>()

const ENV_PROD = process.env.NODE_ENV === 'production'

// Resolve frontend build directory
const currentDir = dirname(fileURLToPath(import.meta.url))
const distPath = resolve(currentDir, '..', 'client')
const hasStaticFiles = existsSync(distPath)

app.use('*', logger())
app.use(
  '/api/*',
  cors({
    origin: env.CLIENT_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
)

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

const port = env.PORT

const server = serve({ fetch: app.fetch, port }, (info) => {
  const authEndpoint = ENV_PROD ? `http://localhost:${info.port}` : env.BETTER_AUTH_URL

  prettyLog('server', `Hono server running on http://localhost:${info.port} 🚀`)
  prettyLog('server', `Better Auth endpoint: ${authEndpoint}/api/auth 🔥`)
})

const activeSockets = new Set<Socket>()

server.on('connection', (socket) => {
  activeSockets.add(socket)

  socket.on('close', () => {
    activeSockets.delete(socket)
  })
})

let isShuttingDown = false

const gracefulShutdown = (signal: NodeJS.Signals) => {
  if (isShuttingDown) {
    return
  }

  isShuttingDown = true
  prettyLog('server', `Received ${signal}, shutting down... 💤`)

  if ('closeAllConnections' in server && typeof server.closeAllConnections === 'function') {
    server.closeAllConnections()
  }

  for (const socket of activeSockets) {
    socket.destroy()
  }

  server.close((error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    prettyLog('server', 'Server stopped')
    process.exit(0)
  })

  setTimeout(() => {
    prettyLog('server', 'Force shutdown after timeout')
    process.exit(1)
  }, 10_000).unref()
}

process.once('SIGINT', () => gracefulShutdown('SIGINT'))
process.once('SIGTERM', () => gracefulShutdown('SIGTERM'))
