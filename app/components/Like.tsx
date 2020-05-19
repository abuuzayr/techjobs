import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { IconSlot } from "../styles/common"

const Like = ({ liked, onClick }) => {
  return (
    <IconSlot onClick={onClick} title="Like">
      {liked ? <FcLike size="2em" /> : <FcLikePlaceholder size="2em" />}
    </IconSlot>
  )
}

export default Like
