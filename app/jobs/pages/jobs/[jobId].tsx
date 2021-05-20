import { useRouter, useParam, BlitzPage, invoke } from "blitz"
import Layout from "app/core/layouts/Layout"
import JobContext from "app/components/JobContext"
import JobContent from "app/components/JobContent"
import Modal from "react-modal"
import getJobs from "app/jobs/queries/getJobs"

const JobPage: BlitzPage = () => {
  const id = useParam("jobId", "string")
  const router = useRouter()

  return (
    <JobContext.Consumer>
      {({ job, setJob }) => {
        setJob(id?.split("-")?.[0] || 0)
        return (
          <Modal
            isOpen={id}
            onRequestClose={() => router.push(router?.query?.referrer as string || "/")}
            closeTimeoutMS={1000}
            style={{
              content: { top: "", right: "", left: "", bottom: "" },
            }}
          >
            {id && <JobContent id={id} router={router} />}
          </Modal>
        )
      }}
    </JobContext.Consumer>
  )
}

JobPage.getLayout = (page) => <Layout title="Job">{page}</Layout>

export default JobPage

export async function getStaticPaths() {
  const jobs = await invoke(getJobs, {
    where: {
      postedDate: {
        gt: new Date(new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    select: { id: true, name: true },
  })
  return {
    paths: jobs.map((job) => ({
      params: { jobId: `${job.id}-${job.name?.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()}` },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: { jobId: params.jobId },
    revalidate: 1,
  }
}