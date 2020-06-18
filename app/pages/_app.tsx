import { useEffect } from "react"
import Router from "next/router"
import * as Fathom from "fathom-client"
import "react-bulma-components/dist/react-bulma-components.min.css"

// Record a pageview when route changes
Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview()
})

export default function MyApp({ Component, pageProps }) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID)
      Fathom.trackPageview()
    }
  }, [])
  return <Component {...pageProps} />
}
