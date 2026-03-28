import { createFileRoute, ErrorComponent, Outlet } from '@tanstack/react-router'

import Loading from '~/components/block/common/loading'
import NotFound from '~/components/block/common/not-found'

export const Route = createFileRoute('/(public)/(site)')({
  component: RouteComponent,
  pendingComponent: Loading,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  return <Outlet />
}
