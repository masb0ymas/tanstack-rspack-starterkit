import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import { LoginForm } from '~/components/block/auth/login-form'
import NotFound from '~/components/block/common/not-found'
import { env } from '~/env'

export const Route = createFileRoute('/(public)/(auth)/sign-in/')({
  component: RouteComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">{env.PUBLIC_APP_NAME}</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
