// Imports from libraries
import { Suspense, useState, useRef, useEffect } from "react"
import { useQuery, useRouter } from "blitz"
import { Container, Hero, Tabs, Columns, Level, Heading } from "react-bulma-components"
import { FiSearch } from "react-icons/fi"
import { AiOutlineEnter } from "react-icons/ai"
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
  const router = useRouter()
  const [search, setSearch] = useState("")
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      props.setScrollTo(heroRef.current.closest(".hero").offsetHeight)
    }
  }, [heroRef])

  const handleChange = (e) => {
    setSearch(e.currentTarget.value)
  }

  const keyDown = (e) => {
    if (e.key === "Enter") {
      props.setSearch(search)
    }
  }

  const tabProps = (tab) => ({
    tabIndex: 0,
    role: "button",
    onClick: () => router.push(`/?tab=${tab}`),
    onKeyUp: () => router.push(`/?tab=${tab}`),
  })
  return (
    <Hero color="info" size="medium">
      <Hero.Head>
        <NavBar />
      </Hero.Head>
      <HeroBody style={{ marginTop: -41 }}>
        <UnsplashCredit />
        <Container>
          <Title size={1} renderAs="h1" className="has-text-centered">
            Find a <FillCode /> job in <Sun /> Singapore
          </Title>
        </Container>
        <Container>
          <Columns>
            <Columns.Column size="half" offset="one-quarter">
              <div className="field" style={{ marginTop: 15 }} ref={heroRef}>
                <p className="control has-icons-left has-icons-right">
                  <input
                    type="text"
                    className="input is-large"
                    placeholder="e.g. python, javascript"
                    value={search}
                    onChange={handleChange}
                    onKeyDown={keyDown}
                  />
                  <span className="icon is-left">
                    <FiSearch />
                  </span>
                  <span className="icon is-right">
                    <AiOutlineEnter color={search ? "red" : "white"} />
                  </span>
                </p>
                {/* TODO: Add quick search buttons for languages, etc. */}
              </div>
            </Columns.Column>
          </Columns>
        </Container>
        <Container>
          <Columns>
            <Columns.Column>
              <Level>
                <Level.Item>
                  <Heading subtitle size={6}>
                    <small>Including jobs from</small>
                  </Heading>
                </Level.Item>
              </Level>
              <Level>
                {[
                  "/TechInAsia-logo.svg",
                  "/Adzuna-logo.svg",
                  "/StackOverflow-logo.svg",
                  "/eFinancialCareers-logo.svg",
                  "/jobsDb.png",
                  "/jobsCentral.png",
                  "/jobstreet.png",
                ].map((path) => (
                  <Level.Item key={path}>
                    <Logo src={path} key={path} />
                  </Level.Item>
                ))}
              </Level>
            </Columns.Column>
          </Columns>
        </Container>
      </HeroBody>
      <Hero.Footer style={{ marginTop: -41 }}>
        <Tabs type="boxed" fullwidth={true}>
          <Container>
            <ul>
              <li className={props.tab === "featured" ? "is-active" : ""}>
                <a {...tabProps("featured")}>
                  Featured{" "}
                  <Suspense fallback={<></>}>
                    <JobsCount
                      args={{ where: { type: { equals: "featured" }, name: { contains: props.search } } }}
                    />
                  </Suspense>
                </a>
              </li>
              <li className={props.tab === "all" ? "is-active" : ""}>
                <a {...tabProps("all")}>
                  All Jobs{" "}
                  <Suspense fallback={<></>}>
                    <JobsCount
                      args={{
                        where: {
                          name: { contains: props.search },
                        },
                      }}
                    />
                  </Suspense>
                </a>
              </li>
              <li className={props.tab === "liked" ? "is-active" : ""}>
                <a {...tabProps("liked")}>
                  Liked{" "}
                  <Suspense fallback={<></>}>
                    <JobsCount args={{ where: { OR: props.liked.map((id) => ({ id })) } }} />
                  </Suspense>
                </a>
              </li>
              <li className={props.tab === "resources" ? "is-active" : ""}>
                <a {...tabProps("resources")}>Resources</a>
              </li>
            </ul>
          </Container>
        </Tabs>
      </Hero.Footer>
    </Hero>
  )
}

export default HeroComponent
