import * as z from "zod"

export const NewJob = z.object({
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
})
