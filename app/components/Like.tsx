import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { IconSlot } from "../styles/common"
import LikedContext from "./LikedContext"
import incrementJob from "../jobs/mutations/incrementJob"

const Like = (props) => {
  const { id } = props
  const clickLike = (e, setLiked) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setLiked((prevLiked) => {
      if (prevLiked.includes(id)) return prevLiked.filter((l) => l !== id)
      return [...prevLiked, id]
    })
    incrementJob({ key: "likes", id })
  }

  return (
    <LikedContext.Consumer>
      {({ liked, setLiked }) => (
        <IconSlot onClick={(e) => clickLike(e, setLiked)} title="Like">
          {liked.includes(id) ? <FcLike size="2em" /> : <FcLikePlaceholder size="2em" />}
        </IconSlot>
      )}
    </LikedContext.Consumer>
  )
}

export default Like
