import { Item } from "@roast-cms/react-button-beans"
import React from "react"

import Link from "../../Link"

export default props => (
  <Item linkComponent={Link} {...props}>
    {props.children}
  </Item>
)
