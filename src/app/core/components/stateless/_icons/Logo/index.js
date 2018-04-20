// tools
import React from "react"

import { APP_NAME } from "../../../../constants/app"

// styles
import { LogoOutline, LogoWithDownstate } from "./styles"

// render
export default props => {
  return (
    <LogoOutline {...props} title={APP_NAME}>
      <LogoWithDownstate {...props} />
    </LogoOutline>
  )
}
