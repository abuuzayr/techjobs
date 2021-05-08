import { useEffect } from "react"
import { useRouter, ErrorComponent } from "blitz"

const ErrorRedirectHome = ({ statusCode, title }) => {
  const router = useRouter()
  useEffect(() => {
    if (router.query && !router.query.retry) {
      window.location.replace("/?retry=1")
    }
  }, [])
  return (
    <ErrorComponent
      statusCode={statusCode}
      title={title}
      text={
        router.query && !router.query.retry ? "Hang on, we're reloading the page for you.." : ""
      }
    ></ErrorComponent>
  )
}

export default ErrorRedirectHome
