import db from "db"

export default async function getJob(args) {
  const job = await db.job.findOne({
    ...args,
    include: {
      company: true,
      tags: true,
    },
  })

  return job
}
