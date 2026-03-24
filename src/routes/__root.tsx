import '../styles/globals.css'

import { createRootRoute, ErrorComponent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
  errorComponent: ErrorComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
