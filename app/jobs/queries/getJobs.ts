import db from "db"

export default async function getJobs(args) {
  const jobs = await db.job.findMany({
    ...args,
    include: {
      company: true,
      tags: true,
    },
    orderBy: {
      postedDate: "desc",
    },
  })

  return jobs
}
