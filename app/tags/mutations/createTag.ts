import db, { Prisma } from "db"

export default async function createTag(args: Prisma.TagCreateArgs) {
  const tag = await db.tag.create(args)

  return tag
}
