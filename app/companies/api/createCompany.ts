import db, { Prisma } from "db"

async function createCompany(args: Prisma.CompanyCreateArgs) {
  const company = await db.company.create(args)

  return company
}

const fn = async (req, res) => {
  if (req.method === "POST") {
    // Process only if body supplied
    if (!req.body) {
      res.statusCode = 400
      res.end("No body provided")
    }
    const company = await createCompany({ data: req.body })
    if (company) {
      res.statusCode = 201
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(company))
    } else {
      res.statusCode = 422
      res.end("Unable to create company. Check POST body")
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default fn
