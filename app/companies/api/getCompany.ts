import db, { Prisma } from "db"

async function getCompany(args: Prisma.CompanyFindUniqueArgs) {
  const company = await db.company.findFirst(args)

  return company
}

const fn = async (req, res) => {
  if (req.method === "GET") {
    if (!req.query.name) {
      res.statusCode = 400
      res.end("No company name provided")
    }
    const company = await getCompany({ where: { name: `${req.query.name}` } })
    if (company) {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(company))
    } else {
      res.statusCode = 404
      res.end("Company not found")
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default fn;
