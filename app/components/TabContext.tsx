import { createContext } from "react"

interface TabContextObj {
  tab: string
  setTab: Function
}

const contextObj: TabContextObj = {
  tab: "",
  setTab: () => {},
}

const TabContext = createContext(contextObj)

export default TabContext
