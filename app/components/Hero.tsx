import React from "react"
import { Container, Hero, Tabs, Columns } from "react-bulma-components"
import NavBar from "./NavBar"
import { Title, HeroBody, Sun } from "../styles/common"
import { FiSearch } from "react-icons/fi"

const HeroComponent = () => (
  <Hero color="info" size="medium">
    <Hero.Head>
      <NavBar />
    </Hero.Head>
    <HeroBody style={{ marginTop: -41 }}>
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
  </Hero>
)

export default HeroComponent
