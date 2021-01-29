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
        <title>{title || "Find a Tech Job in Singapore"} | techjobs.sg</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Search for your dream tech job on techjobs.sg, where our jobs are sourced from the top local job listing platforms in Singapore."
        ></meta>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://techjobs.sg/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Find a Tech Job in Singapore | techjobs.sg" />
        <meta
          property="og:description"
          content="Search for your dream tech job on techjobs.sg, where our jobs are sourced from the top local job listing platforms in Singapore."
        />
        <meta property="og:image" content="https://techjobs.sg/favicon.png" />
        <meta property="og:url" content="https://techjobs.sg/" />
        <meta property="og:site_name" content="techjobs.sg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Find a Tech Job in Singapore | techjobs.sg" />
        <meta
          property="twitter:description"
          content="Search for your dream tech job on techjobs.sg, where our jobs are sourced from the top local job listing platforms in Singapore."
        />
        <meta property="twitter:image" content="https://techjobs.sg/favicon.png" />
        <meta property="twitter:site" content="https://techjobs.sg/" />
      </Head>

      {children}
    </>
  )
}

export default Layout
