// styles
import styled from "styled-components"

// components
import { Caption as ListCaption } from "../../CaptionStyles"

// css
export const Caption = styled(ListCaption)`
  display: block !important;
  overflow: hidden;
  margin: 0;
  margin-bottom: 0.7em;
  height: ${1.5 * 3 + 0.1}em;
  max-width: ${props => props.theme.size.block.column.maxwidth.m}px;

  .fonts-loaded & {
    height: ${1.5 * 3 + 0.1}em;
    ${props => props.status === "loading" && `height: 4em;`};
  }

  &::after,
  &::before {
    display: none;
  }

  .long,
  .short {
    opacity: ${props => props.theme.opacity.half};
    display: none;
  }
  ${props => props.theme.size.breakpoint.max.m`{
    .long {display:inline}
  }`} ${props => props.theme.size.breakpoint.min.l`{
    .short {display:inline}
  }`} ${props => props.theme.size.breakpoint.max.m`{
		&, .fonts-loaded & {
			height: auto !important;
		}
		overflow: 						visible;
		margin-top: 					.3em;
		margin-bottom: 				0;
	}`};
`
