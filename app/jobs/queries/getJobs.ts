import db, { FindManyJobArgs } from "db"

export default async function getJobs(args: FindManyJobArgs) {
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
