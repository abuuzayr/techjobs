import db, { FindManyJobArgs } from "db"

export default async function getJobs(args: FindManyJobArgs) {
  const jobs = await db.job.findMany({
    ...args,
    include: {
      company: {
        select: {
          name: true,
        },
      },
    },
  })

  return jobs
}
