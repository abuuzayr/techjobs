import { Level, Box } from "react-bulma-components"
import { SOURCES } from "app/core/constants"

const Filters = (props) => {
  const { withSalary, setWithSalary, sources, setSources } = props

  const updateSources = (e, source) => {
    let newSources: string[] = []
      if (sources.includes(source)) {
        newSources = sources.filter((s) => s !== source)
      } else {
        newSources = Array.from(new Set([...sources, source]))
      }
      setSources(newSources)
      localStorage.setItem("_sources", JSON.stringify(newSources))
  }

  const toggleWithSalary = (e) => {
    if (withSalary) {
      localStorage.removeItem("_withSalary")
    } else {
      localStorage.setItem("_withSalary", "true")
    }
    setWithSalary(!withSalary)
  }

  return (
    <Level className="job-filters">
      <Level.Side align="left" style={{ maxWidth: "100%", marginBottom: 10 }}>
        <Level.Item>
          <Box className="job-filter-text-box">
            <span className="job-filter-text">Sources: </span>
            <div className="filter-labels">
              {SOURCES.filter((s) => !s.hasOwnProperty("via"))
                .map((s) => s.name)
                .map((source) => (
                  <label key={source}>
                    <input
                      type="checkbox"
                      checked={sources.includes(source)}
                      onChange={(e) => updateSources(e, source)}
                    />
                    <span className="job-filter-label-text">{source}</span>
                  </label>
                ))}
            </div>
          </Box>
        </Level.Item>
      </Level.Side>
      <Level.Side>
        <Level.Item>
          <Box className="job-filter-text-box">
            <span className="job-filter-text">Filter: </span>
            <label>
              <input type="checkbox" checked={withSalary} onChange={toggleWithSalary} />
              <span className="job-filter-label-text">With salary</span>
            </label>
          </Box>
        </Level.Item>
      </Level.Side>
    </Level>
  )
}

export default Filters
