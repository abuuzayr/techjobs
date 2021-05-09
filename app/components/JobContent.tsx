import { Suspense, useEffect } from "react"
import { useQuery, Link, Head } from "blitz"
import ErrorBoundary from "app/components/ErrorBoundary"
import getJob from "../jobs/queries/getJob"
import { FiExternalLink, FiArrowRight, FiFrown } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs"
import { IconContext } from "react-icons"
import { Content, Level, Heading, Button, Columns, Loader, Box } from "react-bulma-components"
import Share from "../components/Share"
import Like from "../components/Like"
import Apply from "../components/Apply"
import JobMeta from "../components/JobMeta"
import Logo from "./Logo"
import incrementJob from "app/jobs/mutations/incrementJob"
import { Job as JobType } from "db"

const Job = ({ id }) => {
  // Get the ID in integer
  // Parse int strips from the first non-number
  id = parseInt(id)
  const [job] = useQuery(getJob, {
    where: {
      id,
    },
    include: {
      company: true,
      tags: true,
    },
  })

  useEffect(() => {
    incrementJob({ key: "views", id })
  }, [])

  if (!job) return null

  const { name, description, postedDate, url }: JobType = job
  const company = job?.company
  const slug = name.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()
  const showCompanyBlock =
    company.about ||
    company.tagline ||
    company.url ||
    (company.liUrl && company.liEmpCount) ||
    (company.gdUrl && company.gdRating)

  // Handle job age string
  let postedDays = 0
  if (postedDate) {
    const postedAge = new Date().getTime() - new Date(postedDate).getTime()
    postedDays = postedAge / 1000 / 60 / 60 / 24
  }

  return (
    <>
      <Head>
        <title>
          {name} @ {company && company.name} | techjobs.sg
        </title>
      </Head>
      <div style={{ textAlign: "right" }} className="is-hidden-tablet">
        <Link href="/" as="/" scroll={false}>
          <a>
            <MdClose size={30} color="black" />
          </a>
        </Link>
      </div>
      <Level>
        <Level.Side align="left" className="job-name">
          <Level.Item className="level-item-mobile-center">
            <Logo job={job} />
          </Level.Item>
          <Level.Item style={{ flexShrink: 1 }}>
            <Content>
              <Heading size={4} style={{ wordBreak: "break-word" }}>
                {name}
              </Heading>
              <p>{company.name}</p>
            </Content>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right" className="is-hidden-mobile">
          <Level.Item className="level-item-mobile-center">
            <Share id={id} slug={slug} />
          </Level.Item>
          <Level.Item className="level-item-mobile-center">
            <Like id={id} />
          </Level.Item>
          <Level.Item className="level-item-mobile-center">
            <Apply url={url} />
          </Level.Item>
          <Level.Item className="is-hidden-mobile">
            <Link href="/" as="/" scroll={false}>
              <a>
                <MdClose size={30} color="black" />
              </a>
            </Link>
          </Level.Item>
        </Level.Side>
        <div className="is-hidden-tablet mobile-actions">
          <Apply url={url} />
          <Like id={id} />
          <Share id={id} slug={slug} />
        </div>
      </Level>
      <Columns>
        <Columns.Column size={showCompanyBlock ? 6 : 12}>
          <Heading size="6">About the job</Heading>
          <Box className="content-box">
            <JobMeta postedDays={postedDays} data={job} />
            <hr />
            {description ? (
              <Content size="small" dangerouslySetInnerHTML={{ __html: description }}></Content>
            ) : (
              <Content>
                We got nothing{" "}
                <FiFrown size={20} style={{ verticalAlign: "middle" }} color="orange" />
                <p>
                  Click the <strong>Read More</strong> button below to see the Job posting
                </p>
              </Content>
            )}
            <a href={url || ""} target="_blank" rel="noopener noreferrer">
              <Button size="small" color="info" outlined={true}>
                Read more <FiArrowRight />
              </Button>
            </a>
          </Box>
        </Columns.Column>
        {showCompanyBlock && (
          <Columns.Column size={6}>
            <Heading size={6}>About the company</Heading>
            <Box className="content-box">
              {company.tagline && <Content>{company.tagline}</Content>}
              {
                <Heading size="6" as="h6">
                  <Level>
                    {company.companySize && (
                      <Level.Item className="level-item-mobile-center">
                        <div className="tags has-addons">
                          <span className="tag is-info">size</span>
                          <span className="tag is-light">{company.companySize}</span>
                        </div>
                      </Level.Item>
                    )}
                    {company.foundedYear && (
                      <Level.Item className="level-item-mobile-center">
                        <div className="tags has-addons">
                          <span className="tag is-info">founded in</span>
                          <span className="tag is-light">{company.foundedYear}</span>
                        </div>
                      </Level.Item>
                    )}
                    {company.url && (
                      <Level.Item className="level-item-mobile-center">
                        <div className="tags">
                          <span className="tag">
                            <a
                              href={company.url}
                              rel="noopener noreferrer"
                              target="_blank"
                              style={{ color: "#333" }}
                            >
                              {company.url}
                              <FiExternalLink size="15px" style={{ marginLeft: 5 }} />
                            </a>
                          </span>
                        </div>
                      </Level.Item>
                    )}
                  </Level>
                </Heading>
              }
              {company.tagline !== company.about && (
                <Content size="small" dangerouslySetInnerHTML={{ __html: company.about }}></Content>
              )}
              {/* {company.companySize && <Content>{company.companySize}</Content>}
              {company.foundedYear && <Content>Founded in: {company.foundedYear}</Content>} */}
              {company.gdUrl && company.gdRating && (
                <Level>
                  <Level.Side align="left">
                    <Level.Item className="level-item-mobile-center">
                      <IconContext.Provider value={{ size: "25px", color: "#0CAA41" }}>
                        {[...Array(parseInt(company.gdRating))].map((e, i) => (
                          <BsStarFill key={i} />
                        ))}
                        {parseFloat(company.gdRating) - parseInt(company.gdRating) > 0 ? (
                          <BsStarHalf />
                        ) : (
                          <></>
                        )}
                        {[...Array(5 - Math.ceil(parseFloat(company.gdRating)))].map((e, i) => (
                          <BsStar key={i} />
                        ))}
                      </IconContext.Provider>
                    </Level.Item>
                    <Level.Item className="level-item-mobile-center">
                      <Heading subtitle size={6} renderAs="h6">
                        rating on
                      </Heading>
                      <a
                        href={company.gdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#333" }}
                      >
                        <img
                          src="../glassdoor.png"
                          alt="Glassdoor logo"
                          style={{ width: 100, margin: "0 10px" }}
                        />
                        <FiExternalLink size="15px" style={{ verticalAlign: "middle" }} />
                      </a>
                    </Level.Item>
                  </Level.Side>
                </Level>
              )}
              {company.liUrl && company.liEmpCount && (
                <Level>
                  <Level.Side align="left">
                    <Level.Item className="level-item-mobile-center">
                      <Heading>{company.liEmpCount}</Heading>
                    </Level.Item>
                    <Level.Item className="level-item-mobile-center">
                      <Heading subtitle size={6} renderAs="h6">
                        employees on
                      </Heading>
                      <a
                        href={company.liUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#333" }}
                      >
                        <img
                          src="../linkedin.png"
                          alt="LinkedIn logo"
                          style={{ width: 100, margin: "0 10px" }}
                        />
                        <FiExternalLink size="15px" style={{ verticalAlign: "middle" }} />
                      </a>
                    </Level.Item>
                  </Level.Side>
                </Level>
              )}
            </Box>
          </Columns.Column>
        )}
        <Level className="is-hidden-tablet">
          <Level.Item className="level-item-mobile-center">
            <Link href="/" as="/" scroll={false}>
              <Button renderAs="a" color="info" size="small" outlined={true}>
                Close
              </Button>
            </Link>
          </Level.Item>
        </Level>
      </Columns>
    </>
  )
}

const JobContent = (props) => {
  return (
    <ErrorBoundary fallback={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <Suspense
        fallback={
          <Level.Item className="level-item-mobile-center">
            <Loader style={{ width: 100, height: 100, marginTop: 100 }} />
          </Level.Item>
        }
      >
        <Job {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default JobContent
