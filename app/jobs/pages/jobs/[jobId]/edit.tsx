import { Suspense } from "react"
import { Head, Link, useRouter, useQuery } from "blitz"
import getJob from "app/jobs/queries/getJob"
import updateJob from "app/jobs/mutations/updateJob"

export const EditJob = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [job] = useQuery(getJob, { where: { id } })

  return (
    <div>
      <h1>Edit Job {job.id}</h1>
      <pre>{JSON.stringify(job)}</pre>

      <form
        onSubmit={async (event) => {
          event.preventDefault()
          try {
            const updated = await updateJob({
              where: { id: job.id },
              data: { name: "MyNewName" },
            })
            alert("Success!" + JSON.stringify(updated))
            router.push("/jobs/[id]", `/jobs/${updated.id}`)
          } catch (error) {
            alert("Error creating job " + JSON.stringify(error, null, 2))
          }
        }}
      >
        <div>Put your form fields here. But for now, just click submit</div>
        <button>Submit</button>
      </form>
    </div>
  )
}

const EditJobPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Edit Job</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditJob />
        </Suspense>

        <p>
          <Link href="/jobs">
            <a>Jobs</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default EditJobPage
