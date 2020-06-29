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
        [req.query.select]: true,
      }
    }
    const jobs = await getJobs(args)
    console.log(jobs)
    if (jobs) {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(jobs))
    } else {
      res.statusCode = 404
      res.end("No jobs to return")
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
