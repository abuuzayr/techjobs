import { createContext } from "react"

interface SearchContextObj {
  search: string
  setSearch: Function
}

const contextObj: SearchContextObj = {
  search: "",
  setSearch: () => {},
}

const SearchContext = createContext(contextObj)

export default SearchContext
