import db, { CompanyUpdateArgs } from "db"

export default async function updateCompany(args: CompanyUpdateArgs) {
  // Don't allow updating ID
  delete args.data.id

  const company = await db.company.update(args)

  return company
}
