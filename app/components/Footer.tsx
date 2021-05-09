import { Link } from "blitz"
import { Container, Level } from "react-bulma-components"
import { FiGithub, FiSun, FiZap } from "react-icons/fi"
import { IconContext } from "react-icons"
import Subscribe from "./Subscribe"

const Footer = () => {
  return (
    <footer>
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
                  <a href="/stats" rel="noopener noreferrer" target="_blank" className="heading">
                    Stats
                  </a>
                </Level.Item>
              </Level.Side>
              <Level.Item>
                <p className="">
                  Built in <FiSun /> with{" "}
                  <a
                    href="https://github.com/blitz-js/blitz/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FiZap />
                    Blitz
                  </a>
                </p>
              </Level.Item>
              <Level.Side align="right" className="level-item">
                <a
                  href="https://www.github.com/abuuzayr/techjobs"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FiGithub />
                </a>
              </Level.Side>
            </Level>
          </Container>
        </IconContext.Provider>
      </div>
    </footer>
  )
}

export default Footer
