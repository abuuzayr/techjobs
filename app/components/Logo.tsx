const Logo = (props) => {
  const { avatar, company, name } = props.job
  return (
    <>
      <figure className="image is-64x64" {...props}>
        {avatar || (company && company.imgUrl && company.imgUrl !== "https://") ? (
          <img src={avatar || (company && company.imgUrl)} alt="Company logo" />
        ) : (
          <div className="company-placeholder">
            {company ? company.name.slice(0, 1) : name.slice(0, 1)}
          </div>
        )}
      </figure>
    </>
  )
}

export default Logo
