import { Suspense } from "react"
import { useQuery } from "blitz"
import Job from "./Job"
import getJobs from "../jobs/queries/getJobs"
import { Container, Columns } from "react-bulma-components"
import ErrorBoundary from "app/components/ErrorBoundary"

const Jobs = (props) => {
  const [jobs] = useQuery(getJobs, props.args)

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
