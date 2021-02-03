import db, { FindManyJobArgs } from "db"

type GetJobsInput = Pick<FindManyJobArgs, "where" | "orderBy" | "skip" | "take">

export default async function getJobsCount(args: GetJobsInput) {
  const count = await db.job.count(args)

  return count
}
