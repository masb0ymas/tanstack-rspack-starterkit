import type { VariantProps } from 'class-variance-authority'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Input, inputVariants } from '~/components/ui/input'

type PasswordInputProps = React.ComponentProps<'input'> & VariantProps<typeof inputVariants>

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="relative">
      <Input type={passwordVisible ? 'text' : 'password'} {...props} />
      <Button
        type="button"
        variant="ghost"
        mode="icon"
        size="sm"
        onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
        className="absolute inset-e-0 top-1/2 me-1.5 h-7 w-7 -translate-y-1/2 bg-transparent!"
        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
      >
        {passwordVisible ? (
          <EyeOff className="text-muted-foreground" />
        ) : (
          <Eye className="text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}
