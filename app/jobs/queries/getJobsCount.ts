import db, { FindManyJobArgs } from "db"

export default async function getJobsCount(args: FindManyJobArgs) {
  const count = await db.job.count(args)

  return count
}
