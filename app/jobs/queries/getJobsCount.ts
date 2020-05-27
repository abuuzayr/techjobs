import db from "db"

export default async function getJobsCount(args) {
  const count = await db.job.count(args)

  return count
}
