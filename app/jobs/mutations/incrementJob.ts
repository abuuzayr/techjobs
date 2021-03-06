import db from "db"

interface IncrementJobArgs {
  key: string
  id: number
}

export default async function incrementJob(args: IncrementJobArgs) {
  let job: Object | null = await db.job.findFirst({
    where: {
      id: args.id,
    },
    select: {
      [args.key]: true,
    },
  })
  if (job) {
    job = await db.job.update({
      data: {
        [args.key]: job[args.key] + 1,
      },
      where: {
        id: args.id,
      },
    })
  }

  return job
}
