import styled from "styled-components"

export default styled.div`
  ${props => props.theme.typography.text.auto} font-size: ${props =>
  props.theme.size.font.make.smaller}em;
  font-style: italic;
  display: inline;
`
