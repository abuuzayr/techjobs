import { Suspense, useState } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import getJobs from "../jobs/queries/getJobs"
import getJobsCount from "../jobs/queries/getJobsCount"
import { Container, Columns } from "react-bulma-components"
import ErrorBoundary from "app/components/ErrorBoundary"

const Jobs = (props) => {
  const JOBS_TO_SHOW = 20
  const [page, setPage] = useState(0)
  const [jobsCount] = useQuery(getJobsCount, props.args)

  const [jobs] = useQuery(
    getJobs,
    { ...props.args, first: JOBS_TO_SHOW * (page + 1), skip: 0 },
    { paginated: true }
  )

  return (
    <Container style={{ padding: "3rem" }}>
      <Columns>
        <Columns.Column size={10} offset={1}>
          {jobs.map((job) => (
            <Job key={job.id} data={job} />
          ))}
        </Columns.Column>
      </Columns>

      <button disabled={jobs.length === jobsCount} onClick={() => setPage(page + 1)}>
        Load more
      </button>
    </Container>
  )
}

const WrappedJobs = (props) => {
  return (
    <ErrorBoundary fallback={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Jobs args={props.args} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default WrappedJobs
