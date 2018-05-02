import styled from "styled-components"

import { VALUE_ZIGZAG_TOP_SHIM } from "../constants"

export default styled.div`
  ${props => props.theme.size.font.auto} width: 100%;
  clear: both;
  position: relative;
  margin-top: calc(
    -${VALUE_ZIGZAG_TOP_SHIM}em - ${props => props.theme.size.block.padding}em
  );
  margin-bottom: ${props => props.theme.size.block.padding}em;
`
