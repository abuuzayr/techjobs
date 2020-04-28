import {Head, Link, useRouter} from 'blitz'
import createTag from 'app/tags/mutations/createTag'

const NewTagPage = () => {
  const router = useRouter()
  return (
    <div className="container">
      <Head>
        <title>New Tag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Tag </h1>

        <form onSubmit={async (event) => {
          event.preventDefault()
          try {
            const tag = await createTag({data: {name: 'MyName'}})
            alert('Success!' + JSON.stringify(tag))
            router.push('/tags/[id]', `/tags/${tag.id}`)
          } catch (error) {
            alert('Error creating tag ' + JSON.stringify(error, null, 2))
          }
        }}>
          <div>Put your form fields here. But for now, just click submit</div>
          <button>Submit</button>
        </form>

        <p>
          <Link href="/tags">
            <a>Tags</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default NewTagPage

