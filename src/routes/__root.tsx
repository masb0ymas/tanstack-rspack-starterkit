import '../styles/globals.css'

import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  ErrorComponent,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import NotFound from '~/components/block/common/not-found'
import { GOOGLE_FONTS, META_ICONS, META_TAGS } from '~/lib/constants/meta'
import DecorationProvider from '~/lib/providers/decoration'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: META_TAGS,
    links: [...META_ICONS, ...GOOGLE_FONTS],
  }),
  shellComponent: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RootComponent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <DecorationProvider>{children}</DecorationProvider>

        <Scripts />
      </body>
    </html>
  )
}
