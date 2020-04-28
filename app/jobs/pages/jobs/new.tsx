import {Head, Link, useRouter} from 'blitz'
import createJob from 'app/jobs/mutations/createJob'

const NewJobPage = () => {
  const router = useRouter()
  return (
    <div className="container">
      <Head>
        <title>New Job</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Job </h1>

        <form onSubmit={async (event) => {
          event.preventDefault()
          try {
            const job = await createJob({data: {name: 'MyName'}})
            alert('Success!' + JSON.stringify(job))
            router.push('/jobs/[id]', `/jobs/${job.id}`)
          } catch (error) {
            alert('Error creating job ' + JSON.stringify(error, null, 2))
          }
        }}>
          <div>Put your form fields here. But for now, just click submit</div>
          <button>Submit</button>
        </form>

        <p>
          <Link href="/jobs">
            <a>Jobs</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default NewJobPage

