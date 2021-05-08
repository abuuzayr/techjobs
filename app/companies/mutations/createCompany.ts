import db, { Prisma } from "db"

export default async function createCompany(args: Prisma.CompanyCreateArgs) {
  const company = await db.company.create(args)

  return company
}
