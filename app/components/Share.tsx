import { useState } from "react"
import incrementJob from "../jobs/mutations/incrementJob"
import { RiShareLine } from "react-icons/ri"
import { Button, Notification } from "react-bulma-components"
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
    <>
      <span
        onClick={clickShare}
        title="Share"
        style={{ position: "relative" }}
        className="share-icon-slot"
        role="button"
        tabIndex={0}
        onKeyDown={clickShare}
      >
        {showBubble && (
          <Notification onClick={stopPropagation} className="share-bubble-notification">
            <Button remove onClick={closeBubble} />
            <Twitter {...shareProps} />
            <Facebook {...shareProps} />
            <Mail {...shareProps} />
            <Linkedin {...shareProps} />
            <Reddit {...shareProps} />
            <Whatsapp {...shareProps} />
            <Telegram {...shareProps} />
          </Notification>
        )}
        <RiShareLine size="2em" />
      </span>
      <style>{`
        .share-icon-slot {
          margin-left: 10px;
          cursor: pointer;
          align-items: center;
          display: inline-flex;
          justify-content: center;
          height: 1.5rem;
          width: 1.5rem;
        }
        .share-bubble-notification {
          position: absolute;
          z-index: 99;
          top: 10px;
          right: 10px;
          background-color: #fff;
          color: black;
          border: 1px solid rgba(10, 10, 10, 0.2);
          padding: 0.25rem 2rem 0.5rem 0.25rem;
          width: 210px;
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
        }
      `}</style>
    </>
  )
}

export default Share
