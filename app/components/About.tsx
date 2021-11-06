import { Link, Image } from "blitz"
import { Section, Container, Heading, Tile, Level } from "react-bulma-components"

const About = (props) => {
  const logos = {
    "blitz.png": "https://blitzjs.com/",
    "cloudflare.svg": "https://www.cloudflare.com/",
    "digitalocean.svg": "https://www.digitalocean.com/",
    "docker.png": "https://www.docker.com/",
    "next.svg": "https://nextjs.org/",
    "nginx.png": "https://www.nginx.com/",
    "node.svg": "https://nodejs.org/en/",
    "prisma.png": "https://www.prisma.io/",
    "postgresql.png": "https://www.postgresql.org/",
    "react.svg": "https://reactjs.org/",
    "yarn.svg": "https://yarnpkg.com/",
    "styledcomponents.png": "https://styled-components.com/",
    "bulma.png": "https://bulma.io/",
  }
  return (
    <Section>
      <Container>
        <Section>
          <Level.Item>
            <Heading size={3} renderAs="h3">
              About
            </Heading>
          </Level.Item>
        </Section>
        <Tile kind="ancestor">
          <Tile size={12} vertical>
            <Tile>
              <Tile kind="parent" vertical>
                <Tile renderAs="article" kind="child" notification color="primary">
                  <Heading>Who we are</Heading>
                  <Heading subtitle>A couple of Singaporean indie hackers </Heading>
                </Tile>
                <Tile renderAs="article" kind="child" notification color="warning">
                  <Heading>What we want</Heading>
                  <Heading subtitle>
                    To help people find tech related jobs in Singapore easily
                  </Heading>
                </Tile>
              </Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child" notification color="info">
                  <Heading>How we plan to achieve it</Heading>
                  <Heading subtitle>By listing jobs from as many places as we can!</Heading>
                </Tile>
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile renderAs="article" kind="child" notification color="danger">
                <Heading>Want to list a job?</Heading>
                <Heading subtitle>
                  We{`&apos;`}re happy to help. Post a job{" "}
                  <Link href="/category/post#top" scroll={false}>
                    <a>here</a>
                  </Link>{" "}
                  and it will appear as a <strong>featured</strong> job at the top of searches.
                </Heading>
                <div className="content" />
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile renderAs="article" kind="child" notification color="light">
                <Heading>Technologies used for this app</Heading>
                <Heading subtitle style={{ marginBottom: 0, textAlign: "center" }}>
                  {Object.entries(logos).map(([path, url]) => (
                    <a href={url} target="_blank" rel="noreferrer" key={path}>
                      <img
                        src={`/${path}`}
                        alt={path.split(".")[0]}
                        style={{
                          maxHeight: 100,
                          maxWidth: 200,
                          display: "inline-block",
                          margin: 20,
                          verticalAlign: "middle",
                        }}
                      />
                    </a>
                  ))}
                </Heading>
                <div className="content" />
              </Tile>
            </Tile>
          </Tile>
        </Tile>
      </Container>
    </Section>
  )
}

export default About
