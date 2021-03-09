import { useRouter } from "blitz"
import { Loader, Level } from "react-bulma-components"

const JobPage = () => {
  const router = useRouter()
  if (router) {
    const { pathname, params } = router
    if (pathname === "/jobs/[jobId]" && params.jobId) {
      router.push(`/?jobId=${params.jobId}`, `/jobs/${params.jobId}`, { shallow: true })
    }
    return (
      <Level.Item>
        <Loader style={{ width: 100, height: 100, marginTop: 100 }} />
      </Level.Item>
    )
  }

  return <></>
}

export default JobPage
