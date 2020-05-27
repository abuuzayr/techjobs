import db, {FindOneTagArgs} from 'db'

export default async function getTag(args: FindOneTagArgs) {
  const tag = await db.tag.findOne(args)

  return tag
}
