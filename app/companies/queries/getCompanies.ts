import db, { FindManyCompanyArgs } from "db"

export default async function getCompanies(args: FindManyCompanyArgs) {
  const companies = await db.company.findMany(args)

  return companies
}
