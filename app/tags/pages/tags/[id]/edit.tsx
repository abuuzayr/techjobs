import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getTag from 'app/tags/queries/getTag'
import updateTag from 'app/tags/mutations/updateTag'

export const EditTag = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [tag] = useQuery(getTag, {where: {id}})

  return (
    <div>
      <h1>Edit Tag {tag.id}</h1>
      <pre>
        {JSON.stringify(tag)}
      </pre>

      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          const updated = await updateTag({
            where: {id: tag.id},
            data: {name: 'MyNewName'},
          })
          alert('Success!' + JSON.stringify(updated))
          router.push('/tags/[id]', `/tags/${updated.id}`)
        } catch (error) {
          alert('Error creating tag ' + JSON.stringify(error, null, 2))
        }
      }}>
        <div>Put your form fields here. But for now, just click submit</div>
        <button>Submit</button>
      </form>
    </div>
  )
}

const EditTagPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Edit Tag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditTag />
        </Suspense>

        <p>
          <Link href="/tags">
            <a>Tags</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default EditTagPage

