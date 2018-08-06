import styled from "styled-components"

import CardPopup from "./CardPopup"

export default styled(CardPopup)`
  margin: ${props => props.theme.size.block.padding}em auto
    ${props => props.theme.size.block.spacing}em;
  box-shadow: 0 1px 1px
      ${props => props.theme.color.foreground(props.theme.opacity.least * 2)},
    0 0 0 1px
      ${props => props.theme.color.foreground(props.theme.opacity.least)};
  border-radius: ${props => props.theme.effects.borderRadius.small}em;

  ${props => props.theme.size.breakpoint.max.xs`
		border-radius: 0;
    width: 100vw;
    margin-left: -${props => props.theme.size.block.padding}em;
	`};
`
