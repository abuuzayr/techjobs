import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getJob from 'app/jobs/queries/getJob'
import deleteJob from 'app/jobs/mutations/deleteJob'


export const Job = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [job] = useQuery(getJob, {where: {id}})

  return (
    <div>
      <h1>Job {job.id}</h1>
      <pre>
        {JSON.stringify(job)}
      </pre>

      <Link href="/jobs/[id]/edit" as={`/jobs/${job.id}/edit`}>
        <a>Edit</a>
      </Link>

        <button type="button" onClick={async () => {
          if (confirm("This will be deleted")) {
            await deleteJob({where: {id: job.id}})
            router.push('/jobs')
          }
        }}>
        Delete
      </button>
    </div>
  )
}

const ShowJobPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Job</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <Link href="/jobs">
            <a>Jobs</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Job />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowJobPage

