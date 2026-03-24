import { useRouter } from '@tanstack/react-router'
import { ArrowLeft, Construction } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty'

export default function NotFound() {
  const { navigate } = useRouter()

  return (
    <div className="flex min-h-[calc(100vh-15rem)] items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Construction />
          </EmptyMedia>
          <EmptyTitle>Not Found</EmptyTitle>
          <EmptyDescription className="text-base">
            The page you are looking for does not exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={() => navigate({ to: '/' })}>
              <ArrowLeft />
              <span>Back</span>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}
