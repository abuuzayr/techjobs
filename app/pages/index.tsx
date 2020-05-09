import { useState } from "react"
import { Head, Link } from "blitz"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"

const Home = () => {
  const [tab, setTab] = useState("featured")
  return (
    <div>
      <Head>
        <title>techjobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero tab={tab} setTab={setTab} />
      {["featured", "aggregated"].includes(tab) ? (
        <Jobs args={{ where: { type: { equals: tab } } }} />
      ) : (
        <div>{tab}</div>
      )}
    </div>
  )
}

export default Home
