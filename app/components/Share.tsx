import incrementJob from "../jobs/mutations/incrementJob"
import { RiShareLine } from "react-icons/ri"
import { IconSlot } from "../styles/common"

const Share = ({ id }) => {
  const clickShare = (e) => {
    e.stopPropagation()
    incrementJob({ key: "shares", id })
  }

  return (
    <IconSlot onClick={clickShare} title="Share">
      <RiShareLine size="2em" />
    </IconSlot>
  )
}

export default Share
