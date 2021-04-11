import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "techjobs.sg"}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {children}
    </>
  )
}

export default Layout
