import { Suspense, useState, useEffect } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import Tags from "./Tags"
import getJobs from "../jobs/queries/getJobs"
import getJobsCount from "../jobs/queries/getJobsCount"
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

  useEffect(() => {
    setSelectedTags((tags) => {
      // Remove tags filters if they do not exist in the jobs returned
      const availableTags = jobs.reduce((arr, job) => {
        job.tags.forEach((j) => {
          if (!arr.includes(j.name)) arr.push(j.name)
        })
        return arr
      }, [])
      return tags.filter((tag) => availableTags.includes(tag))
    })
  }, [jobs])

  // Set scroll to behavior
  useEffect(() => {
    if (scrollTo)
      window.scrollTo({
        top: scrollTo - SCROLL_OFFSET,
        behavior: "smooth",
      })
  }, [])

  // Get unique array of all tags in current job query
  const tags: String[] = jobs.reduce((arr, job) => {
    job.tags.forEach((tag) => {
      if (!arr.includes(tag.name)) arr.push(tag.name)
    })
    return arr.sort()
  }, [])

  return (
    <Container style={{ padding: "2rem" }}>
      <Columns>
        <Columns.Column size={10} offset={1}>
          <Level>
            <Tags {...{ tags, selectedTags, setSelectedTags }}>
              <p className="heading" style={{ marginRight: 10, alignSelf: "center" }}>
                Filter by tags:
              </p>
            </Tags>
          </Level>
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
