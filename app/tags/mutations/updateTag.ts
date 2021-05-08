import db, { Prisma } from "db"

export default async function updateTag(args: Prisma.TagUpdateArgs) {
  const tag = await db.tag.update(args)

  return tag
}
