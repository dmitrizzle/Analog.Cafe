import React from "react"
import styled, { css } from "styled-components"

import { styles } from "../../Caption"
import ImageSet from "./ImageSet"
import Figcaption from "./Figcaption"

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
const shadow = css`
  box-shadow: 0 0 ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.color.foreground(props.theme.opacity.least)};
`
const Figure = styled.figure`
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
		float: none;
		margin: ${props => props.theme.size.block.spacing / 2}em 0 ${props =>
    props.theme.size.block.padding}em  -${props =>
    props.theme.size.block.padding}em !important;
		width: 75% !important;
		max-width: 66vw !important;
		min-width: ${props => props.theme.size.block.minFigureWIdth}px;
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
  ${props =>
    props.feature &&
    !props.caption &&
    props.foldSpacer &&
    props.theme.size.breakpoint.min.l`
			margin-bottom: -${props.theme.size.block.spacing}em;
  `}
  textarea {
    ${styles};
    font-size: inherit !important;
  }
`

export default props => {
  const { src, ...select } = props
  return (
    <Figure {...select}>
      <ImageSet
        {...props}
        protected={
          props.readOnly !== false &&
          (process.env.NODE_ENV === "production" || props.userRole === "admin")
        }
      />
      <Figcaption
        caption={props.caption}
        nocaption={props.nocaption}
        readOnly={props.readOnly}
        focus={props.focus}
      >
        {props.children}
      </Figcaption>
    </Figure>
  )
}
