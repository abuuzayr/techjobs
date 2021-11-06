import { resolver } from "blitz"
import db, { Prisma } from "db"

interface GetJobsInput
  extends Pick<Prisma.JobFindManyArgs, "where" | "select"> {}

export default resolver.pipe(async (args: GetJobsInput) => {
  const jobs = await db.job.findMany(args)
  console.log(args);
  return jobs
})
