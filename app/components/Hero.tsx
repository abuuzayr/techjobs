// Imports from libraries
import { Suspense } from "react"
import { useQuery } from "blitz"
import { Container, Hero, Tabs, Columns, Level, Heading } from "react-bulma-components"
import { FiSearch } from "react-icons/fi"
import styled from "styled-components"

// Import components
import NavBar from "./NavBar"
import { Title, HeroBody, Sun } from "../styles/common"

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
  const tabProps = (tab) => ({
    tabIndex: 0,
    role: "button",
    onClick: () => props.setTab(tab),
    onKeyUp: () => props.setTab(tab),
  })
  return (
    <Hero color="info" size="medium">
      <Hero.Head>
        <NavBar />
      </Hero.Head>
      <HeroBody style={{ marginTop: -41 }}>
        <div className="credits">
          <Level.Side align="right">
            <a
              className="unsplash"
              href="https://unsplash.com/@kp89_?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
              target="_blank"
              rel="noopener noreferrer"
              title="Download free do whatever you want high-resolution photos from Kirill Petropavlov"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <title>unsplash-logo</title>
                  <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
                </svg>
              </span>
              <span>Kirill Petropavlov</span>
            </a>
          </Level.Side>
        </div>
        <Container>
          <Title size={1} renderAs="h1" className="has-text-centered">
            Find a job in <Sun /> Singapore
          </Title>
        </Container>
        <Container>
          <Columns>
            <Columns.Column size="half" offset="one-quarter">
              <div className="field" style={{ marginTop: 15 }}>
                <p className="control has-icons-left">
                  <input type="text" className="input is-large" placeholder="e.g. python, javascript" />
                  <span className="icon is-left">
                    <FiSearch />
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
                  <Level.Item>
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
                    <JobsCount args={{ where: { type: { equals: "featured" } } }} />
                  </Suspense>
                </a>
              </li>
              <li className={props.tab === "aggregated" ? "is-active" : ""}>
                <a {...tabProps("aggregated")}>
                  Aggregated{" "}
                  <Suspense fallback={<></>}>
                    <JobsCount args={{ where: { type: { equals: "aggregated" } } }} />
                  </Suspense>
                </a>
              </li>
              <li className={props.tab === "liked" ? "is-active" : ""}>
                <a {...tabProps("liked")}>Liked (0)</a>
              </li>
              <li className={props.tab === "resources" ? "is-active" : ""}>
                <a {...tabProps("resources")}>Resources</a>
              </li>
            </ul>
          </Container>
        </Tabs>
      </Hero.Footer>
      <style jsx>{`
        .credits {
          position: absolute;
          top: 70px;
          right: 20px;
        }
        .unsplash {
          color: white;
          padding: 4px 6px;
          font-size: 12px;
          line-height: 1.2;
          border-radius: 3px;
          opacity: 0.6;
        }
        .unsplash span {
          display: inline-block;
          padding: 2px 3px;
        }
        .unsplash span svg {
          height: 12px;
          width: auto;
          position: relative;
          vertical-align: middle;
          top: -2px;
          fill: white;
        }
      `}</style>
    </Hero>
  )
}

export default HeroComponent
