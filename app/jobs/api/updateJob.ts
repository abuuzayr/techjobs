import db, { JobUpdateArgs } from "db"

export default async function updateJob(args: JobUpdateArgs) {
  const job = await db.job.update(args)

  return job
}
