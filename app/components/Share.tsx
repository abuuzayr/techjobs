import { RiShareLine } from "react-icons/ri"
import { IconSlot } from "../styles/common"

const Share = ({ onClick }) => (
  <IconSlot onClick={onClick} title="Share">
    <RiShareLine size="2em" />
  </IconSlot>
)

export default Share
