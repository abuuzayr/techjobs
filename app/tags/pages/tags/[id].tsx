import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getTag from 'app/tags/queries/getTag'
import deleteTag from 'app/tags/mutations/deleteTag'


export const Tag = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [tag] = useQuery(getTag, {where: {id}})

  return (
    <div>
      <h1>Tag {tag.id}</h1>
      <pre>
        {JSON.stringify(tag)}
      </pre>

      <Link href="/tags/[id]/edit" as={`/tags/${tag.id}/edit`}>
        <a>Edit</a>
      </Link>

        <button type="button" onClick={async () => {
          if (confirm("This will be deleted")) {
            await deleteTag({where: {id: tag.id}})
            router.push('/tags')
          }
        }}>
        Delete
      </button>
    </div>
  )
}

const ShowTagPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Tag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <Link href="/tags">
            <a>Tags</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Tag />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowTagPage

