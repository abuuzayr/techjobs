import db, { Prisma } from "db"

export default async function getCompanies(args: Prisma.CompanyFindManyArgs) {
  const companies = await db.company.findMany(args)

  return companies
}
