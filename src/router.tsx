import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { getQueryContext, ReactQueryProvider } from './lib/providers/react-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const rqContext = getQueryContext()

  const router = createTanStackRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    Wrap: (props: { children: React.ReactNode }) => {
      return <ReactQueryProvider {...rqContext}>{props.children}</ReactQueryProvider>
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
