import styled from "styled-components"

import Sidenote from "../../../../../core/components/vignettes/Sidenote"

export default styled(Sidenote)`
  text-align: center;
  padding: ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.size.block.spacing}em
    ${props => props.theme.size.block.spacing * 2}em;
`
