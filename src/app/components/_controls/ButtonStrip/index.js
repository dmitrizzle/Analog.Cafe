// tools
import React from "react"
import { Item as ItemInit } from "@roast-cms/react-button-beans"

// components
import Link from "../Link"

// direct exports
export { ButtonStrip, ButtonStyles } from "@roast-cms/react-button-beans"

export const Item = props => (
  <ItemInit linkComponent={Link} {...props}>
    {props.children}
  </ItemInit>
)
