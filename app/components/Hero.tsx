// Imports from libraries
import { useState, useRef, useEffect, Suspense, useMemo } from "react"
import { Link, useRouter, useQuery } from "blitz"
import { Container, Hero, Tabs, Columns, Level, Heading, Loader } from "react-bulma-components"
import { FiSearch, FiDelete } from "react-icons/fi"
import { GrStackOverflow } from "react-icons/gr"
import { FcLike } from "react-icons/fc"
import { AiFillLike, AiOutlineProfile } from "react-icons/ai"
import styled from "styled-components"

// Import components
import NavBar from "./NavBar"
import UnsplashCredit from "./UnsplashCredit"
import { Title, HeroBody, Sun, FillCode } from "../styles/common"

// Import queries
import getJobsCount from "app/jobs/queries/getJobsCount"

const Logo = styled.img`
  max-height: 30px;
  filter: brightness(0) invert(1);
`

const IconWrapper = styled.div`
  margin-right: 10px;
  svg {
    vertical-align: middle;
  }
`

const HeroComponent = (props) => {
  const FRESH_THRESHOLD = useMemo(() => {
    let d = new Date()
    d = new Date(d.toLocaleDateString())
    d.setMonth(d.getMonth() - 1)
    return d
  }, [])
  const heroRef = useRef(null)
  const router = useRouter()
  const [queryStr, setQueryStr] = useState("")
  const tabs = [
    {
      id: "featured",
      title: "Featured",
      icon: <AiFillLike />,
      query: {
        where: {
          type: {
            equals: "featured",
          },
          searchStr: {
            contains: props.search.toLowerCase(),
          },
          postedDate: {
            gte: FRESH_THRESHOLD,
          },
        },
      },
    },
    {
      id: "all",
      title: "All Jobs",
      icon: <GrStackOverflow />,
      query: {
        where: {
          AND: [
            {
              searchStr: { contains: props.search.toLowerCase() },
            },
            {
              postedDate: {
                gte: FRESH_THRESHOLD,
              },
            },
          ],
        },
      },
    },
    {
      id: "liked",
      title: "Liked",
      icon: <FcLike />,
      query: { where: { OR: props.liked.map((id) => ({ id })) } },
    },
  ]
  const jobsiteLogos = [
    "/TechInAsia-logo.svg",
    "/Adzuna-logo.svg",
    "/StackOverflow-logo.svg",
    "/eFinancialCareers-logo.svg",
    "/jobsDB.png",
    "/jobsCentral.png",
    "/jobstreet.png",
  ]

  useEffect(() => {
    if (heroRef.current) {
      // @ts-ignore: Object is possibly 'null'.
      props.setScrollTo(heroRef.current.closest(".hero").offsetHeight)
    }
  }, [heroRef])

  useEffect(() => {
    setQueryStr(getQueryStr(props.search))
  }, [router, props.search])

  const getQueryStr = (searchStr) => {
    if (!router) return ""
    const query = { ...router.query }
    delete query.tab
    if (searchStr) {
      query["search"] = searchStr
    } else {
      delete query.search
    }
    return Object.keys(query)
      .reduce((str, key) => {
        if (key && query[key]) {
          str += `${key}=${query[key]}&`
        }
        return str
      }, "")
      .slice(0, -1)
  }

  const clearSearch = () => {
    props.setSearch("")
    pushRoute(true)
  }

  const pushRoute = (clear = false, search = "") => {
    const query = getQueryStr(search)
    router.push(
      `/?tab=${props.tab}&${!clear && query ? query : ""}`,
      `/category/${props.tab}${!clear && query ? `?${query}` : ""}`,
      { shallow: true }
    )
  }

  const SearchInput = ({ propsSearch }) => {
    const [search, setSearch] = useState(propsSearch)
    const [allJobsCount, { refetch }] = useQuery(
      getJobsCount,
      {
        where: {
          postedDate: {
            gte: FRESH_THRESHOLD,
          },
        },
      },
      {
        enabled: false,
        refetchOnWindowFocus: false,
      }
    )

    useEffect(() => {
      refetch()
    }, [propsSearch])

    const handleChange = (e) => {
      setSearch(e.currentTarget.value)
    }

    const keyDown = (e, bypass = false) => {
      if (e.key === "Enter" || bypass) {
        props.setSearch(search)
        pushRoute(false, search)
      }
    }

    return (
      <input
        type="text"
        className="input is-large"
        placeholder={allJobsCount ? `Search ${allJobsCount} recent jobs` : "e.g. python, javascript"}
        value={search}
        onChange={handleChange}
        onKeyDown={keyDown}
        onBlur={(e) => keyDown(e, true)}
      />
    )
  }

  const JobsCount = ({ query, search }) => {
    const [count, { refetch }] = useQuery(getJobsCount, query, {
      enabled: false,
      refetchOnWindowFocus: false,
    })

    useEffect(() => {
      refetch()
    }, [search])

    return <span>&nbsp; ({count})</span>
  }

  return (
    <Hero color="info" size="medium">
      <Hero.Head>
        <NavBar />
      </Hero.Head>
      <HeroBody>
        <UnsplashCredit />
        <Container>
          <Title size={1} renderAs="h1" className="has-text-centered">
            Find a <FillCode /> job in <Sun /> Singapore
          </Title>
        </Container>
        <Container>
          <Columns>
            <Columns.Column size={10} offset={1}>
              <div className="field" style={{ marginTop: 15 }} ref={heroRef}>
                <p className="control has-icons-left has-icons-right">
                  <ErrorHOC component={SearchInput} otherProps={{ propsSearch: props.search }} />
                  <span className="icon is-left">
                    <FiSearch />
                  </span>
                  <span
                    className="icon is-right"
                    style={{ pointerEvents: "initial" }}
                    onClick={clearSearch}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") clearSearch()
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <FiDelete />
                  </span>
                </p>
                {/* TODO: Add quick search buttons for languages, etc. */}
              </div>
            </Columns.Column>
          </Columns>
        </Container>
        <Columns>
          <Columns.Column className="is-hidden-mobile">
            <Level>
              <Level.Item>
                <Heading subtitle size={6}>
                  <small>Including jobs from</small>
                </Heading>
              </Level.Item>
            </Level>
            <Level>
              {jobsiteLogos.map((path, index) => (
                <Level.Item key={path} className={index > 4 ? "is-hidden-touch" : ""}>
                  <Logo src={path} key={path} alt={path.slice(1).split(".")[0].split("-")[0] + " logo"} />
                </Level.Item>
              ))}
            </Level>
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet">
            <div style={{ marginTop: 30 }} />
          </Columns.Column>
        </Columns>
      </HeroBody>
      <Hero.Footer style={{ marginTop: -41 }}>
        <Tabs type="boxed" fullwidth={true}>
          <Container>
            <ul>
              {tabs.map((li) => (
                <li key={li.id} className={props.tab === li.id ? "is-active" : ""}>
                  <Link
                    href={`/?tab=${li.id}${queryStr ? `&${queryStr}` : ""}`}
                    as={`/category/${li.id}${queryStr ? `?${queryStr}` : ""}`}
                    scroll={false}
                  >
                    <a style={{ color: props.tab === li.id ? "#333" : "" }}>
                      <IconWrapper>{li.icon}</IconWrapper>
                      {li.title}{" "}
                      {li.query ? (
                        <ErrorHOC
                          component={JobsCount}
                          otherProps={{ query: li.query, search: props.search }}
                        />
                      ) : (
                        ""
                      )}
                    </a>
                  </Link>
                </li>
              ))}
              <li className={props.tab === "resources" ? "is-active" : ""}>
                <Link href={`/?tab=resources`} as={`/category/resources`} scroll={false}>
                  <a style={{ color: props.tab === "resources" ? "#333" : "" }}>
                    <IconWrapper>
                      <AiOutlineProfile />
                    </IconWrapper>
                    Resources
                  </a>
                </Link>
              </li>
            </ul>
          </Container>
        </Tabs>
      </Hero.Footer>
    </Hero>
  )
}

const ErrorHOC = ({ component: Component, small = true, otherProps = {} }) => (
  <Suspense
    fallback={
      <span>
        <Loader
          style={{
            width: small ? 10 : 100,
            height: small ? 10 : 100,
            margin: small ? 5 : 100,
          }}
        />
      </span>
    }
  >
    <Component {...otherProps} />
  </Suspense>
)

export default HeroComponent
