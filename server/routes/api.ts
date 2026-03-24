import { Hono } from 'hono'

import { auth } from '../lib/auth'
import { type AppEnv, requireSession } from '../middleware/auth'

const api = new Hono<AppEnv>()

api.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

api.get('/me', requireSession, (c) => {
  const user = c.get('user')
  const session = c.get('session')

  return c.json({
    user,
    session,
  })
})

export { api }
