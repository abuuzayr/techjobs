import db, { CompanyUpdateArgs } from "db"

async function updateCompany(args: CompanyUpdateArgs) {
  const company = await db.company.update(args)

  return company
}

export default async (req, res) => {
  if (req.method === "PUT") {
    // Process only if body supplied
    if (!req.body) {
      res.statusCode = 400
      res.end("No body provided")
    }
    const data = { ...req.body }
    const company = await updateCompany({ data, where: { name: data.name } })
    if (company) {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(company))
    } else {
      res.statusCode = 422
      res.end("Unable to update company. Check POST body")
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
