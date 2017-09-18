// tools
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

// styles
import styled, { css } from "styled-components"
import Color from "color"

// images
import ZigZag from "../components/ZigZag"
const zigZagSVG = encodeURIComponent(renderToStaticMarkup(<ZigZag />))
const zigZagDataUri = `url("data:image/svg+xml,${zigZagSVG}")`

// css & constants
export const zigzagWidth = "33%"
export const zigzagTopShim = 12

const blockSafety = props => props.theme.size.block.column.safety
const blockSpacing = props => props.theme.size.block.spacing
const greyLine = props =>
  Color(props.theme.color.foreground)
    .alpha(props.theme.opacity.least)
    .string()
// const greyFade = props => Color(props.theme.color.foreground).alpha(0).string()

const posterDimensions = css`
  width: 5.5em;
  height: 9.33em;
`
const zigzagWidthShim = css`width: calc(${zigzagWidth} + 3px);`
const zigzagFill = css`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`
const zigzagDimensions = css`
  ${zigzagWidthShim} ${zigzagFill} display: block;
  content: "";
  z-index: ${props => props.theme.layer.up};
  pointer-events: none;
  ${props => props.theme.size.breakpoint.max.l`{ display: none !important; }`};
`

// return
export const Ul = styled.ul`

	/* placeholder style */
	${props =>
    props.status === "loading" && `opacity: ` + props.theme.opacity.least + `;`}

	${props => props.theme.typography.text.auto};
	position: 			relative;
	max-width: 			${props => props.theme.size.breakpoint.stops.max}px;
	margin: 				0 auto;
	padding: 				0;
	&::after {
		${zigzagDimensions}
		filter: 						drop-shadow(1px 0 0 ${greyLine});
		background-size: 		15em 33em;
		background-image: 	${zigZagDataUri};
		background-repeat: 	repeat-y;
	}

	li {
		display: 			block;
		list-style: 	none;
		overflow: 		hidden;
		position: 		relative;

		& > a {
			display: 					flex;
			width: 						100%;
			text-decoration: 	none;

			&:active {
				background: 0 0;
				section figure {
					box-shadow:	none;
					border-bottom-color: ${props => props.theme.color.highlight};
				}
			}
		}
		section {
			position: 				relative;
			max-width: 				61.5%;
			padding: 					calc(${blockSpacing}em * 6) ${blockSafety}em ${props =>
  props.theme.size.block.spacing}em ${blockSafety}em;
			${props => props.theme.size.breakpoint.max.l`
				max-width: 	100% !important;
				overflow: 	hidden;
				padding-top: calc(${blockSafety}em * 3);
			`}
			& > figure {
				${posterDimensions}
				float: 			left;
				margin: 		0 ${blockSpacing}em 0 0;
				overflow:		hidden;

				${"" /* styles borrowed from Picture component */}
				box-shadow: 0 0 .5em ${props =>
          Color(props.theme.color.foreground)
            .alpha(props.theme.opacity.least)
            .string()};
				${props => props.theme.size.breakpoint.max.m`
					border-radius:	${props => props.theme.effects.borderRadius.small}em;
				`}

				& > div {
					width: 								100%;
					height: 							100%;
					z-index: 							${props => props.theme.layer.tuck};
					position: 						relative;
					background-size: 			cover;
					background-position: 	center;
					-webkit-filter: 			sepia(75%) hue-rotate(-12deg);
					filter: 							sepia(75%) hue-rotate(-12deg);
					${props => props.theme.size.breakpoint.max.l`{
						-webkit-filter: 		grayscale(95%);
						filter: 						grayscale(95%);
					}`}
				}

				${props => props.theme.size.breakpoint.max.m`{
					margin-top: calc(${blockSpacing}em / 2 + 0.1em);
					margin-bottom: 0;
				}`}

				/* placeholder style */
				background-color: ${props =>
          props.status === "loading" ? props.theme.color.foreground : greyLine};
				border-bottom: ${props => props.theme.elements.thickBorder};

			}
			h2 {
				${props => props.theme.typography.title.auto}
				font-size:        ${props => props.theme.size.font.make.larger / 1.5}em;
				display: 					inline-block;
				padding: 					0 0 .15em;
				margin-top: 			-0.275em;
				margin-bottom: 		-0.15em;
				overflow: 				hidden;
				white-space: 			nowrap;
				text-overflow: 		ellipsis;
				max-width: 				11.5em;
        max-height:       4.75em;
        hyphens:          auto;
				${props => props.theme.size.breakpoint.max.m`{
					display: 			block;
					white-space: 	normal;
					line-height: 	1.185em;
					margin-top: 	0.04em;

					/* placeholder style */
					${props =>
            props.status === "loading" &&
            `
						margin-top: 	0;
						line-height: 	1.65em;
					`}
				}`}

				/* placeholder style */
				${props =>
          props.status === "loading" &&
          `
					margin-top: -.1em;
					letter-spacing: -1px !important;
				`}

			}


			/* placeholder style */
			${props => props.status === "loading" && `word-break: break-all;`}

			& > div {
				/* max-width: 30em; */
				padding-top:	calc(${blockSpacing}em / 4.5);
				display: inline-block;

				${props => props.theme.size.breakpoint.max.m`{
					width: 				calc(100vw - ${blockSpacing}em * 3.5);
					min-width: 		auto;
					padding-top:	calc(${blockSafety}em / 2);
				}`}
				${props => props.theme.size.breakpoint.max.xs`{
					text-align: left;
				}`}

				/* placeholder style */
				${props =>
          props.status === "loading" &&
          `
					& > em { font-style: normal; }
					letter-spacing: 0 !important;
				`}
				}

			}

		}
	}
	&:first-child li:first-child {
		padding-top: ${zigzagTopShim}em;
		:before { display: none; }
	}
	.fonts-loaded-headers & h2 { ${props =>
    props.theme.typography.title.fontsLoaded} }
`
