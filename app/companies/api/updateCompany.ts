import db, { Prisma } from "db"

async function updateCompany(args: Prisma.CompanyUpdateArgs) {
  const company = await db.company.update(args)

  return company
}

const fn = async (req, res) => {
  if (req.method === "PUT") {
    // Process only if body supplied
    if (!req.body) {
      res.statusCode = 400
      res.end("No body provided")
    }
    const data = { ...req.body }
    try {
      const company = await updateCompany({ data, where: { name: data.name } })
      if (company) {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(company))
      } else {
        res.statusCode = 422
        res.end("Unable to update company. Check POST body")
      }
    } catch (e) {
      if (e.meta && e.meta.details && e.meta.details.includes("RecordNotFound")) {
        console.log("Company not found in DB")
        res.status(404).end(`Company not found in DB`)
      } else {
        console.log(e)
        res.status(400).end(`Server error`)
      }
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default fn;