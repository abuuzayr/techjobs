import db, {FindManyTagArgs} from 'db'

export default async function getTags(args: FindManyTagArgs) {
  const tags = await db.tag.findMany(args)

  return tags
}
