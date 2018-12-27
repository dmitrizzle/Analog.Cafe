import styled, { css } from "styled-components"

export const subtitleStyles = css`  ${props =>
  props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger / 2}em;
`
export default styled.h2`
  ${subtitleStyles};
`
