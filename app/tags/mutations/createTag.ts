import db, {TagCreateArgs} from 'db'

export default async function createTag(args: TagCreateArgs) {
  const tag = await db.tag.create(args)

  return tag
}
