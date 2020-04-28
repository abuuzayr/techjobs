import {Suspense} from 'react'
import {Head, Link, useQuery} from 'blitz'
import getJobs from 'app/jobs/queries/getJobs'

export const JobsList = () => {
  const [jobs] = useQuery(getJobs)

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <Link href="/jobs/[id]" as={`/jobs/${job.id}`}>
            <a>{job.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const JobsPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Jobs</h1>

        <p>
          <Link href="/jobs/new">
            <a>Create Job</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <JobsList />
        </Suspense>
      </main>
    </div>
  )
}

export default JobsPage



