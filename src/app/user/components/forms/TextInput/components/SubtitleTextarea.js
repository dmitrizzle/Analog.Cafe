import React from "react"
import Textarea from "react-textarea-autosize"
import styled, { css } from "styled-components"

import { caution, warning } from "./TextareaWithHighlights"
import { reset } from "./PlainTextarea"

export const subtitle = css`
  ${reset} ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger / 2}em;
  text-align: center;
  overflow: hidden;
  ${caution} ${warning};
`
export default styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${subtitle};
`
