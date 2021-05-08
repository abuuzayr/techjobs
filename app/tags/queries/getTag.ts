import db, { Prisma } from "db"

export default async function getTag(args: Prisma.TagFindUniqueArgs) {
  const tag = await db.tag.findFirst(args)

  return tag
}
