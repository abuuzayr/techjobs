import db, { Prisma } from "db"

export default async function deleteJob(args: Prisma.JobDeleteArgs) {
  const job = await db.job.delete(args)

  return job
}
