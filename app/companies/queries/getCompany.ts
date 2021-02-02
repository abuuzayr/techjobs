import db, { FindUniqueCompanyArgs } from "db"

export default async function getCompany(args: FindUniqueCompanyArgs) {
  const company = await db.company.findFirst(args)

  return company
}
