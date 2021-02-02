import db, { FindUniqueJobArgs } from "db"

export default async function getJob(args: FindUniqueJobArgs) {
  const job = await db.job.findFirst({
    ...args,
    include: {
      company: true,
      tags: true,
    },
  })

  return job
}
