import React from "react"
import styled, { css } from "styled-components"

import { caution, reset, warning } from "./SubtitleInput"

export const title = css`
  ${reset} ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger}em;
  text-align: center;
  overflow: hidden;
  ${caution} ${warning};
`
export default styled(({ caution, warning, ...props }) => <input {...props} />)`
  ${title};
`
