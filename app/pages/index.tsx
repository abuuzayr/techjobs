import { useEffect } from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/category/all', undefined, { shallow: true })
  }, [])
  return null
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
