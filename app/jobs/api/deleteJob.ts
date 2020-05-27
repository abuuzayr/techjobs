import db, { JobDeleteArgs } from "db"

export default async function deleteJob(args: JobDeleteArgs) {
  const job = await db.job.delete(args)

  return job
}
