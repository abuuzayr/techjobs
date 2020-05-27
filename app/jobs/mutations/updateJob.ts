import db, {JobUpdateArgs} from 'db'

export default async function updateJob(args: JobUpdateArgs) {
  // Don't allow updating ID
  delete args.data.id

  const job = await db.job.update(args)

  return job
}
