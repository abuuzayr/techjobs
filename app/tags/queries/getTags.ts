import db, { Prisma } from "db"

export default async function getTags(args: Prisma.TagFindManyArgs) {
  const tags = await db.tag.findMany({
    orderBy: {
      name: "asc",
    },
    ...args,
  })

  return tags
}
