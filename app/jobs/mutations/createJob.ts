import db from "db"

export default async function createJob(args) {
  const job = await db.job.create(args)

  return job
}
