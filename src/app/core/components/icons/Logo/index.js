import React from "react"

import { APP_NAME } from "../../../constants/app"
import { LogoOutline, LogoWithDownstate } from "./styles"

export default props => {
  return (
    <LogoOutline {...props} title={APP_NAME}>
      <LogoWithDownstate {...props} />
    </LogoOutline>
  )
}
