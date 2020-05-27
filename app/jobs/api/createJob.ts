import db, { Job } from "db"

const createJob = async (args) => {
  if (!args.data) return false
  if (!args.data.company) return false
  // Find job if exists
  let jobFound: Job
  if (args.data.aggId) {
    jobFound = await db.job.findOne({
      where: {
        aggId: `${args.data.aggId}`,
      },
    })
  }
  // Find or create a company to connect job with
  let company = await db.company.findOne({
    where: {
      name: `${args.data.company}`,
    },
  })
  if (!company) {
    company = await db.company.create({
      data: {
        name: `${args.data.company}`,
        imgUrl: `${args.data.avatar}`,
      },
    })
  }
  // Job data to create or update with
  let jobData = {
    ...args,
    data: {
      ...args.data,
      company: {
        connect: {
          id: company.id,
        },
      },
    },
  }
  // Get tags for searching
  if (args.data.tags && args.data.tags.length) {
    const tagObj = {}
    const existingTags = await db.tag.findMany({
      where: {
        OR: args.data.tags.map((tag) => ({
          name: {
            equals: tag,
          },
        })),
      },
    })
    if (existingTags.length) {
      tagObj["connect"] = existingTags.map((t) => ({ id: t.id }))
      if (existingTags.length !== args.data.tags.length) {
        tagObj["create"] = args.data.tags
          .filter((tag) => !existingTags.map((t) => t.name).includes(tag))
          .map((t) => ({ name: t }))
      }
    } else {
      tagObj["create"] = args.data.tags.map((t) => ({ name: t }))
    }
    // Compile everything into a data object for creation
    jobData = {
      ...jobData,
      data: {
        ...jobData.data,
        tags: tagObj,
        searchStr: `${args.data.name} ${company.name} ${args.data.tags.join(" ")}`.toLowerCase(),
      },
    }
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
