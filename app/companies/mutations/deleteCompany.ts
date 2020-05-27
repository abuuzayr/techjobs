import db from "db"

export default async function deleteCompany(args) {
  const company = await db.company.delete(args)

  return company
}
