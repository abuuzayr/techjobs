import { useState, useEffect } from "react"
import { Head, useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import Modal from "react-modal"
import { RemoveScroll } from "react-remove-scroll"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"
import Footer from "../components/Footer"
import JobContent from "../components/JobContent"
import LikedContext from "../components/LikedContext"
import ContentNotFound from "../components/ContentNotFound"
import About from "../components/About"
import Resources from "../components/Resources"

Modal.setAppElement("#__next")

const Home: BlitzPage = () => {
  const router = useRouter()
  const [tab, setTab] = useState(router?.params?.tab || "all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)
  const allowedTabs = ["featured", "all", "liked", "resources", "about", "post"]

  useEffect(() => {
    if (localStorage && localStorage.getItem("_liked")) {
      setLiked(JSON.parse(localStorage.getItem("_liked") as string))
    }
  }, [])

  useEffect(() => {
    const tab = router?.params?.tab
    if (tab) setTab(tab)
    const searchStr = router?.query?.search as string
    if (searchStr) setSearch(searchStr)
  }, [router.query, router.params])

  // arguments for database searching
  // we declare all so we won't have a problem with types
  let args = {
    where: {
      AND: [{ type: { equals: tab } }, { searchStr: { contains: search.toLowerCase() } }],
      OR: liked.map((id) => ({
        id,
      })),
    },
  }
  // we remove the keys that we do not need based on the tab
  if (tab === "all") {
    args["where"]["AND"] = args["where"]["AND"].filter((arg) => {
      return !Object.keys(arg).includes("type")
    })
  } else if (tab === "liked") {
    delete args["where"]["AND"]
  }
  if (tab !== "liked") delete args["where"]["OR"]
  return (
    <LikedContext.Provider value={{ liked, setLiked }}>
      <Hero {...{ tab, setTab, search, setSearch, liked, setScrollTo }} />
      {!allowedTabs.includes(tab) && <ContentNotFound />}
      {["featured", "all", "liked"].includes(tab) && (
        <Jobs {...{ args, scrollTo: search ? scrollTo : 0, search, tab }} />
      )}
      {tab === "about" && <About />}
      {tab === "resources" && <Resources />}
      {tab === "post" && (
        <div dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_FORM_EMBED_IFRAME }} />
      )}
      <Footer />
      {
        <RemoveScroll enabled={router?.params?.jobId ? !!router.params.jobId : false}>
          <Modal
            isOpen={router?.params?.jobId ? !!router.params.jobId : false}
            onRequestClose={() => router.push("/")}
            closeTimeoutMS={1000}
            style={{
              content: { top: "", right: "", left: "", bottom: "" },
            }}
          >
            {router?.params?.jobId && <JobContent id={router.params.jobId} />}
          </Modal>
        </RemoveScroll>
      }
      <style jsx global>{`
        .ReactModal__Overlay.ReactModal__Overlay--after-open {
          z-index: 99;
          overflow: hidden;
        }
        .ReactModal__Overlay {
          opacity: 0;
          margin-top: 50px;
          transition: all 1000ms ease-in-out;
        }
        .ReactModal__Overlay--after-open {
          opacity: 1;
          margin-top: 0;
        }
        .ReactModal__Content.ReactModal__Content--after-open {
          overflow: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .ReactModal__Overlay--before-close {
          opacity: 0;
          margin-top: 50px;
        }
        @media screen and (max-width: 768px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            overflow: auto;
          }
          .level-item {
            text-align: center;
          }
        }
        @media screen and (min-width: 768px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            top: 40px;
            left: 40px;
            right: 40px;
            bottom: 40px;
          }
        }
      `}</style>
    </LikedContext.Provider>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
