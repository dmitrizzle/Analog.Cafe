import styled from "styled-components"

export default styled.h2`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger / 2}em;
`
