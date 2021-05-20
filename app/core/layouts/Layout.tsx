import { ReactNode, useState, useEffect } from "react"
import { Head } from "blitz"
import LikedContext from "app/components/LikedContext"
import TabContext from "app/components/TabContext"
import SearchContext from "app/components/SearchContext"
import JobContext from "app/components/JobContext"
import ScrollToContext from "app/components/ScrollToContext"
import Footer from "app/components/Footer"
import Hero from "app/components/Hero"
import Modal from "react-modal"
import { RemoveScroll } from "react-remove-scroll"
import JobContent from "app/components/JobContent"

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#__next")

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const [tab, setTab] = useState("all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)
  const [job, setJob] = useState(0)

  useEffect(() => {
    if (localStorage && localStorage.getItem("_liked")) {
      setLiked(JSON.parse(localStorage.getItem("_liked") as string))
    }
  }, [])

  return (
    <>
      <Head>
        <title>{title || "techjobs.sg"}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SearchContext.Provider value={{ search, setSearch }}>
        <TabContext.Provider value={{ tab, setTab }}>
          <LikedContext.Provider value={{ liked, setLiked }}>
            <JobContext.Provider value={{ job, setJob }}>
              <ScrollToContext.Provider value={{ scrollTo, setScrollTo }}>
                <Hero {...{ tab, setTab, search, setSearch, liked, setScrollTo }} />
                <RemoveScroll enabled={!!job}>{children}</RemoveScroll>
                <Footer />
              </ScrollToContext.Provider>
            </JobContext.Provider>
          </LikedContext.Provider>
        </TabContext.Provider>
      </SearchContext.Provider>
    </>
  )
}

export default Layout
