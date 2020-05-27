import db from "db"

export default async function getCompany(args) {
  const company = await db.company.findOne(args)

  return company
}
