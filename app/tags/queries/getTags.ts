import db from "db"

export default async function getTags(args) {
  const tags = await db.tag.findMany(args)

  return tags
}
