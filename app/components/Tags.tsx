import { FiX } from "react-icons/fi"

const Tag = (props) => {
  const { tags, selectedTags, setSelectedTags } = props

  const addTag = (e, tag) => {
    e.stopPropagation()
    setSelectedTags((tags) => {
      const newTags = [...tags, tag]
      localStorage.setItem("_tags", JSON.stringify(newTags))
      return newTags
    })
  }

  const removeTag = (e, tag) => {
    e.stopPropagation()
    setSelectedTags((tags) => {
      const newTags = tags.filter((t) => t !== tag)
      localStorage.setItem("_tags", JSON.stringify(newTags))
      return newTags
    })
  }

  const tagProps = (fn) => ({
    role: "button",
    className: "tag",
    tabIndex: 0,
    onClick: fn,
    onKeyDown: fn,
  })

  return (
    <>
      {tags.length ? (
        <div
          className={`field is-grouped is-grouped-multiline ${
            props.noFlex ? "" : "tags-must-flex"
          }`}
        >
          {props.children}
          {tags.map((tag) => (
            <div className="control" key={tag} style={{ margin: "0 0.5rem 0.5rem 0" }}>
              {selectedTags && setSelectedTags ? (
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
              ) : (
                <span className="tag">{tag}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <style>{`
      @media screen and (max-width: 768px) {
        .tags-must-flex.field.is-grouped {
          display: flex;
          justify-content: center;
        }
      }
    `}</style>
    </>
  )
}

export default Tag
