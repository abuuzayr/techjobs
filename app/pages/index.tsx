import { Head, Link } from "blitz"
import { Navbar, Container, Heading, Button } from "react-bulma-components"
import { AiOutlineCode, AiFillBell } from "react-icons/ai"
import { IoIosSend } from "react-icons/io"
import styled from "styled-components"

const Code = styled(AiOutlineCode)`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`

const Send = styled(IoIosSend)`
  margin-right: 5px;
`

const Bell = styled(AiFillBell)`
  margin-right: 5px;
`

const Title = styled(Heading)`
  color: white;
  margin-bottom: 0 !important;
  margin-right: 10px;
`

const Home = () => (
  <div className="container">
    <Head>
      <title>techjobs</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Navbar
      color="info"
      fixed="top"
      transparent={true}
      spaced={true}
    >
      <Container>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Code />
            <Title size={5} renderAs="h5">techjobs.sg</Title>
            <img src="/sg.svg" width="15" />
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

    <main>
    </main>
  </div>
)

export default Home
