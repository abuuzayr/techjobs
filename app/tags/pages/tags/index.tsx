import {Suspense} from 'react'
import {Head, Link, useQuery} from 'blitz'
import getTags from 'app/tags/queries/getTags'

export const TagsList = () => {
  const [tags] = useQuery(getTags)

  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag.id}>
          <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
            <a>{tag.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const TagsPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Tags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Tags</h1>

        <p>
          <Link href="/tags/new">
            <a>Create Tag</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TagsList />
        </Suspense>
      </main>
    </div>
  )
}

export default TagsPage



