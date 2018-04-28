import styled from "styled-components"

export default styled.div`
  text-align: center;
  padding: ${props => props.theme.size.block.padding}em 0
    ${props => props.theme.size.block.spacing * 4}em;
`
