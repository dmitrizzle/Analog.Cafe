import React from "react"
import styled from "styled-components"

import { subtitle } from "./SubtitleTextarea"

export default styled(({ caution, warning, ...props }) => <input {...props} />)`
  ${subtitle};
`
