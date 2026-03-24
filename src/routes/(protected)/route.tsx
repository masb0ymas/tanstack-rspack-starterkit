import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import NotFound from '~/components/block/common/not-found'
import { requireAuth } from '~/lib/auth/handler'

export const Route = createFileRoute('/(protected)')({
  beforeLoad: async () => {
    return await requireAuth()
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)"!</div>
}
