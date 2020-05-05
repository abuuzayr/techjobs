import React from "react"
import { Container, Hero, Tabs, Columns, Level, Button } from "react-bulma-components"
import NavBar from "./NavBar"
import { Title, HeroBody, Sun } from "../styles/common"
import { FiSearch } from "react-icons/fi"

const HeroComponent = () => (
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
    </HeroBody>
    <Hero.Footer style={{ marginTop: -41 }}>
      <Tabs type="boxed" fullwidth={true}>
        <Container>
          <ul>
            <li className="is-active">
              <a>Featured</a>
            </li>
            <li>
              <a>Aggregated</a>
            </li>
            <li>
              <a>Resources</a>
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

export default HeroComponent
