// styles
import styled from "styled-components"

export const ButtonGroup = styled.div`
  text-align: center;
  padding: ${props => props.theme.size.block.padding}em 0
    ${props => props.theme.size.block.spacing * 4}em;
`
