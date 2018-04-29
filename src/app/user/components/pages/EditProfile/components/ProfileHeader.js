import styled from "styled-components"

import HeaderSmall from "../../../../../core/components/vignettes/HeaderSmall"

export default styled(HeaderSmall)`
  padding: 0;
  input {
    padding: ${props => props.theme.size.block.spacing / 4}em
      ${props => props.theme.size.block.spacing / 2}em;
  }
`
