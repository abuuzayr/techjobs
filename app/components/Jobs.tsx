import { Suspense, useState, useEffect } from "react"
import { useQuery, useInfiniteQuery } from "blitz"
import { Container, Button, Loader, Content, Level } from "react-bulma-components"
import { IoMdHappy } from "react-icons/io"
import { RiDownloadLine } from "react-icons/ri"

import Job from "./Job"
import TagsSelect from "./TagsSelect"
import getJobs from "../jobs/queries/getJobs"
import getJobsCount from "../jobs/queries/getJobsCount"
import Filters from "app/components/JobFilters"
import { SOURCES } from "app/pages/index"

const Jobs = (props) => {
  const { args, search, tab } = props
  const JOBS_TO_SHOW = 20
  const SCROLL_OFFSET = 50
  const [page, setPage] = useState(0)
  const [totalJobsCount] = useQuery(getJobsCount, args)
  const [selectedTags, setSelectedTags] = useState([])
  const [scrollTo, setScrollTo] = useState(props.scrollTo)
  const [scrollBehavior, setScrollBehavior] = useState("smooth")
  const [withSalary, setWithSalary] = useState(false)
  const [sources, setSources] = useState(
    SOURCES.filter((s) => !s.hasOwnProperty("via")).map((s) => s.name)
  )

  useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem("_tags")) {
        setSelectedTags(JSON.parse(localStorage.getItem("_tags") || ""))
      }
      if (localStorage.getItem("_sources")) {
        setSources(JSON.parse(localStorage.getItem("_sources") || ""))
      }
      setWithSalary(!!localStorage.getItem("_withSalary"))
    }
  }, [])

  // Update args to include
  let updatedArgs = { ...args }
  if (args["where"]["AND"]) {
    if (!args["where"]["AND"].find((o) => o.hasOwnProperty("type"))) {
      args["where"]["AND"].push({ type: "aggregated" })
    }
  } else {
    args["where"]["AND"] = [{ type: "aggregated" }]
  }
  if (selectedTags.length) {
    updatedArgs = {
      ...args,
      where: {
        ...args.where,
        AND: [
          ...args.where.AND,
          {
            AND: selectedTags.map((tag) => ({ tags: { some: { name: { equals: tag } } } })),
          },
        ],
      },
    }
  }

  const [
    jobPages,
    { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage },
  ] = useInfiniteQuery(getJobs, (page = { ...updatedArgs, take: JOBS_TO_SHOW, skip: 0 }) => page, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  // get featured jobs
  let featuredArgs = JSON.parse(JSON.stringify(updatedArgs))
  featuredArgs["where"]["AND"].find((o) => o.hasOwnProperty("type"))["type"] = "featured"
  if (!featuredArgs["where"]["AND"].find((o) => o.hasOwnProperty("postedDate"))) {
    featuredArgs["where"]["AND"].push({
      postedDate: {
        gte: new Date(new Date(new Date().getTime() - 31 * 24 * 60 * 60 * 1000).toDateString()),
      },
    })
  }
  const [featuredJobs] = useQuery(getJobs, featuredArgs)
  const [jobsCount] = useQuery(getJobsCount, updatedArgs)

  // Set scroll to behavior
  useEffect(() => {
    if (scrollTo) {
      const smooth = scrollBehavior === "smooth"
      window.scrollTo({
        top: scrollTo - (smooth ? SCROLL_OFFSET : 0),
        behavior: smooth ? "smooth" : "auto",
      })
    }
  }, [search, tab, scrollTo])

  return (
    <Container style={{ padding: "2rem 2rem 0" }}>
      <TagsSelect {...{ selectedTags, setSelectedTags }} />
      <Filters
        withSalary={withSalary}
        setWithSalary={setWithSalary}
        sources={sources}
        setSources={setSources}
      />
      {selectedTags.length > 0 && (
        <Level>
          <Level.Side align="left"></Level.Side>
          <Level.Side align="right">
            <Content size="small">
              {jobsCount ? (
                <p style={{ margin: "0 10px 0 0" }}>
                  {jobsCount} / {totalJobsCount} {totalJobsCount > 1 ? "total jobs" : "job"}
                </p>
              ) : (
                <></>
              )}
            </Content>
          </Level.Side>
        </Level>
      )}
      {featuredJobs.jobs.map((job) => (
        <Job key={job.id} data={job} {...{ selectedTags, setSelectedTags }} />
      ))}
      {jobPages.map((page) =>
        page.jobs.map((job) => (
          <Job key={job.id} data={job} {...{ selectedTags, setSelectedTags }} />
        ))
      )}
      <Level>
        {!hasNextPage ? (
          <Level.Item>
            <IoMdHappy /> You have loaded all jobs!
          </Level.Item>
        ) : (
          <Level.Item>
            <Button
              outlined={true}
              color="info"
              onClick={() => {
                setScrollTo(window.scrollY)
                setScrollBehavior("auto")
                fetchNextPage()
              }}
              disabled={isFetching || isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more jobs..." : <><RiDownloadLine style={{ marginRight: 5 }} />Load more jobs</>}
            </Button>
          </Level.Item>
        )}
      </Level>
    </Container>
  )
}

const WrappedJobs = (props) => {
  return (
    <Suspense
      fallback={
        <Level.Item>
          <Loader style={{ width: 100, height: 100, marginTop: 100 }} />
        </Level.Item>
      }
    >
      <Jobs {...props} />
    </Suspense>
  )
}

export default WrappedJobs
