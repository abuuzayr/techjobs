import { useCallback } from "react"
import { invoke } from "blitz"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import { Level } from "react-bulma-components"
import getTags from "../tags/queries/getTags"

const animatedComponents = makeAnimated()

const TagsSelect = (props) => {
  const { selectedTags, setSelectedTags } = props
  const debounce = (func, wait) => {
    var timeout
    return function () {
      var context = this,
        args = arguments
      var later = function () {
        timeout = null
        func.apply(context, args)
      }
      var callNow = !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  const promiseOptions = useCallback(
    debounce((inputValue, callback) => {
      getOptions(inputValue).then((options) => callback(options))
    }, 500),
    []
  )

  const getOptions = (inputValue) =>
    new Promise(async (resolve) => {
      if (!inputValue) resolve([])
      const tags = await invoke(getTags, {
        where: {
          name: {
            contains: inputValue,
          },
        },
      })
      resolve(tags.map((tag) => ({ value: tag.name, label: tag.name })))
    })

  return (
    <Level>
      <Level.Side align="left">
        <p className="heading" style={{ marginRight: 10, alignSelf: "center" }}>
          Filter by tags:
        </p>
      </Level.Side>
      <Level.Item>
        <AsyncSelect
          placeholder="Type to see options.."
          isMulti
          cacheOptions
          closeMenuOnSelect={true}
          components={animatedComponents}
          loadOptions={promiseOptions}
          value={selectedTags.map((t) => ({ value: t, label: t }))}
          onChange={(e) =>
            setSelectedTags((prevTags) => {
              if (!e) {
                localStorage.setItem("_tags", JSON.stringify([]))
                return []
              }
              const newTags = e.map((t) => t.value)
              if (prevTags !== newTags) {
                localStorage.setItem("_tags", JSON.stringify(newTags))
                return newTags
              }
            })
          }
          styles={{
            container: (p) => ({
              ...p,
              width: "100%",
            }),
          }}
          aria-label="filter by tags"
        />
      </Level.Item>
    </Level>
  )
}

export default TagsSelect
