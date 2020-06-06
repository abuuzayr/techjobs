// Imports from libraries
import { Suspense, useState, useRef, useEffect } from "react"
import { useQuery, Link, useRouter } from "blitz"
import { Container, Hero, Tabs, Columns, Level, Heading } from "react-bulma-components"
import { FiSearch, FiDelete } from "react-icons/fi"
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

const JobsCount = (props) => {
  const [jobsCount] = useQuery(getJobsCount, props.args)
  return <span style={{ marginLeft: 5 }}>({jobsCount})</span>
}

const HeroComponent = (props) => {
  const [search, setSearch] = useState("")
  const heroRef = useRef(null)
  const router = useRouter()
  const tabs = [
    {
      id: "featured",
      title: "Featured",
      query: { where: { type: { equals: "featured" }, searchStr: { contains: props.search.toLowerCase() } } },
    },
    {
      id: "all",
      title: "All Jobs",
      query: { where: { searchStr: { contains: props.search.toLowerCase() } } },
    },
    {
      id: "liked",
      title: "Liked",
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

  const handleChange = (e) => {
    setSearch(e.currentTarget.value)
  }

  const clearSearch = () => {
    props.setSearch("")
    setSearch("")
  }

  const keyDown = (e, bypass = false) => {
    if (e.key === "Enter" || bypass) {
      props.setSearch(search)
      if (!["all", "featured"].includes(props.tab))
        router.push("/?tab=all", "/category/all", { shallow: true })
    }
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
                    placeholder="e.g. python, javascript"
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
                    onKeyDown={clearSearch}
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
                  <Logo src={path} key={path} />
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
                  <Link href={`/?tab=${li.id}`} as={`/category/${li.id}`} scroll={false}>
                    <a style={{ color: props.tab === li.id ? "#333" : "" }}>
                      {li.title}{" "}
                      <Suspense fallback={<></>}>
                        <JobsCount args={li.query} />
                      </Suspense>
                    </a>
                  </Link>
                </li>
              ))}
              <li className={props.tab === "resources" ? "is-active" : ""}>
                <Link href={`/?tab=resources`} as={`/category/resources`} scroll={false}>
                  <a style={{ color: props.tab === "resources" ? "#333" : "" }}>Resources</a>
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
