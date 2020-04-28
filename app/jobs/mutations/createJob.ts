import db, {JobCreateArgs} from 'db'

export default async function createJob(args: JobCreateArgs) {
  const job = await db.job.create(args)

  return job
}
