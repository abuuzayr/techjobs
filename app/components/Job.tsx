import React from "react"
import { Link } from "blitz"
import { Box, Media, Content, Container } from "react-bulma-components"
import Modal from "react-modal"
import styled from "styled-components"
import incrementJob from "app/jobs/mutations/incrementJob"

// Components
import Logo from "./Logo"
import JobMeta from "./JobMeta"
import Share from "./Share"
import Like from "./Like"
import Apply from "./Apply"

// Change Modal default styles
Modal.defaultStyles.content.overflow = ""

const JobBox = styled(Box)`
  cursor: pointer;
  border: 2px solid transparent;
  :hover {
    border: 2px solid gray;
    opacity: 1;
  }
  ${(props) => (props.old ? "opacity: 0.6;" : "")}
  a {
    color: black;
  }
`

const Job = (props) => {
  const { liked } = props
  let { id, url, name, company, postedDate } = props.data
  const slug = name.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()

  const clickLike = (e) => {
    e.stopPropagation()
    props.setLiked((prevLiked) => {
      if (prevLiked.includes(id)) return prevLiked.filter((l) => l !== id)
      return [...prevLiked, id]
    })
    incrementJob({ key: "likes", id })
  }

  const clickShare = (e) => {
    e.stopPropagation()
    incrementJob({ key: "shares", id })
  }

  // Handle job age string
  let postedDays = 0
  if (postedDate) {
    const postedAge = new Date().getTime() - new Date(postedDate).getTime()
    postedDays = Math.round(postedAge / 1000 / 60 / 60 / 24)
  }
  return (
    <JobBox old={postedDays > 31 ? 1 : 0}>
      <Link href={`/?jobId=${id}`} as={`/jobs/${id}-${slug}`}>
        <a>
          <Media renderAs="article">
            <Media.Item position="left">
              <Logo job={props.data} />
            </Media.Item>
            <Media.Item>
              <Content>
                <div>
                  <strong>{name}</strong> @ <small>{company && company.name}</small>
                </div>
                <JobMeta {...props} postedDays={postedDays} select={true} />
              </Content>
            </Media.Item>
            <Media.Item position="right">
              <Like liked={liked.includes(id)} onClick={clickLike} />
              <Share onClick={clickShare} />
              <Container>
                <Apply url={url} />
              </Container>
            </Media.Item>
          </Media>
        </a>
      </Link>
    </JobBox>
  )
}

export default Job
