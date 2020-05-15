import { FiX } from "react-icons/fi"

const Tag = (props) => {
  const { tags, selectedTags, setSelectedTags } = props

  const addTag = (e, tag) => {
    e.stopPropagation()
    setSelectedTags((tags) => [...tags, tag])
  }

  const removeTag = (e, tag) => {
    e.stopPropagation()
    setSelectedTags((tags) => tags.filter((t) => t !== tag))
  }

  const tagProps = (fn) => ({
    role: "button",
    className: "tag",
    tabIndex: 0,
    onClick: fn,
    onKeyDown: fn,
  })

  return tags.length ? (
    <div className="field is-grouped is-grouped-multiline">
      {props.children}
      {tags.map((tag) => (
        <div className="control" key={tag} style={{ margin: "0 0.5rem 0.5rem 0" }}>
          <div className="tags has-addons">
            {selectedTags.includes(`${tag}`) ? (
              <>
                <span className="tag is-link">{tag}</span>
                <a {...tagProps((e) => removeTag(e, tag))}>
                  <FiX />
                </a>
              </>
            ) : (
              <a {...tagProps((e) => addTag(e, tag))}>{tag}</a>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default Tag