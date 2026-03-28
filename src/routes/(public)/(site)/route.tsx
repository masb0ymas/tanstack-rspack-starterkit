import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import NotFound from '~/components/block/common/not-found'

export const Route = createFileRoute('/(public)/(site)')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/(site)"!</div>
}
