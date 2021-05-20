import { createContext } from "react"

interface JobContextObj {
  job: number
  setJob: Function
}

const contextObj: JobContextObj = {
  job: 0,
  setJob: () => {},
}

const JobContext = createContext(contextObj)

export default JobContext
