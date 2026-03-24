import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/(site)/privacy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/(site)/privacy/"!</div>
}
