import React from "react"
import { Link } from "blitz"
import { Navbar, Container } from "react-bulma-components"
import { Code, Title, Send, Post } from "../styles/common"

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
      </Navbar.Brand>
      <Navbar.Container position="end" className="is-hidden-touch">
        <Navbar.Item style={{ backgroundColor: "transparent" }} renderAs="div">
          <Link href="/?tab=post" as="/category/post" scroll={false}>
            <a className="heading" style={{ color: "white" }}>
              <Send /> Post a Job
            </a>
          </Link>
        </Navbar.Item>
      </Navbar.Container>
      <Post className="is-hidden-desktop">
        <Link href="/?tab=post" as="/category/post" scroll={false}>
          <a className="heading" style={{ color: "white" }}>
            <Send /> Post a Job
          </a>
        </Link>
      </Post>
    </Container>
  </Navbar>
)

export default NavBar
