import { Head, Link } from "blitz"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"

const Home = () => (
  <div>
    <Head>
      <title>techjobs</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Hero />
    <Jobs />
  </div>
)

export default Home
