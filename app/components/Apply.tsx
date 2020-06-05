import { Button } from "react-bulma-components"

const Apply = ({ url }) => (
  <Button
    renderAs="a"
    color="info"
    outlined={true}
    rounded={true}
    style={{ borderWidth: 2, fontWeight: 600 }}
    href={url}
    target="_blank"
    onClick={(e) => e.stopPropagation()}
    rel="noopener noreferrer"
  >
    Apply
  </Button>
)

export default Apply
