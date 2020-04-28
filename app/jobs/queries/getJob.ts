import db, {FindOneJobArgs} from 'db'

export default async function getJob(args: FindOneJobArgs) {
  const job = await db.job.findOne(args)

  return job
}
