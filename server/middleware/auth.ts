import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

import { auth } from '../lib/auth'

type SessionData = typeof auth.$Infer.Session

export type AppEnv = {
  Variables: {
    user: SessionData['user'] | null
    session: SessionData['session'] | null
  }
}

export const requireSession = createMiddleware<AppEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  c.set('user', session.user)
  c.set('session', session.session)

  await next()
})
