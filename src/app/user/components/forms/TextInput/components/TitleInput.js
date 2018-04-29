import React from "react"
import styled from "styled-components"

import { title } from "./TitleTextarea"

export default styled(({ caution, warning, ...props }) => <input {...props} />)`
  ${title};
`
