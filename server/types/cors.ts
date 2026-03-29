import { Context } from 'hono'

export type CORSOptions = {
  origin:
    | string
    | string[]
    | ((
        origin: string,
        c: Context
      ) => Promise<string | undefined | null> | string | undefined | null)
  allowMethods?: string[] | ((origin: string, c: Context) => Promise<string[]> | string[])
  allowHeaders?: string[]
  maxAge?: number
  credentials?: boolean
  exposeHeaders?: string[]
}
