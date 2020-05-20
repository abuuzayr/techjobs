import { useState } from "react"
import incrementJob from "../jobs/mutations/incrementJob"
import { RiShareLine } from "react-icons/ri"
import { IconSlot } from "../styles/common"
import { Notification, Button } from "react-bulma-components"
import styled from "styled-components"
import { Twitter, Facebook, Mail, Linkedin, Reddit, Whatsapp, Telegram } from "react-social-sharing"

const ShareBubble = styled(Notification)`
  position: absolute;
  z-index: 99;
  top: 10px;
  right: 10px;
  background-color: #fff;
  color: black;
  border: 1px solid rgba(10, 10, 10, 0.2);
  padding: 0.25rem 2rem 0.5rem 0.25rem;
  width: max-content;
  > a {
    > svg {
      height: 30px;
      width: 30px;
    }
    > div {
      border-radius: 100%;
      padding: 0.75em 0.75em;
    }
  }
`

const Share = ({ id, slug }) => {
  const [showBubble, setShowBubble] = useState(false)
  const link = `https://techjobs.sg/jobs/${id}-${slug}`

  const clickShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setShowBubble(true)
    incrementJob({ key: "shares", id })
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const closeBubble = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setShowBubble(false)
  }

  const shareProps = {
    solid: true,
    small: true,
    link,
  }

  return (
    <IconSlot onClick={clickShare} title="Share" style={{ position: "relative" }}>
      {showBubble && (
        <ShareBubble onClick={stopPropagation}>
          <Button remove onClick={closeBubble} />
          <Twitter {...shareProps} />
          <Facebook {...shareProps} />
          <Mail {...shareProps} />
          <Linkedin {...shareProps} />
          <Reddit {...shareProps} />
          <Whatsapp {...shareProps} />
          <Telegram {...shareProps} />
        </ShareBubble>
      )}
      <RiShareLine size="2em" />
    </IconSlot>
  )
}

export default Share
