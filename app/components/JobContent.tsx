import { Suspense, useEffect } from "react"
import { useQuery, Link } from "blitz"
import ErrorBoundary from "app/components/ErrorBoundary"
import getJob from "../jobs/queries/getJob"
import { FiExternalLink, FiArrowRight } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs"
import { IconContext } from "react-icons"
import { Content, Level, Heading, Button, Columns, Loader } from "react-bulma-components"
import { ContentBox, A } from "../styles/common"
import Share from "../components/Share"
import Like from "../components/Like"
import Apply from "../components/Apply"
import JobMeta from "../components/JobMeta"
import Logo from "./Logo"
import incrementJob from "app/jobs/mutations/incrementJob"

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

  const { name, company, description, postedDate, url } = job

  // Handle job age string
  let postedDays = 0
  if (postedDate) {
    const postedAge = new Date().getTime() - new Date(postedDate).getTime()
    postedDays = Math.round(postedAge / 1000 / 60 / 60 / 24)
  }

  return (
    <>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Logo job={job} />
          </Level.Item>
          <Level.Item>
            <Content>
              <Heading size={4}>{name}</Heading>
              <p>{company.name}</p>
            </Content>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Share id={id} />
          </Level.Item>
          <Level.Item>
            <Like id={id} />
          </Level.Item>
          <Level.Item>
            <Apply url={url} />
          </Level.Item>
          <Level.Item>
            <Link href="/" as="/" scroll={false}>
              <a style={{ color: "black" }}>
                <MdClose size={30} />
              </a>
            </Link>
          </Level.Item>
        </Level.Side>
      </Level>
      <Columns>
        <Columns.Column size="6">
          <Heading size="6">About the job</Heading>
          <ContentBox>
            <JobMeta postedDays={postedDays} data={job} />
            <hr />
            <Content size="small" dangerouslySetInnerHTML={{ __html: description }}></Content>
            <a href={url} target="_blank">
              <Button size="small" color="info" outlined={true}>
                Read more <FiArrowRight />
              </Button>
            </a>
          </ContentBox>
        </Columns.Column>
        <Columns.Column size="6">
          <Heading size="6">About the company</Heading>
          <ContentBox>
            <Content>{company.about}</Content>
            {company.url && (
              <Content>
                <A href={company.url}>
                  <Heading size="6" as="h6">
                    {company.url}
                    <FiExternalLink size="15px" style={{ marginLeft: 5 }} />
                  </Heading>
                </A>
              </Content>
            )}
            {company.gdUrl && company.gdRating && (
              <Level>
                <Level.Side align="left">
                  <Level.Item>
                    <IconContext.Provider value={{ size: "25px", color: "#0CAA41" }}>
                      {[...Array(parseInt(company.gdRating))].map((e, i) => (
                        <BsStarFill key={i} />
                      ))}
                      {parseFloat(company.gdRating) - parseInt(company.gdRating) > 0 ? <BsStarHalf /> : <></>}
                      {[...Array(5 - Math.ceil(parseFloat(company.gdRating)))].map((e, i) => (
                        <BsStar key={i} />
                      ))}
                    </IconContext.Provider>
                  </Level.Item>
                  <Level.Item>
                    <Heading subtitle size={6} renderAs="h6">
                      rating on
                    </Heading>
                    <A href={company.gdUrl} target="_blank">
                      <img
                        src="../glassdoor.png"
                        alt="Glassdoor logo"
                        style={{ width: 100, margin: "0 10px" }}
                      />
                      <FiExternalLink size="15px" style={{ verticalAlign: "middle" }} />
                    </A>
                  </Level.Item>
                </Level.Side>
              </Level>
            )}
            {company.liUrl && company.liEmpCount && (
              <Level>
                <Level.Side align="left">
                  <Level.Item>
                    <Heading>{company.liEmpCount}</Heading>
                  </Level.Item>
                  <Level.Item>
                    <Heading subtitle size={6} renderAs="h6">
                      employees on
                    </Heading>
                    <A href={company.liUrl} target="_blank">
                      <img
                        src="../linkedin.png"
                        alt="LinkedIn logo"
                        style={{ width: 100, margin: "0 10px" }}
                      />
                      <FiExternalLink size="15px" style={{ verticalAlign: "middle" }} />
                    </A>
                  </Level.Item>
                </Level.Side>
              </Level>
            )}
          </ContentBox>
        </Columns.Column>
      </Columns>
    </>
  )
}

const JobContent = (props) => {
  return (
    <ErrorBoundary fallback={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <Suspense
        fallback={
          <Level.Item>
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
