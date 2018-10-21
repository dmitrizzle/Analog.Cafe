import styled from "styled-components"

import { styles } from "./CardButton"

export default styled.div`
  position: relative;
  display: block;
  background: ${props => props.theme.color.background()};
  overflow: hidden;
  max-width: ${props => props.theme.size.breakpoint.stops.min}px;

  border-radius: ${props => props.theme.effects.borderRadius.med}em;
  box-shadow: 0 ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.size.block.spacing * 2}em
    ${props => props.theme.color.foreground(props.theme.opacity.half)};
  transition: opacity 250ms;

  ${props => props.theme.size.breakpoint.max.xs`
		border-radius: 0;
	`} figure {
    margin: 0;
    border-bottom: ${props => props.theme.elements.thickBorder};
    img {
      width: 100%;
    }
  }
  & > button,
  & > a {
    ${styles};
  }
`
