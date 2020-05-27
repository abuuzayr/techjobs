import db from "db"

export default async function createTag(args) {
  const tag = await db.tag.create(args)

  return tag
}
