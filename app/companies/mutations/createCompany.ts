import db from "db"

export default async function createCompany(args) {
  const company = await db.company.create(args)

  return company
}
