import LinkFilter from "@roast-cms/react-link-filter"
import React from "react"

import { HOST_PROD } from "../../../../constants"

// return
export default props => (
  <LinkFilter domain={HOST_PROD} {...props}>
    {props.children}
  </LinkFilter>
)
