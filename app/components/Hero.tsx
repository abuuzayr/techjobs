// Imports from libraries
import { Suspense, useState, useRef, useEffect } from "react"
import { useQuery, Link, useRouter } from "blitz"
import { Container, Hero, Tabs, Columns, Level, Heading } from "react-bulma-components"
import { FiSearch, FiDelete } from "react-icons/fi"
import { GrStackOverflow } from "react-icons/gr"
import { FcLike } from "react-icons/fc"
import { AiFillLike, AiOutlineProfile } from "react-icons/ai"
import styled from "styled-components"

// Import components
import NavBar from "./NavBar"
import UnsplashCredit from "./UnsplashCredit"
import { Title, HeroBody, Sun, FillCode } from "../styles/common"

// Import queries
import getJobsCount from "app/jobs/queries/getJobsCount"

const Logo = styled.img`
  max-height: 30px;
  filter: brightness(0) invert(1);
`

const IconWrapper = styled.div`
  margin-right: 10px;
  svg {
    vertical-align: middle;
  }
`

const HeroComponent = (props) => {
  const [search, setSearch] = useState(props.search)
  const heroRef = useRef(null)
  const router = useRouter()
  const [queryStr, setQueryStr] = useState("")
  const [jobsCounts, setJobsCounts] = useState({})
  const [allJobsCount, setAllJobsCount] = useState(0)
  const tabs = [
    {
      id: "featured",
      title: "Featured",
      icon: <AiFillLike />,
      query: { where: { type: { equals: "featured" }, searchStr: { contains: props.search.toLowerCase() } } },
    },
    {
      id: "all",
      title: "All Jobs",
      icon: <GrStackOverflow />,
      query: {
        where: {
          AND: [
            {
              searchStr: { contains: props.search.toLowerCase() },
            },
            {
              postedDate: {
                gte: new Date(new Date().getTime() - 31 * 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
      },
    },
    {
      id: "liked",
      title: "Liked",
      icon: <FcLike />,
      query: { where: { OR: props.liked.map((id) => ({ id })) } },
    },
  ]
  const jobsiteLogos = [
    "/TechInAsia-logo.svg",
    "/Adzuna-logo.svg",
    "/StackOverflow-logo.svg",
    "/eFinancialCareers-logo.svg",
    "/jobsDB.png",
    "/jobsCentral.png",
    "/jobstreet.png",
  ]

  useEffect(() => {
    if (heroRef.current) {
      props.setScrollTo(heroRef.current.closest(".hero").offsetHeight)
    }
  }, [heroRef])

  useEffect(() => {
    setSearch(props.search)
  }, [props.search])

  useEffect(() => {
    async function getAllJobsCount() {
      const count = await getJobsCount({
        where: {
          postedDate: {
            gte: new Date(new Date().getTime() - 31 * 24 * 60 * 60 * 1000),
          },
        },
      })
      setAllJobsCount(count)
    }
    getAllJobsCount()
  }, [props.search])

  useEffect(() => {
    async function getCounts() {
      await Promise.all(
        tabs.map(async (tab) => {
          const count = await getJobsCount(tab.query)
          setJobsCounts((p) => ({
            ...p,
            [tab.id]: count,
          }))
        })
      )
    }
    getCounts()
  }, [props.search])

  useEffect(() => {
    if (!router) return
    const query = { ...router.query }
    delete query.tab
    if (search) {
      query["search"] = search
    } else {
      delete query.search
    }
    setQueryStr(
      Object.keys(query)
        .reduce((str, key) => {
          if (key && query[key]) {
            str += `${key}=${query[key]}&`
          }
          return str
        }, "")
        .slice(0, -1)
    )
  }, [router, search])

  const handleChange = (e) => {
    setSearch(e.currentTarget.value)
  }

  const clearSearch = () => {
    props.setSearch("")
    setSearch("")
    pushRoute(true)
  }

  const keyDown = (e, bypass = false) => {
    if (e.key === "Enter" || bypass) {
      props.setSearch(search)
      pushRoute()
    }
  }

  const pushRoute = (clear = false) => {
    router.push(
      `/?tab=${props.tab}&${!clear && queryStr ? queryStr : ""}`,
      `/category/${props.tab}${!clear && queryStr ? `?${queryStr}` : ""}`,
      { shallow: true }
    )
  }

  return (
    <Hero color="info" size="medium">
      <Hero.Head>
        <NavBar />
      </Hero.Head>
      <HeroBody>
        <UnsplashCredit />
        <Container>
          <Title size={1} renderAs="h1" className="has-text-centered">
            Find a <FillCode /> job in <Sun /> Singapore
          </Title>
        </Container>
        <Container>
          <Columns>
            <Columns.Column size={10} offset={1}>
              <div className="field" style={{ marginTop: 15 }} ref={heroRef}>
                <p className="control has-icons-left has-icons-right">
                  <input
                    type="text"
                    className="input is-large"
                    placeholder={
                      allJobsCount ? `Search ${allJobsCount} recent jobs` : "e.g. python, javascript"
                    }
                    value={search}
                    onChange={handleChange}
                    onKeyDown={keyDown}
                    onBlur={(e) => keyDown(e, true)}
                  />
                  <span className="icon is-left">
                    <FiSearch />
                  </span>
                  <span
                    className="icon is-right"
                    style={{ pointerEvents: "initial" }}
                    onClick={clearSearch}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") clearSearch()
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <FiDelete />
                  </span>
                </p>
                {/* TODO: Add quick search buttons for languages, etc. */}
              </div>
            </Columns.Column>
          </Columns>
        </Container>
        <Columns>
          <Columns.Column className="is-hidden-mobile">
            <Level>
              <Level.Item>
                <Heading subtitle size={6}>
                  <small>Including jobs from</small>
                </Heading>
              </Level.Item>
            </Level>
            <Level>
              {jobsiteLogos.map((path, index) => (
                <Level.Item key={path} className={index > 4 ? "is-hidden-touch" : ""}>
                  <Logo src={path} key={path} alt={path.slice(1).split(".")[0].split("-")[0] + " logo"} />
                </Level.Item>
              ))}
            </Level>
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet">
            <div style={{ marginTop: 30 }} />
          </Columns.Column>
        </Columns>
      </HeroBody>
      <Hero.Footer style={{ marginTop: -41 }}>
        <Tabs type="boxed" fullwidth={true}>
          <Container>
            <ul>
              {tabs.map((li) => (
                <li key={li.id} className={props.tab === li.id ? "is-active" : ""}>
                  <Link
                    href={`/?tab=${li.id}${queryStr ? `&${queryStr}` : ""}`}
                    as={`/category/${li.id}${queryStr ? `?${queryStr}` : ""}`}
                    scroll={false}
                  >
                    <a style={{ color: props.tab === li.id ? "#333" : "" }}>
                      <IconWrapper>{li.icon}</IconWrapper>
                      {li.title} {jobsCounts.hasOwnProperty(li.id) ? `(${jobsCounts[li.id]})` : ""}
                    </a>
                  </Link>
                </li>
              ))}
              <li className={props.tab === "resources" ? "is-active" : ""}>
                <Link href={`/?tab=resources`} as={`/category/resources`} scroll={false}>
                  <a style={{ color: props.tab === "resources" ? "#333" : "" }}>
                    <IconWrapper>
                      <AiOutlineProfile />
                    </IconWrapper>
                    Resources
                  </a>
                </Link>
              </li>
            </ul>
          </Container>
        </Tabs>
      </Hero.Footer>
    </Hero>
  )
}

export default HeroComponent
