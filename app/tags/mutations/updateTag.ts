import db, {TagUpdateArgs} from 'db'

export default async function updateTag(args: TagUpdateArgs) {
  // Don't allow updating ID
  delete args.data.id

  const tag = await db.tag.update(args)

  return tag
}
