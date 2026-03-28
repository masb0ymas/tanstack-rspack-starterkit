import { createFileRoute, ErrorComponent, Outlet } from '@tanstack/react-router'

import Loading from '~/components/block/common/loading'
import NotFound from '~/components/block/common/not-found'
import { requireAuth } from '~/lib/auth/handler'

export const Route = createFileRoute('/(protected)')({
  beforeLoad: async () => {
    return await requireAuth()
  },
  component: RouteComponent,
  pendingComponent: Loading,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  return <Outlet />
}
