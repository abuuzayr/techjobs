// Imports from libraries
import { useState, useRef, useEffect, Suspense, useMemo } from "react"
import { Link, useRouter, useQuery } from "blitz"
import { Container, Hero, Tabs, Columns, Level, Heading, Loader } from "react-bulma-components"
import { FiSearch, FiDelete, FiSun } from "react-icons/fi"
import { GrStackOverflow } from "react-icons/gr"
import { FcLike } from "react-icons/fc"
import { AiFillLike, AiOutlineProfile, AiFillCode } from "react-icons/ai"

// Import components
import NavBar from "./NavBar"
import UnsplashCredit from "./UnsplashCredit"
import { SOURCES } from "app/core/constants"

// Import queries
import getJobsCount from "app/jobs/queries/getJobsCount"

const HeroComponent = (props) => {
  const FRESH_THRESHOLD = useMemo(() => {
    let d = new Date()
    d = new Date(d.toLocaleDateString("en-us"))
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
        placeholder={
          allJobsCount ? `Search ${allJobsCount} recent jobs` : "e.g. python, javascript"
        }
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
      <Hero.Body className="hero-body">
        <UnsplashCredit />
        <Container>
          <Heading size={1} renderAs="h1" className="has-text-centered hero-title">
            Find a <AiFillCode style={{ verticalAlign: "middle" }} /> job in{" "}
            <FiSun className="sun-icon" /> Singapore
          </Heading>
        </Container>
        <Container>
          <Columns>
            <Columns.Column size={10} offset={1}>
              <div className="field" style={{ marginTop: 15 }} ref={heroRef}>
                <div className="control has-icons-left has-icons-right">
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
                </div>
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
              {SOURCES.slice(0,7).map((source, index) => (
                <Level.Item key={source.logoPath} className={index > 4 ? "is-hidden-touch" : ""}>
                  <img
                    src={source.logoPath}
                    key={source.logoPath}
                    alt={source.name + " logo"}
                    className="source-logo"
                  />
                </Level.Item>
              ))}
            </Level>
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet">
            <div style={{ marginTop: 30 }} />
          </Columns.Column>
        </Columns>
      </Hero.Body>
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
                      <div className="icon-wrapper">{li.icon}</div>
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
                    <div className="icon-wrapper">
                      <AiOutlineProfile />
                    </div>
                    Resources
                  </a>
                </Link>
              </li>
            </ul>
          </Container>
        </Tabs>
      </Hero.Footer>
      <style scoped>
        {`
        .sun-icon {
          color: hsl(48, 100%, 67%);
          vertical-align: middle;
        }
        .hero-body {
          background-image: url(${process.env.NEXT_PUBLIC_BACKGROUND_URL});
          background-size: cover;
          background-position: center;
          background-color: rgba(0, 0, 0, 0.2);
          background-blend-mode: color;
        }
        @media screen and (min-width: 768px) {
          .hero-body {
            margintop: -41px;
          }
        }
        .hero-title {
          color: white;
          margin-bottom: 0 !important;
          margin-right: 10px;
        }
        .icon-wrapper {
          margin-right: 10px;
        }
        .icon-wrapper svg {
          vertical-align: middle;
        }
        .source-logo {
          max-height: 30px;
          filter: brightness(0) invert(1);
        }
      `}
      </style>
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
