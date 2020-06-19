import { useState, useEffect } from "react"
import { Head, useRouter } from "blitz"
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

const Home = () => {
  const router = useRouter()
  const [tab, setTab] = useState((router?.query?.tab as string) || "all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)
  const allowedTabs = ["featured", "all", "liked", "resources", "about", "post"]

  useEffect(() => {
    if (localStorage && localStorage.getItem("_liked")) {
      setLiked(JSON.parse(localStorage.getItem("_liked")))
    }
  }, [])

  useEffect(() => {
    const tab = router?.query?.tab as string
    if (tab) setTab(tab)
  }, [router])

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
      <Head>
        <title>Find a Tech Job in Singapore | techjobs.sg</title>
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
      <Hero {...{ tab, setTab, search, setSearch, liked, setScrollTo }} />
      {!allowedTabs.includes(tab) && <ContentNotFound />}
      {["featured", "all", "liked"].includes(tab) && <Jobs {...{ args, scrollTo: search ? scrollTo : 0 }} />}
      {tab === "about" && <About />}
      {tab === "resources" && <Resources />}
      {tab === "post" && (
        <div dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_FORM_EMBED_IFRAME }} />
      )}
      <Footer />
      {
        <RemoveScroll enabled={router?.query?.jobId ? !!router.query.jobId : false}>
          <Modal
            isOpen={router?.query?.jobId ? !!router.query.jobId : false}
            onRequestClose={() => router.push("/")}
            closeTimeoutMS={1000}
            style={{
              content: { top: "", right: "", left: "", bottom: "" },
            }}
          >
            {router?.query?.jobId && <JobContent id={router.query.jobId} />}
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

export default Home
