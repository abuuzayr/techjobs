import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import { Level } from "react-bulma-components"
import getTags from "../tags/queries/getTags"

const animatedComponents = makeAnimated()

const promiseOptions = (inputValue) =>
  new Promise(async (resolve) => {
    if (!inputValue) resolve([])
    const tags = await getTags({
      where: {
        name: {
          contains: inputValue,
        },
      },
    })
    resolve(tags.map((tag) => ({ value: tag.name, label: tag.name })))
  })

const TagsSelect = (props) => {
  const { selectedTags, setSelectedTags } = props

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
          defaultOptions
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
        />
      </Level.Item>
    </Level>
  )
}

export default TagsSelect
