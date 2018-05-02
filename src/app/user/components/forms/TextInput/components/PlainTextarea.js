import React from "react"
import Textarea from "react-textarea-autosize"
import styled from "styled-components"

import { reset } from "./SubtitleInput"

export default styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${reset};
`
