import { FiX } from "react-icons/fi"
import styled from "styled-components"

const Tags = styled.div`
  ${(props) =>
    props.noFlex
      ? ""
      : `
    @media screen and (max-width: 768px) {
      &.field.is-grouped {
        display: flex;
        justify-content: center;
      }
    }`}
`

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
    <Tags className="field is-grouped is-grouped-multiline" noFlex={props.noFlex}>
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
    </Tags>
  ) : (
    <></>
  )
}

export default Tag
