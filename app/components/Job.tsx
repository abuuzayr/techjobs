import React, { useState } from "react"
import { Box, Media, Content, Tag, Icon, Level, Heading, Container, Button } from "react-bulma-components"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { RiShareLine } from "react-icons/ri"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { MdDateRange, MdClose } from "react-icons/md"
import Modal from "react-modal"
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

const Placeholder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  border-radius: 10px;
  background: aliceblue;
  font-weight: 700;
`

const Job = (props) => {
  const { avatar, name, company, salary, tags, postedDate, description } = props.data
  const [like, setLike] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const clickLike = (e) => {
    e.stopPropagation()
    setLike((prevLike) => !prevLike)
  }

  // Handle job age string
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
      <Media renderAs="article" onClick={() => setShowModal(true)}>
        <Media.Item position="left">
          <figure className="image is-64x64">
            {avatar || (company && company.imgUrl) ? (
              <img src={avatar || (company && company.imgUrl)} alt="Company logo" />
            ) : (
              <Placeholder>{company ? company.name.slice(0, 1) : name.slice(0, 1)}</Placeholder>
            )}
          </figure>
        </Media.Item>
        <Media.Item>
          <Content>
            <div>
              <strong>{name}</strong> @ <small>{company && company.name}</small>
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
            <div>{tags && tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>)}</div>
          </Content>
        </Media.Item>
        <Media.Item position="right">
          <IconSlot onClick={clickLike} title="Like">
            {like ? <FcLike size="2em" /> : <FcLikePlaceholder size="2em" />}
          </IconSlot>
          <IconSlot title="Share">
            <RiShareLine size="2em" />
          </IconSlot>
          <Container>
            <Button
              color="info"
              outlined={true}
              rounded={true}
              style={{ borderWidth: 2, fontWeight: 600 }}
              onClick={(e) => e.stopPropagation()}
            >
              Apply
            </Button>
          </Container>
        </Media.Item>
      </Media>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <Container>
          <Level>
            <Level.Side align="left">
              <figure className="image is-64x64">
                <img src={avatar} alt="Company logo" />
              </figure>
              <Heading>{name}</Heading>
            </Level.Side>
            <Level.Side align="right">
              <MdClose onClick={closeModal} />
            </Level.Side>
          </Level>
        </Container>
      </Modal>
      <style jsx global>{`
        .ReactModal__Overlay.ReactModal__Overlay--after-open {
          z-index: 99;
        }
      `}</style>
    </JobBox>
  )
}

export default Job
