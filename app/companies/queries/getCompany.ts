import db, { FindOneCompanyArgs } from "db"

export default async function getCompany(args: FindOneCompanyArgs) {
  const company = await db.company.findOne(args)

  return company
}
