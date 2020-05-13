import { Suspense, useState, useEffect } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import getJobs from "../jobs/queries/getJobs"
import getJobsCount from "../jobs/queries/getJobsCount"
import { Container, Columns, Level, Button, Loader } from "react-bulma-components"
import ErrorBoundary from "app/components/ErrorBoundary"
import { IoMdHappy } from "react-icons/io"
import { FiX } from "react-icons/fi"
import { RiDownloadLine } from "react-icons/ri"

const Jobs = (props) => {
  const JOBS_TO_SHOW = 20
  const SCROLL_OFFSET = 50
  const [page, setPage] = useState(0)
  const [jobsCount] = useQuery(getJobsCount, props.args)
  const [selectedTags, setSelectedTags] = useState(["devops"])
  const [jobs] = useQuery(
    getJobs,
    { ...props.args, first: JOBS_TO_SHOW * (page + 1), skip: 0 },
    { paginated: true }
  )

  const addTag = (tag) => {
    setSelectedTags((tags) => [...tags, tag])
  }

  const removeTag = (tag) => {
    setSelectedTags((tags) => tags.filter((t) => t !== tag))
  }

  const tagProps = (fn) => ({
    role: "button",
    className: "tag",
    tabIndex: 0,
    onClick: fn,
    onKeyDown: fn,
  })

  // Set scroll to behavior
  useEffect(() => {
    if (props.scrollTo)
      window.scrollTo({
        top: props.scrollTo - SCROLL_OFFSET,
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
            <div className="field is-grouped is-grouped-multiline">
              {tags.map((tag) => (
                <div className="control">
                  <div className="tags has-addons">
                    {selectedTags.includes(`${tag}`) ? (
                      <>
                        <span className="tag is-link">{tag}</span>
                        <a {...tagProps(() => removeTag(tag))}>
                          <FiX />
                        </a>
                      </>
                    ) : (
                      <a {...tagProps(() => addTag(tag))}>{tag}</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Level>
          {jobs.map((job) => (
            <Job key={job.id} data={job} liked={props.liked} setLiked={props.setLiked} />
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
