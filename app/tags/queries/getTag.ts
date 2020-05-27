import db from "db"

export default async function getTag(args) {
  const tag = await db.tag.findOne(args)

  return tag
}
