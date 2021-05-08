import db, { Prisma } from "db"

export default async function deleteCompany(args: Prisma.CompanyDeleteArgs) {
  const company = await db.company.delete(args)

  return company
}
