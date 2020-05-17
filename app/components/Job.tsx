import React, { useState } from "react"
import { Box, Media, Content, Icon, Level, Heading, Container, Button, Columns } from "react-bulma-components"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { RiShareLine } from "react-icons/ri"
import { FiExternalLink, FiArrowRight } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs"
import { IconContext } from "react-icons"
import Modal from "react-modal"
import styled from "styled-components"
import JobMeta from "./JobMeta"
import incrementJob from "app/jobs/mutations/incrementJob"
import Logo from "./Logo"
import { RemoveScroll } from "react-remove-scroll"

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
`

const IconSlot = styled(Icon)`
  margin-left: 10px;
`

const ContentBox = styled(Box)`
  font-size: 0.8rem;
  br {
    display: none;
  }
  @media screen and (min-width: 768px) {
    overflow-y: scroll;
    max-height: calc(100vh - 250px);
  }
`

const A = styled.a`
  color: #333;
`

const Apply = ({ url }) => (
  <Button
    renderAs="a"
    color="info"
    outlined={true}
    rounded={true}
    style={{ borderWidth: 2, fontWeight: 600 }}
    href={url}
    target="_blank"
    onClick={(e) => e.stopPropagation()}
  >
    Apply
  </Button>
)

const Like = ({ liked, onClick }) => {
  return (
    <IconSlot onClick={onClick} title="Like">
      {liked ? <FcLike size="2em" /> : <FcLikePlaceholder size="2em" />}
    </IconSlot>
  )
}

const Share = ({ onClick }) => (
  <IconSlot onClick={onClick} title="Share">
    <RiShareLine size="2em" />
  </IconSlot>
)

const Job = (props) => {
  const { liked } = props
  const { id, url, name, company, postedDate, description } = props.data
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

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

  const handleClick = () => {
    setShowModal(true)
    incrementJob({ key: "views", id })
  }

  // Handle job age string
  let postedDays = 0
  if (postedDate) {
    const postedAge = new Date().getTime() - new Date(postedDate).getTime()
    postedDays = Math.round(postedAge / 1000 / 60 / 60 / 24)
  }
  return (
    <JobBox old={postedDays > 31 ? 1 : 0}>
      <Media renderAs="article" onClick={handleClick}>
        <Media.Item position="left">
          <Logo job={props.data} />
        </Media.Item>
        <Media.Item>
          <Content>
            <div>
              <strong>{name}</strong> @ <small>{company && company.name}</small>
            </div>
            <JobMeta {...props} postedDays={postedDays} />
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
      <RemoveScroll enabled={showModal}>
        <Modal isOpen={showModal} onRequestClose={closeModal}>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Logo job={props.data} />
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
                <Share onClick={clickShare} />
              </Level.Item>
              <Level.Item>
                <Like liked={liked.includes(id)} onClick={clickLike} />
              </Level.Item>
              <Level.Item>
                <Apply url={url} />
              </Level.Item>
              <Level.Item>
                <MdClose size={30} onClick={closeModal} />
              </Level.Item>
            </Level.Side>
          </Level>
          <Columns>
            <Columns.Column size="6">
              <Heading size="6">About the job</Heading>
              <ContentBox>
                <JobMeta {...props} postedDays={postedDays} />
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
                      <Level.Item>
                        <Heading subtitle size={6} renderAs="h6">
                          rating on
                        </Heading>
                        <A href={company.gdUrl} target="_blank">
                          <img
                            src="./glassdoor.png"
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
                            src="./linkedin.png"
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
        </Modal>
      </RemoveScroll>
      <style jsx global>{`
        .ReactModal__Overlay.ReactModal__Overlay--after-open {
          z-index: 99;
          overflow: hidden;
        }
        @media screen and (max-width: 760px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            overflow: auto;
          }
        }
      `}</style>
    </JobBox>
  )
}

export default Job
