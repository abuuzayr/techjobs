import { createContext } from "react"

interface ScrollToContextObj {
  scrollTo: number
  setScrollTo: Function
}

const contextObj: ScrollToContextObj = {
  scrollTo: 0,
  setScrollTo: () => {},
}

const ScrollToContext = createContext(contextObj)

export default ScrollToContext
