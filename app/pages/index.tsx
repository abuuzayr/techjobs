import { useState, useEffect } from "react"
import { Head, useRouter } from "blitz"
import Modal from "react-modal"
import { RemoveScroll } from "react-remove-scroll"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"
import Footer from "../components/Footer"
import JobContent from "../components/JobContent"
import LikedContext from "../components/LikedContext"

Modal.setAppElement("#__next")

const Home = () => {
  const router = useRouter()
  const [tab, setTab] = useState((router?.query?.tab as string) || "all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)

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
        <title>techjobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero {...{ tab, setTab, search, setSearch, liked, setScrollTo }} />
      {["featured", "all", "liked"].includes(tab) ? (
        <Jobs {...{ args, scrollTo: search ? scrollTo : 0 }} />
      ) : (
        <div>{tab}</div>
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
        @media screen and (max-width: 768px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            overflow: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .level-item {
            text-align: center;
          }
        }
        .ReactModal__Overlay {
          opacity: 0;
          margin-top: 50px;
          transition: all 1000ms ease-in-out;
        }
        .ReactModal__Overlay--after-open {
          opacity: 1;
          margin-top: 0;
          top: 40px;
          left: 40px;
          right: 40px;
          bottom: 40px;
        }
        .ReactModal__Overlay--before-close {
          opacity: 0;
          margin-top: 50px;
        }
      `}</style>
    </LikedContext.Provider>
  )
}

export default Home
