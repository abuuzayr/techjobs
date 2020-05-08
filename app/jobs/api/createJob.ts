import db, { JobCreateArgs, Job, Company } from "db"

const createJob = async (args: JobCreateArgs) => {
  if (!args.data) return false
  if (!args.data.company) return false
  // Find job if exists
  let jobFound: Job
  if (args.data.aggId) {
    const jobQuery = await db.job.findMany({
      where: {
        aggId: {
          equals: `${args.data.aggId}`,
        },
      },
    })
    if (jobQuery.length) jobFound = jobQuery[0]
  }
  // Find or create a company to connect job with
  const companyQuery = await db.company.findMany({
    where: {
      name: {
        equals: `${args.data.company}`,
      },
    },
  })
  let company: Company
  if (companyQuery.length) {
    company = companyQuery[0]
  } else {
    company = await db.company.create({
      data: {
        name: `${args.data.company}`,
        imgUrl: `${args.data.avatar}`,
      },
    })
  }
  // Get tags for searching
  const tags = await db.tag.findMany()
  // Job data to create or update with
  const jobData = {
    ...args,
    data: {
      ...args.data,
      company: {
        connect: {
          id: company.id,
        },
      },
      tags: {
        upsert: args.data.tags.map((tag) => ({
          create: { name: tag },
          update: { name: tag },
          where: { id: tags.find((t) => t.name === tag).id || 0 },
        })),
      },
    },
  }
  if (jobFound) {
    return await db.job.update({
      ...jobData,
      where: {
        id: jobFound.id,
      },
    })
  }
  await db.job.create(jobData)
}

export default async (req, res) => {
  if (req.method === "POST") {
    // Process a POST request
    if (!req.body) {
      res.statusCode = 400
      res.end("No body provided")
    }
    const job = await createJob({ data: req.body })
    if (job) {
      res.statusCode = 201
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(job))
    } else {
      res.statusCode = 422
      res.end("Unable to create job. Check POST body")
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
