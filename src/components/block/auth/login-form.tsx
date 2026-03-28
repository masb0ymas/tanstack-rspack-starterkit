import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { useAppForm } from '~/hooks/form'
import { EmailSignInSchema } from '~/lib/api/dtos/auth/schema'
import { signInWithGoogle } from '~/lib/auth/auth-client'
import { cn } from '~/lib/utils'

import PasswordInput from '../common/password-input'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: EmailSignInSchema,
      onChange: EmailSignInSchema,
    },
    onSubmit: async () => {
      toast.info('This feature is not implemented yet')
    },
  })

  const handleSignInGoogle = async () => {
    await signInWithGoogle()
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.AppField
                name="email"
                children={(field) => (
                  <field.TextField label="Email" placeholder="your.email@example.com" />
                )}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center justify-between gap-2.5">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link
                          to="/"
                          className="text-foreground text-xs font-semibold hover:text-blue-500 md:text-sm"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <PasswordInput
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Type your password"
                        autoComplete="off"
                        variant="lg"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button" onClick={handleSignInGoogle}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
