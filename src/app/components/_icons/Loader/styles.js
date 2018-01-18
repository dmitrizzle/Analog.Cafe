// styles
import styled from "styled-components"
export const LoaderContainer = styled.div`
  display: inline-block;
  overflow: hidden;
  width: ${props => props.theme.size.block.spacing}em;
  height: ${props => props.theme.size.block.spacing}em;
  margin: -0.1em 0 0em -${props => props.theme.size.block.spacing / 2}em;
  svg {
    margin-top: -0.25em;
  }
`
