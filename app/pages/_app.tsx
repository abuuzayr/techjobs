import {
  AppProps,
  ErrorComponent,
  useRouter,
  ErrorFallbackProps,
  CSRFTokenMismatchError,
  useQueryErrorResetBoundary
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import "react-bulma-components/dist/react-bulma-components.min.css"
import "../global.css"
import ErrorRedirectHome from "app/core/components/ErrorRedirectHome"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()

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
  return (
    <ErrorComponent
      statusCode={error.statusCode || 400}
      title={`An ${error.message || error.name} was thrown. Try reloading the page`}
    />
  )
}
