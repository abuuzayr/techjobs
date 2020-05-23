import styled from "styled-components"

const Placeholder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  border-radius: 10px;
  background: aliceblue;
  font-weight: 700;
`

const Logo = (props) => {
  const { avatar, company, name } = props.job
  return (
    <figure className="image is-64x64" {...props}>
      {avatar || (company && company.imgUrl && company.imgUrl !== "https://") ? (
        <img src={avatar || (company && company.imgUrl)} alt="Company logo" />
      ) : (
        <Placeholder>{company ? company.name.slice(0, 1) : name.slice(0, 1)}</Placeholder>
      )}
    </figure>
  )
}

export default Logo
