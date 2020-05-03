import { Head, Link } from "blitz"
import { Navbar, Container, Heading, Button, Hero, Tabs, Columns} from "react-bulma-components"
import { AiOutlineCode, AiFillBell } from "react-icons/ai"
import { IoIosSend } from "react-icons/io"
import { FiSun, FiSearch } from "react-icons/fi"
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
const Sun = styled(FiSun)`
  color: hsl(48, 100%, 67%);
  vertical-align: middle;
`

const HeroBody = styled(Hero.Body)`
  background-image: url(/bg.jpg);
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: color;
`

const Home = () => (
  <div>
    <Head>
      <title>techjobs</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Hero color="info" size="medium">
      <Hero.Head>
        <Navbar
          color="info"
          fixed="top"
          transparent={true}
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
      </Hero.Head>
      <HeroBody style={{ 'marginTop': -41 }}>
        <Container>
          <Title size={1} renderAs="h1" className="has-text-centered">
            Find a job in <Sun /> Singapore
          </Title>
          {/* <Field>
            <Control iconLeft>
              <Input color="success" type="email" placeholder="I have icons" />
              <Icon align="left" icon="bars" />
            </Control>
          </Field> */}
        </Container>
        <Container>
          <Columns>
            <Columns.Column size="half" offset="one-quarter">
              <div className="field" style={{ 'marginTop': 15 }}>
                <p className="control has-icons-left">
                  <input 
                    type="text" 
                    className="input is-large" 
                    placeholder="e.g. python, javascript"
                  />
                  <span className="icon is-left">
                    <FiSearch />
                  </span>
                </p>
              </div>
            </Columns.Column>
          </Columns>
        </Container>
      </HeroBody>
      <Hero.Footer style={{ 'marginTop': -41 }}>
        <Tabs type="boxed" fullwidth={true}>
          <Container>
            <ul>
              <li className="is-active">
                <a>Featured</a>
              </li>
              <li>
                <a>Aggregated</a>
              </li>
              <li>
                <a>Resources</a>
              </li>
            </ul>
          </Container>
        </Tabs>
      </Hero.Footer>
    </Hero>
  </div>
)

export default Home
