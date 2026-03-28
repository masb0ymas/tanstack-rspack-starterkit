import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function getQueryContext() {
  const queryClient = new QueryClient()
  return {
    queryClient,
  }
}

interface ReactQueryProviderProps {
  children: React.ReactNode
  queryClient: QueryClient
}

export function ReactQueryProvider({ children, queryClient }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}
