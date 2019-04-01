import styled from "styled-components"

export default styled.h1`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger}em;
  hyphens: auto;
  min-height: 1em;
`
