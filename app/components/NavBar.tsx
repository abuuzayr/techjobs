import React from "react"
import { Navbar, Container, Button } from "react-bulma-components"
import { Code, Title, Bell, Send } from "../styles/common"

const NavBar = () => (
  <Navbar color="info" fixed="top" transparent={true}>
    <Container>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <Code />
          <Title size={5} renderAs="h5">
            techjobs.sg
          </Title>
          <img src="/sg.svg" width="15" alt="Singapore flag" />
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Container position="end">
        <Navbar.Item href="#">
          <Button.Group size="small">
            <Button color="warning">
              <Bell />
              Subscribe
            </Button>
            <Button color="danger">
              <Send />
              Post a job
            </Button>
          </Button.Group>
        </Navbar.Item>
      </Navbar.Container>
    </Container>
  </Navbar>
)

export default NavBar
