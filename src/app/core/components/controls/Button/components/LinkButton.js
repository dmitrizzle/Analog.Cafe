import { LinkButton } from "@roast-cms/react-button-beans"
import React from "react"

import Link from "../../Link"

export default props => (
  <LinkButton linkComponent={Link} {...props}>
    {props.children}
  </LinkButton>
)
