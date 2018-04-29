import Link from "@roast-cms/react-link-filter"
import React from "react"

import { HOST_PROD } from "../../../../constants"

export default props => (
  <Link domain={HOST_PROD} {...props}>
    {props.children}
  </Link>
)
