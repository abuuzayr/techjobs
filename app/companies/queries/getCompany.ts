import db, { FindUniqueCompanyArgs } from "db"

export default async function getCompany(args: FindUniqueCompanyArgs) {
  const company = await db.company.findOne(args)

  return company
}
