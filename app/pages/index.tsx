import { useState } from "react"
import { Head, useRouter } from "blitz"
import Modal from "react-modal"
import { RemoveScroll } from "react-remove-scroll"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"
import Footer from "../components/Footer"
import JobContent from "../components/JobContent"

Modal.setAppElement("#__next")

const Home = () => {
  const router = useRouter()
  const [tab, setTab] = useState("all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)

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
    <div>
      <Head>
        <title>techjobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero {...{ tab, setTab, search, setSearch, liked, setScrollTo }} />
      {["featured", "all", "liked"].includes(tab) ? (
        <Jobs {...{ args, liked, setLiked, scrollTo: search ? scrollTo : 0 }} />
      ) : (
        <div>{tab}</div>
      )}
      <Footer />
      {router?.query?.jobId && (
        <RemoveScroll enabled={!!router.query.jobId}>
          <Modal isOpen={!!router.query.jobId} onRequestClose={() => router.push("/")}>
            <JobContent id={router.query.jobId} liked={liked} setLiked={setLiked} />
          </Modal>
        </RemoveScroll>
      )}
      <style jsx global>{`
        .ReactModal__Overlay.ReactModal__Overlay--after-open {
          z-index: 99;
          overflow: hidden;
        }
        @media screen and (max-width: 760px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            overflow: auto;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
