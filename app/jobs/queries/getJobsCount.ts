import { resolver } from "blitz"
import db, { Prisma } from "db"

interface GetJobsInput extends Pick<Prisma.JobFindManyArgs, "where"> {}

export default resolver.pipe(async ({ where }: GetJobsInput) => {
  return db.job.count({ where })
})
