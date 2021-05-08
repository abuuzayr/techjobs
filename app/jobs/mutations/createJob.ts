import db, { Prisma } from "db"

export default async function createJob(args: Prisma.JobCreateArgs) {
  const job = await db.job.create(args)

  return job
}
