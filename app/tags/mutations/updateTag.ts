import db, { TagUpdateArgs } from "db"

export default async function updateTag(args: TagUpdateArgs) {
  const tag = await db.tag.update(args)

  return tag
}
