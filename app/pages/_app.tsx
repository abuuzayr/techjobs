import { AppProps, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import "react-bulma-components/dist/react-bulma-components.min.css"
import { usePanelbear } from "app/hooks/usePanelbear"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  // Load Panelbear only once during the app lifecycle
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {})

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error }: FallbackProps) {
  return (
    <ErrorComponent statusCode={(error as any)?.statusCode || 400} title={error?.message || error?.name} />
  )
}
