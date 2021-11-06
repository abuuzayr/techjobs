import db, { Prisma } from "db"

async function getCompanies(args: Prisma.CompanyFindManyArgs) {
  const companies = await db.company.findMany(args)

  return companies
}

const fn = async (req, res) => {
  if (req.method === "GET") {
    const companies = await getCompanies({})
    if (companies) {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(companies))
    } else {
      res.statusCode = 400
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default fn;
