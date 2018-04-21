import LinkFilter from "@roast-cms/react-link-filter"
import React from "react"

import { ROUTE_APP_PRODUCTION_DOMAIN_NAME } from "../../../constants/app"

// return
export default props => (
  <LinkFilter domain={ROUTE_APP_PRODUCTION_DOMAIN_NAME} {...props}>
    {props.children}
  </LinkFilter>
)
