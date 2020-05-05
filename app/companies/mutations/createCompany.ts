import db, { CompanyCreateArgs } from "db"

export default async function createCompany(args: CompanyCreateArgs) {
  const company = await db.company.create(args)

  return company
}
