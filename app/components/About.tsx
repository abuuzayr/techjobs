import { Link } from "blitz"
import { Section, Container, Heading, Tile, Level } from "react-bulma-components"

const ContentNotFound = (props) => {
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
                  <Heading subtitle>To help people find tech related jobs in Singapore easily</Heading>
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
                  We're happy to help. Post a job{" "}
                  <Link href="/?tab=post" as="/category/post" scroll={false}>
                    <a>here</a>
                  </Link>{" "}
                  and it will appear as a <strong>featured</strong> job at the top of searches.
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

export default ContentNotFound
