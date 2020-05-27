import db from "db"

export default async function updateCompany(args) {
  // Don't allow updating ID
  delete args.data.id

  const company = await db.company.update(args)

  return company
}
