import React from "react"
import { Link } from "blitz"
import { Heading, Navbar, Container } from "react-bulma-components"
import { AiOutlineCode } from "react-icons/ai"
import { IoIosSend } from "react-icons/io"

const NavBar = () => {
  return (
    <Navbar color="info" fixed="top" transparent={true} className="top-nav-bar">
      <Container>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <AiOutlineCode
              style={{
                width: 30,
                height: 30,
                marginRight: 5,
              }}
            />
            <Heading size={5} renderAs="h5" className="navbar-title">
              techjobs.sg
            </Heading>
            <img src="/sg.svg" width="15" alt="Singapore flag" />
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Container position="end" className="is-hidden-touch">
          <Navbar.Item style={{ backgroundColor: "transparent" }} renderAs="div">
            <Link href="/?tab=post" as="/category/post" scroll={false}>
              <a className="heading" style={{ color: "white" }}>
                <IoIosSend style={{ marginRight: 5 }} /> Post a Job
              </a>
            </Link>
          </Navbar.Item>
        </Navbar.Container>
        <div className="is-hidden-desktop post-a-job">
          <Link href="/?tab=post" as="/category/post" scroll={false}>
            <a className="heading" style={{ color: "white" }}>
              <IoIosSend style={{ marginRight: 5 }} /> Post a Job
            </a>
          </Link>
        </div>
      </Container>
      <style>{`
        .navbar-title {
          color: white;
          margin-bottom: 0 !important;
          margin-right: 10px;
          
        }
        .post-a-job {
          position: absolute;
          right: 20px;
          top: 20px;
        }
      `}</style>
    </Navbar>
  )
}

export default NavBar
