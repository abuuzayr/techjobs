import { Level } from "react-bulma-components"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { MdDateRange } from "react-icons/md"
import Tags from "./Tags"

const LOGO_PATHS = {
  Adzuna: "/Adzuna-logo.svg",
  eFinancialCareers: "/eFinancialCareers-logo.svg",
  "eFinancial Careers": "/eFinancialCareers-logo.svg",
  "Tech In Asia": "/TechInAsia-logo.svg",
  "Stack Overflow": "/StackOverflow-logo.svg",
  "Zoho Recruit": "/ZohoRecruit-logo.png",
  eQuest: "/eQuest-logo.png",
  Hirebridge: "/Hirebridge-logo.png",
  myCareersFuture: "/myCareersFuture-logo.png",
}

const JobMeta = (props) => {
  const { selectedTags, setSelectedTags, postedDays, select } = props
  const { salary, tags, source } = props.data

  let postedAgeStr = ""
  if (postedDays < 1) {
    const postedHours = Math.round(postedDays * 24)
    postedAgeStr = `${postedHours || "< 1"} hour${postedHours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.round(postedDays)
    postedAgeStr = `${days} day${days > 1 ? "s" : ""} ago`
  }

  return (
    <>
      <Level className="job-wrapper">
        <Level.Side align="left">
          {salary && (
            <Level.Item className="logo-level-item">
              <FaRegMoneyBillAlt size="1.5em" style={{ marginRight: 5 }} /> {salary}
            </Level.Item>
          )}
          <Level.Item
            style={{ color: postedDays > 31 ? "#e74c3c" : "black" }}
            className="logo-level-item"
          >
            <MdDateRange size="1.5em" style={{ marginRight: 5 }} /> {postedAgeStr}
          </Level.Item>
          <Level.Item className="logo-level-item">
            {source && LOGO_PATHS[source.split(",")[0]] && (
              <>
                by{" "}
                <img
                  src={LOGO_PATHS[source.split(",")[0]]}
                  className="img-source"
                  alt={`${source.split(",")[0]} logo`}
                />
              </>
            )}
          </Level.Item>
          <Level.Item className="logo-level-item">
            {source && source.includes(",") && (
              <>
                via{" "}
                <img
                  src={LOGO_PATHS[source.split(",")[1]]}
                  className="img-source"
                  alt={`${source.split(",")[1]} logo`}
                />
              </>
            )}
          </Level.Item>
        </Level.Side>
      </Level>
      {tags && (
        <Tags
          tags={tags.map((t) => t.name)}
          selectedTags={select && selectedTags}
          setSelectedTags={select && setSelectedTags}
        />
      )}
    </>
  )
}

export default JobMeta
