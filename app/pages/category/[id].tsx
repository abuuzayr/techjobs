import { useRouter } from "blitz"
import { Loader, Level } from "react-bulma-components"

const Category = () => {
  const router = useRouter()
  if (router) {
    const { pathname, query } = router
    if (pathname === "/category/[id]" && query.id) {
      router.push(`/?tab=${query.id}`, `/category/${query.id}`, { shallow: true })
    }
    return (
      <Level.Item>
        <Loader style={{ width: 100, height: 100, marginTop: 100 }} />
      </Level.Item>
    )
  }

  return <></>
}

export default Category
