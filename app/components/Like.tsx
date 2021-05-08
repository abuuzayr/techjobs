import { FcLikePlaceholder, FcLike } from "react-icons/fc"
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
      localStorage.setItem("_liked", JSON.stringify([...prevLiked, id]))
      return [...prevLiked, id]
    })
    incrementJob({ key: "likes", id })
  }

  return (
    <LikedContext.Consumer>
      {({ liked, setLiked }) => (
        <>
          <span
            onClick={(e) => clickLike(e, setLiked)}
            title="Like"
            className="icon-slot"
            onKeyDown={(e) => clickLike(e, setLiked)}
            role="button"
            tabIndex={0}
          >
            {liked.includes(id) ? <FcLike size="2em" /> : <FcLikePlaceholder size="2em" />}
          </span>
          <style>{`
            span.icon-slot {
              margin-left: 10px;
              cursor: pointer;
              align-items: center;
              display: inline-flex;
              justify-content: center;
              height: 1.5rem;
              width: 1.5rem;
            }
          `}</style>
        </>
      )}
    </LikedContext.Consumer>
  )
}

export default Like
