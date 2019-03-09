import { Button, LinkButton } from "@roast-cms/react-button-beans"
import React from "react"

import Link from "../../Link"

const CommonLink = props => (
  <LinkButton linkComponent={Link} {...props}>
    {props.children}
  </LinkButton>
)
const EmailLink = props => (
  <a href={props.to} style={{ textDecoration: "none" }}>
    <Button {...props} />
  </a>
)

export default props => {
  return props.to.includes("mailto:") ? (
    <EmailLink {...props} />
  ) : (
    <CommonLink {...props} />
  )
}
