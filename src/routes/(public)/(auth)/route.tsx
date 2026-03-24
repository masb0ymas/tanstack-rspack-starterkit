import { createFileRoute, ErrorComponent, Outlet } from '@tanstack/react-router'

import NotFound from '~/components/block/common/not-found'
import { redirectIfAuthenticated } from '~/lib/auth/handler'

export const Route = createFileRoute('/(public)/(auth)')({
  beforeLoad: async () => {
    return await redirectIfAuthenticated()
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  return <Outlet />
}
