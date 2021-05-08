import db, { Prisma } from "db"

export default async function getJob(args: Prisma.JobFindUniqueArgs) {
  const job = await db.job.findFirst({
    ...args,
    include: {
      company: true,
      tags: true,
    },
  })

  return job
}
