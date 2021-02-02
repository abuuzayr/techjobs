import db, { FindUniqueTagArgs } from "db"

export default async function getTag(args: FindUniqueTagArgs) {
  const tag = await db.tag.findFirst(args)

  return tag
}
