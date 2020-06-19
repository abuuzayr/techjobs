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
  if (company) {
    if (!company.imgUrl) {
      await db.company.update({
        where: {
          name: `${args.data.company}`,
        },
        data: {
          imgUrl: `${args.data.avatar}`,
        },
      })
    }
  } else {
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
  let existingTags = []
  let tags = []
  const tagObj = {}
  if (args.data.tags && args.data.tags.length) {
    // slugify all tags
    tags = args.data.tags.map((t) => t.replace(/[_*~()'"!:@,& ]{1,99}/g, "-").toLowerCase())
    existingTags = await db.tag.findMany({
      where: {
        OR: tags.map((tag) => ({
          name: {
            equals: tag,
          },
        })),
      },
    })
  } else {
    const allTags = await db.tag.findMany()
    let toParse = ""
    if (args.data.description) {
      toParse = args.data.description.replace(/[\W]{1,99}/g, " ").toLowerCase()
    } else {
      toParse = args.data.name.replace(/[\W]{1,99}/g, " ").toLowerCase()
    }
    existingTags = allTags.filter((tag) => {
      const casedTag = tag.name.replace(/-/g, " ")
      return toParse.split(" ").includes(casedTag)
    })
  }
  if (existingTags.length) {
    tagObj["connect"] = existingTags.map((t) => ({ id: t.id }))
    if (existingTags.length !== tags.length) {
      tagObj["create"] = tags
        .filter((tag) => !existingTags.map((t) => t.name).includes(tag))
        .map((t) => ({ name: t }))
    }
  } else {
    tagObj["create"] = tags.map((t) => ({ name: t }))
  }
  // Compile everything into a data object for creation
  jobData = {
    ...jobData,
    data: {
      ...jobData.data,
      tags: tagObj,
      searchStr: `${args.data.name} ${company.name} ${tags.join(" ")}`.toLowerCase(),
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
  return await db.job.create(jobData)
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
      res.statusCode = 200
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
