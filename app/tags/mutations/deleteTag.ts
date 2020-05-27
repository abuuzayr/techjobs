import db from "db"

export default async function deleteTag(args) {
  const tag = await db.tag.delete(args)

  return tag
}
