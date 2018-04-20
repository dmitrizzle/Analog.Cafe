// styles
import { css } from "styled-components"

// components

// css
const warning = css`
  ${props =>
    props.warning &&
    `background:` + props.theme.color.brand(props.theme.opacity.least * 2)};
`
const caution = css`
  ${props =>
    props.caution &&
    `background: ` +
      props.theme.color.highlight(props.theme.opacity.least * 2)};
`
export const reset = css`
  width: 100%;
  border: none;
  outline: rgba(0, 0, 0, 0);
  resize: none;
`
export const title = css`
  ${reset} ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger}em;
  text-align: center;
  overflow: hidden;
  ${caution} ${warning};
`
export const subtitle = css`
  ${reset} ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger / 2}em;
  text-align: center;
  overflow: hidden;
  ${caution} ${warning};
`
export const textarea = css`
  ${reset} ${caution} ${warning};
`
