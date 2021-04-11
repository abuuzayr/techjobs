import { useState } from "react"
import incrementJob from "../jobs/mutations/incrementJob"
import { RiShareLine } from "react-icons/ri"
import { IconSlot, ShareBubble } from "../styles/common"
import { Button } from "react-bulma-components"
import { Twitter, Facebook, Mail, Linkedin, Reddit, Whatsapp, Telegram } from "react-social-sharing"

const Share = ({ id, slug }) => {
  const [showBubble, setShowBubble] = useState(false)
  const link = `https://techjobs.sg/jobs/${id}-${slug}`

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const clickShare = (e) => {
    e.preventDefault()
    stopPropagation(e)
    setShowBubble(true)
    incrementJob({ key: "shares", id })
  }

  const closeBubble = (e) => {
    e.preventDefault()
    stopPropagation(e)
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
