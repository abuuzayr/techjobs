import db, { Prisma } from "db"

export default async function updateCompany(args: Prisma.CompanyUpdateArgs) {
  const company = await db.company.update(args)

  return company
}
