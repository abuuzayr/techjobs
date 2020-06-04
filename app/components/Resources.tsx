import { Section, Container, Heading, Tile, Level } from "react-bulma-components"

const ContentNotFound = (props) => {
  return (
    <Section>
      <Container>
        <Section>
          <Level>
            <Level.Item>
              <Heading size={3} renderAs="h3">
                Resources
              </Heading>
            </Level.Item>
          </Level>
          <Level>
            <Level.Item>
              <Heading subtitle>We plan to put additional resources here, such as:</Heading>
            </Level.Item>
          </Level>
        </Section>
        <Tile kind="ancestor">
          <Tile size={12} vertical>
            <Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child" notification color="info">
                  <Heading>Visa requirements</Heading>
                  <Heading subtitle>How to get a visa to work in Singapore</Heading>
                </Tile>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="ancestor">
          <Tile size={12} vertical>
            <Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child" notification color="warning">
                  <Heading>Need help applying for a work visa?</Heading>
                  <Heading subtitle>These companies can help you</Heading>
                </Tile>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="ancestor">
          <Tile size={12} vertical>
            <Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child" notification color="info">
                  <Heading>Living in Singapore</Heading>
                  <Heading subtitle>How its like to work and live in Singapore</Heading>
                </Tile>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="ancestor">
          <Tile size={12} vertical>
            <Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child" notification color="info">
                  <Heading>Tips for Job seekers</Heading>
                  <Heading subtitle>How to get your dream job</Heading>
                </Tile>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
        <Level>
          <Level.Item>
            <Heading subtitle>
              Do you have any ideas? Feel free to send them over to{" "}
              <a href="mailto:hello@techjobs.com">hello@techjobs.sg</a>!
            </Heading>
          </Level.Item>
        </Level>
      </Container>
    </Section>
  )
}

export default ContentNotFound
