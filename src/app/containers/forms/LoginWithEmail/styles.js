// tools
import styled from "styled-components"
import Color from "color"


// return
const shadowGrey = props => Color(props.theme.color.foreground).alpha(props.theme.opacity.least).string()
const shadowGrey2 = props => Color(props.theme.color.foreground).alpha(props.theme.opacity.least * 2).string()

export const Form = styled.form`
	max-width: 			${ props => props.theme.size.breakpoint.stops.min }px;
	margin:					0 auto !important;
	border-radius: 	${ props => props.theme.effects.borderRadius.small }em !important;
	background: 		${ shadowGrey };
	overflow: 			hidden;
	box-shadow: 		0 1px 1px ${ shadowGrey2 }, 0 0 0 1px ${ shadowGrey };
	input {
		text-align: center;
		padding: 0;
		line-height: ${ props => props.theme.size.block.spacing * 2 }em;
		background: ${ props => props.warning ? Color(props.theme.color.brand).alpha(props.theme.opacity.least * 2).string() : `transparent` };
	}
	button {
		margin: 0;
		border-radius: 0;
	}
`
