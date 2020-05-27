import db from "db"

export default async function getCompanies(args) {
  const companies = await db.company.findMany(args)

  return companies
}
