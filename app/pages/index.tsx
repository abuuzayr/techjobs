import { useState } from "react"
import { Head, Link } from "blitz"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"

const Home = () => {
  const [tab, setTab] = useState("all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)

  let args = {
    where: {
      AND: [{ type: { equals: tab } }, { name: { contains: search } }],
      OR: liked.map((id) => ({
        id,
      })),
    },
  }
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
        <Jobs {...{ args, liked, setLiked, scrollTo }} />
      ) : (
        <div>{tab}</div>
      )}
    </div>
  )
}

export default Home
