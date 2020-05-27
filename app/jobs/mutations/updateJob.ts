import db from "db"

export default async function updateJob(args) {
  // Don't allow updating ID
  delete args.data.id

  const job = await db.job.update(args)

  return job
}
