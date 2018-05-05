import styled from "styled-components"

export default styled.strong`
  ${props => props.theme.typography.title.auto} text-align: center;
  display: block;
  font-size: ${props => props.theme.size.font.make.smaller}em;
  margin-bottom: 0.5em;
`
