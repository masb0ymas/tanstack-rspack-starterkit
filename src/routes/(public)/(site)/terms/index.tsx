import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/(site)/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Terms Page</h1>
      <p className="mt-2 text-lg">Write your terms content here.</p>
    </div>
  )
}
