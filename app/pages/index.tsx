import { useState } from "react"
import { Head, Link } from "blitz"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"

const Home = () => {
  const [tab, setTab] = useState("all")
  const [search, setSearch] = useState("")
  let args = {
    where: {
      AND: [{ type: { equals: tab } }, { name: { contains: search } }],
    },
  }
  if (tab === "all") {
    args["where"]["AND"] = args["where"]["AND"].filter((arg) => {
      return !Object.keys(arg).includes("type")
    })
  }
  return (
    <div>
      <Head>
        <title>techjobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero {...{ tab, setTab, search, setSearch }} />
      {["featured", "all"].includes(tab) ? <Jobs args={args} /> : <div>{tab}</div>}
    </div>
  )
}

export default Home
