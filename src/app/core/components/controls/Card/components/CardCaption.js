import styled, { css } from "styled-components"

import Sidenote from "../../../vignettes/Sidenote"

export const styles = css`
  text-align: left;
  padding: ${props => props.theme.size.block.spacing}em
    ${props => props.theme.size.block.padding}em;
  font-size: 1.075em !important;
`
export default styled(Sidenote)`
  ${styles};
`
