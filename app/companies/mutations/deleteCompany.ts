import db, { CompanyDeleteArgs } from "db"

export default async function deleteCompany(args: CompanyDeleteArgs) {
  const company = await db.company.delete(args)

  return company
}
