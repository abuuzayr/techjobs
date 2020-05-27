import db, {TagDeleteArgs} from 'db'

export default async function deleteTag(args: TagDeleteArgs) {
  const tag = await db.tag.delete(args)

  return tag
}
