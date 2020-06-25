import { useRouter } from "blitz"
import { Loader, Level } from "react-bulma-components"

const Category = () => {
  const router = useRouter()
  if (router) {
    const { pathname, query } = router
    if (pathname === "/category/[id]" && query.id) {
      const otherQuery = { ...query }
      delete otherQuery.id
      const otherQueryStr = Object.keys(otherQuery)
        .reduce((str, key) => str + `${key}=${otherQuery[key]}&`, "")
        .slice(0, -1)
      router.push(
        `/?tab=${query.id}&${otherQueryStr ? otherQueryStr : ""}`,
        `/category/${query.id}?${otherQueryStr ? otherQueryStr : ""}`,
        { shallow: true }
      )
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
