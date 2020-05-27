import db from "db"

export default async function updateTag(args) {
  // Don't allow updating ID
  delete args.data.id

  const tag = await db.tag.update(args)

  return tag
}
