import { Suspense, useState, useEffect } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import TagsSelect from "./TagsSelect"
import getJobs from "../jobs/queries/getJobs"
import getJobsCount from "../jobs/queries/getJobsCount"
import getTags from "../tags/queries/getTags"
import { Container, Columns, Level, Button, Loader, Content } from "react-bulma-components"
import ErrorBoundary from "app/components/ErrorBoundary"
import { IoMdHappy } from "react-icons/io"
import { RiDownloadLine } from "react-icons/ri"

const Jobs = (props) => {
  const { args, scrollTo } = props
  const JOBS_TO_SHOW = 20
  const SCROLL_OFFSET = 50
  const [page, setPage] = useState(0)
  const [totalJobsCount] = useQuery(getJobsCount, args)
  const [allTags] = useQuery(getTags)
  const [selectedTags, setSelectedTags] = useState([])

  // Update args to include
  const updatedArgs = args["where"]["AND"]
    ? {
        ...args,
        where: {
          ...args.where,
          AND: [
            ...args.where.AND,
            ...[
              selectedTags.length
                ? {
                    AND: selectedTags.map((tag) => ({ tags: { some: { name: { equals: tag } } } })),
                  }
                : [],
            ],
          ],
        },
      }
    : {
        ...args,
        where: {
          ...args.where,
          AND: selectedTags.map((tag) => ({ tags: { some: { name: { equals: tag } } } })),
        },
      }

  const [jobs] = useQuery(
    getJobs,
    { ...updatedArgs, first: JOBS_TO_SHOW * (page + 1), skip: 0 },
    { paginated: true }
  )
  const [jobsCount] = useQuery(getJobsCount, updatedArgs)

  // Set scroll to behavior
  useEffect(() => {
    if (scrollTo)
      window.scrollTo({
        top: scrollTo - SCROLL_OFFSET,
        behavior: "smooth",
      })
  }, [])

  const tags = allTags.map((tag) => tag.name)

  return (
    <Container style={{ padding: "2rem" }}>
      <TagsSelect {...{ tags, selectedTags, setSelectedTags }} />
      {selectedTags.length > 0 && (
        <Level>
          <Level.Side align="left"></Level.Side>
          <Level.Side align="right">
            <Content size="small">
              <p style={{ margin: "0 10px 0 0" }}>
                {jobsCount} / {totalJobsCount} job{totalJobsCount > 1 ? "s" : ""}
              </p>
            </Content>
          </Level.Side>
        </Level>
      )}
      {jobs.map((job) => (
        <Job key={job.id} data={job} {...{ selectedTags, setSelectedTags }} />
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
