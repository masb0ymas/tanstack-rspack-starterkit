import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import type { PropsWithChildren } from 'react'

export default function DecorationProvider({ children }: PropsWithChildren) {
  return (
    <NuqsAdapter>
      {children}
      <TanStackRouterDevtools />
    </NuqsAdapter>
  )
}
