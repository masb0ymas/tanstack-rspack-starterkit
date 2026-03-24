import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/(site)/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/(site)/terms/"!</div>
}
