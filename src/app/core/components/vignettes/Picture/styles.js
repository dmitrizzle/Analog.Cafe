import React from "react"
import styled, { css } from "styled-components"

import { styles } from "../../vignettes/Caption"
import Caption from "../Caption"
import Picture from "./components/PictureElement"

// css
// remove `style` prop from Picture HOC
export const Image = styled(({ style, ...props }) => (
  <Picture
    {...props}
    onContextMenu={event => props.protected && event.preventDefault()}
  />
))`
  width: 100%;
  height: auto;
  display: block;
  text-align: center;
  font-style: italic;
  ${props =>
    props.protected &&
    `
		-webkit-touch-callout : none;
		user-select : none;
		pointer-events: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	`};
`

const shadow = css`
  box-shadow: 0 0 ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.color.foreground(props.theme.opacity.least)};
`
const bleed = css`
  float: none;
  margin-left: -${props => props.theme.size.block.padding}em;
  margin-right: -${props => props.theme.size.block.padding}em;
  margin-bottom: 0;
  width: 100vw !important;
  max-width: 100vw !important;
  box-shadow: none;
  border-radius: 0;

  ${props =>
    props.theme.size.breakpoint.min.l`margin-top: ${props =>
      props.theme.size.block.spacing}em;`} ${props =>
  props.feature
    ? props => props.theme.size.breakpoint.min.l`
		margin-left:	calc(( -100vw + ${props =>
      props.theme.size.block.column.m}px )/2 - ${props =>
        props.theme.size.block.padding}em );
	`
    : null} ${props =>
  props.feature
    ? props => props.theme.size.breakpoint.min.xxl`
		margin-left:	calc(( -100vw + ${props =>
      props.theme.size.block.column.l}px )/2 - ${props =>
        props.theme.size.block.padding}em );
	`
    : null} ${props => props.theme.size.breakpoint.max.m`
		margin-top: 0;
	`};
`
export const Figure = styled.figure`
  overflow: hidden;
  position: relative;
  padding: 0;
  margin: ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.size.block.spacing}em
    ${props => props.theme.size.block.spacing}em -${props =>
  props.theme.size.block.column.m / 4}px;
  z-index: ${props => props.theme.layer.up};
  width: 85%;
  float: left;
  background: ${props => props.theme.color.background()};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${shadow} ${props => props.theme.size.breakpoint.min.xxl`
		width: 				95%;
		margin-left: 	-${props => props.theme.size.block.column.l / 2.75}px;
		margin-right: ${props => props.theme.size.block.spacing}em;
	`} ${props =>
  !props.feature &&
  props.theme.size.breakpoint.max.l`
		//--> Larger figure borders (for figures that aren't featured and are on mobile screens)
		float: none;
		margin: ${props => props.theme.size.block.spacing / 2}em 0 ${props =>
    props.theme.size.block.padding}em  -${props =>
    props.theme.size.block.padding}em !important;
		width: 75% !important;
		max-width: 66vw !important;
		min-width: ${props => props.theme.size.block.minFigureWIdth}px;

    // this helper graphic hints on tablet-sized devices that no text is going
    // to be float to the right of the image:
    &.focus {
      overflow: visible;
      &::after {
        content: "";
        width: 100vw;
        position: absolute;
        top: 0;
        bottom: 0;
        background:
            ${props =>
              props.theme.color.foreground(props.theme.opacity.least / 3)};
        z-index: ${props => props.theme.layer.tuck};
      }
    }
	`} ${props =>
  props.feature
    ? bleed
    : props => props.theme.size.breakpoint.max.m`

		margin-left: 0 !important;
		border-radius:	${props => props.theme.effects.borderRadius.small}em;
	`} ${props =>
  props.feature
    ? bleed
    : props => props.theme.size.breakpoint.max.s`
		${bleed}
		//--> Non-featured figures on small screens are not edge-to-edge:
		width: 100% !important;
		max-width: 100vw !important;
		min-width: 0;
		border-radius:	${props => props.theme.effects.borderRadius.small}em;
		${shadow}
	`} &.focus {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0 -${props => props.theme.size.block.border}px 0 ${props =>
  props.theme.color.highlight()};
    figcaption {
      box-shadow: 0 ${props => props.theme.size.block.border}px 0
        ${props => props.theme.color.highlight()} inset;
    }
    z-index: ${props => props.theme.layer.up + 1};
  }

  textarea {
    ${styles};
  }
`

const captionBlock = css`
  ${props => props.theme.size.breakpoint.min.l`
		margin: 0 auto;
		${props => props.theme.size.breakpoint.min.s`
			max-width:	 ${props => props.theme.size.block.column.m}px;
		`}
		${props => props.theme.size.breakpoint.min.xxl`
			max-width:	 ${props => props.theme.size.block.column.l}px;
		`}
	`};
`
export const PictureCaption = styled(Caption)`
  ${props =>
    !props.feature &&
    `
    // for helper graphic that shows grey to the right of figures
    // the background for caption needs to be white
    // and highlight needs to be above
    background: ${props.theme.color.background()};
    .focus & {
      box-shadow: 0 ${
        props.theme.size.block.border
      }px 0 ${props.theme.color.highlight()} inset;
    }
  `} border-bottom: ${props => props.theme.elements.thickBorder};
  color: ${props => props.theme.color.foreground(props.theme.opacity.half)};
  padding: ${props => props.theme.size.block.padding / 2}em
    ${props =>
      props.theme.size.block.padding / props.theme.size.font.make.smaller}em
    ${props => props.theme.size.block.padding * 1.25}em;
  text-align: center;

  max-width: ${props => props.theme.size.block.column.m}px;
  margin: 0 auto;

  div,
  textarea {
    display: inline;
  }
  textarea {
    font-size: 1em !important;
    text-align: center;
    overflow: hidden;
    font-variant: small-caps;
  }
  ${props => props.feature && captionBlock};
`
export const CaptionAuthor = styled.span`
  color: ${props => props.theme.color.foreground()};
  display: inline-block;
`
