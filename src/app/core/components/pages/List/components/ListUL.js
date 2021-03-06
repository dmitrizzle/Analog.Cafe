import { renderToStaticMarkup } from "react-dom/server"
import React from "react"
import styled, { css } from "styled-components"

import { VALUE_ZIGZAG_TOP_SHIM, VALUE_ZIGZAG_WIDTH } from "../constants"
import { sectionTitle } from "../../Article/components/ArticleSection"
import { subtitleStyles } from "../../../vignettes/HeaderLarge/components/HeaderSubtitle"
import ZigZag from "../../../icons/ZigZag"

const zigZagSVG = encodeURIComponent(renderToStaticMarkup(<ZigZag />))
const zigZagDataUri = `url("data:image/svg+xml,${zigZagSVG}")`
const blockSafety = props => props.theme.size.block.padding
const blockSpacing = props => props.theme.size.block.spacing
const greyLine = props =>
  props.theme.color.foreground(props.theme.opacity.least)
const posterDimensions = css`
  width: 5.5em;
  height: 9.33em;
`
const zigzagWidthShim = css`
  width: calc(${VALUE_ZIGZAG_WIDTH} + 0px);
`
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

export default styled.ul`
	${props =>
    props.status === "loading" && `opacity: ` + props.theme.opacity.least + `;`}

    ${props => props.status === "loading" && props.author && `opacity: 0;`}

	${props => props.theme.typography.text.auto};
	position: 			relative;
	max-width: 			${props => props.theme.size.breakpoint.stops.max}px;
	margin: 				0 auto;
	padding: 				0;
	&::after {
		${zigzagDimensions}
		background-size: 		4em 16em;
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
					border-bottom-color: #000;
				}
        > div {
            box-shadow: -8px 0px 0 0px #000 inset;
        }
			}
		}
		section {
			position: 				relative;
      width:            100%;
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
        ${props => props.theme.size.breakpoint.max.s`
            width: 100%;
        `}
				float: 			left;
				margin: 		0 ${blockSpacing}em 0 0;
				overflow:		hidden;

				${"" /* styles borrowed from Picture component */}
				box-shadow: 0 0 .5em ${props =>
          props.theme.color.foreground(props.theme.opacity.least)};
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
				}
				${props => props.theme.size.breakpoint.max.m`{
					margin-top: calc(${blockSpacing}em / 2 + 0.1em);
					margin-bottom: 0;
				}`}
				background-color: ${props =>
          props.status === "loading"
            ? props.theme.color.foreground()
            : greyLine};
				border-bottom: ${props => props.theme.elements.thickBorder};
			}
			h2 {
				${sectionTitle}
        padding: 0;
        margin: 0
			}
      h3 {
        ${subtitleStyles}
        font-size: ${props => props.theme.size.font.make.normal * 1.15}em;
      }
			${props => props.status === "loading" && `word-break: break-all;`}
			& > div {
				float: left;
        width: calc(100% - 6.5em);
        max-width: ${props => props.theme.size.block.column.m}px;

        ${props => props.theme.size.breakpoint.max.l`
            min-width: 280px;
        `}

        & > div {
          padding-top: .35em;
        }
			}

		}
	}
	&:first-child li:first-child {
		padding-top: ${props => (props.author ? 17 : VALUE_ZIGZAG_TOP_SHIM)}em;
		:before { display: none; }
	}
`
