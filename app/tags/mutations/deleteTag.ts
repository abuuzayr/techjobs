import db, { Prisma } from "db"

export default async function deleteTag(args: Prisma.TagDeleteArgs) {
  const tag = await db.tag.delete(args)

  return tag
}
