import { Document, Html, DocumentHead, Main, BlitzScript } from "blitz"

// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>{this.props.styles}</DocumentHead>
        <body>
          <Main />
          <BlitzScript />
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "e54aae6d15ac401f8d56a7ca4fb18251"}'
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
