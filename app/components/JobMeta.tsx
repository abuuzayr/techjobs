import { Level } from "react-bulma-components"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { MdDateRange } from "react-icons/md"
import styled from "styled-components"
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
}

const Source = styled.img`
  max-height: 16px;
  margin-left: 5px;
`

const JobMeta = (props) => {
  const { selectedTags, setSelectedTags, postedDays, select } = props
  const { salary, tags, source } = props.data

  let postedAgeStr = ""
  if (postedDays < 1) {
    const postedHours = Math.round(postedDays * 24)
    postedAgeStr = `${postedHours || "< 1"} hour${postedHours > 1 ? "s" : ""} ago`
  } else {
    postedAgeStr = `${postedDays} day${postedDays > 1 ? "s" : ""} ago`
  }

  return (
    <>
      <Level style={{ margin: "0.5em 0", fontSize: "0.8em" }}>
        <Level.Side align="left">
          {salary && (
            <Level.Item>
              <FaRegMoneyBillAlt size="1.5em" style={{ marginRight: 5 }} /> {salary}
            </Level.Item>
          )}
          <Level.Item style={{ color: postedDays > 31 ? "#e74c3c" : "black" }}>
            <MdDateRange size="1.5em" style={{ marginRight: 5 }} /> {postedAgeStr}
          </Level.Item>
          <Level.Item>
            {source && LOGO_PATHS[source.split(",")[0]] && (
              <>
                by <Source src={LOGO_PATHS[source.split(",")[0]]} />
              </>
            )}
          </Level.Item>
          <Level.Item>
            {source && source.includes(",") && (
              <>
                via <Source src={LOGO_PATHS[source.split(",")[1]]} />
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
