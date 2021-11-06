import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  CSRFTokenMismatchError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"
import "react-bulma-components/dist/react-bulma-components.min.css"
import "../global.css"
import ErrorRedirectHome from "app/core/components/ErrorRedirectHome"
import { usePanelbear } from "app/hooks/usePanelbear"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()
  // Load Panelbear only once during the app lifecycle
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {})

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof CSRFTokenMismatchError) {
    return (
      <ErrorRedirectHome
        statusCode={error.statusCode || 400}
        title={`An ${error.message || error.name} was thrown. Try reloading the page`}
      />
    )
  }
  const title = `An ${error.message || error.name} was thrown. Try reloading the page`
  return <ErrorComponent statusCode={error.statusCode || 400} title={title} />
}
