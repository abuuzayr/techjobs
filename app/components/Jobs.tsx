import { Suspense } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import getJobs from "../jobs/queries/getJobs"
import { Container, Columns } from "react-bulma-components"
import ErrorBoundary from "app/components/ErrorBoundary"

const Jobs = () => {
  const [jobs] = useQuery(getJobs)

  return (
    <Container style={{ padding: "3rem" }}>
      <Columns>
        <Columns.Column size={10} offset={1}>
          {jobs.map((job) => (
            <Job key={job.id} data={job} />
          ))}
        </Columns.Column>
      </Columns>
    </Container>
  )
}

const WrappedJobs = () => {
  return (
    <ErrorBoundary fallback={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Jobs />
      </Suspense>
    </ErrorBoundary>
  )
}

export default WrappedJobs
