import { CORSOptions } from '../types/cors'
import { env } from './env'

export const corsOptions: CORSOptions = {
  origin: env.CLIENT_URL,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}
