import db, { Prisma } from "db"

async function getJob(args: Prisma.JobFindUniqueArgs) {
  const job = await db.job.findFirst(args)

  return job
}

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.query.aggId) {
      res.statusCode = 400
      res.end("No id provided")
    }
    const job = await getJob({ where: { aggId: req.query.aggId } })
    if (job) {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(job))
    } else {
      res.statusCode = 404
      res.end("Job not found")
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
