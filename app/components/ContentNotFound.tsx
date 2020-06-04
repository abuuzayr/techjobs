import { Section, Container, Level, Heading } from "react-bulma-components"

const ContentNotFound = (props) => {
  return (
    <Section style={{ padding: "calc(50px + 3rem) 1.5rem 3rem" }}>
      <Container>
        <Level.Item>
          <Heading size={1} renderAs="h1">
            Content not found
          </Heading>
        </Level.Item>
      </Container>
    </Section>
  )
}

export default ContentNotFound
