import db, { FindManyJobArgs } from "db"

async function getJobs(args: FindManyJobArgs) {
  const jobs = await db.job.findMany(args)

  return jobs
}

export default async (req, res) => {
  if (req.method === "GET") {
    const args = {}
    if (req.query.select) {
      args["select"] = {
        aggId: true,
        [req.query.select]: true,
      }
    }
    if (req.query.recent || req.query.aggPrefix) {
      args["where"] = {}
      if (req.query.recent) {
        args["where"]["postedDate"] = {
          gt: new Date(new Date() - 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      }
      if (req.query.aggPrefix) {
        args["where"]["aggId"] = {
          startsWith: `${req.query.aggPrefix}-----`,
        }
      }
    }
    try {
      const jobs = await getJobs(args)
      if (jobs) {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(jobs))
      } else {
        res.statusCode = 404
        res.end("No jobs to return")
      }
    } catch (e) {
      res.statusCode = 500
      res.end("Unable to retrieve jobs")
      console.log(e)
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
