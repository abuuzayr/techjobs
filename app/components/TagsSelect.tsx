import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Level } from "react-bulma-components"

const animatedComponents = makeAnimated()

const TagsSelect = (props) => {
  const { tags, selectedTags, setSelectedTags } = props

  return tags.length ? (
    <Level>
      <Level.Side align="left">
        <p className="heading" style={{ marginRight: 10, alignSelf: "center" }}>
          Filter by tags:
        </p>
      </Level.Side>
      <Level.Item>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          options={tags.map((tag) => ({ value: tag, label: tag }))}
          value={selectedTags.map((t) => ({ value: t, label: t }))}
          onChange={(e) =>
            setSelectedTags((prevTags) => {
              if (!e) return []
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
  ) : (
    <></>
  )
}

export default TagsSelect
