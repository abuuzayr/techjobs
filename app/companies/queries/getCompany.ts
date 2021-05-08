import db, { Prisma } from "db"

export default async function getCompany(args: Prisma.CompanyFindUniqueArgs) {
  const company = await db.company.findFirst(args)

  return company
}
