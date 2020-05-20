import { createContext } from "react"

interface LikedContextObj {
  liked: Array<number>
  setLiked: Function
}

const contextObj: LikedContextObj = {
  liked: [],
  setLiked: () => {},
}

const LikedContext = createContext(contextObj)

export default LikedContext
