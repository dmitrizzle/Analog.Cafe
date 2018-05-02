import React from "react"
import styled, { css } from "styled-components"

import Caption from "../../Caption"
import CaptionAuthor from "./CaptionAuthor"

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
const Figcaption = styled(Caption)`
  ${props =>
    !props.feature &&
    `
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

export default props => {
  return (
    <figcaption
      style={
        props.nocaption && {
          borderBottom: "8px solid #2c2c2c",
          height: 0,
          overflow: "hidden"
        }
      }
    >
      {props.author ? (
        <Figcaption>
          {props.children}
          {props.readOnly ? <CaptionAuthor author={props.author} /> : null}
        </Figcaption>
      ) : (
        <Figcaption {...props}>
          {props.children}
          {!props.noAuthor &&
            props.readOnly && (
              <CaptionAuthor> Finding image author…</CaptionAuthor>
            )}
        </Figcaption>
      )}
    </figcaption>
  )
}
