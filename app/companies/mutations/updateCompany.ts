import db, { CompanyUpdateArgs } from "db"

export default async function updateCompany(args: CompanyUpdateArgs) {
  const company = await db.company.update(args)

  return company
}
