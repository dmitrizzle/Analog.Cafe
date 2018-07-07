import styled from "styled-components"

import Sidenote from "../../../../../core/components/vignettes/Sidenote"

export default styled(Sidenote)`
  font-weight: 400;
  color: ${props => props.theme.color.background()};
  bottom: 0;
  position: absolute;
  right: ${props => props.theme.size.block.spacing / 2}em;
`
