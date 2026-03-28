import type { ReactNode } from 'react'

import { ProgressCircle } from '~/components/ui/progress'
import { cn } from '~/lib/utils'

type LoadingProps = {
  message?: ReactNode
  fullHeight?: boolean
  wrapperClassName?: string
  contentClassName?: string
  size?: number
  strokeWidth?: number
}

export default function Loading({
  message = 'Loading...',
  fullHeight = true,
  wrapperClassName,
  contentClassName,
  size = 32,
  strokeWidth = 3,
}: LoadingProps) {
  const renderMessage = () => {
    if (!message) return null
    if (typeof message === 'string') {
      return <span className="text-muted-foreground text-xs">{message}</span>
    }
    return message
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullHeight && 'h-[calc(100vh-200px)]',
        wrapperClassName
      )}
    >
      <div className={cn('flex flex-col items-center gap-3', contentClassName)}>
        <ProgressCircle
          value={25}
          size={size}
          strokeWidth={strokeWidth}
          className="text-primary animate-spin"
        />
        {renderMessage()}
      </div>
    </div>
  )
}
