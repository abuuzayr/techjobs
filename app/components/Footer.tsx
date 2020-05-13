import { Link } from "blitz"
import { Container, Level } from "react-bulma-components"
import styled from "styled-components"
import { FiGithub, FiSun, FiZap } from "react-icons/fi"
import { IconContext } from "react-icons"

const Foot = styled.footer`
  border-top: 1px solid #000;
  padding: 30px;
  margin: 50px 50px 0;
  a {
    color: black;
  }
`

const Footer = () => {
  return (
    <Foot>
      <IconContext.Provider value={{ style: { margin: "0 5px", verticalAlign: "middle" } }}>
        <Container>
          <Level>
            <Level.Side align="left">
              <Link href="/">
                <a className="heading">About</a>
              </Link>
            </Level.Side>
            <Level.Item>
              <p className="">
                Built in <FiSun /> with{" "}
                <a href="https://github.com/blitz-js/blitz/">
                  <FiZap />
                  Blitz.js
                </a>
              </p>
            </Level.Item>
            <Level.Side align="right">
              <a href="https://www.github.com/abuuzayr/techjobs">
                <FiGithub />
              </a>
            </Level.Side>
          </Level>
        </Container>
      </IconContext.Provider>
    </Foot>
  )
}

export default Footer
