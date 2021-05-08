import db, { Prisma } from "db"

export default async function updateJob(args: Prisma.JobUpdateArgs) {
  const job = await db.job.update(args)

  return job
}
