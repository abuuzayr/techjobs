import { resolver } from "blitz"
import db, { Tag, Prisma } from "db"
import * as z from "zod"

const CreateJob = z
  .object({
    name: z.string(),
    url: z.string().url(),
    description: z.string(),
    tags: z.string(),
    salaryMin: z.number().int().positive().optional(),
    salaryMax: z.number().int().positive().optional(),
    avatar: z.string().url().optional(),
    company: z.string(),
    companyDescription: z.string(),
    companyUrl: z.string().url(),
    companyGdUrl: z.string().url().optional(),
    companyLiUrl: z.string().url().optional(),
    email: z.string().email().optional(),
    type: z.string().optional()
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateJob), async (input) => {
  try {
    // Create company first if does not exist
    let company = await db.company.findFirst({
      where: {
        name: `${input.company}`,
      },
    })
    if (company) {
      if (!company.imgUrl && input.avatar) {
        await db.company.update({
          where: {
            name: `${input.company}`,
          },
          data: {
            imgUrl: `${input.avatar}`,
            url: input.companyUrl,
            about: input.companyDescription,
            gdUrl: input.companyGdUrl,
            liUrl: input.companyLiUrl
          },
        })
      }
    } else {
      company = await db.company.create({
        data: {
          name: `${input.company}`,
          imgUrl: `${input.avatar || ""}`,
          url: input.companyUrl,
          about: input.companyDescription,
          gdUrl: input.companyGdUrl,
          liUrl: input.companyLiUrl,
        },
      })
    }
    // Job data to create or update with
    const {
      tags: tagsAsString,
      companyUrl,
      companyDescription,
      companyGdUrl,
      companyLiUrl,
      email,
      salaryMin,
      salaryMax,
      ...cleanJobData
    } = input
    let jobData: Prisma.JobCreateInput = {
      ...cleanJobData,
      company: {
        connect: {
          id: company.id,
        },
      },
      source: input.email
    }
    // Get tags for searching
    let existingTags: Tag[] = []
    let tags: string[] = []
    const tagObj = {}
    if (tagsAsString && tagsAsString.length) {
      // slugify all tags
      tags = tagsAsString.split(",").map((t) =>
        t
          .trim()
          .replace(/[_*~()'"!:@,& ]{1,99}/g, "-")
          .toLowerCase()
      )
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
      if (input.description) {
        toParse = input.description.replace(/[\W]{1,99}/g, " ").toLowerCase()
      } else {
        toParse = input.name.replace(/[\W]{1,99}/g, " ").toLowerCase()
      }
      existingTags = allTags.filter((tag) => {
        const casedTag = tag.name.replace(/-/g, " ")
        return toParse.split(" ").includes(casedTag)
      })
    }
    if (existingTags.length) {
      tagObj["connect"] = existingTags.map((t: Tag) => ({ id: t.id }))
      if (existingTags.length !== tags.length) {
        tagObj["create"] = tags
          .filter((tag) => !existingTags.map((t: Tag) => t.name).includes(tag))
          .map((t) => ({ name: t }))
      }
    } else {
      tagObj["create"] = tags.map((t) => ({ name: t }))
    }
    // Compile everything into a data object for creation
    const salary = `${input.salaryMin ? input.salaryMin : ""}${input.salaryMin && input.salaryMax ? " - " : ""}${
      input.salaryMax ? input.salaryMax : ""
    }`
    jobData = {
      ...jobData,
      tags: tagObj,
      searchStr: `${input.name} ${company.name} ${tags.join(" ")}`.toLowerCase(),
      salary
    }
    const job = await db.job.create({
      data: jobData,
    })

    return job
  } catch (e) {
    console.log(e)
  }
})
