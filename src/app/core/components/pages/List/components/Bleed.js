import styled from "styled-components"

import { VALUE_ZIGZAG_TOP_SHIM } from "../constants"

export default styled.div`
  ${props => props.theme.size.font.auto} width: 100%;
  clear: both;
  position: relative;
  margin-top: -17em;
  ${props =>
    props.author
      ? props.theme.size.breakpoint.min.xl`margin-top: -20em`
      : `margin-top: calc(
    -${VALUE_ZIGZAG_TOP_SHIM}em - ${props.theme.size.block.padding}em
  )`};
  margin-bottom: ${props => props.theme.size.block.padding}em;
`
