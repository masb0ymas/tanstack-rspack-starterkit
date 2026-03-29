import type { Socket } from 'node:net'

import { serve } from '@hono/node-server'

import { env } from './config/env'
import { prettyLog } from './lib/colorize'
import { route } from './routes/route'

const ENV_PROD = process.env.NODE_ENV === 'production'
const port = env.PORT

const server = serve({ fetch: route.fetch, port }, (info) => {
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
