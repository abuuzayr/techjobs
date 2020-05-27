import db from "db"

export default async function deleteJob(args) {
  const job = await db.job.delete(args)

  return job
}
