import { useState } from "react"
import { Head, Link } from "blitz"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"

const Home = () => {
  const [tab, setTab] = useState("featured")
  const [search, setSearch] = useState("")
  return (
    <div>
      <Head>
        <title>techjobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero {...{ tab, setTab, search, setSearch }} />
      {["featured", "aggregated"].includes(tab) ? (
        <Jobs args={{ where: { type: { equals: tab }, name: { contains: search } } }} />
      ) : (
        <div>{tab}</div>
      )}
    </div>
  )
}

export default Home
