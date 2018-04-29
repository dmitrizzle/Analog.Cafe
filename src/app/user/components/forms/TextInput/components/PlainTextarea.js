import React from "react"
import Textarea from "react-textarea-autosize"
import styled, { css } from "styled-components"

export const reset = css`
  width: 100%;
  border: none;
  outline: rgba(0, 0, 0, 0);
  resize: none;
`
export default styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${reset};
`
