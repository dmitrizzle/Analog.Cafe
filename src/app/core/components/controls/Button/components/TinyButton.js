import { TinyButton } from "@roast-cms/react-button-beans"
import React from "react"

import Link from "../../Link"

export default props => (
  <TinyButton linkComponent={Link} {...props}>
    {props.children}
  </TinyButton>
)
