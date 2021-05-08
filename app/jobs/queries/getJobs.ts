import db, { Prisma } from "db"

export default async function getJobs(args: Prisma.JobFindManyArgs) {
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
