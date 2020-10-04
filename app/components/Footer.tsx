import { Link } from "blitz"
import { Container, Level } from "react-bulma-components"
import styled from "styled-components"
import { FiGithub, FiSun, FiZap } from "react-icons/fi"
import { IconContext } from "react-icons"
import Subscribe from "./Subscribe"

const Foot = styled.footer`
  .foot {
    border-top: 1px solid #000;
    padding: 30px;
    margin: 50px 50px 0;
    a {
      color: black;
    }
    @media screen and (max-width: 768px) {
      .level-item {
        justify-content: center;
        align-items: end;
      }
      .level-left .level-item {
        margin-bottom: 0;
        + .level-item {
          margin-left: 10px;
        }
      }
    }
  }
`

const Footer = () => {
  return (
    <Foot>
      <Subscribe />
      <div className="foot">
        <IconContext.Provider value={{ style: { margin: "0 5px", verticalAlign: "middle" } }}>
          <Container>
            <Level>
              <Level.Side align="left" className="level-item">
                <Level.Item>
                  <Link href="/?tab=about" as="/category/about" scroll={false}>
                    <a className="heading">About</a>
                  </Link>
                </Level.Item>
                <Level.Item>
                  <Link href="/stats">
                    <a className="heading">Stats</a>
                  </Link>
                </Level.Item>
              </Level.Side>
              <Level.Item>
                <p className="">
                  Built in <FiSun /> with{" "}
                  <a href="https://github.com/blitz-js/blitz/" rel="noopener noreferrer" target="_blank">
                    <FiZap />
                    Blitz
                  </a>
                </p>
              </Level.Item>
              <Level.Side align="right" className="level-item">
                <a href="https://www.github.com/abuuzayr/techjobs" rel="noopener noreferrer" target="_blank">
                  <FiGithub />
                </a>
              </Level.Side>
            </Level>
          </Container>
        </IconContext.Provider>
      </div>
    </Foot>
  )
}

export default Footer
