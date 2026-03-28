import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/(site)/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Tanstack Router + RSPack + Hono.js</h1>
      <p className="mt-2 text-lg">Start building amazing things with RSPack.</p>
    </div>
  )
}
