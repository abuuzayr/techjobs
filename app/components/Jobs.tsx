import { Suspense, useState, useEffect } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import Tags from "./Tags"
import getJobs from "../jobs/queries/getJobs"
import getJobsCount from "../jobs/queries/getJobsCount"
import { Container, Columns, Level, Button, Loader } from "react-bulma-components"
import ErrorBoundary from "app/components/ErrorBoundary"
import { IoMdHappy } from "react-icons/io"
import { RiDownloadLine } from "react-icons/ri"

const Jobs = (props) => {
  const { args, scrollTo, liked, setLiked } = props
  const JOBS_TO_SHOW = 20
  const SCROLL_OFFSET = 50
  const [page, setPage] = useState(0)
  const [jobsCount] = useQuery(getJobsCount, args)
  const [selectedTags, setSelectedTags] = useState(["devops"])
  const [jobs] = useQuery(
    getJobs,
    { ...args, first: JOBS_TO_SHOW * (page + 1), skip: 0 },
    { paginated: true }
  )

  // Set scroll to behavior
  useEffect(() => {
    if (scrollTo)
      window.scrollTo({
        top: scrollTo - SCROLL_OFFSET,
        behavior: "smooth",
      })
  })

  // Get unique array of all tags in current job query
  const tags: String[] = jobs.reduce((arr, job) => {
    job.tags.forEach((tag) => {
      if (!arr.includes(tag.name)) arr.push(tag.name)
    })
    return arr.sort()
  }, [])

  return (
    <Container style={{ padding: "3rem" }}>
      <Columns>
        <Columns.Column size={10} offset={1}>
          <Level>
            {tags.length ? (
              <Level.Side align="left" style={{ alignSelf: "flex-start" }}>
                <p className="heading" style={{ margin: "0 10px 0 0" }}>
                  Filter by tags:{" "}
                </p>
              </Level.Side>
            ) : (
              <></>
            )}
            <Tags {...{ tags, selectedTags, setSelectedTags }} />
          </Level>
          {jobs.map((job) => (
            <Job key={job.id} data={job} {...{ liked, setLiked, selectedTags, setSelectedTags }} />
          ))}
          <Level>
            {jobs.length === jobsCount ? (
              <Level.Item>
                <IoMdHappy /> You have loaded all jobs!
              </Level.Item>
            ) : (
              <Level.Item>
                <Button outlined={true} color="info" onClick={() => setPage(page + 1)}>
                  <RiDownloadLine style={{ marginRight: 5 }} /> Load more jobs
                </Button>
              </Level.Item>
            )}
          </Level>
        </Columns.Column>
      </Columns>
    </Container>
  )
}

const WrappedJobs = (props) => {
  return (
    <ErrorBoundary fallback={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <Suspense
        fallback={
          <Level.Item>
            <Loader style={{ width: 100, height: 100, marginTop: 100 }} />
          </Level.Item>
        }
      >
        <Jobs {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default WrappedJobs
