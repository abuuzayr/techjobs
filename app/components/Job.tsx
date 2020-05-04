import React, { useState } from "react"
import { Box, Media, Content, Tag, Icon, Level } from "react-bulma-components"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { RiShareForward2Line } from "react-icons/ri"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { MdDateRange } from "react-icons/md"
import styled from "styled-components"

const JobBox = styled(Box)`
  cursor: pointer;
  border: 2px solid transparent;
  :hover {
    border: 2px solid gray;
  }
`

const IconSlot = styled(Icon)`
  margin-left: 10px;
`

const Job = (props) => {
  const { avatar, name, company, salary, tags, postedDate, description } = props.data
  const [like, setLike] = useState(false)
  let postedAgeStr = ""
  if (postedDate) {
    const postedAge = new Date().getTime() - new Date(postedDate).getTime()
    const postedDays = Math.round(postedAge / 1000 / 60 / 60 / 24)
    if (postedDays < 1) {
      postedAgeStr = `${postedDays * 24} hours ago`
    } else {
      postedAgeStr = `${postedDays} days ago`
    }
  }
  return (
    <JobBox>
      <Media renderAs="article">
        <Media.Item position="left">
          <figure className="image is-64x64">
            <img src={avatar} alt="Company logo" />
          </figure>
        </Media.Item>
        <Media.Item>
          <Content>
            <div>
              <strong>{name}</strong> @ <small>{company}</small>
              <br />
              {description}
            </div>
            <Level style={{ margin: "0.5em 0", fontSize: "0.8em" }}>
              <Level.Side align="left">
                <Level.Item>
                  <FaRegMoneyBillAlt size="1.5em" style={{ marginRight: 5 }} /> {salary}
                </Level.Item>
                <Level.Item>
                  <MdDateRange size="1.5em" style={{ marginRight: 5 }} /> {postedAgeStr}
                </Level.Item>
              </Level.Side>
            </Level>
            <div>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Content>
        </Media.Item>
        <Media.Item position="right">
          <IconSlot onClick={() => setLike(!like)} title="Like">
            {like ? <FcLike size="2em" /> : <FcLikePlaceholder size="2em" />}
          </IconSlot>
          <IconSlot title="Share">
            <RiShareForward2Line size="2em" />
          </IconSlot>
        </Media.Item>
      </Media>
    </JobBox>
  )
}

export default Job
