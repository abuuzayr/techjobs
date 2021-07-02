import { useEffect, useState } from "react"
import { useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import ContentNotFound from "app/components/ContentNotFound"
import About from "app/components/About"
import Resources from "app/components/Resources"
import { JobForm } from "app/jobs/components/JobForm"
import { NewJob } from "app/jobs/validations"
import Jobs from "app/components/Jobs"
import LikedContext from "app/components/LikedContext"
import SearchContext from "app/components/SearchContext"
import TabContext from "app/components/TabContext"
import JobContext from "app/components/JobContext"

const allowedTabs = ["featured", "all", "liked", "resources", "about", "post"]

type QueryArgs = {
  where: {
    AND?: Object[]
    OR?: Object[]
  }
}

const Category: BlitzPage = () => {
  const tab = useParam("id", "string")
  const [liked, setLiked]: [number[], Function] = useState([])
  const [search, setSearch]: [string, Function] = useState("")

  // arguments for database searching
  // we declare all so we won't have a problem with types
  let args: QueryArgs = {
    where: {
      AND: [{ type: { equals: tab } }, { searchStr: { contains: search.toLowerCase() } }],
      OR: liked.map((id) => ({
        id,
      })),
    },
  }
  // we remove the keys that we do not need based on the tab
  if (tab === "all") {
    args["where"]["AND"] = args["where"]["AND"]
      ? args["where"]["AND"].filter((arg) => {
          return !Object.keys(arg).includes("type")
        })
      : args["where"]["AND"]
  } else if (tab === "liked") {
    delete args["where"]["AND"]
  }
  if (tab !== "liked") delete args["where"]["OR"]

  return (
    <LikedContext.Consumer>
      {({ liked: likedFromContext }) => {
        return (
          <SearchContext.Consumer>
            {({ search: searchFromContext }) => {
              return (
                <TabContext.Consumer>
                  {({ tab: tabFromContext, setTab: setTabContext }) => {
                    return (
                      <JobContext.Consumer>
                        {({ job, setJob }) => {
                          setLiked(likedFromContext)
                          setSearch(searchFromContext)
                          setTabContext(tab)
                          setJob(0)
                          return (
                            <>
                              {!allowedTabs.includes(tab as string) && <ContentNotFound />}
                              {["featured", "all", "liked"].includes(tab as string) && (
                                <Jobs {...{ args, search, tab }} />
                              )}
                              {tab === "about" && <About />}
                              {tab === "resources" && <Resources />}
                              {tab === "post" && (
                                <JobForm
                                  submitText="Add featured job"
                                  schema={NewJob}
                                  initialValues={{}}
                                  onSubmit={() => {}}
                                />
                              )}
                            </>
                          )
                        }}
                      </JobContext.Consumer>
                    )
                  }}
                </TabContext.Consumer>
              )
            }}
          </SearchContext.Consumer>
        )
      }}
    </LikedContext.Consumer>
  )
}

Category.getLayout = (page) => <Layout title="Jobs">{page}</Layout>

export default Category

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "all" } },
      { params: { id: "post" } },
      { params: { id: "featured" } },
      { params: { id: "about" } },
      { params: { id: "liked" } },
      { params: { id: "resources" } },
    ],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: { id: params.id },
    revalidate: 1,
  }
}