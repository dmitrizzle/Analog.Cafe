import React from "react"
import Textarea from "react-textarea-autosize"
import styled, { css } from "styled-components"

import { reset } from "./PlainTextarea"

export const warning = css`
  ${props =>
    props.warning &&
    `background:` + props.theme.color.brand(props.theme.opacity.least * 2)};
`
export const caution = css`
  ${props =>
    props.caution &&
    `background: ` +
      props.theme.color.highlight(props.theme.opacity.least * 2)};
`
export default styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${reset} ${caution} ${warning};
`
