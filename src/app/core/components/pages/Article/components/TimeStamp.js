import styled from "styled-components"

export default styled.div`
  display: block;
  text-align: center;
  font-size: ${props => props.theme.size.font.make.tiny}em;
  margin-top: -${props => props.theme.size.block.spacing}em;
  opacity: 0.5;
`
